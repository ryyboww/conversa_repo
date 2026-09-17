# Changelog

## 2.14.0 — High-UI Client Experience Candidate

- Reworked the approved homepage into a restrained high-UI scroll experience without changing the core Convera visual identity or content architecture.
- Added compact-on-scroll navigation, scroll progress, section-aware motion, subtle hero depth, staged content reveals, and reduced-motion fallbacks.
- Preserved the approved hero hierarchy: headline, founder portrait, founder quotation, featured publication/support pairing, Areas of Inquiry, and dark closing/footer treatment.
- Added a direct shareable `/intake/` prospective-client form and dedicated success page using a separate Netlify form name (`client-intake`).
- Added a safe `/dashboard/` client-dashboard foundation with noindex/no-store controls and no client-specific data until authentication is connected.
- Expanded branded-email architecture to `ryan@`, `hello@`, `help@`, `admin@`, and `billing@`, including operational verification flags and recommended form-notification routing.
- Retained production repository `convera_published_codes` and production branch `main_conversa`.
- Stored the approved homepage mockup in `design-reference/approved-homepage-high-ui-mockup.png` as a design reference for future parity checks.

## 2.13.1 — Production Repository Alignment

- Aligned deployment tooling to repository `convera_published_codes` and production branch `main_conversa`.
- Updated GitHub workflow, remote bootstrap, repository handoff, and release packaging safeguards for the production branch.
- Added centralized deployment targets and validated the branch/tag push flow against an isolated remote.
- Preserved the 2.13.0 framework bootstrap controls and approved public architecture.

## 2.13.0 — Local Framework Bootstrap Candidate

- Added `npm run launch:bootstrap` as a dependency-free entry point for the first real local framework verification.
- Added registry reachability detection so unavailable npm access is reported immediately instead of hanging through repeated install attempts.
- Added a no-lock pre-publication install path, preserving the tagged Git source while still allowing Astro check/build verification.
- Added `npm run framework:lock` for deliberate post-publication creation of `package-lock.json`, after which normal builds can switch to `npm ci`.
- Added Windows and macOS quick-start launchers inside the source package.
- Updated the Launch Now sequence to separate tagged release publication from the later lockfile commit.

## 2.12.0 — Launch Console Candidate

- Added `npm run launch` as the single staged operator status screen.
- Added `LAUNCH-NOW.md` as the primary concise launch sequence.
- Added `ready:source` and `ready:strict` aliases to reduce command sprawl.
- Simplified release distribution so the Launch Kit contains only launch-essential files; optional technical documents remain inside the tagged source archive.
- Preserved the approved homepage, Mission, Services, Publications, Community, Support, Work With Convera, founder presentation, and feature flags without redesign.
- Retained all repository, privacy, external-system, build, and go-live gates.
- Git bundle now includes an explicit `HEAD` reference and is clone-tested during release packaging so a fresh clone checks out `main` automatically.

## 2.11.0 — Remote Bootstrap Candidate

- Added a guarded `remote:bootstrap` command for planning, configuring, and publishing the verified Git baseline to GitHub.
- The command requires `main`, a clean working tree, and release tag `v2.11.0` at `HEAD` before any remote mutation.
- Existing remote destinations are protected from silent replacement; `--replace` must be explicit.
- `--push` publishes only `main` and the matching release tag, then verifies both refs with `git ls-remote`.
- Added `REMOTE-BOOTSTRAP.md` and extended repository/release audits to require the bootstrap control.
- The bootstrap flow is tested against an isolated local bare repository before packaging.

## 2.9.0 — Remote Repository Handoff Candidate

- Added Git remote status and strict remote preflight commands.
- Added source-freeze guidance for the deployment period.
- Updated GitHub verification to use `npm ci` automatically once a lockfile exists and to cancel superseded workflow runs.
- Added remote repository handoff/status documentation.
- Changed release packaging so the source ZIP is generated directly from the annotated Git release tag, keeping the ZIP and Git bundle aligned to the same tracked tree.
- Preserved all approved public architecture, design, services, publications, support pathways, and activation gates.


## 2.8.0 — Git Repository Baseline Candidate

- Created a portable Git repository baseline on `main`.
- Added an annotated `v2.8.0` release tag for deployment handoff.
- Added a Git bundle workflow so the verified baseline can be imported without an active GitHub connection.
- Added repository import and Git-baseline verification documentation.
- Preserved all existing launch, privacy, activation, and external-system gates.

## 2.7.0 — Repository Handoff Candidate

- Added repository handoff audit and status reporting.
- Added `.editorconfig`, `.gitattributes`, and monthly npm Dependabot configuration.
- Added `handoff:audit` and `deploy:preflight` commands.
- Added repository handoff and package-lock guidance for the first GitHub/Netlify deployment.
- Preserved the 2.6.0 external-systems verification layer and all prior launch gates.


## 2.6.0 — External Systems Verification Candidate

- Added a live DNS/HTTPS audit for `converastrategies.com` and `www.converastrategies.com`.
- Added branded-email DNS inspection for MX, SPF, and DMARC records.
- Added hosted contribution-link verification with HTTPS, reachability, and distinct-link checks.
- Added a consolidated `external:audit` command plus strict external verification mode.
- Added an external-systems verification runbook and deployment-execution sequence.
- Expanded release-readiness controls to require the new external-verification commands.
- Corrected prior changelog stage labels so 2.3.0, 2.4.0, and 2.5.0 match their actual release roles.
- Preserved the approved public design, navigation, content architecture, founder presentation, publications, Support pathway, and Work With Convera intake flow.

## 2.5.0 — Operator Activation Candidate

- Added `activation:init` to safely scaffold local launch environment files without overwriting existing values.
- Added `config:set` with validation for public checkout and optional analytics settings.
- Added `activation:set` with an allowlist for operational verification flags.
- Added `launch:summary` to identify the next unresolved launch action.
- Added `operator:audit` to consolidate runtime, activation, and go-live reporting.
- Added `OPERATOR-CONSOLE.md` and `NEXT-ACTIONS.md` for concise launch operation.
- Preserved the approved visual/site architecture; no redesign was introduced in this release.

## 2.4.0 — Go-Live Gate Candidate

- Added `runtime-doctor.mjs` for local deployment prerequisite inspection.
- Added strict `go-live-gate.mjs` separating source readiness from completed real-world launch verification.
- Added release fingerprint generation for critical source and brand assets.
- Expanded operational verification flags for canonical domain, TLS, form notifications, mobile QA, and social-share QA.
- Added go-live, environment, DNS/TLS, form-notification, and first-24-hours runbooks.
- Added `deploy:gate` as the final strict launch command.
- No approved page architecture or visual direction was redesigned in this release.

## 2.3.0 — Deployment Bootstrap Candidate

- Added `dist:audit` to inspect the generated production output after an Astro build.
- Added `build:verify` so CI/local verification includes both production build and built-output inspection.
- Updated the main `verify` and `release:verify` commands to use the built-output audit.
- Added `activation:report` with local operational status reporting that distinguishes configuration from external verification.
- Added `.env.operations.example` and gitignore protections for local operational verification records.
- Added canonical `www.converastrategies.com` → `converastrategies.com` redirect in Netlify configuration.
- Expanded configuration and privacy audits for hostname normalization and operational-file exposure.
- Updated GitHub verification workflow to run the production build plus built-output audit.
- Added deployment, email, payment, GitHub/Netlify, and activation runbooks.

## 2.2.0 — Operational Activation Candidate

- Removed the private personal Outlook address from production site configuration.
- Added privacy/exposure audit and external activation audit.
- Added form length guardrails and noindex/no-store utility-page controls.
