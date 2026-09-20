## 2.41.0 — Fluid Desktop & Client Range

- Added the approved brand tagline **People are what we do.** to the shared site configuration and key public page heroes; recorded it for future stationery and print-brand work.
- Reworked desktop responsiveness so typography, gutters, navigation, hero proportions, and major grids scale fluidly with the browser rather than jumping through multiple intermediate layouts.
- Standardized the intentional mobile breakpoint at 820px across the principal public layouts; mobile remains a separate stacked experience.
- Matched the second Home feature row to the Featured Publication/Support row using the same two-column grid, image/text proportions, spacing, and card alignment.
- Removed the old hard divider from the featured-publication copy and replaced the secondary feature split with normal inter-card spacing.
- Enlarged Areas of Inquiry with more vertical presence, larger icons, larger labels, and broader service language including policing and courts.
- Added a balanced Services client-setting section covering Workplaces & Organizations, Policing & Public Safety, Courts & Justice Institutions, and Public & Community Institutions.
- Added public-domain provenance documentation for the policing/public-safety image and preserved no-referrer loading for the remote source.
- Preserved the 2.40 publication/blog architecture, public/private workflow boundaries, sitewide reveal behavior, and compact footer/header brand controls.

## 2.40.0 — Publication Rhythm & Content Coherence

- Tightened shared section and page-hero spacing so interior pages better match the compact editorial rhythm established on Home.
- Reduced Publications and Essays & Notes card height while preserving readable body copy.
- Increased the primary homepage button label slightly for better legibility.
- Replaced design-process language on Community with publication-ready participation language.
- Added FAQPage structured data to the Work With Convera Q&A without changing the visible content.
- Preserved the 2.39 information architecture, founder/profile separation, blog readiness rules, sitewide reveal behavior, and public/private workflow boundaries.

# 2.39.0 — Editorial Polish & Archive Readiness

- Compact publication and essay archives.
- Editorial imagery for public-ready essays.
- Dense archive hero mode.
- Refined sitewide reveal behavior.
- Incomplete legacy essays preserved as drafts rather than publicly exposed.
- Softer shared card geometry and refined About imagery.

## 2.38.0 — Editorial Expansion, Profile & Compact Publications

- Added a second compact Home feature pairing a selected essay with a people-in-conversation image without disrupting the existing homepage sequence.
- Rebuilt Publications as a compact three-column archive with shorter image and text blocks so multiple records remain visible within a desktop viewport.
- Expanded the formal publication archive to four records and normalized publication-specific legal/institutional imagery.
- Reframed About around Convera as a company, moved fellowship/public-engagement photography out of Community, and placed the founder bridge at the bottom.
- Added a separate founder Profile page focused on experience, vision, institutional work, research, teaching, and public life.
- Removed the fellowship photo gallery from Community so professional fellowship imagery is no longer presented as community representation.
- Added a Work With Convera Questions & Answers section and replaced unnecessary “challenge” framing with project/question/context language.
- Added a Blog / Essays & Notes archive and migrated five completed public-ready essays from the prior Ryan Brown site while leaving unfinished drafts unpublished.
- Added the founder CV as a downloadable Profile resource and preserved the shared 2.37 sitewide reveal/motion system.

## 2.37.0 — Shared Motion, Hero Fade & Publication Image System

- Added one restrained sitewide reveal system with reduced-motion fallback rather than page-specific scroll behavior.
- Updated Home to use the blue-suit founder portrait with a softened edge/fade treatment and modestly larger supporting typography.
- Preserved equal Areas of Inquiry distribution from 2.36.
- Added normalized 16:9 editorial images to every publication record and rebuilt the Publications page around consistent image sizing and card geometry.
- Added publication imagery to individual publication record heroes.
- Added selected founder, community, service, and public-engagement photography across About, Community, Speaking, and Press Kit.
- Reused suitable editorial image assets from the prior Ryan Brown site only as reference-derived media; prior-site architecture remains excluded.

## 2.36.0 — Hero Softening & Inquiry Grid Balance

- Softened the homepage founder portrait with restrained 18px corners and balanced vertical breathing room.
- Kept public presentation static; no new scroll-driven animation or page-specific sticky behavior was introduced.
- Rebuilt Areas of Inquiry as three equal-width cells with even padding, subtle dividers, and a single shared container.
- Added stacked mobile separators so the inquiry section retains the same visual logic at narrow widths.
- Preserved the 2.35 shared public-page architecture and global sticky header.

