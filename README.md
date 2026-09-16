# Convera Strategies

**Release: 2.4.0 — Go-Live Gate Candidate**

Production-oriented Astro package for **converastrategies.com**. The approved site architecture is treated as stable; this release concentrates on build verification, deployment bootstrap, external activation tracking, and post-build validation.

**Brand descriptor:** Social Perspectives · Workplace Culture · Organizational Strategy

## Launch architecture

Primary navigation:

**Home · Mission · Services · Publications · Community · About · Contact**

Support remains a prominent mission-support pathway. Paid professional work routes through **Work With Convera** so voluntary contributions and service fees remain distinct.

## Local development

```bash
npm install --no-audit --no-fund
npm run dev
```

Production verification:

```bash
npm run verify
```

`verify` runs the dependency-free release suite, Astro diagnostics, the production build, and the built-output audit.

## Dependency-free audits

These run with Node alone:

```bash
npm run audit
npm run forms:audit
npm run content:audit
npm run metadata:audit
npm run config:audit
npm run routes:audit
npm run a11y:audit
npm run privacy:audit
npm run activation:audit
npm run release:audit
npm run ops:audit
```

## New deployment-bootstrap commands

```bash
npm run dist:audit
npm run build:verify
npm run activation:report
```

- `dist:audit` inspects the generated production output after a successful Astro build.
- `build:verify` builds the site and immediately audits `dist/`.
- `activation:report` creates local operational status files based only on configuration and external tests actually marked complete.

Generated activation reports and `.env.operations` are gitignored.


## Go-live control layer

This release adds a final operational gate so source readiness cannot be confused with a completed launch.

```bash
npm run doctor
npm run release:fingerprint
npm run go-live:status
# final hard gate after all real-world activation is complete
npm run deploy:gate
```

- `doctor` inspects the local runtime, dependencies, environment files, and build output.
- `release:fingerprint` records SHA-256 hashes for critical source and brand files.
- `go-live:status` reports remaining operational blockers without changing them.
- `deploy:gate` fails unless source verification, external activation, framework checks, production build, built-output audit, and operational launch checks all pass.

See `GO-LIVE-GATE.md`, `ENVIRONMENT-MAP.md`, `DOMAIN-DNS-SSL.md`, `FORM-NOTIFICATIONS.md`, and `FIRST-24-HOURS.md`.

## Environment configuration

Copy `.env.example` to `.env` only when you are ready to configure live public build values.

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=
PUBLIC_SUPPORT_MONTHLY_URL=
PUBLIC_PLAUSIBLE_DOMAIN=
```

These are public client-side/static-build values. Do not place payment-provider secrets in `PUBLIC_*` variables.

For external verification tracking:

```bash
cp .env.operations.example .env.operations
npm run activation:report
```

Only mark an operational item `true` after the test actually succeeds.

## Production assets

- Founder portrait: `public/images/ryan-brown.jpg`
- Social sharing card: `public/og/convera-social-card.jpg`
- Light logo: `public/brand/convera-logo-light-bg.png`
- Dark logo: `public/brand/convera-logo-dark-bg.png`
- Apple touch icon: `public/apple-touch-icon.png`
- Manifest icons: `public/icon-192.png`, `public/icon-512.png`

## Deployment position

The dependency-free release suite passes in this environment, including 21/21 release-readiness checks, 5/5 privacy/exposure checks, and 7/7 core runtime prerequisites. The strict go-live gate intentionally remains blocked because the Astro production build and real-world activation steps have not yet been completed. npm registry installation timed out again here, so this release does not claim a framework build.

External launch work still requires branded mailbox verification, hosted contribution links, Netlify deployment, production form tests, contribution-flow testing, and real-device/browser QA.

## Key runbooks

- `DEPLOYMENT-BOOTSTRAP.md`
- `GITHUB-NETLIFY.md`
- `EMAIL-ACTIVATION.md`
- `PAYMENT-ACTIVATION.md`
- `ACTIVATION-CHECKLIST.md`
- `EXTERNAL-ACTIVATION.md`
- `POSTDEPLOY-VERIFICATION.md`
- `ROLLBACK.md`
- `RELEASE-MANIFEST.md`
