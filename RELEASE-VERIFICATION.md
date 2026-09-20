<<<<<<< HEAD
# Convera Strategies 2.14.0 — Release Verification

## 2.14.0 high-UI and client-operations controls

Release 2.14.0 preserves the approved Convera composition while adding restrained scroll-driven UI, a direct client-intake pathway, a non-sensitive dashboard foundation, and complete branded-email routing. The production repository remains `convera_published_codes` on `main_conversa`.

Source-level audits verify the new `/intake/` and `/dashboard/` routes, the `client-intake` Netlify form, noindex/no-store protections, the approved homepage mockup reference, all five branded mailboxes, and the high-UI scroll component. Full Astro framework build verification remains dependent on an internet-connected npm installation.
=======
# Convera Strategies 2.51.0 — Release Verification
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## Current release boundary

<<<<<<< HEAD
The current package passes the source-level verification suite available without Astro dependencies.
=======
Release 2.51.0 preserves the approved Convera Strategies public architecture, clean slogan lockup, compact Home hero, third-person company voice, and founder-led service model. Professional services use **Contact → manual review → private Intake invitation → Intake → Project # → scope/estimate → agreement → readiness → active project**. The private `/intake/` route remains noindex and absent from public navigation.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## Source-level verification

<<<<<<< HEAD
- source/import integrity;
- Netlify Forms markup;
- content/placeholder scan;
- launch-readiness checks;
- predeploy checks;
- metadata checks;
- configuration checks, including canonical `www` redirect;
- route integrity;
- accessibility source checks;
- privacy/exposure checks: **5/5**;
- activation status reporting;
- runtime doctor core prerequisites;
- go-live gate reporting without falsely passing incomplete real-world work;
- standalone TypeScript configuration check for central dependency-free configuration modules;
- operator activation setters tested with temporary local values and clean environment restored afterward;
- external-system audit scripts pass Node syntax validation.

## New 2.14.0 consolidated distribution controls

Release 2.14.0 adds:

```bash
npm run release:package
```

The packaging command requires a clean working tree, the matching `v2.14.0` release tag, and `HEAD` at that tag. It then creates a tagged source ZIP, portable Git bundle, essential launch documents, checksums, and one all-in-one Launch Kit. The tagged Git tree remains the release source of truth.

Existing Git-remote controls remain available through `npm run git:remote-status`, `npm run git:remote-strict`, `npm run repository:handoff`, and `npm run remote:bootstrap -- <github-url>`.
=======
The release includes repository, routes, forms, content, metadata, configuration, privacy/exposure, accessibility-source, and release-readiness audits. The public configuration and operational-verification templates are included as `.env.example` and `.env.operations.example`.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## Framework verification

When dependencies are available, run:

```bash
npm install
npm run check
npm run build
npm run dist:audit
```

<<<<<<< HEAD
`npm run verify` includes the built-output audit after the production build.
=======
A source audit is not a substitute for a successful Astro check/build or rendered browser QA.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## External verification still required before launch-complete status

- branded mailbox delivery;
- contribution checkout links;
- Netlify deployment;
- production form and notification delivery;
- canonical domain and TLS verification;
- live contribution flow;
- desktop/mobile browser QA;
- social-sharing preview verification.

<<<<<<< HEAD
## Remote bootstrap verification

Release 2.14.0 adds `npm run remote:bootstrap -- <github-url>`. The command is plan-only unless `--apply` or `--push` is supplied, protects an existing different `origin`, and requires `main_conversa`, a clean worktree, and `v2.14.0` at `HEAD`. A controlled local bare-repository publication test is performed before packaging.
=======
Only mark operational flags true after the corresponding real-world test succeeds.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
