# Convera Strategies 2.34.0 — Homepage QA

This release was rebuilt from the user-supplied live source rather than from an overlay patch.

## Live component path confirmed

`src/layouts/BaseLayout.astro` imports:

- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`

The duplicate `src/components/navigation/` and `src/components/layout/` component trees were removed because they were unused and had caused prior fixes to land in the wrong files.

## Homepage corrections

- Header no longer changes state on scroll.
- Header logo remains visible and does not resize, fade, translate, or collapse when scrolling.
- Header uses a tightened high-resolution Convera logo asset with preserved proportions.
- Theme control is icon-only; visible `Theme` text is removed.
- Hero headline, portrait, quotation, and total hero height were reduced and rebalanced.
- Homepage now uses one markup/CSS system rather than mismatched generations of `index.astro` and `home.css`.
- Featured Publication and Support form one compact editorial band.
- Areas of Inquiry is concise and compact.
- Extra homepage commercial, legacy quote, community, duplicate support, and scroll-rail sections were removed from Home; their underlying pages/features remain available elsewhere.
- Footer secondary navigation and catchphrase were removed.
- Footer logo was reduced.
- Footer descriptor remains on one line and uses responsive type sizing.

## Verification completed in build workspace

- Astro compiler parse: 34 / 34 `.astro` files clean.
- CSS parse: `global.css` and `home.css` clean.
- Critical homepage checks: 13 / 13 passed.
- Chromium viewport checks: 1440px desktop, 1024px tablet, 390px mobile.
- Horizontal overflow: none detected in tested viewports.
- Sticky header position after scroll: top = 0 in tested viewports.
- Header logo after scroll: display = block, opacity = 1, visibility = visible in tested viewports.

## Local verification still required

The uploaded dependency tree was installed on Windows and includes Windows-specific Rollup binaries. The Linux build workspace therefore cannot execute the exact local `astro check` binary. After extracting this release on the Windows machine, run:

```powershell
npm run check
npm run build
npm run dev
```

Then review Home at desktop, tablet, and mobile widths before deployment.
