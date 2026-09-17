import { getStore } from '@netlify/blobs';
import { randomBytes } from 'node:crypto';
import { authorizeOperator, cleanText, getProject, json, logActivity, normalizeEmail, updateProject, validProjectNumber } from './project-admin.mjs';
import { AGREEMENT_STORE, CHANGE_ORDER_STORE, ESTIMATE_STORE, computeReadiness, listRecords } from './engagement-admin.mjs';
import { DOCUMENT_META_STORE, INVOICE_STORE, publicInvoice } from './billing-admin.mjs';

export { authorizeOperator, cleanText, getProject, json, logActivity, normalizeEmail, updateProject, validProjectNumber };
export const PORTAL_STORE='convera-client-portals';
export const MILESTONE_STORE='convera-project-milestones';
export const CLOSEOUT_STORE='convera-project-closeout';
export const REMINDER_STORE='convera-project-reminders';
export const MILESTONE_STATUSES=['Planned','In Progress','Waiting on Client','Completed','Cancelled'];
export const CLOSEOUT_STATUSES=['Not Started','In Progress','Ready to Archive','Archived'];

export function randomHex(bytes=4){return randomBytes(bytes).toString('hex').toUpperCase()}
export function validPortalId(v){return /^PRT-[A-F0-9]{8}-[A-F0-9]{8}$/.test(String(v||'').toUpperCase())}
export function validMilestoneId(v){return /^MS-[A-F0-9]{8}-\d{2,3}$/.test(String(v||'').toUpperCase())}
export function dateOnly(value){const s=cleanText(value,30);return /^\d{4}-\d{2}-\d{2}$/.test(s)?s:''}
export function safeExternalUrl(value){try{const u=new URL(String(value||''));return ['https:','http:'].includes(u.protocol)?u.toString():''}catch{return ''}}
export async function listMilestones(projectNumber){const rows=await listRecords(MILESTONE_STORE,`milestones/${projectNumber}/`);return rows.sort((a,b)=>(a.dueDate||'9999').localeCompare(b.dueDate||'9999')||Date.parse(a.createdAt)-Date.parse(b.createdAt))}
export async function getCloseout(projectNumber){return getStore(CLOSEOUT_STORE).get(`closeout/${projectNumber}`,{type:'json'})}
export async function listPortals(projectNumber){const rows=await listRecords(PORTAL_STORE,`portals/${projectNumber}/`);return rows.sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt))}
export async function listInvoices(projectNumber){const rows=await listRecords(INVOICE_STORE,`invoices/${projectNumber}/`);return rows.sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt))}
export async function listDocuments(projectNumber){const rows=await listRecords(DOCUMENT_META_STORE,`documents/${projectNumber}/`);return rows.sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt))}
export async function clientSafeSnapshot(projectNumber){
  const project=await getProject(projectNumber); if(!project)return null;
  const [estimates,agreements,changeOrders,invoices,documents,milestones,closeout]=await Promise.all([
    listRecords(ESTIMATE_STORE,`estimates/${projectNumber}/`),listRecords(AGREEMENT_STORE,`agreements/${projectNumber}/`),listRecords(CHANGE_ORDER_STORE,`change-orders/${projectNumber}/`),listInvoices(projectNumber),listDocuments(projectNumber),listMilestones(projectNumber),getCloseout(projectNumber)
  ]);
  const latest=(rows,field='version')=>rows.slice().sort((a,b)=>Number(b[field]||0)-Number(a[field]||0))[0]||null;
  const estimate=latest(estimates); const agreement=latest(agreements); const changeOrder=latest(changeOrders);
  return {
    project:{projectNumber:project.projectNumber,workingTitle:project.workingTitle||'',status:project.status||'',organization:project.organization||'',serviceArea:project.serviceArea||'',nextClientAction:project.clientPortalNextAction||''},
    estimate:estimate?{estimateId:estimate.estimateId,status:estimate.status,title:estimate.title||'',pricingModel:estimate.pricingModel||'',currency:estimate.currency||'USD',displayPrice:estimate.displayPrice||estimate.fixedFee||estimate.rangeLow||''}:null,
    agreement:agreement?{agreementId:agreement.agreementId,status:agreement.status,title:agreement.title||'',agreementSource:agreement.agreementSource||'convera',externalSignatureUrl:safeExternalUrl(agreement.externalSignatureUrl),clientSignedAt:agreement.clientSignedAt||null,converaSignedAt:agreement.converaSignedAt||null,signedDocumentReference:agreement.signedDocumentReference||''}:null,
    changeOrder:changeOrder?{changeOrderId:changeOrder.changeOrderId,status:changeOrder.status,title:changeOrder.title||'',agreementId:changeOrder.agreementId||'',externalSignatureUrl:safeExternalUrl(changeOrder.externalSignatureUrl),clientSignedAt:changeOrder.clientSignedAt||null,converaSignedAt:changeOrder.converaSignedAt||null,signedDocumentReference:changeOrder.signedDocumentReference||''}:null,
    invoices:invoices.filter(i=>!['Draft','Void','Written Off'].includes(i.status)).map(i=>{const x=publicInvoice(i);return {...x,hostedPaymentUrl:safeExternalUrl(x.hostedPaymentUrl)}}),
    documents:documents.filter(d=>d.visibility==='client').map(d=>({documentId:d.documentId,originalName:d.originalName,category:d.category,description:d.description||'',sizeBytes:d.sizeBytes,createdAt:d.createdAt})),
    milestones:milestones.filter(m=>m.clientVisible&&m.status!=='Cancelled').map(m=>({milestoneId:m.milestoneId,title:m.title,status:m.status,dueDate:m.dueDate||'',description:m.clientDescription||''})),
    closeout:closeout?{status:closeout.status,finalDeliverableAcknowledgmentEnabled:Boolean(closeout.finalDeliverableAcknowledgmentEnabled),clientDeliverableAcknowledgedAt:closeout.clientDeliverableAcknowledgedAt||null,completionDate:closeout.completionDate||null}:null,
  };
}
export async function commandSnapshot(projectNumber){
  const project=await getProject(projectNumber);if(!project)return null;
  const [readiness,estimates,agreements,changeOrders,invoices,documents,milestones,portals,closeout]=await Promise.all([
    computeReadiness(projectNumber),listRecords(ESTIMATE_STORE,`estimates/${projectNumber}/`),listRecords(AGREEMENT_STORE,`agreements/${projectNumber}/`),listRecords(CHANGE_ORDER_STORE,`change-orders/${projectNumber}/`),listInvoices(projectNumber),listDocuments(projectNumber),listMilestones(projectNumber),listPortals(projectNumber),getCloseout(projectNumber)
  ]);
  return {project,readiness,counts:{estimates:estimates.length,agreements:agreements.length,changeOrders:changeOrders.length,invoices:invoices.length,documents:documents.length,milestones:milestones.length},latest:{estimate:estimates.sort((a,b)=>Number(b.version||0)-Number(a.version||0))[0]||null,agreement:agreements.sort((a,b)=>Number(b.version||0)-Number(a.version||0))[0]||null,changeOrder:changeOrders.sort((a,b)=>Number(b.version||0)-Number(a.version||0))[0]||null,invoice:invoices[0]||null},milestones,portals,closeout};
}
