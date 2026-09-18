# Install — Convera Strategies 2.31.0

Apply this patch **after** the current Convera application and the operational patches through 2.30.

Overlay these source files:

- `src/components/home/LandingPage.astro`
- `src/components/navigation/SiteHeader.astro`
- `src/components/layout/SiteFooter.astro`
- `src/styles/home.css`

The existing `src/components/layout/Brand.astro` is deliberately reused so the approved production logo remains the single source of truth.

## Important asset

The homepage expects the approved founder portrait at:

`public/images/ryan-brown.jpg`

Do not replace Ryan's portrait with the placeholder person shown in the approved composition mockup. The mockup is a **layout reference**, not portrait-source authority.

## Build sequence

```bash
npm install
npm run check
npm run build
node scripts/verify-2.31.mjs
```

After deployment, test:

- desktop at 1440–1600px width;
- tablet around 1024px;
- mobile around 390px;
- sticky header from top through footer;
- logo remains visible at every scroll position;
- light/dark toggle;
- search overlay;
- keyboard navigation;
- no public Intake route/link has been introduced.
