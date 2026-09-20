<<<<<<< HEAD
# Git Baseline Status — Convera Strategies 2.14.0

Release purpose: create a portable and verifiable Git repository baseline before the live GitHub and Netlify connection.

## Baseline requirements

- branch: `main_conversa`
- release tag: `v2.14.0`
- private/runtime files excluded by `.gitignore`
- dependency-free source audits passing before commit
- working tree clean immediately after commit/tag creation
- Git bundle clonable without access to GitHub

## Still external

- GitHub remote connection and push to `convera_published_codes`
- successful registry-connected dependency installation
- `package-lock.json` generation and commit
- Astro `check` and production build in a dependency-enabled environment
- Netlify deployment
- production DNS/TLS, forms, mailboxes, payments, mobile QA, and social-preview verification
=======
# Git Baseline Status — Convera Strategies 2.56.0

The source package is prepared for creation of the 2.56.0 production Git baseline.

## Required release baseline

- branch: `main_conversa`
- release tag: `v2.56.0`
- repository: `convera_published_codes`
- private/runtime files excluded by `.gitignore`
- repository/source/privacy/2.56 audits passing before commit
- working tree clean after commit/tag creation
- GitHub verification workflow green before production deployment

## Current package state

- `package-lock.json` is present;
- `node_modules/`, `.astro/`, `dist/`, `.env`, and `.env.operations` are intentionally absent;
- Astro check/build remains pending until registry access is available;
- no GitHub remote is embedded in the source archive.

Use `REMOTE-BOOTSTRAP.md` only after the verified release commit and `v2.56.0` tag exist.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
