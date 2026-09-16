# Changelog

## 2.4.0 — Go-Live Gate Candidate

- Added `runtime-doctor.mjs` for local deployment prerequisite inspection.
- Added strict `go-live-gate.mjs` separating source readiness from completed real-world launch verification.
- Added release fingerprint generation for critical source and brand assets.
- Expanded operational verification flags for canonical domain, TLS, form notifications, mobile QA, and social-share QA.
- Added go-live, environment, DNS/TLS, form-notification, and first-24-hours runbooks.
- Added `deploy:gate` as the final strict launch command.
- No approved page architecture or visual direction was redesigned in this release.

## 2.4.0 — Deployment Bootstrap Candidate

- Added `dist:audit` to inspect the generated production output after an Astro build.
- Added `build:verify` so CI/local verification includes both production build and built-output inspection.
- Updated the main `verify` and `release:verify` commands to use the built-output audit.
- Added `activation:report` with local operational status reporting that distinguishes configuration from external verification.
- Added `.env.operations.example` and gitignore protections for local operational verification records.
- Added canonical `www.converastrategies.com` → `converastrategies.com` redirect in Netlify configuration.
- Expanded configuration and privacy audits for hostname normalization and operational-file exposure.
- Updated GitHub verification workflow to run the production build plus built-output audit.
- Added deployment, email, payment, GitHub/Netlify, and activation runbooks.
- Preserved the approved public site design, navigation, content architecture, founder presentation, publications, Support pathway, and Work With Convera intake flow.

## 2.2.0 — Operational Activation Candidate

- Removed the private personal Outlook address from production site configuration.
- Added privacy/exposure audit and external activation audit.
- Added form length guardrails and noindex/no-store utility-page controls.
