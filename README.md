# Convera Strategies 2.41.0

Current publication candidate for the Convera Strategies public site and private project-operations infrastructure.

## Current visual baseline

- approved tagline: **People are what we do.**
- fluid desktop/tablet scaling with one intentional 820px mobile breakpoint;
- mobile remains a separate stacked composition;
- matched Home feature rows;
- enlarged Areas of Inquiry;
- balanced visibility for workplaces, policing/public safety, courts/justice institutions, and public/community institutions;
- compact Publications and Essays & Notes archives;
- company-first About page and separate Founder Profile;
- shared header, footer, theme system, and restrained motion system.

## Local verification

Use a clean extraction. Do not copy old `node_modules`, `.astro`, `dist`, or nested source trees into this release.

```powershell
npm install
npm run check
npm run build
npm run dev
```

Additional source audits are available through `npm run release:audit`, `npm run privacy:audit`, and the version-specific `node scripts/verify-2.41.mjs`.

See `RELEASE-MANIFEST.md`, `BRAND-NOTES.md`, and `IMAGE-CREDITS.md` for current release and brand governance notes.

For Mac and Windows handoffs, follow [docs/CROSS-MACHINE-WORKFLOW.md](docs/CROSS-MACHINE-WORKFLOW.md).
