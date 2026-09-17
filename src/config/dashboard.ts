const rawUrl = import.meta.env.PUBLIC_CLIENT_PORTAL_URL?.trim() ?? '';
const provider = import.meta.env.PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL?.trim() || 'Secure client portal';

export const clientDashboard = {
  url: rawUrl || null,
  provider,
  active: /^https:\/\//i.test(rawUrl)
} as const;
