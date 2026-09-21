# Environment Variable Map

## Public build variables

These values are consumed by the static Astro build and may become visible in generated site output.

| Variable | Required for launch | Purpose |
| --- | --- | --- |
| `PUBLIC_SUPPORT_PROVIDER_LABEL` | Yes | Human-readable payment provider label. |
| `PUBLIC_SUPPORT_ONE_TIME_URL` | Yes | Hosted one-time contribution checkout URL. |
| `PUBLIC_SUPPORT_MONTHLY_URL` | Yes | Hosted recurring contribution checkout URL. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible analytics when configured. |
| `PUBLIC_CLIENT_PORTAL_ENABLED` | No | Explicitly activates the external client-portal handoff only when set to `true`. |
| `PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL` | No | Human-readable label for the authenticated portal provider. |
| `PUBLIC_CLIENT_PORTAL_URL` | No | HTTPS URL for the authenticated client portal. |

Do not place secret keys, API secrets, mailbox passwords, payment credentials, or private tokens in `PUBLIC_*` values.

The client portal remains inactive unless `PUBLIC_CLIENT_PORTAL_ENABLED=true` and `PUBLIC_CLIENT_PORTAL_URL` is a valid HTTPS URL. Configure the provider label and URL first, confirm authentication and access controls outside the public site, then make the separate activation decision. The switch does not make `/intake/` public and does not replace the Contact → manual review → direct invitation workflow.

## Operational verification variables

These values belong only in `.env.operations`. They are local launch records and are gitignored.

- `OPS_RYAN_MAIL_VERIFIED`
- `OPS_HELLO_MAIL_VERIFIED`
- `OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE`
- `OPS_PRODUCTION_DEPLOYED`
- `OPS_CANONICAL_DOMAIN_VERIFIED`
- `OPS_SSL_VERIFIED`
- `OPS_NETLIFY_FORMS_VERIFIED`
- `OPS_FORM_NOTIFICATIONS_VERIFIED`
- `OPS_SUPPORT_FLOW_VERIFIED`
- `OPS_BROWSER_QA_VERIFIED`
- `OPS_MOBILE_QA_VERIFIED`
- `OPS_SOCIAL_SHARE_VERIFIED`

They must reflect completed tests, not planned work.


## 2.56.0 client operations note

Launch email verification covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. Professional inquiries begin through the public Contact pathway. The `/intake/` route (`client-intake` in Netlify) is private/noindex and is used only after manual review and a direct Intake invitation. The `/dashboard/` route remains a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
