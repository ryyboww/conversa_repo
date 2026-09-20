# Convera Strategies — Launch Operations

## Inquiry routing

Convera separates public correspondence, invitation-only Intake, and voluntary support.

1. **Prospective professional work** → `/work-with-convera/` for orientation → `/contact/?reason=professional` → Netlify form `website-contact` → manual review → direct private Intake invitation when appropriate → `/intake/` → Netlify form `client-intake` → `/intake/thank-you/`
2. **General/community correspondence** → `/contact/` → Netlify form `website-contact` → `/thank-you/`
3. **Follow the work** → `/follow/` → Netlify form `follow-the-work` → `/follow/thank-you/`
4. **Voluntary support** → `/support/` → external hosted checkout when configured → `/support/thank-you/` where supported

The Contact form and private Intake form are intentionally separate. Intake is sent directly after manual Contact review; it is not linked in public navigation. Paid services must not be presented as contributions, and contributions must not imply purchase of professional services.

## Mailboxes

- `ryan@converastrategies.com` — founder and direct professional correspondence
- `hello@converastrategies.com` — general website/public inquiries and Contact notifications
- `help@converastrategies.com` — visitor and client support questions
- `admin@converastrategies.com` — private operational/vendor administration
- `billing@converastrategies.com` — billing correspondence

## Netlify forms to verify after deployment

- `website-contact`
- `follow-the-work`
- `client-intake` — operator/admin test only; private invitation route
- `convera-newsletter` — only when the newsletter feature is intentionally enabled

Use `FORM-NOTIFICATIONS.md` for recommended notification routing.

## Security boundary

Do not store mailbox credentials, payment secrets, client records, confidential documents, authentication tokens, or other secrets in the static Astro source or `PUBLIC_*` environment variables.

## Audit commands

- `npm run audit` — relative-import and required-asset audit
- `npm run forms:audit` — Netlify form structure and success-route audit
- `npm run content:audit` — placeholder and visible legacy-brand audit
- `npm run release:audit` — complete dependency-free publication-source suite
- `npm run privacy:audit` — source privacy/exposure checks
- `npm run verify:2.56` — release-specific workflow coherence verification
- `npm run check` — Astro/TypeScript diagnostics after dependencies are installed
- `npm run build:verify` — production build plus built-output audit
- `npm run live:audit -- https://converastrategies.com` — deployed-site verification

<<<<<<< HEAD
## Launch operations documents

- `FINAL-HANDOFF.md` — locked public direction
- `LAUNCH-ACTIVATION.md` — go-live order
- `SUPPORT-ACTIVATION.md` — hosted checkout and contribution boundaries
- `PRE-LAUNCH-QA.md` — production testing
- `LAUNCH-CHECKLIST.md` — final release checklist


## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
The final operational gate is `npm run deploy:gate` after external systems and real-world QA are complete.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