## 2.35.1 — Typecheck & Consolidation Hotfix

- Fixed malformed multiline inquiry message strings in `src/config/inquiries.ts`.
- Added explicit `is:inline` handling for structured-data and external public scripts to reduce Astro diagnostics.
- Removed unused imports introduced by the site-wide consolidation.
- Removed several unused operational imports reported by `astro check`.
- Updated release-readiness version assertions to 2.35.1.
- No visual redesign introduced; 2.35 site-wide consistency remains the visual baseline.

# Changelog

<<<<<<< HEAD
=======
## 2.59.0 — Security Configuration Completeness

- Restored the missing private operations and portal-security configuration template referenced by the installation and verification guides.
- Documented every operator, signed-link, portal-code, transactional-email, and operations-intelligence setting without storing real credentials.
- Added operator authorization, signed-token, portal-verification, client-data filtering, document-control, reminder, and closeout tests to the normal release audit.
- Preserved the 2.58 workstream boundary and the complete verified public design, navigation, forms, founder identity, and Contact → private Intake workflow.

## 2.58.0 — Workstream Boundary Protection

- Added an automatic release check which keeps Operations Manual working files and manual-version artifacts out of the website package.
- Added a plain-language boundary guide defining the website and manual as separate controlled workstreams.
- Required deliberate review before policy or procedure language moves from one workstream into the other.
- Preserved the complete verified 2.57 design, founder identifiers, navigation, forms, privacy controls, and Contact → manual review → private Intake workflow.

## 2.57.0 — Founder Identity Clarification

- Added **Ryan Brown, M.A. · Ph.D. Student · Lecturer · Researcher** as a clear founder-identity system across high-visibility public surfaces.
- Added a compact founder-credentials line to the Home hero without changing the approved composition or calls to action.
- Updated the Founder Profile, About founder bridge, Press Kit, and downloadable bios so academic, teaching, research, and founder roles are immediately legible.
- Centralized founder credential and role labels in `src/config/site.ts` for consistent future updates.
- Extended structured Person metadata with the M.A. credential and current professional roles.
- Revised press guidance to distinguish **Ph.D. Student** from a conferred **Ph.D.** degree.
- Preserved the 2.56 Contact → manual review → private Intake workflow, landing artwork, responsive design, navigation, publication records, and privacy boundary.

## 2.56.0 — Publication Workflow Coherence

- Preserved the complete 2.55 public design, responsive behavior, landing-page artwork, publication records, and brand system.
- Synchronized launch operations with the approved professional-services flow: Work With Convera → Contact → manual review → direct private Intake invitation → Intake.
- Removed obsolete production-audit assumptions that `/work-with-convera/` still contains a Netlify intake form.
- Updated built-output and live-site audits to verify the current `website-contact`, `follow-the-work`, and private `client-intake` pathways.
- Refreshed launch, deployment, source-freeze, GitHub/Netlify, and operator-facing documentation so current instructions match the implemented source.
- Kept the Intake route private/noindex and outside public navigation.

## 2.55.0 — Landing Editorial Image Refresh

- Replaced the Home Featured Publication image with the supplied `an_objective_strategy.png` artwork.
- Replaced the Home Featured Essay image with the supplied `talk_is_cheap.png` artwork.
- Scoped both replacements to the landing page so publication records, blog article imagery, copy, routes, and the 2.54 responsive composition remain unchanged.


## 2.54.0 — Fluid Desktop Composition Hardening

- Added a dedicated 821–1080px desktop/tablet calibration while preserving the separate mobile layout below 820px.
- Reduced header brand/navigation gaps and type proportionally at narrower desktop widths without collapsing into the mobile menu.
- Kept the Home hero in its two-column right-edge-portrait composition while reducing the risk of text/image crowding as the browser narrows.
- Rebalanced Home feature rows and Areas of Inquiry at intermediate desktop widths so cards, copy, icons, and gaps scale together rather than reflowing abruptly.
- Added intrinsic image dimensions and a local institutional fallback for the externally hosted public-safety image on Services.
- Preserved the 2.53 messaging, slogan lockup, Support framing, company voice, and Contact → private Intake workflow.


## 2.53.0 — Final Public Flow & Documentation Coherence

