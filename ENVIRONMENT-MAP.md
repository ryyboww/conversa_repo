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


## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
