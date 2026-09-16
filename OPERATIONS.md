# Convera Strategies — Launch Operations

## Inquiry routing

Convera separates three visitor pathways:

1. **Paid professional work** → `/work-with-convera/` → Netlify form `work-with-convera` → `/work-with-convera/thank-you/`
2. **General/community correspondence** → `/contact/` → Netlify form `website-contact` → `/thank-you/`
3. **Voluntary support** → `/support/` → external hosted checkout when configured → `/support/thank-you/` where supported

This separation is intentional. Paid services should not be presented as contributions, and contributions should not imply purchase of professional services.

## Mailboxes

- `ryan@converastrategies.com` — founder and direct professional correspondence
- `hello@converastrategies.com` — general website/public inquiries
- `help@converastrategies.com` — visitor and client support questions
- `admin@converastrategies.com` — private operational/vendor administration

## Netlify forms to verify after first deployment

- `website-contact`
- `work-with-convera`
- `convera-newsletter` only after the newsletter feature is enabled

Set form-submission notifications to an appropriate Convera mailbox. Keep `admin@` private unless an operational need requires publishing it.

## Contribution configuration

Copy `.env.example` to `.env` locally and set:

- `PUBLIC_SUPPORT_ONE_TIME_URL`
- `PUBLIC_SUPPORT_MONTHLY_URL`
- `PUBLIC_SUPPORT_PROVIDER_LABEL`

Use hosted checkout/payment pages. Do not place secret payment keys in a `PUBLIC_` variable or browser-delivered Astro code.

## Audit commands

- `npm run audit` — relative-import and required-asset audit
- `npm run forms:audit` — Netlify form structure and success-route audit
- `npm run content:audit` — placeholder and visible legacy-brand audit
- `npm run launch:audit` — dependency-free site readiness audit
- `npm run predeploy` — reports external production settings still missing locally
- `npm run launch:final` — runs all dependency-free final launch checks
- `npm run launch:strict` — fails when required files or contribution configuration are missing
- `npm run build` — full Astro production build after dependencies are installed

## Launch operations documents

- `FINAL-HANDOFF.md` — locked public direction
- `LAUNCH-ACTIVATION.md` — go-live order
- `SUPPORT-ACTIVATION.md` — hosted checkout and contribution boundaries
- `PRE-LAUNCH-QA.md` — production testing
- `LAUNCH-CHECKLIST.md` — final release checklist