- Made the private `/intake/` page explicitly invitation-only after an initial Contact review.
- Aligned the Intake confirmation page with the same private-review workflow.
- Reframed the Support confirmation page around extending Ryan Brown’s writing, speaking, and institutional-change work into more settings.
- Replaced figurative 404 language with a direct “This page is unavailable.” message.
- Removed repeated institutional-investment language from the Mission hero while preserving the current mission framing.
- Changed the About method step from “Protect what is working” to “Preserve what is working.”
- Corrected stale README and release-manifest references to older verification versions.
- Preserved the 2.52 visual design, slogan lockup, third-person company voice, and Contact → private Intake workflow.

## 2.51.0 — Launch Configuration & Message Coherence

- Reframed the Home and Mission lede around strengthening institutions rather than protecting them, bringing the public language into alignment with the incremental-change approach established elsewhere on the site.
- Replaced the generic Home support heading with “Help the Work Travel Farther.”
- Changed the Home support kicker to “Support the Work” so contributions read as support for Ryan Brown’s public-facing work rather than as a generic contribution to the business.
- Refined Support metadata and disclosure copy to emphasize independent publications, speaking, public engagement, and the broader reach of ideas associated with Convera Strategies.
- Preserved the 2.50 design, slogan lockup, third-person company voice, private Intake boundary, and runtime/accessibility improvements.
- Restored `.env.example` and `.env.operations.example`, which are required by the launch/activation scripts and were missing from the distributed 2.50 package.
- Removed obsolete documentation describing `/intake/` as a direct/shareable prospective-client route; current operational docs now preserve Contact → manual review → private Intake invitation.
- Corrected form-notification documentation to match the four forms actually present in source: `website-contact`, `follow-the-work`, `client-intake`, and feature-flagged `convera-newsletter`.
- Rewrote `RELEASE-VERIFICATION.md` so it describes the current release boundary rather than the obsolete 2.14 architecture.

## 2.50.0 — Runtime Accessibility & Stability Polish

- Preserves the 2.49 visual design and clean slogan lockup.
- Raises the keyboard skip link above the sticky header.
- Uses state-safe mobile-navigation labeling and closes the mobile menu after a navigation choice.
- Makes theme persistence resilient when browser storage is unavailable.
- Requests `display=swap` for Google Fonts.
- Removes an obsolete Home-motion selector left from an earlier hero composition.

## 2.49.0 — Clean Slogan Lockup

- Removed the decorative horizontal rules before and after **People are what we do.** in the header brand lockup.
- Preserved the slogan directly beneath the wordmark, using the existing restrained italic treatment and alignment.
- Updated brand guidance so future business cards and stationery use the same clean logo-plus-slogan relationship.
- No architecture, homepage composition, Support messaging, or Contact/Intake workflow changes in this pass.

## 2.48.0 — Shared Conversion Voice Coherence

- Updated the shared Support panel so every page inherits the stronger 2.47 message about writing, speaking, public engagement, and extending the reach of ideas about thoughtful institutional change.
- Replaced residual company-facing “challenge” language with questions, decisions, situations, and context across Services, Mission, and the shared commercial call to action.
- Preserved the Contact-first manual-review workflow and private Intake boundary.
- Preserved third-person company voice and kept the approved slogan confined to the header brand lockup.

## 2.47.0 — Compact Hero & Support Voice

- Reduced the Home hero height while preserving the right-edge portrait, founder identity panel, two-line headline, and calls to action.
- Reframed Support around the reach of an independent voice committed to thoughtful institutional change.
- Clarified how contributions support research, writing, speaking, travel, and bringing ideas into more organizations and public settings.
- Preserved the separation between voluntary support and paid professional services.

## 2.46.0 — Cross-Page Editorial Coherence

- Aligned Essays & Notes cards with the compact Publications archive geometry.
- Replaced internal source-archive language with public-facing editorial copy.
- Made footer width follow the same fluid gutter system used across the site.
- Increased footer descriptor legibility while keeping the slogan confined to the header brand lockup.
- Refined Support language around independent, founder-led work while preserving third-person company voice.

## 2.45.0 — Third-Person Company Voice

- Removed first-person plural company language from public-facing site copy.
- Preserved “People are what we do.” as the approved brand-slogan exception.
- Reframed Mission, About, Community, Support, and Home calls to action in third-person or neutral language.
- Reserved personal first-person voice for the founder profile and authored essays.

## 2.44.0 — Slogan Lockup & Company-Facing Brand Separation

