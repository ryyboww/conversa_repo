# Convera Strategies — Deployment Bootstrap

Release 2.14.0 is designed to move from a source-ready package to a verified production deployment without changing the approved site architecture.

## Phase 1 — local or CI build

Use Node 20, then run:

```bash
npm install --no-audit --no-fund
npm run verify
```

`npm run verify` now performs the release audits, Astro diagnostics, the production build, and a post-build inspection of `dist/`.

The built-output audit verifies required routes/assets, production canonical URLs, the social card, founder portrait, Netlify form markers, noindex utility pages, privacy exposure, and unresolved public environment tokens.

## Phase 2 — external activation

Create the required hosted contribution links and verify the public mailboxes. Then configure `.env` locally or the equivalent values in Netlify.

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=https://...
PUBLIC_SUPPORT_MONTHLY_URL=https://...
PUBLIC_PLAUSIBLE_DOMAIN=
```

Do not place secret API keys in `PUBLIC_*` values.

## Phase 3 — operational verification tracking

Copy:

```bash
cp .env.operations.example .env.operations
```

Only change an operational flag to `true` after the corresponding external test is actually complete.

Then run:

```bash
npm run activation:report
```

This writes local `ACTIVATION-REPORT.md` and `ACTIVATION-REPORT.json` files. Both are gitignored so a stale operational status is not accidentally committed as a permanent claim.

## Phase 4 — GitHub and Netlify

1. Push the source to the production GitHub repository.
2. Confirm the verification workflow passes.
3. Connect the repository to Netlify.
4. Configure public environment variables in Netlify.
5. Deploy the production branch.
6. Confirm the apex domain is canonical and `www` redirects to it.
7. Verify Netlify Forms detection and notifications.
8. Run the live-site audit.

```bash
npm run live:audit -- https://converastrategies.com
```

## Phase 5 — launch confirmation

Complete the remaining external checks:

- founder/public mailbox send and receive;
- Contact form submission and notification;
- Work With Convera submission and notification;
- one-time contribution flow;
- monthly contribution flow;
- payment receipt and return behavior;
- light/dark appearance;
- mobile and desktop browser review;
- external publication links.

Only after those tests should `.env.operations` flags be marked complete.
