import { getStore } from '@netlify/blobs';
import { authorizeOperator, cleanText, getProject, json, logActivity, normalizeEmail, updateProject, validProjectNumber } from './project-admin.mjs';

export { authorizeOperator, cleanText, getProject, json, logActivity, normalizeEmail, updateProject, validProjectNumber };
export const AGREEMENT_STORE = 'convera-agreements';
export const CHANGE_ORDER_STORE = 'convera-change-orders';
export const ESTIMATE_STORE = 'convera-estimates';
export const AGREEMENT_STATUSES = ['Draft','Sent','Viewed','Changes Requested','Awaiting Signature','Partially Signed','Signed','Declined','Superseded'];
export const CHANGE_ORDER_STATUSES = ['Draft','Sent','Viewed','Changes Requested','Awaiting Signature','Partially Signed','Signed','Declined','Superseded'];
export const GATE_STATUSES = ['Not Required','Pending','Cleared','Waived'];
export const DEPOSIT_STATUSES = ['Not Required','Pending','Paid','Waived'];

export function validAgreementId(value) { return /^AGR-[A-F0-9]{8}-\d{2,3}$/.test(String(value||'').toUpperCase()); }
export function validChangeOrderId(value) { return /^CO-[A-F0-9]{8}-\d{2,3}$/.test(String(value||'').toUpperCase()); }

export async function listRecords(storeName, prefix) {
  const store = getStore(storeName);
  const listing = await store.list({ prefix });
  const rows = await Promise.all(listing.blobs.map(b => store.get(b.key, { type:'json' })));
  return rows.filter(Boolean);
}

export async function latestSignedAgreement(projectNumber) {
  const rows = await listRecords(AGREEMENT_STORE, `agreements/${projectNumber}/`);
  return rows.filter(r => r.status === 'Signed').sort((a,b)=>Number(b.version)-Number(a.version))[0] || null;
}

export async function computeReadiness(projectNumber) {
  const project = await getProject(projectNumber);
  if (!project) return null;
  const agreement = await latestSignedAgreement(projectNumber);
  const conflictReview = project.conflictReview || 'Pending';
  const dataSensitivityReview = project.dataSensitivityReview || 'Pending';
  const depositStatus = project.depositStatus || 'Not Required';
  const clientPrerequisiteStatus = project.clientPrerequisiteStatus || 'Not Required';
  const blockers = [];
  if (!agreement) blockers.push('Signed Project Agreement required.');
  if (!['Cleared','Not Required','Waived'].includes(conflictReview)) blockers.push('Conflict review is not cleared.');
  if (!['Cleared','Not Required','Waived'].includes(dataSensitivityReview)) blockers.push('Data-sensitivity review is not cleared.');
  if (!['Paid','Not Required','Waived'].includes(depositStatus)) blockers.push('Required deposit/payment prerequisite is not satisfied.');
  if (!['Cleared','Not Required','Waived'].includes(clientPrerequisiteStatus)) blockers.push(project.clientPrerequisiteLabel ? `${project.clientPrerequisiteLabel} is not satisfied.` : 'Client prerequisite is not satisfied.');
  return {
    ready: blockers.length === 0,
    blockers,
    signedAgreementId: agreement?.agreementId || null,
    conflictReview,
    dataSensitivityReview,
    depositStatus,
    depositRequiredAmount: Number(project.depositRequiredAmount || 0),
    clientPrerequisiteLabel: project.clientPrerequisiteLabel || '',
    clientPrerequisiteStatus,
  };
}

export function publicAgreement(record) {
  return {
    projectNumber:record.projectNumber, agreementId:record.agreementId, version:record.version, status:record.status,
    title:record.title, agreementSource:record.agreementSource||'convera', clientSuppliedReference:record.clientSuppliedReference||'', clientName:record.clientName, clientOrganization:record.clientOrganization,
    effectiveDate:record.effectiveDate, sourceEstimateId:record.sourceEstimateId,
    scopeSummary:record.scopeSummary, deliverablesSummary:record.deliverablesSummary,
    feesSummary:record.feesSummary, paymentTerms:record.paymentTerms, depositRequired:record.depositRequired,
    depositAmount:record.depositAmount, expenses:record.expenses, clientResponsibilities:record.clientResponsibilities,
    converaResponsibilities:record.converaResponsibilities, confidentiality:record.confidentiality,
    intellectualProperty:record.intellectualProperty, termination:record.termination,
    changeControl:record.changeControl, governingLaw:record.governingLaw, specialTerms:record.specialTerms,
    approvedTerms:record.approvedTerms, externalSignatureUrl:record.externalSignatureUrl || '',
    publicTokenExpiresAt:record.publicTokenExpiresAt, sentAt:record.sentAt, viewedAt:record.viewedAt,
    clientSignedAt:record.clientSignedAt, converaSignedAt:record.converaSignedAt,
    signedDocumentReference:record.signedDocumentReference || '',
  };
}

export function publicChangeOrder(record) {
  return {
    projectNumber:record.projectNumber, changeOrderId:record.changeOrderId, version:record.version, status:record.status,
    agreementId:record.agreementId, title:record.title, reason:record.reason, scopeAdditions:record.scopeAdditions,
    scopeRemovals:record.scopeRemovals, feeAdjustment:record.feeAdjustment, timelineAdjustment:record.timelineAdjustment,
    paymentAdjustment:record.paymentAdjustment, effectiveImpact:record.effectiveImpact, approvedTerms:record.approvedTerms,
    externalSignatureUrl:record.externalSignatureUrl || '', publicTokenExpiresAt:record.publicTokenExpiresAt,
    sentAt:record.sentAt, viewedAt:record.viewedAt, clientSignedAt:record.clientSignedAt,
    converaSignedAt:record.converaSignedAt, signedDocumentReference:record.signedDocumentReference || '',
  };
}
