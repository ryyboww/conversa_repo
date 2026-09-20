const getEnv = (name) => globalThis.Netlify?.env?.get(name) ?? process.env[name];

const clean = (value, fallback = '') => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean).join(', ') || fallback;
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
};

export default {
  async formSubmitted(event) {
    const data = event?.data ?? {};

    // Only the Follow the Work form has both first_name and interests.
    if (!('first_name' in data) || !('interests' in data) || !('consent' in data)) return;

    const siteUrl = clean(getEnv('URL'), 'https://converastrategies.com').replace(/\/$/, '');
    const secret = getEnv('NETLIFY_EMAILS_SECRET');
    const from = getEnv('CONVERA_FORM_FROM_EMAIL');
    const to = getEnv('CONVERA_FORM_NOTIFICATION_EMAIL');

    if (!secret || !from || !to) {
      console.error('Follow notification configuration is incomplete.');
      return;
    }

    const response = await fetch(`${siteUrl}/.netlify/functions/emails/follow-notification`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'netlify-emails-secret': secret
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New Follow the Work request: ${clean(data.email, 'Website visitor')}`,
        parameters: {
          firstName: clean(data.first_name, 'Not provided'),
          email: clean(data.email, 'Not provided'),
          interests: clean(data.interests, 'No interests selected'),
          consent: clean(data.consent, 'Not recorded')
        }
      })
    });

    if (!response.ok) {
      console.error('Follow notification failed.', {
        status: response.status,
        response: await response.text()
      });
    }
  }
};
