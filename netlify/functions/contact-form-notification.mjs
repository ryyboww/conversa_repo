const getEnv = (name) => globalThis.Netlify?.env?.get(name) ?? process.env[name];

const clean = (value, fallback = '') =>
  typeof value === 'string' && value.trim() ? value.trim() : fallback;

export default {
  async formSubmitted(event) {
    const data = event?.data ?? {};

    // Only the public Contact form has this combination of fields.
    if (!('subject' in data) || !('message' in data) || !('reason' in data)) return;

    const siteUrl = clean(getEnv('URL'), 'https://converastrategies.com').replace(/\/$/, '');
    const secret = getEnv('NETLIFY_EMAILS_SECRET');
    const from = getEnv('CONVERA_FORM_FROM_EMAIL');
    const to = getEnv('CONVERA_CONTACT_NOTIFICATION_EMAIL') || getEnv('CONVERA_FORM_NOTIFICATION_EMAIL');

    if (!secret || !from || !to) {
      console.error('Contact notification configuration is incomplete.');
      return;
    }

    const response = await fetch(
      `${siteUrl}/.netlify/functions/emails/contact-notification`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'netlify-emails-secret': secret
        },
        body: JSON.stringify({
          from,
          to,
          subject: `New Convera inquiry: ${clean(data.subject, 'Website contact')}`,
          parameters: {
            name: clean(data.name, 'Not provided'),
            email: clean(data.email, 'Not provided'),
            organization: clean(data.organization, 'Not provided'),
            reason: clean(data.reason, 'Not provided'),
            inquirySubject: clean(data.subject, 'Not provided'),
            message: clean(data.message, 'Not provided')
          }
        })
      }
    );

    if (!response.ok) {
      console.error('Contact notification failed.', {
        status: response.status,
        response: await response.text()
      });
    }
  }
};
