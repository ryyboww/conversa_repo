# Framework Status — 2.58.0

## Status

Release 2.58.0 preserves the verified 2.57 public website and introduces a controlled boundary between website development and the Convera Strategies Operations Manual.

## What changed

- Added `WORKSTREAM-BOUNDARIES.md` as the plain-language control record.
- Added an automatic website-release audit which rejects Word working documents, Operations Manual version artifacts, and reserved manual working directories.
- Added the boundary audit to the normal release-verification sequence.
- Added dedicated 2.58 verification.

## What did not change

- Public design and page composition
- Founder identifiers
- Navigation and public routes
- Contact, Follow, newsletter, and private Intake forms
- Contact → manual review → private Intake invitation workflow
- Privacy, accessibility, security-header, and noindex controls

## Verification

Run:

```text
npm run verify:2.58
npm run verify
```

The website and manual may continue in parallel. Neither workstream changes the other without a separate reviewed update.
