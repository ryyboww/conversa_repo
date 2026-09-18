# Convera Strategies 2.57.0

Current publication candidate for the Convera Strategies public site and private project-operations infrastructure.

## Current visual baseline

- approved slogan: **People are what we do.**, integrated beneath the wordmark as a clean italic slogan with no decorative rules;
- fluid desktop/tablet scaling with one intentional 820px mobile breakpoint;
- mobile remains a separate stacked composition;
- right-edge founder hero with integrated translucent quote/name/title panel;
- matched Home feature rows with a neutral Convera connection illustration rather than personal institutional photography;
- supplied `an_objective_strategy.png` artwork on the Home **Featured Publication** card;
- supplied `talk_is_cheap.png` artwork on the Home **Featured Essay** card;
- enlarged Areas of Inquiry;
- balanced visibility for workplaces, policing/public safety, courts/justice institutions, and public/community institutions;
- compact Publications and Essays & Notes archives;
- company-first About page with an incremental-change method, neutral visual placeholders, compact founder bridge, and separate Founder Profile;
- shared header, footer, theme system, and restrained motion system.

## Approved inquiry workflow

Professional and general correspondence begin through the public Contact form. Professional inquiries are reviewed manually. Only after review, when additional project information is useful, Convera sends a private Intake invitation directly to the prospective client. The `/intake/` route remains noindex and absent from public navigation.

The public pathways remain deliberately separate:

- **Contact** → public correspondence and first-stage professional inquiry;
- **Private Intake** → invitation only after manual Contact review;
- **Support** → voluntary contributions, separate from professional-service fees.

## Local verification

Use a clean extraction. Do not copy old `node_modules`, `.astro`, `dist`, or nested source trees into this release.

```powershell
npm ci
npm run check
npm run build:verify
npm run dev
```

If `npm ci` cannot reach the npm registry, the dependency-free source suite can still be run with:

```powershell
npm run ops:audit
npm run verify:2.57
```

The final production decision remains gated by an actual Astro build, deployed-site verification, form notification tests, branded email, contribution links, domain/TLS, and desktop/mobile browser QA.

See `RELEASE-MANIFEST.md`, `SOURCE-FREEZE.md`, `LAUNCH-NOW.md`, `BRAND-NOTES.md`, and `IMAGE-CREDITS.md` for current release and launch governance notes.
