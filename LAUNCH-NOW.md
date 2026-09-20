# Convera Strategies 2.56.0 — Launch Now

**Production repository:** `convera_published_codes`  
**Production branch:** `main_conversa`

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

```bash
npm run live:audit -- https://converastrategies.com
npm run go-live:status
```

Verify canonical domain, HTTPS, forms, notifications, desktop/mobile behavior, light/dark themes, keyboard navigation, reduced motion, social sharing, and contribution flow.

## 6. Final launch gate

```bash
npm run deploy:gate
```

Only a fully passing strict gate should be treated as operational launch readiness.