- Restyled **People are what we do.** as an intentional slogan beneath the wordmark with restrained italic typography and short hairline rules; preserved the treatment for future business cards and stationery.
- Removed fellowship, state-house, Maryland, and prior-service photography from company-facing Home, About, Services, and Speaking pages; retained personal institutional imagery within the Founder Profile.
- Added neutral Convera visual placeholders for people/connection, institutions/systems, and workplace collaboration.
- Reframed **How Convera Works** around beginning with the client’s current state, protecting strengths, and moving through deliberate strategic increments toward a defined outcome.
- Rebuilt the About founder bridge with the previously unused executive portrait and a shorter, more compact presentation.
- Established naming guidance: **Convera Strategies** for formal identification and first substantive references, **Convera** as the conversational short form.

## 2.43.0 — Brand Lockup & Homepage Alignment

- Aligned **People are what we do.** beneath the wordmark portion of the Convera logo so the header reads as a single brand lockup.
- Refined the right-edge founder portrait with a true left fade into the hero field while preserving the borderless presentation.
- Retained the founder quote, name, and title in the translucent identity panel directly beneath the portrait.
- Rebuilt the Home Support and Connection cards on one shared side-card structure so both feature rows use matching proportions, separators, and spacing.
- Preserved the dedicated stacked mobile composition below 820px.

## 2.42.0 — Brand Lockup & Right-Edge Hero

- Integrated **People are what we do.** directly beneath the Convera logo in the persistent header and removed duplicate visible tagline placements from Home and interior page heroes.
- Rebuilt the desktop Home hero as a two-part composition: editorial copy on the left and the founder portrait aligned to the right edge, with no portrait border or card shadow.
- Moved the founder quote, name, and title into a translucent panel beneath the portrait image.
- Rebalanced the people-connection feature into a compact image-and-copy card aligned with the support card above; removed the oversized floating tagline caption.
- Preserved a deliberately separate mobile hero composition below 820px.

## 2.41.0 — Fluid Desktop & Client Range

- Added the approved brand tagline **People are what we do.** to the shared site configuration and key public page heroes; recorded it for future stationery and print-brand work.
- Reworked desktop responsiveness so typography, gutters, navigation, hero proportions, and major grids scale fluidly with the browser rather than jumping through multiple intermediate layouts.
- Standardized the intentional mobile breakpoint at 820px across the principal public layouts; mobile remains a separate stacked experience.
- Matched the second Home feature row to the Featured Publication/Support row using the same two-column grid, image/text proportions, spacing, and card alignment.
- Removed the old hard divider from the featured-publication copy and replaced the secondary feature split with normal inter-card spacing.
- Enlarged Areas of Inquiry with more vertical presence, larger icons, larger labels, and broader service language including policing and courts.
- Added a balanced Services client-setting section covering Workplaces & Organizations, Policing & Public Safety, Courts & Justice Institutions, and Public & Community Institutions.
- Added public-domain provenance documentation for the policing/public-safety image and preserved no-referrer loading for the remote source.
- Preserved the 2.40 publication/blog architecture, public/private workflow boundaries, sitewide reveal behavior, and compact footer/header brand controls.

## 2.40.0 — Publication Rhythm & Content Coherence

- Tightened shared section and page-hero spacing so interior pages better match the compact editorial rhythm established on Home.
- Reduced Publications and Essays & Notes card height while preserving readable body copy.
- Increased the primary homepage button label slightly for better legibility.
- Replaced design-process language on Community with publication-ready participation language.
- Added FAQPage structured data to the Work With Convera Q&A without changing the visible content.
- Preserved the 2.39 information architecture, founder/profile separation, blog readiness rules, sitewide reveal behavior, and public/private workflow boundaries.

# 2.39.0 — Editorial Polish & Archive Readiness

- Compact publication and essay archives.
- Editorial imagery for public-ready essays.
- Dense archive hero mode.
- Refined sitewide reveal behavior.
- Incomplete legacy essays preserved as drafts rather than publicly exposed.
- Softer shared card geometry and refined About imagery.

## 2.38.0 — Editorial Expansion, Profile & Compact Publications

