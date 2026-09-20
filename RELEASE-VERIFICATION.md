# Convera Strategies 2.51.0 — Release Verification

## Current release boundary

Release 2.51.0 preserves the approved Convera Strategies public architecture, clean slogan lockup, compact Home hero, third-person company voice, and founder-led service model. Professional services use **Contact → manual review → private Intake invitation → Intake → Project # → scope/estimate → agreement → readiness → active project**. The private `/intake/` route remains noindex and absent from public navigation.

## Source-level verification

The release includes repository, routes, forms, content, metadata, configuration, privacy/exposure, accessibility-source, and release-readiness audits. The public configuration and operational-verification templates are included as `.env.example` and `.env.operations.example`.

## Framework verification

When dependencies are available, run:

```bash
npm install
npm run check
npm run build
npm run dist:audit
```

A source audit is not a substitute for a successful Astro check/build or rendered browser QA.

## External verification still required before launch-complete status

- branded mailbox delivery;
- contribution checkout links;
- Netlify deployment;
- production form and notification delivery;
- canonical domain and TLS verification;
- live contribution flow;
- desktop/mobile browser QA;
- social-sharing preview verification.

Only mark operational flags true after the corresponding real-world test succeeds.
