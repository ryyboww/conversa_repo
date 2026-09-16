# Post-Deployment Verification

Run this after every material production deployment.

## Automated check

```bash
npm run live:audit -- https://converastrategies.com
```

This is dependency-free and can run anywhere Node 20+ is available.

It checks:

- core launch routes;
- homepage brand and canonical metadata;
- Open Graph metadata;
- founder portrait delivery;
- HSTS, CSP, Referrer Policy, and `nosniff` headers;
- `robots.txt` and sitemap availability;
- RSS availability;
- legacy redirect behavior;
- Contact and client-intake form markup.

## Manual browser check

Use at least one desktop browser and one real mobile device.

Confirm light and dark mode, navigation, focus visibility, forms, external publication links, contribution links, portrait crop, and footer/legal links.

## Revenue-path check

Verify separately:

1. Professional inquiry submission reaches Netlify and the intake thank-you page.
2. One-time support opens the intended hosted checkout.
3. Monthly support opens the intended hosted checkout when enabled.
4. Payment-provider confirmation/receipt language identifies the correct business or payee.

## Search and sharing check

Paste the homepage URL into at least one social/share preview tool after launch. Confirm the branded 1200×630 image, page title, and description appear correctly.

Search indexing is not immediate. The site should expose canonical metadata, robots directives, and sitemap correctly before requesting indexing through any search-engine webmaster tool.
