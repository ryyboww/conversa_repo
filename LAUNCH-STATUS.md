# Convera Strategies — Launch Status

<<<<<<< HEAD
**Release:** 2.14.0 Launch Console Candidate
**Source architecture:** Stable
**Dependency-free release audits:** Passing
**Privacy/exposure audit:** Passing
**Runtime core prerequisites:** Passing
**Astro dependency installation:** Pending in this environment
**Production Astro build:** Not yet verified here
=======
**Release:** 2.56.0 Publication Workflow Coherence Candidate  
**Public design/content:** Source-frozen  
**Dependency-free release audits:** Passing when run from clean source  
**Privacy/exposure audit:** Passing  
**Contact/Intake separation:** Implemented  
**Production Astro build:** Still requires verification in an environment with npm registry access  
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
**External activation:** Pending

## Current verified source state

The approved site architecture remains intact. Source-level audits verify required brand assets, routes, form structure, metadata, configuration, accessibility-source controls, and privacy/exposure boundaries. Launch verification now matches the current workflow rather than expecting a retired public professional-intake form.

The professional-services path is **Work With Convera → Contact → manual review → direct private Intake invitation → Intake**. The Contact form and Intake form are separate. `/intake/` remains noindex and absent from public navigation.

## Deliberately unresolved external gates

A real go-live still requires:

- successful `npm ci`, `npm run check`, and `npm run build:verify`;
- live one-time and monthly contribution checkout URLs;
- branded mailbox send/receive tests;
- Netlify production deployment;
- canonical-domain and TLS confirmation;
- production form detection and notification tests;
- end-to-end contribution verification;
- desktop/mobile browser QA; and
- social-sharing preview verification.

Run `npm run go-live:status` for the operational gate. Do not mark external flags complete until the corresponding real-world test has actually passed.
