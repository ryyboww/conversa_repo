import { getStore } from '@netlify/blobs';
import { createEngagementToken } from './_shared/engagement-token.mjs';
import { AGREEMENT_STORE, AGREEMENT_STATUSES, ESTIMATE_STORE, authorizeOperator, cleanText, getProject, json, listRecords, logActivity, normalizeEmail, publicAgreement, updateProject, validAgreementId, validProjectNumber } from './_shared/engagement-admin.mjs';

const RESEND_ENDPOINT='https://api.resend.com/emails';

export default async function handler(req){
  if(!authorizeOperator(req)) return json({error:'Unauthorized.'},401);
  if(req.method==='GET') return listAgreements(req);
  if(req.method==='POST') return createAgreement(req);
  if(req.method==='PATCH') return updateAgreement(req);
  return json({error:'Method not allowed.'},405,{Allow:'GET, POST, PATCH'});
}

async function listAgreements(req){
  const u=new URL(req.url); const projectNumber=cleanText(u.searchParams.get('projectNumber'),80).toUpperCase();
  if(!validProjectNumber(projectNumber)) return json({error:'Valid Project # required.'},400);
  const rows=await listRecords(AGREEMENT_STORE,`agreements/${projectNumber}/`);
  rows.sort((a,b)=>Number(b.version)-Number(a.version));
  return json({ok:true,statuses:AGREEMENT_STATUSES,agreements:rows.map(adminAgreement)});
}

async function createAgreement(req){
  let body; try{body=await req.json()}catch{return json({error:'Invalid JSON request body.'},400)}
  const projectNumber=cleanText(body?.projectNumber,80).toUpperCase();
  if(!validProjectNumber(projectNumber)) return json({error:'Invalid Project #.'},400);
  const project=await getProject(projectNumber); if(!project) return json({error:'Project not found.'},404);
  const agreementSource=cleanText(body?.agreementSource,30).toLowerCase()||'convera';
  if(!['convera','client_supplied'].includes(agreementSource)) return json({error:'Agreement source must be Convera or client supplied.'},400);
  const sourceEstimateId=cleanText(body?.sourceEstimateId,100).toUpperCase();
  let estimate=null;
  if(agreementSource==='convera'){
    if(!sourceEstimateId) return json({error:'An accepted Estimate ID is required before preparing a Convera agreement.'},400);
    const estimateStore=getStore(ESTIMATE_STORE);
    estimate=await estimateStore.get(`estimates/${projectNumber}/${sourceEstimateId}`,{type:'json'});
    if(!estimate || estimate.status!=='Accepted') return json({error:'Source estimate must exist and be Accepted.'},409);
  }
  const existing=await listRecords(AGREEMENT_STORE,`agreements/${projectNumber}/`);
  const version=Math.max(0,...existing.map(r=>Number(r.version)||0))+1;
  const suffix=projectNumber.split('-').pop(); const agreementId=`AGR-${suffix}-${String(version).padStart(2,'0')}`;
  const now=new Date().toISOString();
  const record=parseAgreement({...body,agreementSource},{project,estimate,projectNumber,agreementId,version});
  if(record.error) return json({error:record.error},400);
  const value={...record.value,status:'Draft',termsApprovedForUse:false,createdAt:now,updatedAt:now,sentAt:null,viewedAt:null,respondedAt:null,responseNote:'',publicTokenExpiresAt:null,clientSignedAt:null,converaSignedAt:null,signedDocumentReference:'',sourceAgreementId:null};
  const store=getStore(AGREEMENT_STORE); const created=await store.setJSON(`agreements/${projectNumber}/${agreementId}`,value,{onlyIfNew:true});
  if(!created.modified) return json({error:'Agreement number collision. Please retry.'},409);
  await logActivity(projectNumber,'agreement_created',agreementSource==='client_supplied'?`${agreementId} created to track a client-supplied agreement.`:`${agreementId} created from accepted estimate ${sourceEstimateId}.`,{agreementId,sourceEstimateId,agreementSource});
  await updateProject(projectNumber,{nextAction:`Review and approve ${agreementId} for use.`,lastAgreementId:agreementId,lastAgreementStatus:'Draft'});
  return json({ok:true,agreement:adminAgreement(value)},201);
}

