import { sendTransactionalEmail } from './_shared/transactional-email.mjs';

const allowed = new Set(['website-contact','follow-the-work','client-intake']);
const clean = (value, max=500) => String(value ?? '').replace(/[\r\n]+/g,' ').trim().slice(0,max);

export default async function handler(req) {
  if (req.method !== 'POST') return new Response(null,{status:405,headers:{Allow:'POST'}});
  let payload; try { payload = await req.json(); } catch { return new Response(null,{status:400}); }
  const submission = payload?.payload?.data ? payload.payload : payload;
  const data = submission?.data || {};
  const form = clean(submission?.form_name || data['form-name'],80);
  if (!allowed.has(form)) return new Response(null,{status:204});
  const operator = process.env.CONVERA_OPERATOR_NOTIFICATION_EMAIL || '';
  const name = clean(data.name || data['full-name'],120) || 'Website visitor';
  const email = clean(data.email,254);
  const detail = form === 'website-contact' ? clean(data.message || data.inquiry,1200) : form === 'client-intake' ? clean(data.challenge,1200) : 'Follow-the-work request received.';
  const result = await sendTransactionalEmail({to:operator,subject:`Convera website: ${form}`,text:`Form: ${form}\nName: ${name}\nEmail: ${email || 'Not supplied'}\n\n${detail}`,replyTo:/^\S+@\S+\.\S+$/.test(email)?email:undefined});
  if (!result.ok) console.error('Form notification not sent',result.reason || result.status);
  return new Response(null,{status:204});
}