- Added a second compact Home feature pairing a selected essay with a people-in-conversation image without disrupting the existing homepage sequence.
- Rebuilt Publications as a compact three-column archive with shorter image and text blocks so multiple records remain visible within a desktop viewport.
- Expanded the formal publication archive to four records and normalized publication-specific legal/institutional imagery.
- Reframed About around Convera as a company, moved fellowship/public-engagement photography out of Community, and placed the founder bridge at the bottom.
- Added a separate founder Profile page focused on experience, vision, institutional work, research, teaching, and public life.
- Removed the fellowship photo gallery from Community so professional fellowship imagery is no longer presented as community representation.
- Added a Work With Convera Questions & Answers section and replaced unnecessary “challenge” framing with project/question/context language.
- Added a Blog / Essays & Notes archive and migrated five completed public-ready essays from the prior Ryan Brown site while leaving unfinished drafts unpublished.
- Added the founder CV as a downloadable Profile resource and preserved the shared 2.37 sitewide reveal/motion system.

## 2.37.0 — Shared Motion, Hero Fade & Publication Image System

- Added one restrained sitewide reveal system with reduced-motion fallback rather than page-specific scroll behavior.
- Updated Home to use the blue-suit founder portrait with a softened edge/fade treatment and modestly larger supporting typography.
- Preserved equal Areas of Inquiry distribution from 2.36.
- Added normalized 16:9 editorial images to every publication record and rebuilt the Publications page around consistent image sizing and card geometry.
- Added publication imagery to individual publication record heroes.
- Added selected founder, community, service, and public-engagement photography across About, Community, Speaking, and Press Kit.
- Reused suitable editorial image assets from the prior Ryan Brown site only as reference-derived media; prior-site architecture remains excluded.

## 2.36.0 — Hero Softening & Inquiry Grid Balance

- Softened the homepage founder portrait with restrained 18px corners and balanced vertical breathing room.
- Kept public presentation static; no new scroll-driven animation or page-specific sticky behavior was introduced.
- Rebuilt Areas of Inquiry as three equal-width cells with even padding, subtle dividers, and a single shared container.
- Added stacked mobile separators so the inquiry section retains the same visual logic at narrow widths.
- Preserved the 2.35 shared public-page architecture and global sticky header.

## 2.35.1 — Typecheck & Consolidation Hotfix

- Fixed malformed multiline inquiry message strings in `src/config/inquiries.ts`.
- Added explicit `is:inline` handling for structured-data and external public scripts to reduce Astro diagnostics.
- Removed unused imports introduced by the site-wide consolidation.
- Removed several unused operational imports reported by `astro check`.
- Updated release-readiness version assertions to 2.35.1.
- No visual redesign introduced; 2.35 site-wide consistency remains the visual baseline.

# Changelog

## 2.56.0 — Publication Workflow Coherence

- Preserved the complete 2.55 public design, responsive behavior, landing-page artwork, publication records, and brand system.
- Synchronized launch operations with the approved professional-services flow: Work With Convera → Contact → manual review → direct private Intake invitation → Intake.
- Removed obsolete production-audit assumptions that `/work-with-convera/` still contains a Netlify intake form.
- Updated built-output and live-site audits to verify the current `website-contact`, `follow-the-work`, and private `client-intake` pathways.
- Refreshed launch, deployment, source-freeze, GitHub/Netlify, and operator-facing documentation so current instructions match the implemented source.
- Kept the Intake route private/noindex and outside public navigation.

>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
## 2.35.0 — Site-Wide Visual Consistency & Public Page Consolidation

- Added one shared `PageHero.astro` system for public-facing pages.
- Standardized outer page width, hero scale, typography, section spacing, and responsive behavior across Home, Mission, Services, Publications, Community, About, Contact, Support, Speaking, Press Kit, Follow the Work, and professional inquiry pages.
- Kept the global header sticky while removing page-specific sticky content and obsolete homepage scroll effects.
- Replaced the founder portrait with the newly supplied approved portrait and tuned crops separately for Home, About, and Press Kit.
- Migrated Speaking, Press Kit, and Follow the Work from standalone `public/` HTML into the shared Astro layout so they inherit the same header, footer, theme, spacing, and accessibility behavior.
- Restored the controlled professional-services pathway: public inquiry → Contact review → separate private Intake invitation.
- Removed public links to `/intake/`; the Intake route remains noindex and sitemap-excluded.
- Added shared session attribution and public-journey event scripts through `BaseLayout`.
- Added referral/source disclosure to Privacy.
- Updated source, forms, route, privacy, metadata, accessibility, and release-readiness checks for the current architecture.

## 2.34.0 — Homepage Publication Recovery

