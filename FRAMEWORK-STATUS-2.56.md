# Framework Status — 2.56.0

This release preserves the complete 2.55 public design and content baseline. No public visual redesign is introduced.

The purpose of 2.56.0 is publication-workflow coherence. Current launch scripts and operator documentation now reflect the approved professional-services path:

**Work With Convera → Contact → manual review → direct private Intake invitation → Intake**

`/work-with-convera/` remains a public orientation page. It does not collect detailed Intake information. `/contact/` remains the public first-stage form. `/intake/` remains private/noindex and is used only after manual review and a direct invitation.

The built-output and live-site audit logic has been updated so a correct production build is no longer expected to contain the retired `work-with-convera` Netlify form. Current expected forms are `website-contact`, `follow-the-work`, `client-intake`, and feature-flagged `convera-newsletter`.

The 2.55 Home artwork remains unchanged: `an_objective_strategy.png` is used for Featured Publication and `talk_is_cheap.png` is used for Featured Essay.

Dependency-free source, route, form, metadata, configuration, privacy, accessibility-source, release-readiness, and dedicated 2.56 verification checks can run locally without Astro dependencies. A real `npm ci`, `npm run check`, and `npm run build:verify` remain required in an environment with registry access before the site is declared operationally ready to publish.
