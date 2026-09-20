<<<<<<< HEAD
# Convera Strategies 2.14.0 — Launch Now
=======
# Convera Strategies 2.56.0 — Launch Now
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

**Production repository:** `convera_published_codes`  
**Production branch:** `main_conversa`

<<<<<<< HEAD
This release preserves the approved compact editorial system, shared sitewide reveal behavior, branded-email routing, and private project infrastructure. Professional inquiries begin through Contact; the Intake route remains private/noindex and is used only after manual review and invitation.

## 1. Verify the Astro site on an internet-connected computer

```bash
npm run launch:bootstrap
```

This checks Node, installs dependencies when the npm registry is reachable, runs source audits and Astro checks, builds production output, and audits `dist/`.

## 2. Review launch status

```bash
npm run launch
```

## 3. Publish to GitHub

Plan first:

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git
```

Then publish after confirming the destination:

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git --push
```

## 4. Create the first lockfile

After the tagged release is safely in GitHub:

```bash
npm run framework:lock
```

Review and commit `package-lock.json` to `main_conversa`. Future GitHub/Netlify builds should use `npm ci` once the lockfile exists.

## 5. Activate branded email

Activate and test:

- `ryan@converastrategies.com`
- `hello@converastrategies.com`
- `help@converastrategies.com`
- `admin@converastrategies.com`
- `billing@converastrategies.com`

Use `EMAIL-ACTIVATION.md` and record only completed tests with `npm run activation:set`.

## 6. Deploy to Netlify

Netlify remains configured for:

- build command: `npm run build`
- publish directory: `dist`
- Node: 20
- production branch: `main_conversa`

After deployment, configure form notifications using `FORM-NOTIFICATIONS.md`.

## 7. Verify direct intake and dashboard foundation

Test:

- `/intake/` and `/intake/thank-you/`
- `client-intake` Netlify submission and notification
- `/dashboard/` remains noindex/no-store and contains no client-specific data

Do not place real client information in the dashboard until secure authentication is connected.

## 8. Complete production QA
=======
The public design is source-frozen. Remaining work is verification and external activation rather than additional redesign.

## 1. Verify the Astro package

On an internet-connected Node 20 environment:

```bash
npm ci
npm run release:audit
npm run verify:2.56
npm run check
npm run build:verify
```

## 2. Publish the source to GitHub and connect Netlify

Push the verified source to `main_conversa`. Let CI repeat install, diagnostics, production build, and built-output verification.

## 3. Activate branded email and hosted contributions

Verify the five configured mailboxes. Add live one-time and monthly hosted checkout URLs and provider label.

## 4. Verify the separated Contact/Intake workflow

Professional inquiries begin through Contact. Review the Contact submission manually. When further project detail is appropriate, send the private `/intake/` invitation directly to the intended recipient. The Intake route remains noindex and absent from public navigation.

After deployment, confirm:

- `website-contact` is detected and notified correctly;
- `client-intake` is detected separately and notified correctly;
- `follow-the-work` is detected and notified correctly; and
- `convera-newsletter` remains disabled unless intentionally activated.

## 5. Complete live production QA
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

```bash
npm run live:audit -- https://converastrategies.com
npm run go-live:status
<<<<<<< HEAD
npm run ready:strict
```

Verify the high-UI scroll experience on desktop and mobile, dark mode, reduced-motion behavior, forms, redirects, HTTPS, contribution paths, and social sharing.
=======
```

Verify canonical domain, HTTPS, forms, notifications, desktop/mobile behavior, light/dark themes, keyboard navigation, reduced motion, social sharing, and contribution flow.

## 6. Final launch gate

```bash
npm run deploy:gate
```

Only a fully passing strict gate should be treated as operational launch readiness.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