- Rebuilt the live homepage from the user-supplied production source instead of patching unused duplicate components.
- Replaced the mismatched homepage markup/CSS pair with one compact, publication-oriented composition based on the approved homepage structure.
- Removed header scroll-state mutation so the Convera logo remains visible and proportionate throughout scrolling.
- Simplified the theme control to a moon icon without visible “Theme” text.
- Reduced hero headline, portrait, quotation, and total hero height to restore proportion and tighter scrolling rhythm.
- Removed the secondary footer navigation and footer catchphrase; reduced the footer logo and retained only social, legal, descriptor, and copyright information.
- Added a clean high-resolution header logo crop and retained a dedicated inverse logo for dark surfaces.
- Removed unused duplicate header/footer component directories that were causing implementation ambiguity.

## 2.14.0 — High-UI Client Experience Candidate

- Reworked the approved homepage into a restrained high-UI scroll experience without changing the core Convera visual identity or content architecture.
- Added compact-on-scroll navigation, scroll progress, section-aware motion, subtle hero depth, staged content reveals, and reduced-motion fallbacks.
- Preserved the approved hero hierarchy: headline, founder portrait, founder quotation, featured publication/support pairing, Areas of Inquiry, and dark closing/footer treatment.
- Added a direct shareable `/intake/` prospective-client form and dedicated success page using a separate Netlify form name (`client-intake`).
- Added a safe `/dashboard/` client-dashboard foundation with noindex/no-store controls and no client-specific data until authentication is connected.
- Expanded branded-email architecture to `ryan@`, `hello@`, `help@`, `admin@`, and `billing@`, including operational verification flags and recommended form-notification routing.
- Retained production repository `convera_published_codes` and production branch `main_conversa`.
- Stored the approved homepage mockup in `design-reference/approved-homepage-high-ui-mockup.png` as a design reference for future parity checks.

## 2.13.1 — Production Repository Alignment

- Aligned deployment tooling to repository `convera_published_codes` and production branch `main_conversa`.
- Updated GitHub workflow, remote bootstrap, repository handoff, and release packaging safeguards for the production branch.
- Added centralized deployment targets and validated the branch/tag push flow against an isolated remote.
- Preserved the 2.13.0 framework bootstrap controls and approved public architecture.

## 2.13.0 — Local Framework Bootstrap Candidate

- Added `npm run launch:bootstrap` as a dependency-free entry point for the first real local framework verification.
- Added registry reachability detection so unavailable npm access is reported immediately instead of hanging through repeated install attempts.
- Added a no-lock pre-publication install path, preserving the tagged Git source while still allowing Astro check/build verification.
- Added `npm run framework:lock` for deliberate post-publication creation of `package-lock.json`, after which normal builds can switch to `npm ci`.
- Added Windows and macOS quick-start launchers inside the source package.
- Updated the Launch Now sequence to separate tagged release publication from the later lockfile commit.

## 2.12.0 — Launch Console Candidate

- Added `npm run launch` as the single staged operator status screen.
- Added `LAUNCH-NOW.md` as the primary concise launch sequence.
- Added `ready:source` and `ready:strict` aliases to reduce command sprawl.
- Simplified release distribution so the Launch Kit contains only launch-essential files; optional technical documents remain inside the tagged source archive.
- Preserved the approved homepage, Mission, Services, Publications, Community, Support, Work With Convera, founder presentation, and feature flags without redesign.
- Retained all repository, privacy, external-system, build, and go-live gates.
- Git bundle now includes an explicit `HEAD` reference and is clone-tested during release packaging so a fresh clone checks out `main` automatically.

## 2.11.0 — Remote Bootstrap Candidate

- Added a guarded `remote:bootstrap` command for planning, configuring, and publishing the verified Git baseline to GitHub.
- The command requires `main`, a clean working tree, and release tag `v2.11.0` at `HEAD` before any remote mutation.
- Existing remote destinations are protected from silent replacement; `--replace` must be explicit.
- `--push` publishes only `main` and the matching release tag, then verifies both refs with `git ls-remote`.
- Added `REMOTE-BOOTSTRAP.md` and extended repository/release audits to require the bootstrap control.
- The bootstrap flow is tested against an isolated local bare repository before packaging.

## 2.9.0 — Remote Repository Handoff Candidate

