# Convera Strategies 2.41.0 — Release Manifest

## Release identity

- **Version:** 2.41.0
- **Stage:** Fluid Desktop & Client Range Candidate
- **Canonical domain:** `https://converastrategies.com`
- **Brand descriptor:** Social Perspectives · Workplace Culture · Organizational Strategy
- **Approved tagline:** **People are what we do.**
- **Founder:** Ryan Brown

## Public architecture

Primary navigation remains **Home · Mission · Services · Publications · Community · About · Contact**. Additional routes remain contextual rather than crowding the primary navigation.

The public site remains statically generated Astro with a shared sticky header, footer, theme system, typography system, restrained reveal behavior, and reduced-motion fallback. Desktop/tablet layouts now scale fluidly with the viewport through shared gutters, fluid root sizing, proportional grid tracks, and `clamp()`-based typography. The principal public layouts use one deliberate mobile breakpoint at 820px; below that point the site switches to the separate stacked mobile composition.

## Home

- Hero keeps the founder portrait, quote, approved headline, and the new **People are what we do.** brand line.
- Featured Publication/Support and Featured Essay/People Connection now share the same two-column geometry and spacing.
- Areas of Inquiry is visually larger and now explicitly surfaces policing and courts within the Social Perspectives field.

## Client range

Services now includes a balanced client-setting section showing four equal settings: Workplaces & Organizations, Policing & Public Safety, Courts & Justice Institutions, and Public & Community Institutions. Policing and courts are visible without becoming the sole identity of Convera.

The public-safety image is a U.S.-government/public-domain asset referenced through Wikimedia Commons; provenance is recorded in `IMAGE-CREDITS.md`.

## Professional-services workflow

Professional services remain: **Contact → manual review → private Intake invitation → Intake → Project # → discovery/clarification → estimate → agreement → readiness → active project**. The `/intake/` route remains private/noindex and is not a public entry point. HubSpot Deals remain excluded from professional services.

## Brand governance

`BRAND-NOTES.md` records **People are what we do.** as the approved tagline and preserves it for future stationery, letterhead, email signatures, proposals, presentations, and print-brand work. The tagline is not added beneath the footer logo or inside the primary logo lockup.

## Verification

This release includes the established repository, route, forms, content, metadata, configuration, privacy/exposure, accessibility-source, release-readiness, and dedicated 2.41 verification controls. Browser-assisted visual QA and the pinned local `npm run check` / `npm run build` sequence remain required before deployment.
