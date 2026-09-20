<<<<<<< HEAD
# External Systems Verification — Convera Strategies 2.14.0

The repository can be source-ready while the business infrastructure is still incomplete. Release 2.14.0 adds live checks for the external systems required before public launch.
=======
# External Systems Verification — Convera Strategies 2.56.0

The repository can be source-ready while the business infrastructure is still incomplete. Release 2.56.0 adds live checks for the external systems required before public launch.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## 1. Domain and HTTPS

Run:

```bash
npm run external:domain
```

The audit checks:

- whether `converastrategies.com` resolves;
- whether `www.converastrategies.com` resolves;
- whether the apex domain responds over HTTPS;
- whether an HSTS header is present;
- whether `www` redirects to the canonical apex domain when deployed.

After deployment and DNS propagation, use strict mode:

```bash
npm run external:domain -- --strict
```

## 2. Branded email DNS

Run:

```bash
npm run external:email
```

The audit checks:

- MX records;
- SPF;
- DMARC.

DKIM is intentionally not guessed. Verify DKIM using the selector supplied by the mailbox provider.

DNS records do not prove mailbox delivery. After DNS passes, send and receive real test messages for `ryan@converastrategies.com` and `hello@converastrategies.com`, then record those tests in `.env.operations` using `npm run activation:set`.

## 3. Contribution checkout links

After setting the hosted checkout URLs:

```bash
npm run config:set -- PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
npm run config:set -- PUBLIC_SUPPORT_ONE_TIME_URL=https://...
npm run config:set -- PUBLIC_SUPPORT_MONTHLY_URL=https://...
npm run external:payments
```

The audit checks HTTPS, URL validity, live response, final host, and whether one-time and monthly URLs are distinct.

A successful HTTP response does not replace a real transaction test. Complete a low-value test transaction before marking the contribution flow verified.

## 4. Consolidated external check

Diagnostic mode:

```bash
npm run external:audit
```

Final strict mode:

```bash
npm run external:strict
```

Strict mode is appropriate only after deployment, DNS, email, and checkout configuration are expected to be live.

## Verification principle

An automated network check confirms reachability and configuration signals. It does not replace human verification of mailbox delivery, form notifications, checkout completion, mobile presentation, or social-sharing previews. Those remain operational flags in `.env.operations`.
