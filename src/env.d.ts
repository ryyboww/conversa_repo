interface ImportMetaEnv {
  readonly PUBLIC_SUPPORT_PROVIDER_LABEL?: string;
  readonly PUBLIC_SUPPORT_ONE_TIME_URL?: string;
  readonly PUBLIC_SUPPORT_MONTHLY_URL?: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL?: string;
  readonly PUBLIC_CLIENT_PORTAL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