async function updateAgreement(req){
  let body; try{body=await req.json()}catch{return json({error:'Invalid JSON request body.'},400)}
  const projectNumber=cleanText(body?.projectNumber,80).toUpperCase(); const agreementId=cleanText(body?.agreementId,100).toUpperCase();
  if(!validProjectNumber(projectNumber)||!validAgreementId(agreementId)) return json({error:'Invalid project or agreement identifier.'},400);
  const store=getStore(AGREEMENT_STORE); const key=`agreements/${projectNumber}/${agreementId}`; const current=await store.get(key,{type:'json'});
  if(!current) return json({error:'Agreement not found.'},404);
  const action=cleanText(body?.action,40).toLowerCase();
  if(action==='approve_terms'){
    if(current.status!=='Draft') return json({error:'Only a Draft agreement can be approved for use.'},409);
    const next={...current,termsApprovedForUse:true,termsApprovedAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
    await store.setJSON(key,next); await logActivity(projectNumber,'agreement_terms_approved',`${agreementId} marked approved for use.`,{agreementId});
    return json({ok:true,agreement:adminAgreement(next)});
  }
  if(action==='send') return sendAgreement({body,current,key,store});
  if(action==='revise') return reviseAgreement({body,current,store});
  if(action==='record_signature') return recordSignature({body,current,key,store});
  if(action==='decline'){
    const next={...current,status:'Declined',updatedAt:new Date().toISOString(),respondedAt:new Date().toISOString(),responseNote:cleanText(body?.responseNote,1000)};
    await store.setJSON(key,next); await logActivity(projectNumber,'agreement_declined',`${agreementId} marked declined.`,{agreementId});
    return json({ok:true,agreement:adminAgreement(next)});
  }
  if(!['Draft','Changes Requested'].includes(current.status)) return json({error:'This agreement cannot be edited in its current status. Create a revision or change order instead.'},409);
  const parsed=parseAgreement({...current,...body},{project:await getProject(projectNumber),estimate:null,projectNumber,agreementId,version:current.version,current});
  if(parsed.error) return json({error:parsed.error},400);
  const next={...current,...parsed.value,termsApprovedForUse:false,termsApprovedAt:null,updatedAt:new Date().toISOString()};
  await store.setJSON(key,next); await logActivity(projectNumber,'agreement_updated',`${agreementId} updated; approval-for-use reset.`,{agreementId});
  return json({ok:true,agreement:adminAgreement(next)});
}

async function sendAgreement({body,current,key,store}){
  if(!['Draft','Changes Requested'].includes(current.status)) return json({error:'Only a Draft or Changes Requested agreement can be sent.'},409);
  if(!current.termsApprovedForUse) return json({error:'Mark the agreement Approved for Use before sending.'},409);
  const secret=process.env.CONVERA_ENGAGEMENT_TOKEN_SECRET||''; const apiKey=process.env.RESEND_API_KEY||''; const from=process.env.CONVERA_AGREEMENT_FROM_EMAIL||process.env.CONVERA_ESTIMATE_FROM_EMAIL||'';
  if(secret.length<32||!apiKey||!from) return json({error:'Agreement email or token configuration is incomplete.'},503);
  const days=Math.min(90,Math.max(1,Number(body?.linkValidityDays||30))); const expiresAt=new Date(Date.now()+days*86400000);
  const token=createEngagementToken({secret,kind:'agreement',recordId:current.agreementId,projectNumber:current.projectNumber,recipientEmail:current.clientEmail,expiresAt});
  const site=String(process.env.CONVERA_SITE_URL||process.env.URL||'https://converastrategies.com').replace(/\/+$/,''); const reviewUrl=new URL(process.env.CONVERA_AGREEMENT_REVIEW_URL||`${site}/agreement/`,site); reviewUrl.searchParams.set('access',token);
  const subject=`[${current.projectNumber}] Project Agreement for review — ${current.agreementId}`;
  const html=`<div style="font-family:Arial,sans-serif;line-height:1.55;color:#1b1b1b"><p>Hello ${esc(current.clientName||'')},</p><p>Convera Strategies has prepared Project Agreement <strong>${esc(current.agreementId)}</strong> for Project <strong>${esc(current.projectNumber)}</strong>.</p><p><a href="${esc(reviewUrl.toString())}">Review the Project Agreement</a></p><p>This review link does not itself create a signature. If the agreement is ready, the page will direct you to the configured signature process.</p><p>Regards,<br>Convera Strategies</p></div>`;
  const text=`Hello ${current.clientName||''},\n\nConvera Strategies has prepared Project Agreement ${current.agreementId} for Project ${current.projectNumber}.\n\nReview: ${reviewUrl}\n\nReviewing or clicking through does not itself create a signature.\n\nConvera Strategies`;
  const replyTo=process.env.CONVERA_AGREEMENT_REPLY_TO||process.env.CONVERA_ESTIMATE_REPLY_TO||'';
  const response=await fetch(RESEND_ENDPOINT,{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[current.clientEmail],subject,html,text,...(replyTo?{reply_to:replyTo}:{})})}); const result=await response.json().catch(()=>({}));
  if(!response.ok) return json({error:result?.message||'Email provider rejected agreement.'},502);
  const now=new Date().toISOString(); const next={...current,status:'Sent',sentAt:now,updatedAt:now,publicTokenExpiresAt:expiresAt.toISOString(),emailId:result?.id||null};
  await store.setJSON(key,next); await logActivity(current.projectNumber,'agreement_sent',`${current.agreementId} sent for review.`,{agreementId:current.agreementId});
  await updateProject(current.projectNumber,{nextAction:`Await agreement review/signature for ${current.agreementId}.`,lastAgreementId:current.agreementId,lastAgreementStatus:'Sent'});
  return json({ok:true,message:'Agreement sent.',agreement:adminAgreement(next)});
}

