# Convera Strategies 2.57.0 — Release Manifest

## Release identity

- **Version:** 2.57.0
- **Stage:** Founder Identity Clarification Candidate
- **Canonical domain:** `https://converastrategies.com`
- **Brand descriptor:** Social Perspectives · Workplace Culture · Organizational Strategy
- **Approved tagline:** **People are what we do.**
- **Founder:** Ryan Brown

## Publication workflow coherence

The public Contact form and private Intake form remain separate. Prospective professional work begins with Contact, is reviewed manually, and only then receives a direct private Intake invitation when more detail is useful. `/work-with-convera/` is an orientation page rather than a detailed public intake form. Production and built-output audits now verify this current workflow instead of the retired `work-with-convera` form.

## Landing editorial image refresh

The Home page now uses the two supplied editorial illustrations in the existing featured-content positions: `an_objective_strategy.png` for **Featured Publication** and `talk_is_cheap.png` for **Featured Essay**. These replacements are scoped to the Home page only; publication records, article metadata, routes, copy, responsive layout, and all other imagery remain unchanged.

## Public architecture

Primary navigation remains **Home · Mission · Services · Publications · Community · About · Contact**. Additional routes remain contextual rather than crowding the primary navigation.

The public site remains statically generated Astro with a shared sticky header, footer, theme system, typography system, restrained reveal behavior, and reduced-motion fallback. Desktop/tablet layouts now scale fluidly with the viewport through shared gutters, fluid root sizing, proportional grid tracks, and `clamp()`-based typography. The principal public layouts use one deliberate mobile breakpoint at 820px; below that point the site switches to the separate stacked mobile composition.

## Desktop composition hardening

The established 820px mobile breakpoint remains unchanged. Between 821px and 1080px, Home and the shared header now use a narrower-desktop calibration rather than allowing the wide-desktop proportions to become cramped. The layout remains two-column and retains desktop navigation; only proportions, gaps, type scale, and card internals contract together. This keeps the browser-resize behavior closer to the approved desktop composition without turning intermediate widths into a second mobile state.

The public-safety Services image remains the documented Wikimedia Commons public-domain reference, now with explicit intrinsic dimensions and a local neutral institutional fallback if the external image cannot load.

## Home

- Hero uses a slightly more compact two-part composition: editorial copy on the left and the founder portrait aligned to the right edge. The quote, name, and title sit in a translucent identity panel beneath the portrait image. The approved slogan lives in the header brand lockup rather than inside the hero, using a clean italic treatment without decorative horizontal rules so it reads as part of the wordmark lockup without competing with “Strategies” above it.
- Featured Publication/Support and Featured Essay/People Connection share the same two-column geometry and spacing. The people-connection side now uses a compact image-and-copy card rather than an oversized caption.
- Areas of Inquiry is visually larger and now explicitly surfaces policing and courts within the Social Perspectives field.

## Client range

Services now includes a balanced client-setting section showing four equal settings: Workplaces & Organizations, Policing & Public Safety, Courts & Justice Institutions, and Public & Community Institutions. Policing and courts are visible without becoming the sole identity of Convera.

The public-safety image is a U.S.-government/public-domain asset referenced through Wikimedia Commons; provenance is recorded in `IMAGE-CREDITS.md`. Company-facing workplace, community, About, and Speaking visuals now use neutral Convera illustrations rather than Ryan’s fellowship, state-house, Maryland, or prior service photographs. Personal institutional imagery is reserved for the Founder Profile.

## Support

The Support page now explains the purpose of contributions in terms of reach and public voice. Contributions give Ryan Brown greater room to research, write, speak, travel, and carry a case for thoughtful institutional change into more organizations, public settings, and conversations. Support remains separate from professional-service fees and is not represented as tax-deductible charitable giving.

## Professional-services workflow

Professional services remain: **Contact → manual review → private Intake invitation → Intake → Project # → discovery/clarification → estimate → agreement → readiness → active project**. The `/intake/` route remains private/noindex and is not a public entry point. HubSpot Deals remain excluded from professional services.

## Brand governance

`BRAND-NOTES.md` records **People are what we do.** as the approved slogan and preserves it for future stationery, letterhead, email signatures, proposals, presentations, and print-brand work. The slogan is integrated beneath the wordmark as part of the public brand lockup and is not repeated as ordinary page-hero or body copy. Brand naming guidance now uses **Convera Strategies** for formal identification and first substantive references while retaining **Convera** as the conversational short form.

## Verification

This release includes the established repository, route, forms, content, metadata, configuration, privacy/exposure, accessibility-source, release-readiness, and dedicated 2.56 verification controls. Browser-assisted visual QA and the pinned local `npm run check` / `npm run build` sequence remain required before deployment.
