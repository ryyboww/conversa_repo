# Convera Strategies 2.32.1 — Build Hotfix

## Why this exists

`npm run check` on the 2.14.0 baseline with the 2.32 visual overlay reported two blocking errors:

- `src/components/layout/SiteFooter.astro` could not resolve `./Brand.astro`;
- `src/components/navigation/SiteHeader.astro` could not resolve `../layout/Brand.astro`.

2.32 assumed a shared Brand component from a later visual architecture. The user's active 2.14.0 package does not provide that file.

## What this hotfix changes

- adds `src/components/layout/Brand.astro`;
- adds deterministic header/footer logo assets under `public/images/`;
- passes an explicit `header` or `footer` variant from each consumer;
- preserves native image proportions and existing 2.32 header/footer spacing rules;
- makes no changes to Intake, projects, estimates, agreements, billing, portal, or automation logic.

## Apply

Copy this patch over the current project root, preserving folders and allowing replacement of the 2.32 files.

Then run:

```powershell
npm run check
```

The two missing-module errors should be gone. Remaining `ts(6133)`, `ts(80006)`, and `astro(4000)` items are non-blocking hints and can be cleaned separately after the build is green.
