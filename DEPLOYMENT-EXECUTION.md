<<<<<<< HEAD
# Deployment Execution Sequence — Convera Strategies 2.14.0
=======
# Deployment Execution Sequence — Convera Strategies 2.56.0
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

Use this sequence after GitHub and Netlify are connected.

## Phase 1 — Repository verification

```bash
npm install --no-audit --no-fund
npm run verify
```

Do not deploy if `verify` fails.

## Phase 2 — Configure public build values

```bash
npm run activation:init
npm run config:set -- PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
npm run config:set -- PUBLIC_SUPPORT_ONE_TIME_URL=https://...
npm run config:set -- PUBLIC_SUPPORT_MONTHLY_URL=https://...
```

If Plausible is used:

```bash
npm run config:set -- PUBLIC_PLAUSIBLE_DOMAIN=converastrategies.com
```

Do not place secret keys in any `PUBLIC_*` variable.

## Phase 3 — First Netlify deployment

Expected build settings are already stored in `netlify.toml`.

After the deploy completes, confirm the temporary Netlify URL loads before attaching the production domain.

## Phase 4 — Domain and HTTPS

Attach `converastrategies.com` in Netlify and configure DNS according to `DOMAIN-DNS-SSL.md`.

Then run:

```bash
npm run external:domain
```

When DNS and TLS are fully propagated, record the successful operational tests:

```bash
npm run activation:set -- OPS_PRODUCTION_DEPLOYED=true
npm run activation:set -- OPS_CANONICAL_DOMAIN_VERIFIED=true
npm run activation:set -- OPS_SSL_VERIFIED=true
```

## Phase 5 — Branded email

Configure the mailbox provider records, then run:

```bash
npm run external:email
```

After real send/receive tests succeed:

```bash
npm run activation:set -- OPS_RYAN_MAIL_VERIFIED=true
npm run activation:set -- OPS_HELLO_MAIL_VERIFIED=true
```

## Phase 6 — Forms and notifications

<<<<<<< HEAD
Submit the Contact and Work With Convera forms from the production site. Confirm both appear in Netlify Forms and the configured notification email receives them.
=======
Submit Contact from the production site. For the professional test, review the Contact submission manually, send the private Intake invitation directly, then submit Intake separately. Confirm `website-contact`, `client-intake`, and `follow-the-work` appear in Netlify Forms and each configured notification reaches the intended mailbox.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

```bash
npm run activation:set -- OPS_NETLIFY_FORMS_VERIFIED=true
npm run activation:set -- OPS_FORM_NOTIFICATIONS_VERIFIED=true
```

## Phase 7 — Contribution flow

Run:

```bash
npm run external:payments
```

Then complete real one-time and monthly checkout tests. After both succeed:

```bash
npm run activation:set -- OPS_SUPPORT_FLOW_VERIFIED=true
```

## Phase 8 — Human QA

Verify desktop, mobile, dark/light mode, social previews, internal links, and publication links.

Record successful checks:

```bash
npm run activation:set -- OPS_BROWSER_QA_VERIFIED=true
npm run activation:set -- OPS_MOBILE_QA_VERIFIED=true
npm run activation:set -- OPS_SOCIAL_SHARE_VERIFIED=true
```

## Phase 9 — Final gate

```bash
npm run external:strict
npm run live:audit -- https://converastrategies.com
npm run deploy:gate
```

Only a successful final gate should be treated as a verified production launch.


<<<<<<< HEAD
## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
## 2.56.0 client operations note

Launch email verification covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. Professional inquiries begin through the public Contact pathway. The `/intake/` route (`client-intake` in Netlify) is private/noindex and is used only after manual review and a direct Intake invitation. The `/dashboard/` route remains a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
