# Install 2.30 — Launch Integration & Growth Control

Requires Convera Strategies 2.29.0.

## 1. Copy additive files

Copy these files/directories into the project root:

- `public/assets/convera-growth.js`
- `src/components/visibility/VisibilityNavLinks.astro`
- `src/components/visibility/VisibilityFooterLinks.astro`
- replacement `src/components/visibility/PublicationCTA.astro`
- `src/components/privacy/AttributionDisclosure.astro`
- `scripts/audit-public-journey.mjs`
- `scripts/verify-2.30.mjs`

Keep the 2.29 `convera-visibility.js`, Speaking, Press Kit, Follow the Work, and visibility stylesheet in place.

## 2. Global script loading

Load both first-party scripts once from the primary site layout, near the closing body tag:

```astro
<script src="/assets/convera-visibility.js" defer></script>
<script src="/assets/convera-growth.js" defer></script>
```

`convera-growth.js` does not contact an analytics vendor. It emits a first-party browser event and uses an existing `dataLayer` only if the site has already created one.

## 3. Navigation integration

Merge public visibility links into the approved header rather than building a second navigation bar:

```astro
---
import VisibilityNavLinks from '../components/visibility/VisibilityNavLinks.astro';
---
<VisibilityNavLinks speaking={true} follow={true} pressKit={false} />
```

Recommended launch hierarchy:

- Speaking may appear in main navigation if space allows.
- Follow the Work is appropriate in the footer, publication CTA, or restrained header utility area.
- Press Kit should generally remain under Speaking/Media rather than competing for primary-navigation space.

Do not add Intake to public navigation.

## 4. Footer

```astro
---
import VisibilityFooterLinks from '../components/visibility/VisibilityFooterLinks.astro';
---
<VisibilityFooterLinks />
```

## 5. Publications

Replace the 2.29 `PublicationCTA.astro` with this release's version and render it near the end of Convera-hosted public articles/publications. Pass a stable source identifier when available.

## 6. Contact attribution

The existing `convera-visibility.js` automatically attaches current-session attribution to a form named `website-contact`. Preserve the form name and do not rename those hidden `source_*` fields without also updating the script.

## 7. Privacy page

Import `AttributionDisclosure.astro` into the existing Privacy page after the section explaining forms/communications. Review the complete Privacy page before launch, especially after choosing newsletter, analytics, payment, e-signature, or file-service providers.

## 8. Follow the Work

At launch, `follow-the-work` may continue to function as an expression-of-interest record. Do not bulk-email those records until an email provider is selected and confirmation, unsubscribe, suppression, and retention behavior are configured.

## 9. Analytics provider

Do not hard-wire a provider merely to satisfy 2.30. See `docs/ANALYTICS-EVENTS.md`. Connect only the events you actually intend to use.

## 10. Launch audit

After deployment:

```bash
node scripts/audit-public-journey.mjs https://converastrategies.com
```

Then execute `docs/END-TO-END-LAUNCH-TEST.md` manually on desktop and mobile.
