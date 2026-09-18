# Convera Strategies 2.36.0 — Hero Softening & Inquiry Grid Balance

## Purpose
This release refines the homepage without reintroducing scroll-driven presentation. The public site remains statically generated and uses the shared sticky header as its only persistent scrolling element.

## Homepage hero
- Founder portrait now uses restrained rounded corners rather than a hard rectangular frame.
- Portrait spacing is balanced vertically within the hero rather than resting as a sharp-edged block against the hero boundary.
- Existing headline, quote, and action proportions from the 2.35 consistency release are preserved.

## Areas of Inquiry
- The three inquiry fields now occupy equal-width cells across one shared container.
- Internal padding is equalized.
- Subtle dividers clarify the three fields without making the section feel like three unrelated cards.
- Narrow layouts stack the fields with consistent horizontal separators.

## Motion and sitewide consistency
- No new scroll animation was introduced.
- No page-specific sticky content was introduced.
- Home, Mission, Services, Publications, Community, About, Contact, Support, Speaking, Press Kit, Follow the Work, and Work With Convera continue to use the shared public-page architecture established in 2.35.

## Verification
- Full `npm run release:audit` source-level suite passes.
- 50/50 release-readiness checks pass.
- 34/34 2.36 visual-architecture checks pass.
- Final `npm run check` and `npm run build` should still be run in the local Windows environment after extraction.
