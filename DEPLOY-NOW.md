# Convera Strategies 2.56.0 — Deploy Now

This is the shortest path from the publication-candidate source package to a live Convera Strategies site.

## 1. Verify the source and build

On an internet-connected machine with Node 20:

```bash
npm ci
npm run release:audit
npm run verify:2.56
npm run check
npm run build:verify
```

Do not deploy until the build and built-output audit pass.

## 2. Activate branded email

Verify send and receive for:

- `ryan@converastrategies.com`
- `hello@converastrategies.com`
- `help@converastrategies.com`
- `admin@converastrategies.com`
- `billing@converastrategies.com`

## 3. Activate hosted contribution checkout

Configure public hosted checkout values in Netlify:

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=https://...
PUBLIC_SUPPORT_MONTHLY_URL=https://...
```

Where supported, return successful checkouts to `https://converastrategies.com/support/thank-you/`.

<<<<<<< HEAD
## 2. Put this source in `convera_published_codes`

The recommended production branch is `main_conversa`.

The repository already contains a verification workflow. Every push to `main_conversa` should install dependencies, run release audits, run Astro diagnostics, and create a production build.
=======
## 4. Deploy GitHub → Netlify

Production repository: `convera_published_codes`  
Production branch: `main_conversa`

Netlify uses `npm run build`, publishes `dist`, and runs on Node 20.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## 5. Verify the form workflow

Expected production forms:

- `website-contact`
- `follow-the-work`
- `client-intake`
- `convera-newsletter` only if intentionally enabled

Test Contact first. For professional inquiries, review the Contact submission manually and send the private `/intake/` invitation directly only when additional detail is useful. Then submit an operator/admin test through Intake and confirm the separate `client-intake` submission and notification.

## 6. Verify production journeys

### Professional work

Home/Services → **Work With Convera** → Contact → manual review → direct private Intake invitation → Intake → private thank-you page.

### General correspondence

Contact → `website-contact` → general thank-you page.

### Follow the work

Follow → `follow-the-work` → follow thank-you page.

### Contributions

Support → hosted checkout → provider confirmation → Convera support thank-you page where supported.

## 7. Connect the domain and run live verification

After HTTPS is active:

```bash
npm run live:audit -- https://converastrategies.com
npm run go-live:status
```

Then verify mobile navigation, desktop composition, light/dark mode, keyboard navigation, form notifications, social sharing, and contribution flow in real browsers.

## 8. Final gate

Only after every external and browser test is genuinely complete:

```bash
npm run deploy:gate
```

<<<<<<< HEAD
Home/Services → **Work With Convera** → submit intake → thank-you page.

### Contributions

Home/Support → contribution option → hosted checkout → return/confirmation flow.

Perform one real low-value test contribution if the payment provider permits it, then confirm the payment record, receipt, and return experience.

## 8. Launch only after these are true

- GitHub verification workflow passes.
- Netlify production deploy passes.
- Both live forms have been submitted successfully.
- Contribution links open the correct hosted checkout pages.
- Mobile navigation and theme toggle work on a real phone.
- Light and dark mode are readable across Home, Mission, Services, Publications, Support, and Work With Convera.
- `npm run live:audit -- https://converastrategies.com` passes.

At that point, the website can be treated as live production rather than a development candidate.


## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
A failing gate means one or more required launch checks remain unverified.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