async function reviseAgreement({body,current,store}){
  if(current.status==='Signed') return json({error:'Signed agreements are not revised. Use a Change Order or formal amendment.'},409);
  if(!['Sent','Viewed','Changes Requested','Declined','Awaiting Signature','Partially Signed'].includes(current.status)) return json({error:'This agreement does not need a new revision.'},409);
  const rows=await listRecords(AGREEMENT_STORE,`agreements/${current.projectNumber}/`); const version=Math.max(0,...rows.map(r=>Number(r.version)||0))+1;
  const agreementId=`AGR-${current.projectNumber.split('-').pop()}-${String(version).padStart(2,'0')}`; const now=new Date().toISOString();
  const parsed=parseAgreement({...current,...body},{project:await getProject(current.projectNumber),estimate:null,projectNumber:current.projectNumber,agreementId,version,current}); if(parsed.error)return json({error:parsed.error},400);
  const next={...parsed.value,agreementId,version,status:'Draft',termsApprovedForUse:false,termsApprovedAt:null,createdAt:now,updatedAt:now,sentAt:null,viewedAt:null,respondedAt:null,responseNote:'',publicTokenExpiresAt:null,clientSignedAt:null,converaSignedAt:null,signedDocumentReference:'',sourceAgreementId:current.agreementId};
  const created=await store.setJSON(`agreements/${current.projectNumber}/${agreementId}`,next,{onlyIfNew:true}); if(!created.modified)return json({error:'Agreement revision collision. Please retry.'},409);
  const old={...current,status:'Superseded',updatedAt:now,supersededBy:agreementId}; await store.setJSON(`agreements/${current.projectNumber}/${current.agreementId}`,old);
  await logActivity(current.projectNumber,'agreement_revised',`${current.agreementId} superseded by ${agreementId}.`,{agreementId,sourceAgreementId:current.agreementId});
  return json({ok:true,agreement:adminAgreement(next),superseded:current.agreementId},201);
}

async function recordSignature({body,current,key,store}){
  if(!['Sent','Viewed','Awaiting Signature','Partially Signed'].includes(current.status) && !(current.status==='Draft' && current.agreementSource==='client_supplied' && current.termsApprovedForUse)) return json({error:'Agreement is not ready for signature recording.'},409);
  const side=cleanText(body?.side,20).toLowerCase(); if(!['client','convera'].includes(side)) return json({error:'Signature side must be client or convera.'},400);
  const signedAt=cleanText(body?.signedAt,50)||new Date().toISOString(); const method=cleanText(body?.signatureMethod,120)||'External e-sign'; const reference=cleanText(body?.signedDocumentReference,500)||current.signedDocumentReference||'';
  let next={...current,updatedAt:new Date().toISOString(),signatureMethod:method,signedDocumentReference:reference};
  if(side==='client') next.clientSignedAt=signedAt; else next.converaSignedAt=signedAt;
  next.status=next.clientSignedAt&&next.converaSignedAt?'Signed':'Partially Signed';
  await store.setJSON(key,next); await logActivity(current.projectNumber,'agreement_signature_recorded',`${current.agreementId}: ${side} signature recorded.`,{agreementId:current.agreementId,side,status:next.status});
  await updateProject(current.projectNumber,{lastAgreementId:current.agreementId,lastAgreementStatus:next.status,nextAction:next.status==='Signed'?'Complete engagement-readiness review.':`Complete remaining signature for ${current.agreementId}.`});
  return json({ok:true,agreement:adminAgreement(next)});
}

