# Convera Strategies 2.37.0 — Shared Motion, Hero Fade & Publication Image System

This release adds restrained dynamic presentation across the public site while preserving static Astro generation for performance, SEO, and accessibility.

## Public presentation

- One shared reveal system is loaded from `BaseLayout`; Home and interior pages use the same timing and reduced-motion behavior.
- The homepage founder portrait now uses a softened fade treatment rather than a hard rectangular edge.
- Supporting homepage typography is increased modestly without returning to the oversized earlier hero scale.
- Areas of Inquiry retain the equal-width three-cell layout established in 2.36.

## Publications

- Each publication record now has a normalized editorial image.
- Featured and archive images use consistent 16:9 geometry.
- Individual publication records show the associated image in the shared page hero.
- Suitable editorial image assets from the prior Ryan Brown site were reused as reference-derived media only.

## Photography

- Dedicated founder portraits are assigned to Home, About, and Press Kit.
- Selected community and public-engagement photographs are used on Community and Speaking.
- A prior-site service-work image is retained on About because it supports the founder narrative and broader professional experience.

## Motion policy

Motion is presentational only. Content remains fully available without JavaScript, and `prefers-reduced-motion` disables reveal animation. The legacy page-specific scroll experience remains removed.
