# Convera Strategies 1.9.0 — Production Hardening

This release preserves the approved visual and content direction and concentrates on the production layer surrounding it.

## Added in 1.9.0

- Dedicated 1200 × 630 social-sharing card using the approved Convera identity and founder portrait.
- PNG favicon variants and Apple touch icon.
- 192 × 192 and 512 × 512 manifest icons.
- Expanded Open Graph and Twitter metadata, including image dimensions and image alt text.
- Stronger Netlify response headers, including CSP, HSTS with subdomains, and Cross-Origin-Opener-Policy.
- `metadata:audit` for social/manifest assets.
- `config:audit` for canonical domain, branded mailbox declarations, security headers, and HTTPS contribution links when configured.
- `production:audit` to run the full dependency-free launch audit suite.

## External activation still required

The code intentionally does not invent or hard-code external account details. Before public launch:

1. Add the live one-time contribution checkout URL.
2. Add the live monthly contribution checkout URL.
3. Activate and test the branded email mailboxes used by the site.
4. Deploy to Netlify and confirm all three forms appear in the Netlify Forms dashboard.
5. Submit a test message through Contact and Work With Convera.
6. Complete one test contribution using the production hosted checkout flow.
7. Run a full Astro build on a machine where npm dependencies can be installed.
8. Test the deployed site on phone, tablet, and desktop in both light and dark themes.

## Release principle

No new site architecture was introduced in this release. Home, Mission, Services, Publications, Community, About, Contact, Work With Convera, and Support remain the established launch pathways.