function parseAgreement(body,{project,estimate,projectNumber,agreementId,version,current={}}){
  const clientEmail=normalizeEmail(body?.clientEmail||current.clientEmail||project?.email); if(!/^\S+@\S+\.\S+$/.test(clientEmail)) return {error:'Valid client email required.'};
  const sourceEstimateId=cleanText(body?.sourceEstimateId||current.sourceEstimateId||estimate?.estimateId,100).toUpperCase();
  const title=cleanText(body?.title||current.title||project?.workingTitle||'Project Agreement',180);
  const agreementSource=cleanText(body?.agreementSource||current.agreementSource||'convera',30).toLowerCase();
  if(!['convera','client_supplied'].includes(agreementSource)) return {error:'Agreement source must be Convera or client supplied.'};
  const clientSuppliedReference=cleanText(body?.clientSuppliedReference||current.clientSuppliedReference,1000);
  if(agreementSource==='client_supplied' && !clientSuppliedReference) return {error:'Client-supplied agreement reference is required.'};
  const approvedTerms=cleanText(body?.approvedTerms||current.approvedTerms,30000);
  if(!approvedTerms) return {error:'Counsel-reviewed/approved agreement terms text is required before agreement preparation.'};
  return {value:{projectNumber,agreementId,version,agreementSource,clientSuppliedReference,sourceEstimateId,title,clientName:cleanText(body?.clientName||current.clientName||project?.name,150),clientOrganization:cleanText(body?.clientOrganization||current.clientOrganization||project?.organization,180),clientEmail,effectiveDate:cleanText(body?.effectiveDate||current.effectiveDate,30),scopeSummary:cleanText(body?.scopeSummary||current.scopeSummary||estimate?.scope,12000),deliverablesSummary:cleanText(body?.deliverablesSummary||current.deliverablesSummary||estimate?.deliverables,12000),feesSummary:cleanText(body?.feesSummary||current.feesSummary||priceSummary(estimate),5000),paymentTerms:cleanText(body?.paymentTerms||current.paymentTerms||estimate?.paymentSchedule,8000),depositRequired:Boolean(body?.depositRequired??current.depositRequired),depositAmount:num(body?.depositAmount??current.depositAmount),expenses:cleanText(body?.expenses||current.expenses||estimate?.expenses,5000),clientResponsibilities:cleanText(body?.clientResponsibilities||current.clientResponsibilities,8000),converaResponsibilities:cleanText(body?.converaResponsibilities||current.converaResponsibilities,8000),confidentiality:cleanText(body?.confidentiality||current.confidentiality,8000),intellectualProperty:cleanText(body?.intellectualProperty||current.intellectualProperty,8000),termination:cleanText(body?.termination||current.termination,8000),changeControl:cleanText(body?.changeControl||current.changeControl||'Changes to scope, fees, or schedule should be documented through a written Change Order or amendment approved by both parties.',8000),governingLaw:cleanText(body?.governingLaw||current.governingLaw,500),specialTerms:cleanText(body?.specialTerms||current.specialTerms,10000),approvedTerms,externalSignatureUrl:cleanText(body?.externalSignatureUrl||current.externalSignatureUrl,2000),internalNotes:cleanText(body?.internalNotes||current.internalNotes,10000)}};
}
function adminAgreement(r){return {...publicAgreement(r),clientEmail:r.clientEmail,termsApprovedForUse:Boolean(r.termsApprovedForUse),termsApprovedAt:r.termsApprovedAt||null,internalNotes:r.internalNotes||'',createdAt:r.createdAt,updatedAt:r.updatedAt,responseNote:r.responseNote||'',signatureMethod:r.signatureMethod||'',sourceAgreementId:r.sourceAgreementId||null,supersededBy:r.supersededBy||null};}
function priceSummary(e){if(!e)return'';if(e.pricingModel==='fixed')return`${e.currency||'USD'} ${Number(e.fixedAmount||0).toFixed(2)} fixed fee`;if(e.pricingModel==='range')return`${e.currency||'USD'} ${Number(e.rangeMin||0).toFixed(2)}–${Number(e.rangeMax||0).toFixed(2)} estimated range`;if(e.pricingModel==='time_based')return`${e.currency||'USD'} ${Number(e.rate||0).toFixed(2)}/${e.rateUnit||'hour'}${e.cap?`, not to exceed ${Number(e.cap).toFixed(2)}`:''}`;return''}
function num(v){const n=Number(v);return Number.isFinite(n)&&n>=0?n:0}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
