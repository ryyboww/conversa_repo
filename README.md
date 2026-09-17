# conversa_repo
conversa repository page

# Convera Strategies 2.33.0 — Homepage Composition Recovery

This release is a visual-recovery patch, not a feature release.

The approved mockup remains the visual reference, but this candidate deliberately tightens the composition further based on review feedback. The main goals are proportionality, even spacing, stable branding, restrained typography, and removal of unnecessary footer duplication.

## Publication blockers addressed

- no header logo disappearance on scroll;
- no scroll-state resizing or fading;
- moon icon only for theme control;
- hero typography reduced by roughly 25%;
- hero height reduced and constrained;
- no second footer navigation;
- no footer catchphrase;
- smaller footer logo;
- descriptor held to one line without overflow;
- desktop, tablet, and mobile layout rules avoid overlap.

Run `node scripts/verify-2.33.mjs` after copying the patch if desired, followed by `npm run check` and `npm run build` in the full project.
