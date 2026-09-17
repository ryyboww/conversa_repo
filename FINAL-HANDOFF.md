# Convera Strategies 2.57.0 — Publication Candidate Handoff

Use this release as the current source baseline.

The public design, landing-page imagery, responsive system, brand language, publication records, founder identifiers, and Contact/private-Intake workflow are source-frozen for launch preparation.

## Start here

Use `LAUNCH-NOW.md` for the shortest launch sequence. Use `SOURCE-FREEZE.md` to distinguish permitted launch fixes from post-launch redesign work.

The approved founder identity is:

**Ryan Brown, M.A. · Ph.D. Student · Lecturer · Researcher**

The approved professional-services path is:

**Work With Convera → Contact → manual review → direct private Intake invitation → Intake.**

The Contact form and Intake form are separate. `/intake/` remains noindex and absent from public navigation.

## Before deployment

1. Run `npm ci`, `npm run check`, and `npm run build:verify` in an internet-connected Node 20 environment.
2. Push the verified source to `convera_published_codes`, branch `main_conversa`, and allow CI to repeat the verification suite.
3. Activate and test `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`.
4. Configure one-time and monthly hosted contribution checkout URLs.
5. Deploy to Netlify and verify the canonical domain and HTTPS.

## After deployment

1. Confirm Netlify detects `website-contact`, `follow-the-work`, and `client-intake` as separate forms.
2. Submit a public Contact test. For the professional-flow test, review the Contact submission manually before sending the private Intake link directly to the test recipient.
3. Submit the private Intake test and confirm its separate notification.
4. Test both contribution pathways.
5. Run `npm run live:audit -- https://converastrategies.com`.
6. Complete desktop/mobile, light/dark, keyboard, reduced-motion, and social-sharing QA.
7. Record only verified external steps in `.env.operations` and run `npm run go-live:status`.

## Client intake and dashboard

- Private Intake route: `https://converastrategies.com/intake/` — send directly only after manual review when additional project detail is useful.
- Dashboard foundation: `https://converastrategies.com/dashboard/` — no client-specific data until secure authentication and an appropriate data/document provider are connected.
- Dashboard support routes to `help@converastrategies.com`; billing routes to `billing@converastrategies.com`.

## Boundaries

- Do not publish the private Outlook address.
- Do not place payment-provider secret keys in public environment variables.
- Do not describe voluntary support as tax-deductible charitable donations.
- Do not merge consulting/service payments with voluntary contributions.
- Do not expose Intake in public navigation.
- Do not enable unfinished feature-flag modules simply to make the launch appear larger.
- Do not mark external activation complete without real tests.

The final strict command is `npm run deploy:gate`. It is expected to remain blocked until every required external system and real-world QA item has been verified.
