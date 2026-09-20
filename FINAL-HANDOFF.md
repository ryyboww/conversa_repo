<<<<<<< HEAD
# Convera Strategies 2.14.0 — Launch Console Handoff
=======
# Convera Strategies 2.57.0 — Publication Candidate Handoff
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

Use this release as the current source baseline.

<<<<<<< HEAD
`ConveraStrategies-2.14.0-Launch-Kit.zip`


## Start here

Use `LAUNCH-NOW.md` as the primary launch sequence. Keep the all-in-one Launch Kit as the single required download. Optional technical documents can remain inside the source archive until a specific issue requires them.


Run `npm run launch` whenever you need the next unresolved action. It provides one staged status screen and points to the next command. Use `activation:init` only when you reach the business-activation stage.
=======
The public design, landing-page imagery, responsive system, brand language, publication records, founder identifiers, and Contact/private-Intake workflow are source-frozen for launch preparation.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## Start here

Use `LAUNCH-NOW.md` for the shortest launch sequence. Use `SOURCE-FREEZE.md` to distinguish permitted launch fixes from post-launch redesign work.

The approved founder identity is:

**Ryan Brown, M.A. · Ph.D. Student · Lecturer · Researcher**

The approved professional-services path is:

**Work With Convera → Contact → manual review → direct private Intake invitation → Intake.**

The Contact form and Intake form are separate. `/intake/` remains noindex and absent from public navigation.

## Before deployment

<<<<<<< HEAD
1. Activate and test `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`.
2. Create one-time and monthly hosted contribution checkout URLs.
3. Configure public environment values in Netlify.
4. Run `npm run external:audit` after DNS/email/checkout configuration, then `npm run ops:strict` once contribution values are present.
5. Run the guarded remote bootstrap plan, then configure/push the verified `main_conversa` branch and `v2.14.0` tag to the production GitHub repository.
6. Wait for the verification workflow to pass.
7. Preserve the resulting `package-lock.json` after the first successful install.

## After deployment

1. Confirm the apex domain is canonical and `www` redirects to it.
2. Confirm Netlify detects Contact, Work With Convera, and Client Intake forms.
3. Submit real form tests—including `/intake/`—and verify the configured mailbox notifications.
4. Test both contribution pathways.
5. Run `npm run external:strict` and `npm run live:audit -- https://converastrategies.com`.
6. Complete desktop/mobile and light/dark QA.
7. Record only verified external steps in `.env.operations` and run `npm run activation:report`.
=======
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
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997


## Client intake and dashboard

- Share prospective clients: `https://converastrategies.com/intake/`
- Dashboard foundation: `https://converastrategies.com/dashboard/`
- The dashboard must remain non-sensitive until secure authentication and a suitable client-data provider are connected.
- Dashboard access/support routes to `help@converastrategies.com`; billing routes to `billing@converastrategies.com`.

## Boundaries

- Do not publish the private Outlook address.
- Do not place payment-provider secret keys in public environment variables.
- Do not describe voluntary support as tax-deductible charitable donations.
- Do not merge consulting/service payments with voluntary contributions.
- Do not expose Intake in public navigation.
- Do not enable unfinished feature-flag modules simply to make the launch appear larger.
- Do not mark external activation complete without real tests.

<<<<<<< HEAD
## Retained operational gate controls

Before treating the launch as complete, use:

- `GO-LIVE-GATE.md`
- `ENVIRONMENT-MAP.md`
- `DOMAIN-DNS-SSL.md`
- `FORM-NOTIFICATIONS.md`
- `FIRST-24-HOURS.md`
- `EXTERNAL-SYSTEMS-VERIFICATION.md`
- `DEPLOYMENT-EXECUTION.md`

The final strict command is `npm run deploy:gate`. It is intentionally expected to fail until every external system has been configured and verified in the real production environment.


## 2.14.0 repository controls

This release retains the repository safeguards from 2.8.0 and adds Git-remote status/strict verification, lock-aware GitHub dependency installation, source-freeze guidance, and a reproducible release archive generated directly from the Git tag. These controls prepare the package for a private GitHub remote without weakening any existing launch gate. `REMOTE-BOOTSTRAP.md` contains the guarded publication sequence.
=======
The final strict command is `npm run deploy:gate`. It is expected to remain blocked until every required external system and real-world QA item has been verified.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
