import { getStore } from '@netlify/blobs';
import { verifyEngagementToken } from './_shared/engagement-token.mjs';
import { AGREEMENT_STORE, json, logActivity, publicAgreement, updateProject } from './_shared/engagement-admin.mjs';

export default async function handler(req){
  const secret=process.env.CONVERA_ENGAGEMENT_TOKEN_SECRET||'';
  let token=''; if(req.method==='GET') token=new URL(req.url).searchParams.get('access')||''; else {try{const b=await req.json();token=b?.access||'';return respond(req,b,token,secret)}catch{return json({error:'Invalid request.'},400)}}
  const verified=verifyEngagementToken(token,secret,'agreement'); if(!verified.ok)return json({error:verified.reason==='expired'?'This agreement review link has expired.':'Invalid agreement review link.'},verified.reason==='expired'?410:403);
  const {projectNumber,recordId,recipientEmail}=verified.payload; const store=getStore(AGREEMENT_STORE); const key=`agreements/${projectNumber}/${recordId}`; const record=await store.get(key,{type:'json'});
  if(!record||record.clientEmail!==recipientEmail)return json({error:'Agreement not found.'},404);
  if(record.status==='Superseded')return json({error:'This agreement has been superseded. Please use the latest agreement link.'},409);
  if(['Sent'].includes(record.status)){record.status='Viewed';record.viewedAt=record.viewedAt||new Date().toISOString();record.updatedAt=new Date().toISOString();await store.setJSON(key,record);await logActivity(projectNumber,'agreement_viewed',`${recordId} viewed by client.`,{agreementId:recordId});}
  return json({ok:true,agreement:publicAgreement(record)});
}

async function respond(req,body,token,secret){
  if(req.method!=='POST')return json({error:'Method not allowed.'},405,{Allow:'GET, POST'});
  const verified=verifyEngagementToken(token,secret,'agreement'); if(!verified.ok)return json({error:verified.reason==='expired'?'This agreement review link has expired.':'Invalid agreement review link.'},verified.reason==='expired'?410:403);
  const {projectNumber,recordId,recipientEmail}=verified.payload; const store=getStore(AGREEMENT_STORE); const key=`agreements/${projectNumber}/${recordId}`; const record=await store.get(key,{type:'json'});
  if(!record||record.clientEmail!==recipientEmail)return json({error:'Agreement not found.'},404);
  if(['Signed','Superseded','Declined'].includes(record.status))return json({error:`This agreement is ${record.status.toLowerCase()} and no longer accepts this response.`},409);
  const action=String(body?.action||'').toLowerCase(); const note=String(body?.note||'').trim().slice(0,2000); const now=new Date().toISOString(); let next={...record,updatedAt:now,respondedAt:now,responseNote:note};
  if(action==='ready_to_sign'){
    next.status='Awaiting Signature'; await store.setJSON(key,next); await logActivity(projectNumber,'agreement_ready_to_sign',`${recordId}: client indicated agreement is ready for signature.`,{agreementId:recordId}); await updateProject(projectNumber,{nextAction:`Complete signature process for ${recordId}.`,lastAgreementId:recordId,lastAgreementStatus:'Awaiting Signature'}); return json({ok:true,message:'Thank you. Convera Strategies has been notified that the agreement is ready for signature.',agreement:publicAgreement(next)});
  }
  if(action==='request_changes'){
    if(!note)return json({error:'Please describe the requested change.'},400); next.status='Changes Requested'; await store.setJSON(key,next); await logActivity(projectNumber,'agreement_changes_requested',`${recordId}: client requested changes.`,{agreementId:recordId}); await updateProject(projectNumber,{nextAction:`Review requested changes to ${recordId}.`,lastAgreementId:recordId,lastAgreementStatus:'Changes Requested'}); return json({ok:true,message:'Your requested changes were recorded.',agreement:publicAgreement(next)});
  }
  if(action==='decline'){
    next.status='Declined'; await store.setJSON(key,next); await logActivity(projectNumber,'agreement_declined_by_client',`${recordId}: client declined agreement.`,{agreementId:recordId}); await updateProject(projectNumber,{nextAction:`Review declined agreement ${recordId}.`,lastAgreementId:recordId,lastAgreementStatus:'Declined'}); return json({ok:true,message:'Your response was recorded.',agreement:publicAgreement(next)});
  }
  return json({error:'Unsupported response action.'},400);
}
