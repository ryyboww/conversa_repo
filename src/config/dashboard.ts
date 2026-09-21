const rawUrl = import.meta.env.PUBLIC_CLIENT_PORTAL_URL?.trim() ?? '';
const provider = import.meta.env.PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL?.trim() || 'Secure client portal';
const explicitlyEnabled = import.meta.env.PUBLIC_CLIENT_PORTAL_ENABLED?.trim().toLowerCase() === 'true';
const hasSecureUrl = /^https:\/\//i.test(rawUrl);

export const clientDashboard = {
  url: rawUrl || null,
  provider,
  configured: hasSecureUrl,
  active: explicitlyEnabled && hasSecureUrl
} as const;
