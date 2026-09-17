import { getStore } from '@netlify/blobs';
import { randomBytes } from 'node:crypto';
import { authorizeOperator, cleanText, getProject, json, logActivity, money, normalizeEmail, updateProject, validProjectNumber } from './project-admin.mjs';
import { computeReadiness, latestSignedAgreement, listRecords } from './engagement-admin.mjs';

export { authorizeOperator, cleanText, getProject, json, logActivity, money, normalizeEmail, updateProject, validProjectNumber };
export const INVOICE_STORE = 'convera-invoices';
export const PAYMENT_STORE = 'convera-payments';
export const DOCUMENT_META_STORE = 'convera-project-documents';
export const DOCUMENT_FILE_STORE = 'convera-project-files';
export const DOCUMENT_REQUEST_STORE = 'convera-document-requests';
export const INVOICE_STATUSES = ['Draft','Sent','Viewed','Partially Paid','Paid','Overdue','Void','Written Off'];
export const INVOICE_TYPES = ['Deposit','Milestone','Final','Other'];
export const PAYMENT_TYPES = ['Payment','Refund'];
export const DOCUMENT_VISIBILITIES = ['internal','client'];
export const DOCUMENT_CATEGORIES = ['Client Upload','Convera Deliverable','Agreement','Change Order','Invoice','Reference','Data','Other'];
export const MAX_NATIVE_DOCUMENT_BYTES = 4 * 1024 * 1024;
export const ALLOWED_DOCUMENT_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain','text/csv','image/png','image/jpeg'
]);

export function validInvoiceId(v){ return /^INV-[A-F0-9]{8}-\d{2,3}$/.test(String(v||'').toUpperCase()); }
export function validPaymentId(v){ return /^PAY-[A-F0-9]{8}-[A-F0-9]{8}$/.test(String(v||'').toUpperCase()); }
export function validDocumentId(v){ return /^DOC-[A-F0-9]{8}-[A-F0-9]{8}$/.test(String(v||'').toUpperCase()); }
export function validDocumentRequestId(v){ return /^DRQ-[A-F0-9]{8}-[A-F0-9]{8}$/.test(String(v||'').toUpperCase()); }
export function randomHex(bytes=4){ return randomBytes(bytes).toString('hex').toUpperCase(); }

export async function getInvoice(projectNumber, invoiceId){
  return getStore(INVOICE_STORE).get(`invoices/${projectNumber}/${invoiceId}`,{type:'json'});
}
export async function getDocumentMeta(projectNumber, documentId){
  return getStore(DOCUMENT_META_STORE).get(`documents/${projectNumber}/${documentId}`,{type:'json'});
}
export async function listPayments(projectNumber, invoiceId=''){
  const prefix=invoiceId?`payments/${projectNumber}/${invoiceId}/`:`payments/${projectNumber}/`;
  const rows=await listRecords(PAYMENT_STORE,prefix);
  return rows.sort((a,b)=>Date.parse(b.receivedAt||b.createdAt||0)-Date.parse(a.receivedAt||a.createdAt||0));
}
export async function paymentTotals(projectNumber, invoiceId){
  const rows=await listPayments(projectNumber,invoiceId);
  let paid=0,refunded=0;
  for(const p of rows){ if(p.type==='Refund') refunded+=Number(p.amount||0); else paid+=Number(p.amount||0); }
  return {payments:rows,paid:round(paid),refunded:round(refunded),net:round(paid-refunded)};
}
export async function refreshInvoiceStatus(projectNumber,invoiceId){
  const store=getStore(INVOICE_STORE); const key=`invoices/${projectNumber}/${invoiceId}`;
  const inv=await store.get(key,{type:'json'}); if(!inv)return null;
  if(['Void','Written Off'].includes(inv.status)) return inv;
  const totals=await paymentTotals(projectNumber,invoiceId); const total=Number(inv.total||0);
  let status=inv.status;
  if(totals.net>=total && total>0) status='Paid';
  else if(totals.net>0) status='Partially Paid';
  else if(inv.dueDate && Date.parse(inv.dueDate+'T23:59:59Z')<Date.now() && ['Sent','Viewed','Overdue'].includes(inv.status)) status='Overdue';
  const next={...inv,status,paidAmount:totals.net,balanceDue:round(Math.max(0,total-totals.net)),updatedAt:new Date().toISOString()};
  await store.setJSON(key,next);
  await updateProject(projectNumber,{lastInvoiceId:invoiceId,lastInvoiceStatus:status,outstandingBalance:next.balanceDue});
  if(inv.invoiceType==='Deposit') await syncDepositGate(projectNumber,next);
  return next;
}
export async function syncDepositGate(projectNumber,invoice){
  const project=await getProject(projectNumber); if(!project)return;
  const required=Number(project.depositRequiredAmount||invoice.total||0);
  const satisfied=invoice.status==='Paid' && Number(invoice.paidAmount||0)>=required;
  if(satisfied && project.depositStatus!=='Paid'){
    await updateProject(projectNumber,{depositStatus:'Paid'});
    const readiness=await computeReadiness(projectNumber);
    if(readiness) await updateProject(projectNumber,{engagementReady:readiness.ready,engagementReadyAt:readiness.ready?(project.engagementReadyAt||new Date().toISOString()):null,...(readiness.ready?{nextAction:'Schedule project start / kickoff.'}:{})});
    await logActivity(projectNumber,'deposit_gate_cleared',`Deposit/payment prerequisite satisfied through ${invoice.invoiceId}.`,{invoiceId:invoice.invoiceId,amount:invoice.paidAmount});
  }
}
export async function canIssueInvoice(projectNumber){
  const agreement=await latestSignedAgreement(projectNumber);
  return {ok:Boolean(agreement),agreement};
}
export function publicInvoice(r){
  return {projectNumber:r.projectNumber,invoiceId:r.invoiceId,invoiceType:r.invoiceType,status:r.status,title:r.title,clientName:r.clientName,clientOrganization:r.clientOrganization,issueDate:r.issueDate,dueDate:r.dueDate,currency:r.currency,lineItems:r.lineItems,subtotal:r.subtotal,taxAmount:r.taxAmount,adjustmentAmount:r.adjustmentAmount,total:r.total,paidAmount:r.paidAmount||0,balanceDue:r.balanceDue??r.total,paymentTerms:r.paymentTerms,paymentInstructions:r.paymentInstructions,hostedPaymentUrl:r.hostedPaymentUrl||'',externalInvoiceReference:r.externalInvoiceReference||'',sentAt:r.sentAt,viewedAt:r.viewedAt};
}
export function safeFilename(value){
  const base=String(value||'document').replace(/[^A-Za-z0-9._ -]/g,'_').replace(/\s+/g,' ').trim().slice(0,160);
  return base || 'document';
}
export function round(n){ return Math.round((Number(n)||0)*100)/100; }
export function validateLineItems(items){
  if(!Array.isArray(items)||items.length<1||items.length>30)return {error:'At least one and no more than 30 line items are required.'};
  const clean=[]; let subtotal=0;
  for(const item of items){
    const description=cleanText(item?.description,500); const quantity=Number(item?.quantity??1); const unitPrice=money(item?.unitPrice);
    if(!description||!Number.isFinite(quantity)||quantity<=0||quantity>100000||unitPrice===null)return {error:'Each line item requires a description, positive quantity, and valid unit price.'};
    const amount=round(quantity*unitPrice); subtotal=round(subtotal+amount); clean.push({description,quantity:round(quantity),unitPrice,amount});
  }
  return {items:clean,subtotal};
}
