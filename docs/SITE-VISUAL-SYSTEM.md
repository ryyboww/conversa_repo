# Convera Strategies — Public Site Visual System

## Publication standard

The public website is intentionally static-generated with Astro. Public pages should not introduce page-specific scroll animation, sticky content columns, parallax, or layout shifts unless a future feature has a clear functional reason for doing so.

The global header is the only persistent sticky public-site element. Forms, theme switching, mobile navigation, and secure client/operator tools remain interactive where interaction is required.

## Shared public structure

Public-facing pages use:

- `src/layouts/BaseLayout.astro` for metadata, header, footer, theme initialization, attribution, and public journey events;
- `src/components/SiteHeader.astro` for the single global navigation/header treatment;
- `src/components/PageHero.astro` for page title, eyebrow, lede, optional action buttons, optional metadata, and optional supporting aside;
- `src/components/SiteFooter.astro` for the concise global footer;
- `src/styles/global.css` for outer width, typography, section spacing, buttons, cards, grids, and shared hero rules;
- `src/styles/home.css` only for the homepage editorial composition.

## Layout rules

- Primary outer width: 1280px maximum with consistent responsive gutters.
- Public page heroes use one shared scale and responsive breakpoint behavior.
- Home retains its distinct editorial hero, but its outer grid aligns with the shared header/footer system.
- Section spacing is compact enough for purposeful scrolling and generous enough for readable separation.
- Public page content must not overlap at supported breakpoints.
- No horizontal overflow should be introduced by text, cards, logos, buttons, or footer descriptor.
- The footer descriptor remains one line where normal desktop/tablet width reasonably permits.
- Page-specific content may use narrower reading measures inside the shared outer grid.

## Typography

- Cormorant Garamond: editorial headings and selected display text.
- Inter: navigation, body copy, forms, metadata, and controls.
- Homepage title is capped at 48px on desktop.
- Shared public page hero titles are capped below the former oversized scale.
- Page-specific heading overrides should remain within the shared hierarchy rather than exceeding it.

## Motion and interaction

Allowed public interactions:

- sticky global header;
- theme toggle;
- mobile navigation;
- form controls and validation;
- restrained hover/focus states;
- optional analytics/event dispatch without third-party tracking by default.

Avoid on public editorial pages:

- parallax;
- page-specific scroll rails;
- moving portrait blocks;
- sticky explanatory sidebars;
- animated layout reflow;
- motion used only for decoration.

## Founder portrait

`public/images/ryan-brown.jpg` is the approved current founder portrait.

- Home uses a tighter crop for identity and visual balance.
- About and Press Kit use a wider 4:3 crop to preserve the professional office setting.
- Do not substitute AI-generated founder imagery.

## Public inquiry boundary

Professional inquiries begin at Contact. Public pages must not link directly to `/intake/`.

The intended path is:

Public page → Contact → manual review → private Intake invitation when appropriate.

The Intake route remains `noindex` and sitemap-excluded.

## Future changes

Before publication, a visual change should be reviewed at desktop, tablet, and mobile widths and should preserve:

1. header/logo visibility;
2. page-grid alignment;
3. hero scale;
4. section spacing rhythm;
5. footer descriptor integrity;
6. no horizontal overflow;
7. light/dark readability;
8. keyboard/focus usability.
