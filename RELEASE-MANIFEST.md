# Convera Strategies 2.14.0 — Release Manifest

## Release identity

- **Version:** 2.14.0
- **Stage:** High-UI Client Experience Candidate
- **Canonical domain:** `https://converastrategies.com`
- **Brand descriptor:** Social Perspectives · Workplace Culture · Organizational Strategy
- **Founder:** Ryan Brown

## Public architecture

Primary navigation remains:

**Home · Mission · Services · Publications · Community · About · Contact**

Support remains a separate, highly visible mission-support pathway. Paid professional inquiries may route through **Work With Convera** or the direct shareable **Client Intake** at `/intake/`. The staged `/dashboard/` route remains outside primary navigation and contains no client-specific data until secure authentication is connected.


## High-UI and client-operations layer

Release 2.14.0 adds:

- restrained homepage scroll progress and section-aware motion;
- compact-on-scroll header behavior;
- reduced-motion fallbacks;
- a direct Netlify `client-intake` form at `/intake/`;
- a noindex/no-store dashboard shell at `/dashboard/`;
- optional HTTPS client-portal handoff through `PUBLIC_CLIENT_PORTAL_URL`;
- complete branded mailbox architecture for `ryan@`, `hello@`, `help@`, `admin@`, and `billing@`;
- approved homepage mockup retained under `design-reference/` for visual parity.

## Verification controls

This release includes:

- source/import audit;
- Netlify Forms audit;
- content/placeholder audit;
- launch and predeploy readiness checks;
- metadata audit;
- configuration audit;
- route audit;
- accessibility source audit;
- release-readiness audit;
- privacy/exposure audit;
- activation configuration audit;
- live-site audit;
- built-output audit;
- activation status reporting;
- runtime doctor;
- release fingerprint generation;
- strict go-live gate;
- GitHub CI verification;
- GitHub post-deploy live verification;
- **external domain/HTTPS audit**;
- **branded-email DNS audit**;
- **hosted contribution-link audit**;
- **consolidated external-systems audit**.


## Launch console layer

Release 2.14.0 adds a simplified operator surface:

- `npm run launch` — one status screen covering local setup, GitHub publication, business activation, and production verification;
- `LAUNCH-NOW.md` — the primary short-form launch sequence;
- `npm run ready:source` — consolidated source-readiness check;
- `npm run ready:strict` — final strict production gate.

The distribution package is intentionally reduced to launch-essential files; deeper technical documents remain in the tagged source archive for later use.

## Consolidated distribution layer

Release 2.14.0 adds `npm run release:package`, `DOWNLOAD-CENTER.md`, and `RELEASE-PACKAGING.md`. Packaging is allowed only from a clean working tree whose `HEAD` matches the annotated release tag. The command creates a tagged source ZIP, portable Git bundle, essential launch documents, integrity hashes, and one all-in-one Launch Kit ZIP.

## Operator activation layer

Safe local launch controls remain available:

- `npm run activation:init`
- `npm run config:set -- KEY=value`
- `npm run activation:set -- OPS_...=true`
- `npm run launch:summary`
- `npm run operator:audit`

These commands do not create credentials and do not mark real-world tests complete automatically.

## External systems verification layer

Retained from release 2.6.0:

- `npm run external:domain`
- `npm run external:email`
- `npm run external:payments`
- `npm run external:audit`
- `npm run external:strict`

These tools verify reachable external infrastructure after it is configured. They are not substitutes for real mailbox, form, checkout, mobile, or social-preview tests.

## Build verification position

Dependency-free audits pass in the current environment. A full Astro dependency install still has not completed here because npm registry installation timed out. The included CI workflow is configured to run dependency installation, release audits, Astro diagnostics, the production build, and built-output inspection.

Do not claim framework-build verification until that sequence completes successfully.

## External activation still required

- verify `ryan@converastrategies.com` send/receive delivery;
- verify `hello@converastrategies.com` send/receive delivery;
- verify `help@converastrategies.com` send/receive delivery;
- verify `admin@converastrategies.com` send/receive delivery;
- verify `billing@converastrategies.com` send/receive delivery;
- configure one-time contribution checkout;
- configure monthly contribution checkout;
- deploy to Netlify;
- verify canonical domain and TLS;
- verify production forms and notification delivery;
- verify contribution flow;
- complete desktop/mobile QA;
- verify social-sharing preview.


## Repository handoff controls

- `.editorconfig` and `.gitattributes` for consistent repository behavior
- Dependabot monthly npm update configuration
- `npm run repository:audit`
- `npm run repository:status`
- `npm run handoff:audit`
- `npm run deploy:preflight`
- `npm run git:remote-status`
- `npm run git:remote-strict`
- `npm run repository:handoff`
- `npm run remote:bootstrap -- <github-repository-url>`
- `REPOSITORY-HANDOFF.md`
- `REMOTE-REPOSITORY-HANDOFF.md`
- `REMOTE-BOOTSTRAP.md`
- `SOURCE-FREEZE.md`
- `PACKAGE-LOCK-NOTE.md`

## Remote repository artifact

Release 2.14.0 is also distributed as a portable Git bundle containing the verified `main_conversa` branch and annotated `v2.14.0` tag. See `REPOSITORY-IMPORT.md`.
