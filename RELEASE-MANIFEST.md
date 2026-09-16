# Convera Strategies 2.4.0 — Release Manifest

## Release identity

- **Version:** 2.4.0
- **Stage:** Go-Live Gate Candidate
- **Canonical domain:** `https://converastrategies.com`
- **Brand descriptor:** Social Perspectives · Workplace Culture · Organizational Strategy
- **Founder:** Ryan Brown

## Public architecture

Primary navigation remains:

**Home · Mission · Services · Publications · Community · About · Contact**

Support remains a separate, highly visible mission-support pathway. Paid professional inquiries route through **Work With Convera**.

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
- external activation audit;
- live-site audit;
- **built-output audit**;
- **activation status report generator**;
- **runtime doctor**;
- **release fingerprint generator**;
- **strict go-live gate**;
- GitHub CI verification;
- GitHub post-deploy live verification.

## Build verification position

Dependency-free audits pass in the current environment. A full Astro dependency install still has not completed here because npm registry installation timed out. The included CI workflow is configured to run:

1. dependency installation;
2. release audits;
3. Astro diagnostics;
4. production build;
5. built-output audit.

Do not claim the framework build is verified until that sequence completes successfully.

## External activation still required

- verify `ryan@converastrategies.com` send/receive delivery;
- verify `hello@converastrategies.com` send/receive delivery;
- configure one-time contribution checkout;
- configure monthly contribution checkout;
- deploy to Netlify;
- verify canonical domain and TLS;
- verify production forms and notification delivery;
- verify contribution flow;
- complete desktop/mobile QA;
- verify social-sharing preview.
