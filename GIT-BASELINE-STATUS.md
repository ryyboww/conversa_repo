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