- Added Git remote status and strict remote preflight commands.
- Added source-freeze guidance for the deployment period.
- Updated GitHub verification to use `npm ci` automatically once a lockfile exists and to cancel superseded workflow runs.
- Added remote repository handoff/status documentation.
- Changed release packaging so the source ZIP is generated directly from the annotated Git release tag, keeping the ZIP and Git bundle aligned to the same tracked tree.
- Preserved all approved public architecture, design, services, publications, support pathways, and activation gates.


## 2.8.0 — Git Repository Baseline Candidate

- Created a portable Git repository baseline on `main`.
- Added an annotated `v2.8.0` release tag for deployment handoff.
- Added a Git bundle workflow so the verified baseline can be imported without an active GitHub connection.
- Added repository import and Git-baseline verification documentation.
- Preserved all existing launch, privacy, activation, and external-system gates.

## 2.7.0 — Repository Handoff Candidate

- Added repository handoff audit and status reporting.
- Added `.editorconfig`, `.gitattributes`, and monthly npm Dependabot configuration.
- Added `handoff:audit` and `deploy:preflight` commands.
- Added repository handoff and package-lock guidance for the first GitHub/Netlify deployment.
- Preserved the 2.6.0 external-systems verification layer and all prior launch gates.


## 2.6.0 — External Systems Verification Candidate

- Added a live DNS/HTTPS audit for `converastrategies.com` and `www.converastrategies.com`.
- Added branded-email DNS inspection for MX, SPF, and DMARC records.
- Added hosted contribution-link verification with HTTPS, reachability, and distinct-link checks.
- Added a consolidated `external:audit` command plus strict external verification mode.
- Added an external-systems verification runbook and deployment-execution sequence.
- Expanded release-readiness controls to require the new external-verification commands.
- Corrected prior changelog stage labels so 2.3.0, 2.4.0, and 2.5.0 match their actual release roles.
- Preserved the approved public design, navigation, content architecture, founder presentation, publications, Support pathway, and Work With Convera intake flow.

## 2.5.0 — Operator Activation Candidate

- Added `activation:init` to safely scaffold local launch environment files without overwriting existing values.
- Added `config:set` with validation for public checkout and optional analytics settings.
- Added `activation:set` with an allowlist for operational verification flags.
- Added `launch:summary` to identify the next unresolved launch action.
- Added `operator:audit` to consolidate runtime, activation, and go-live reporting.
- Added `OPERATOR-CONSOLE.md` and `NEXT-ACTIONS.md` for concise launch operation.
- Preserved the approved visual/site architecture; no redesign was introduced in this release.

## 2.4.0 — Go-Live Gate Candidate

- Added `runtime-doctor.mjs` for local deployment prerequisite inspection.
- Added strict `go-live-gate.mjs` separating source readiness from completed real-world launch verification.
- Added release fingerprint generation for critical source and brand assets.
- Expanded operational verification flags for canonical domain, TLS, form notifications, mobile QA, and social-share QA.
- Added go-live, environment, DNS/TLS, form-notification, and first-24-hours runbooks.
- Added `deploy:gate` as the final strict launch command.
- No approved page architecture or visual direction was redesigned in this release.

## 2.3.0 — Deployment Bootstrap Candidate

- Added `dist:audit` to inspect the generated production output after an Astro build.
- Added `build:verify` so CI/local verification includes both production build and built-output inspection.
- Updated the main `verify` and `release:verify` commands to use the built-output audit.
- Added `activation:report` with local operational status reporting that distinguishes configuration from external verification.
- Added `.env.operations.example` and gitignore protections for local operational verification records.
- Added canonical `www.converastrategies.com` → `converastrategies.com` redirect in Netlify configuration.
- Expanded configuration and privacy audits for hostname normalization and operational-file exposure.
- Updated GitHub verification workflow to run the production build plus built-output audit.
- Added deployment, email, payment, GitHub/Netlify, and activation runbooks.

## 2.2.0 — Operational Activation Candidate

- Removed the private personal Outlook address from production site configuration.
- Added privacy/exposure audit and external activation audit.
- Added form length guardrails and noindex/no-store utility-page controls.

## 2.52.0 — Launch Copy & Head Hygiene

- Refined Home and Mission lead copy to remove repeated “strengthen … strengthen” phrasing.
- Reframed the remaining Mission language around strengthening institutions through thoughtful adaptation rather than protecting every existing practice.
- Simplified the Google Fonts URL to a single `display=swap` parameter.
- Preserved the 2.51 architecture, brand lockup, conversion workflow, and visual design.
