const getEnv = (name) => globalThis.Netlify?.env?.get(name) ?? process.env[name];

const clean = (value, fallback = '') =>
  typeof value === 'string' && value.trim() ? value.trim() : fallback;

export default {
  async formSubmitted(event) {
    const data = event?.data ?? {};

    // Only the private Intake form has this combination of fields.
    if (!('challenge' in data) || !('desired-outcome' in data) || !('engagement' in data)) return;

    const siteUrl = clean(getEnv('URL'), 'https://converastrategies.com').replace(/\/$/, '');
    const secret = getEnv('NETLIFY_EMAILS_SECRET');
    const from = getEnv('CONVERA_FORM_FROM_EMAIL');
    const to = getEnv('CONVERA_INTAKE_NOTIFICATION_EMAIL');

    if (!secret || !from || !to) {
      console.error('Intake notification configuration is incomplete.');
      return;
    }

    const response = await fetch(`${siteUrl}/.netlify/functions/emails/intake-notification`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'netlify-emails-secret': secret
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New Convera client intake: ${clean(data.name, 'Prospective client')}`,
        parameters: {
          name: clean(data.name, 'Not provided'),
          email: clean(data.email, 'Not provided'),
          phone: clean(data.phone, 'Not provided'),
          preferredContact: clean(data['preferred-contact'], 'Not provided'),
          organization: clean(data.organization, 'Not provided'),
          role: clean(data.role, 'Not provided'),
          website: clean(data.website, 'Not provided'),
          engagement: clean(data.engagement, 'Not provided'),
          challenge: clean(data.challenge, 'Not provided'),
          desiredOutcome: clean(data['desired-outcome'], 'Not provided'),
          timing: clean(data.timing, 'Not provided'),
          budget: clean(data.budget, 'Not provided'),
          referralSource: clean(data['referral-source'], 'Not provided'),
          additionalContext: clean(data['additional-context'], 'Not provided')
        }
      })
    });

    if (!response.ok) {
      console.error('Intake notification failed.', {
        status: response.status,
        response: await response.text()
      });
    }
  }
};
