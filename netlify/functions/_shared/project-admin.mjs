import { getStore } from '@netlify/blobs';
import { safeEqual } from './estimate-token.mjs';

export const PROJECT_STORE = 'convera-projects';
export const ESTIMATE_STORE = 'convera-estimates';
export const ACTIVITY_STORE = 'convera-project-activity';
export const ESTIMATE_STATUSES = ['Draft', 'Sent', 'Viewed', 'Accepted', 'Revision Requested', 'Declined', 'Expired', 'Superseded'];
export const PRICING_MODELS = ['fixed', 'range', 'time_based'];

export function authorizeOperator(req) {
  const configured = process.env.CONVERA_OPERATOR_KEY || '';
  const supplied = req.headers.get('x-convera-operator-key') || '';
  return Boolean(configured && safeEqual(configured, supplied));
}
export function validProjectNumber(value) {
  return /^CVR-\d{4}-[A-F0-9]{8}$/.test(String(value || '').toUpperCase()) || /^[A-Z0-9]{2,8}-\d{4}-[A-F0-9]{8}$/.test(String(value || '').toUpperCase());
}
export function cleanText(value, max = 1000) { return typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim().slice(0, max) : ''; }
export function normalizeEmail(value) { return typeof value === 'string' ? value.trim().toLowerCase() : ''; }
export function escapeHtml(value) { return String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
export function json(body, status = 200, extraHeaders = {}) {
  return new Response(body === null ? null : JSON.stringify(body), { status, headers: { 'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff', ...extraHeaders } });
}
export function money(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || n > 100000000) return null;
  return Math.round(n * 100) / 100;
}
export async function getProject(projectNumber) {
  const store = getStore(PROJECT_STORE);
  return store.get(`projects/${String(projectNumber).toUpperCase()}`, { type:'json' });
}
export async function updateProject(projectNumber, patch) {
  const store = getStore(PROJECT_STORE);
  const key = `projects/${String(projectNumber).toUpperCase()}`;
  const current = await store.get(key, { type:'json' });
  if (!current) return null;
  const next = { ...current, ...patch, updatedAt:new Date().toISOString() };
  await store.setJSON(key, next);
  return next;
}
export async function logActivity(projectNumber, type, summary, metadata = {}) {
  const store = getStore(ACTIVITY_STORE);
  const now = new Date().toISOString();
  const id = `${now.replace(/[:.]/g,'-')}-${Math.random().toString(36).slice(2,9)}`;
  const record = { id, projectNumber:String(projectNumber).toUpperCase(), type:cleanText(type,80), summary:cleanText(summary,500), metadata, createdAt:now };
  await store.setJSON(`activity/${record.projectNumber}/${id}`, record, { onlyIfNew:true });
  return record;
}
export async function listActivity(projectNumber, limit = 50) {
  const store = getStore(ACTIVITY_STORE);
  const listing = await store.list({ prefix:`activity/${String(projectNumber).toUpperCase()}/` });
  const rows = await Promise.all(listing.blobs.map(b => store.get(b.key, { type:'json' })));
  return rows.filter(Boolean).sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt)).slice(0, limit);
}
