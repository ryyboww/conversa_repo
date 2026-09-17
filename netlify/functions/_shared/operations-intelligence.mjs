import { getStore } from '@netlify/blobs';
import { PROJECT_STORE } from './project-admin.mjs';
import { INVOICE_STORE, PAYMENT_STORE } from './billing-admin.mjs';
import { MILESTONE_STORE, PORTAL_STORE } from './command-center-admin.mjs';
import { listRecords } from './engagement-admin.mjs';

const ACTIVE_STATUSES=new Set(['Intake Received','Under Review','Accepted','Planning','Active','Awaiting Client']);
const LOAD_STATUSES=new Set(['Accepted','Planning','Active','Awaiting Client']);
export async function operationsSnapshot(){
  const projectStore=getStore(PROJECT_STORE),listing=await projectStore.list({prefix:'projects/'}),projects=(await Promise.all(listing.blobs.map(x=>projectStore.get(x.key,{type:'json'})))).filter(Boolean);
  const [invoices,payments,milestones,portals]=await Promise.all([
    listRecords(INVOICE_STORE,'invoices/'),listRecords(PAYMENT_STORE,'payments/'),listRecords(MILESTONE_STORE,'milestones/'),listRecords(PORTAL_STORE,'portals/')
  ]);
  const today=dateOnly(new Date()),statusCounts=countBy(projects,p=>p.status||'Unknown'),sourceCounts=countBy(projects,p=>p.source||'Unspecified'),referralCounts=countBy(projects,p=>p.referralSource||'No referral recorded'),priorityCounts=countBy(projects,p=>p.priority||'Normal');
  const active=projects.filter(p=>ACTIVE_STATUSES.has(p.status)),ageBuckets={'0–7 days':0,'8–30 days':0,'31–60 days':0,'61–90 days':0,'91+ days':0};
  for(const p of active){const d=ageDays(p.intakeReceivedAt||p.createdAt);if(d<=7)ageBuckets['0–7 days']++;else if(d<=30)ageBuckets['8–30 days']++;else if(d<=60)ageBuckets['31–60 days']++;else if(d<=90)ageBuckets['61–90 days']++;else ageBuckets['91+ days']++}
  const workloadUnits=projects.filter(p=>LOAD_STATUSES.has(p.status)).reduce((s,p)=>s+capacityWeight(p),0),capacityLimit=positiveNumber(process.env.CONVERA_CAPACITY_UNITS),capacityUtilization=capacityLimit?round(workloadUnits/capacityLimit*100):null;
  const issued=invoices.filter(i=>!['Draft','Void','Written Off'].includes(i.status)),totalInvoiced=round(issued.reduce((s,i)=>s+Number(i.total||0),0)),outstanding=round(issued.reduce((s,i)=>s+Number(i.balanceDue||0),0)),overdueInvoices=issued.filter(i=>i.status==='Overdue'||(i.dueDate&&i.dueDate<today&&Number(i.balanceDue||0)>0));
  const paymentNet=round(payments.reduce((s,p)=>s+(p.type==='Refund'?-Number(p.amount||0):Number(p.amount||0)),0));
  const cashflowByMonth={};for(const p of payments){const dt=String(p.receivedAt||p.createdAt||'').slice(0,7);if(!/^\d{4}-\d{2}$/.test(dt))continue;cashflowByMonth[dt]=round((cashflowByMonth[dt]||0)+(p.type==='Refund'?-Number(p.amount||0):Number(p.amount||0)))}
  const openMilestones=milestones.filter(m=>!['Completed','Cancelled'].includes(m.status)&&m.dueDate),overdueMilestones=openMilestones.filter(m=>m.dueDate<today),due7=openMilestones.filter(m=>daysBetween(today,m.dueDate)>=0&&daysBetween(today,m.dueDate)<=7),due30=openMilestones.filter(m=>daysBetween(today,m.dueDate)>=0&&daysBetween(today,m.dueDate)<=30);
  const targetDue=projects.filter(p=>ACTIVE_STATUSES.has(p.status)&&p.targetCompletionDate),overdueTargets=targetDue.filter(p=>p.targetCompletionDate<today);
  const attention=projects.filter(p=>ACTIVE_STATUSES.has(p.status)).map(p=>{const reasons=[];if(p.targetCompletionDate&&p.targetCompletionDate<today)reasons.push('Target completion date passed');if(Number(p.outstandingBalance||0)>0&&p.lastInvoiceStatus==='Overdue')reasons.push('Overdue balance');if(ageDays(p.intakeReceivedAt||p.createdAt)>30&&['Intake Received','Under Review'].includes(p.status))reasons.push('Intake/review aging over 30 days');return{projectNumber:p.projectNumber,workingTitle:p.workingTitle||'',status:p.status,priority:p.priority||'Normal',targetCompletionDate:p.targetCompletionDate||'',capacityWeight:capacityWeight(p),reasons}}).filter(x=>x.reasons.length).sort((a,b)=>priorityRank(b.priority)-priorityRank(a.priority)||a.projectNumber.localeCompare(b.projectNumber)).slice(0,50);
  const activePortals=portals.filter(p=>p.status==='Active'&&Date.parse(p.expiresAt)>Date.now()),verifiedPortals=activePortals.filter(p=>p.requireEmailVerification!==false),legacyPortals=activePortals.filter(p=>p.requireEmailVerification===false);
  return {generatedAt:new Date().toISOString(),projects:{total:projects.length,active:active.length,statusCounts,sourceCounts,referralCounts,priorityCounts,ageBuckets,workloadUnits,capacityLimit,capacityUtilization},billing:{totalInvoiced,paymentNetRecorded:paymentNet,outstanding,overdueInvoiceCount:overdueInvoices.length,overdueInvoices:overdueInvoices.map(i=>pickInvoice(i)).slice(0,50),cashflowByMonth:sortedRecent(cashflowByMonth,12)},deadlines:{overdueMilestones:overdueMilestones.map(pickMilestone).slice(0,50),dueNext7Days:due7.map(pickMilestone).slice(0,50),dueNext30Days:due30.map(pickMilestone).slice(0,100),overdueProjectTargets:overdueTargets.map(p=>pickProject(p)).slice(0,50)},security:{activePortals:activePortals.length,emailVerifiedPortals:verifiedPortals.length,legacyNoVerificationPortals:legacyPortals.length},attention};
}
function pickInvoice(i){return{projectNumber:i.projectNumber,invoiceId:i.invoiceId,title:i.title||'',status:i.status,dueDate:i.dueDate||'',currency:i.currency||'USD',balanceDue:Number(i.balanceDue||0)}}
function pickMilestone(m){return{projectNumber:m.projectNumber,milestoneId:m.milestoneId,title:m.title||'',status:m.status,dueDate:m.dueDate||'',clientVisible:Boolean(m.clientVisible)}}
function pickProject(p){return{projectNumber:p.projectNumber,workingTitle:p.workingTitle||'',status:p.status,targetCompletionDate:p.targetCompletionDate||'',priority:p.priority||'Normal'}}
function countBy(rows,fn){const out={};for(const r of rows){const k=String(fn(r)||'Unspecified').trim()||'Unspecified';out[k]=(out[k]||0)+1}return Object.fromEntries(Object.entries(out).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])))}
function capacityWeight(p){const n=Number(p.capacityWeight||1);return Number.isFinite(n)&&n>0?Math.min(5,Math.max(.5,n)):1}
function positiveNumber(v){const n=Number(v);return Number.isFinite(n)&&n>0?n:null}
function ageDays(v){const n=Date.parse(v||'');return Number.isFinite(n)?Math.max(0,Math.floor((Date.now()-n)/86400000)):0}
function dateOnly(d){return d.toISOString().slice(0,10)}
function daysBetween(a,b){const A=Date.parse(`${a}T00:00:00Z`),B=Date.parse(`${b}T00:00:00Z`);return Math.round((B-A)/86400000)}
function round(n){return Math.round((Number(n)||0)*100)/100}
function priorityRank(v){return({Urgent:4,High:3,Normal:2,Low:1})[v]||2}
function sortedRecent(obj,n){return Object.fromEntries(Object.entries(obj).sort((a,b)=>a[0].localeCompare(b[0])).slice(-n))}
