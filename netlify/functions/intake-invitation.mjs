import { timingSafeEqual } from 'node:crypto';

const getEnv = (name) => globalThis.Netlify?.env?.get(name) ?? process.env[name];
const cleanText = (value, max = 1000) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const normalizeEmail = (value) => cleanText(value, 254).toLowerCase();
const json = (body, status = 200, extraHeaders = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extraHeaders }
});
const authorizeOperator = (req) => {
  const configured = getEnv('CONVERA_OPERATOR_KEY') ?? '';
  const supplied = req.headers.get('x-convera-operator-key') ?? '';
  if (!configured || configured.length !== supplied.length) return false;
  return timingSafeEqual(Buffer.from(configured), Buffer.from(supplied));
};

export default async function handler(req) {
  if (!authorizeOperator(req)) return json({ error: 'Unauthorized.' }, 401);
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, { Allow: 'POST' });

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON request body.' }, 400);
  }

  const recipientEmail = normalizeEmail(body?.recipientEmail);
  const recipientName = cleanText(body?.recipientName, 120);
  const note = cleanText(body?.note, 1500);
  if (!/^\S+@\S+\.\S+$/.test(recipientEmail)) return json({ error: 'Valid recipient email required.' }, 400);

  const siteUrl = cleanText(getEnv('URL'), 'https://converastrategies.com').replace(/\/$/, '');
  const secret = getEnv('NETLIFY_EMAILS_SECRET');
  const from = getEnv('CONVERA_FORM_FROM_EMAIL');
  if (!secret || !from) return json({ error: 'Intake invitation email configuration is incomplete.' }, 503);

  const response = await fetch(`${siteUrl}/.netlify/functions/emails/intake-invitation`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'netlify-emails-secret': secret
    },
    body: JSON.stringify({
      from,
      to: recipientEmail,
      subject: 'Private client intake invitation from Convera Strategies',
      parameters: {
        recipientName: recipientName || 'there',
        note: note || 'Following our initial correspondence, you are invited to provide additional project context through Convera Strategies’ private intake form.',
        intakeUrl: `${siteUrl}/intake/`
      }
    })
  });

  if (!response.ok) {
    console.error('Intake invitation failed.', { status: response.status, response: await response.text() });
    return json({ error: 'Postmark did not accept the intake invitation.' }, 502);
  }

  return json({ ok: true, message: `Intake invitation sent to ${recipientEmail}.` });
}
