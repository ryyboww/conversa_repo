import { createHmac, timingSafeEqual } from 'node:crypto';

export function createEstimateToken({ secret, estimateId, projectNumber, recipientEmail, expiresAt }) {
  requireSecret(secret);
  const payload = {
    v: 1,
    estimateId: clean(estimateId, 100),
    projectNumber: clean(projectNumber, 100).toUpperCase(),
    recipientEmail: normalizeEmail(recipientEmail),
    exp: Math.floor(new Date(expiresAt).getTime() / 1000),
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

export function verifyEstimateToken(token, secret, now = new Date()) {
  requireSecret(secret);
  if (typeof token !== 'string' || token.length > 8192) return { ok: false, reason: 'invalid' };
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'invalid' };
  const [encoded, suppliedSignature] = parts;
  const expectedSignature = createHmac('sha256', secret).update(encoded).digest('base64url');
  if (!safeEqual(expectedSignature, suppliedSignature)) return { ok: false, reason: 'invalid' };

  let payload;
  try { payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')); }
  catch { return { ok: false, reason: 'invalid' }; }

  if (payload?.v !== 1 || !payload?.estimateId || !payload?.projectNumber || !payload?.recipientEmail || !Number.isFinite(payload?.exp)) {
    return { ok: false, reason: 'invalid' };
  }
  if (payload.exp <= Math.floor(now.getTime() / 1000)) return { ok: false, reason: 'expired', payload };
  return { ok: true, payload };
}

export function safeEqual(expected, supplied) {
  const a = Buffer.from(String(expected ?? ''));
  const b = Buffer.from(String(supplied ?? ''));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function requireSecret(secret) {
  if (!secret || secret.length < 32) throw new Error('CONVERA_ESTIMATE_TOKEN_SECRET must be at least 32 characters.');
}
function normalizeEmail(value) { return typeof value === 'string' ? value.trim().toLowerCase() : ''; }
function clean(value, max) { return typeof value === 'string' ? value.trim().slice(0, max) : ''; }
