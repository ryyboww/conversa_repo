import { computeReadiness, DEPOSIT_STATUSES, GATE_STATUSES, authorizeOperator, cleanText, getProject, json, logActivity, updateProject, validProjectNumber } from './_shared/engagement-admin.mjs';

export default async function handler(req){
  if(!authorizeOperator(req))return json({error:'Unauthorized.'},401);
  if(req.method==='GET'){
    const p=cleanText(new URL(req.url).searchParams.get('projectNumber'),80).toUpperCase(); if(!validProjectNumber(p))return json({error:'Valid Project # required.'},400);
    const project=await getProject(p); if(!project)return json({error:'Project not found.'},404); const readiness=await computeReadiness(p); return json({ok:true,readiness,gateStatuses:GATE_STATUSES,depositStatuses:DEPOSIT_STATUSES});
  }
  if(req.method==='PATCH'){
    let b;try{b=await req.json()}catch{return json({error:'Invalid JSON request body.'},400)} const p=cleanText(b?.projectNumber,80).toUpperCase(); if(!validProjectNumber(p))return json({error:'Valid Project # required.'},400); const project=await getProject(p); if(!project)return json({error:'Project not found.'},404);
    const conflictReview=cleanText(b?.conflictReview,40); const dataSensitivityReview=cleanText(b?.dataSensitivityReview,40); const depositStatus=cleanText(b?.depositStatus,40); const clientPrerequisiteStatus=cleanText(b?.clientPrerequisiteStatus,40);
    if(!GATE_STATUSES.includes(conflictReview)||!GATE_STATUSES.includes(dataSensitivityReview)||!GATE_STATUSES.includes(clientPrerequisiteStatus)||!DEPOSIT_STATUSES.includes(depositStatus))return json({error:'Invalid readiness gate status.'},400);
    const amount=Number(b?.depositRequiredAmount||0); if(!Number.isFinite(amount)||amount<0)return json({error:'Deposit amount must be zero or greater.'},400);
    await updateProject(p,{conflictReview,dataSensitivityReview,depositStatus,depositRequiredAmount:Math.round(amount*100)/100,clientPrerequisiteLabel:cleanText(b?.clientPrerequisiteLabel,160),clientPrerequisiteStatus});
    const readiness=await computeReadiness(p); await updateProject(p,{engagementReady:readiness.ready,engagementReadyAt:readiness.ready?(project.engagementReadyAt||new Date().toISOString()):null,...(readiness.ready?{nextAction:'Schedule project start / kickoff.'}:{})});
    await logActivity(p,'readiness_review_updated',readiness.ready?'Engagement readiness cleared.':`Engagement readiness updated; ${readiness.blockers.length} blocker(s) remain.`,{ready:readiness.ready,blockers:readiness.blockers});
    return json({ok:true,readiness});
  }
  return json({error:'Method not allowed.'},405,{Allow:'GET, PATCH'});
}
