const ENDPOINT = 'https://api.resend.com/emails';

export async function sendTransactionalEmail({ to, subject, text, replyTo }) {
  const key = Netlify.env.get('RESEND_API_KEY') || '';
  const from = Netlify.env.get('CONVERA_FROM_EMAIL') || '';
  const recipients = (Array.isArray(to) ? to : [to]).map(String).map(v => v.trim().toLowerCase()).filter(v => /^\S+@\S+\.\S+$/.test(v));
  if (!key || !from || !recipients.length) return { ok:false, reason:'email_not_configured' };
  const response = await fetch(ENDPOINT, {
    method:'POST',
    headers:{ Authorization:`Bearer ${key}`, 'Content-Type':'application/json' },
    body:JSON.stringify({ from, to:recipients, subject:String(subject).slice(0,200), text:String(text).slice(0,20000), ...(replyTo ? { reply_to:replyTo } : {}) })
  });
  return { ok:response.ok, status:response.status };
}
