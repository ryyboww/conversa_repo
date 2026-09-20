# Convera Strategies — Launch Checklist

## Brand and content

- [x] Lock brand descriptor: Social Perspectives · Workplace Culture · Organizational Strategy.
- [x] Add Mission to navigation.
- [x] Preserve Community as a core section.
- [x] Preserve visible Support/contribution pathways.
- [x] Keep “A Moment of Transition” primarily on Mission.
- [x] Preserve Featured Publication on homepage.
- [x] Separate contributions from paid services.
- [x] Include Ryan Brown portrait in the launch candidate.
- [x] Explain how a client engagement begins on Services.
- [ ] Final proofread of Services, Mission, Support, About, Community, and publication records.

## Email

- [ ] Activate `ryan@converastrategies.com`.
- [ ] Activate `hello@converastrategies.com`.
- [ ] Activate `help@converastrategies.com`.
- [ ] Reserve or activate `admin@converastrategies.com` for private administration.
- [ ] Verify SPF, DKIM, and DMARC with the chosen email provider.

## Technical

- [x] Run dependency-free source/path audit.
- [x] Add dependency-free launch-readiness audit.
- [ ] Run `npm ci` on an internet-connected Node 20 environment.
- [ ] Run `npm run launch:audit` locally.
- [ ] Run `npm run check` and resolve Astro diagnostics.
- [ ] Run `npm run build:verify` successfully.
- [ ] Confirm `converastrategies.com` points to the correct Netlify production site.
- [ ] Confirm HTTPS certificate is active.
- [ ] Test light and dark mode on desktop and mobile.
- [ ] Test keyboard navigation and visible focus states.
- [ ] Check every navigation and footer link.
- [ ] Test 404 page.
- [ ] Confirm `/rss.xml`, sitemap, manifest, and robots.txt in production.

## Contact and private Intake

- [ ] Confirm Netlify Forms detects `website-contact`.
- [ ] Confirm professional inquiries remain Contact-first and are reviewed manually.
- [ ] Send the private Intake link directly only after review when more project context is useful.
- [ ] Confirm Netlify Forms detects `client-intake` separately and the route remains noindex/public-navigation-free.
- [ ] Confirm Netlify Forms detects `follow-the-work`.
- [ ] Configure form-submission notification email.
- [ ] Test each prefilled contact pathway from Services and Community.
- [ ] Test live submission and Thank You redirect.
- [ ] Confirm Reply-To uses the visitor's email where supported.

## Contributions

- [ ] Add hosted one-time payment URL to deployment environment.
- [ ] Add hosted recurring payment URL to deployment environment.
- [ ] Set hosted checkout success redirect to `/support/thank-you/`.
- [ ] Test one-time contribution flow.
- [ ] Test monthly contribution flow.
- [ ] Confirm payment-provider receipt language and Convera branding.
- [ ] Confirm contribution disclaimer remains visible.

## Publications

- [x] Keep launch list limited to completed public work.
- [x] Add internal publication record pages.
- [ ] Recheck every publication URL immediately before launch.
- [ ] Confirm publication dates, author order, and descriptions against the authoritative source.
- [ ] Test all original-publisher links.

## Legal / operational review

- [x] Add Privacy page.
- [x] Add Accessibility page.
- [x] Add Terms page.
- [ ] Review final Terms and Privacy language before public launch.
- [ ] Complete business-name/entity and trademark-clearance decisions separately from website deployment.
- [ ] Keep home address off public website and business card.

## Keep deactivated unless intentionally enabled

- Newsletter
- Student Resources
- Supporter Lounge
- Podcast
- Institute
- Events
- Speaking


<<<<<<< HEAD
## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
## 2.56.0 client operations note

Launch email verification covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. Professional inquiries begin through the public Contact pathway. The `/intake/` route (`client-intake` in Netlify) is private/noindex and is used only after manual review and a direct Intake invitation. The `/dashboard/` route remains a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
