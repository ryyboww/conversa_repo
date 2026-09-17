import { createHmac, timingSafeEqual } from 'node:crypto';

const ALLOWED_KINDS = ['agreement','change_order','invoice','document_request','document_share','project_portal','project_portal_session'];

export function createEngagementToken({ secret, kind, recordId, projectNumber, recipientEmail, expiresAt }) {
  requireSecret(secret);
  if (!ALLOWED_KINDS.includes(kind)) throw new Error('Unsupported engagement token kind.');
  const payload = {
    v: 1,
    kind,
    recordId: clean(recordId, 140),
    projectNumber: clean(projectNumber, 100).toUpperCase(),
    recipientEmail: normalizeEmail(recipientEmail),
    exp: Math.floor(new Date(expiresAt).getTime() / 1000),
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

export function verifyEngagementToken(token, secret, expectedKind, now = new Date()) {
  requireSecret(secret);
  if (typeof token !== 'string' || token.length > 8192) return { ok:false, reason:'invalid' };
  const parts = token.split('.');
  if (parts.length !== 2) return { ok:false, reason:'invalid' };
  const [encoded, supplied] = parts;
  const expected = createHmac('sha256', secret).update(encoded).digest('base64url');
  if (!safeEqual(expected, supplied)) return { ok:false, reason:'invalid' };
  let payload;
  try { payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')); }
  catch { return { ok:false, reason:'invalid' }; }
  if (payload?.v !== 1 || !payload?.recordId || !payload?.projectNumber || !payload?.recipientEmail || !Number.isFinite(payload?.exp)) return { ok:false, reason:'invalid' };
  if (!ALLOWED_KINDS.includes(payload.kind)) return { ok:false, reason:'invalid' };
  if (expectedKind && payload.kind !== expectedKind) return { ok:false, reason:'wrong_kind' };
  if (payload.exp <= Math.floor(now.getTime()/1000)) return { ok:false, reason:'expired', payload };
  return { ok:true, payload };
}

export function safeEqual(a, b) {
  const left = Buffer.from(String(a ?? ''));
  const right = Buffer.from(String(b ?? ''));
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function requireSecret(secret) {
  if (!secret || secret.length < 32) throw new Error('CONVERA_ENGAGEMENT_TOKEN_SECRET must be at least 32 characters.');
}
function clean(value, max) { return typeof value === 'string' ? value.trim().slice(0,max) : ''; }
function normalizeEmail(value) { return typeof value === 'string' ? value.trim().toLowerCase() : ''; }
