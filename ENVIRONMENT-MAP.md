# Environment Variable Map

## Public build variables

These values are consumed by the static Astro build and may become visible in generated site output.

| Variable | Required for launch | Purpose |
| --- | --- | --- |
| `PUBLIC_SUPPORT_PROVIDER_LABEL` | Yes | Human-readable payment provider label. |
| `PUBLIC_SUPPORT_ONE_TIME_URL` | Yes | Hosted one-time contribution checkout URL. |
| `PUBLIC_SUPPORT_MONTHLY_URL` | Yes | Hosted recurring contribution checkout URL. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible analytics when configured. |

Do not place secret keys, API secrets, mailbox passwords, payment credentials, or private tokens in `PUBLIC_*` values.

## Operational verification variables

These values belong only in `.env.operations`. They are local launch records and are gitignored.

- `OPS_RYAN_MAIL_VERIFIED`
- `OPS_HELLO_MAIL_VERIFIED`
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


<<<<<<< HEAD
## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
## 2.56.0 client operations note

Launch email verification covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. Professional inquiries begin through the public Contact pathway. The `/intake/` route (`client-intake` in Netlify) is private/noindex and is used only after manual review and a direct Intake invitation. The `/dashboard/` route remains a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
