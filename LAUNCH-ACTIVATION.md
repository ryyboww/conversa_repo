# Convera Strategies 2.56.0 — Launch Activation Sequence

## 1. Activate branded correspondence

Confirm send and receive for the five configured Convera mailboxes. Record verification only after real tests succeed.

## 2. Activate contribution checkout

Set hosted one-time and recurring public checkout URLs in Netlify. Keep all secret payment credentials outside `PUBLIC_*` variables.

## 3. Install, diagnose, and build

```bash
npm ci
npm run release:audit
npm run verify:2.56
npm run check
npm run build:verify
```

## 4. Connect GitHub and Netlify

Use `convera_published_codes`, branch `main_conversa`, repository root, build command `npm run build`, and publish directory `dist`.

## 5. Verify Netlify Forms

Expected forms are `website-contact`, `follow-the-work`, `client-intake`, and feature-flagged `convera-newsletter`. `/work-with-convera/` is an orientation page, not a form.

For the professional-services test: submit Contact, review it manually, send the private Intake link directly to the test recipient, submit Intake, and confirm Contact and Intake remain separate submissions with separate notifications.

## 6. Verify public journeys

- **Prospective client:** Work With Convera → Contact → manual review → private Intake invitation → Intake.
- **General correspondent:** Contact → thank-you.
- **Follower:** Follow the Work → follow thank-you.
- **Contributor:** Support → hosted checkout → provider confirmation/return.
- **Reader:** Publications → publication record → original publisher page.
- **Community participant:** Community → relevant Contact pathway.

## 7. Verify presentation

Test light/dark modes, desktop and mobile navigation, keyboard-only navigation, reduced motion, founder portrait treatment, Home featured artwork, publication records, forms, and 404 handling.

## 8. Publish deliberately

<<<<<<< HEAD
Before announcing the site publicly, complete `PRE-LAUNCH-QA.md` and `LAUNCH-CHECKLIST.md`, then preserve the deployed ZIP/repository tag as the launch baseline.


## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
Run `npm run live:audit -- https://converastrategies.com`, update only verified operational flags, and run `npm run deploy:gate`. Preserve the deployed ZIP/repository tag as the launch baseline.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
