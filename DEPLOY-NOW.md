# Convera Strategies — Deploy Now

This document is the shortest path from the verified source package to a live Convera Strategies site.

## 1. Activate the external items first

Before production deployment, confirm:

- `ryan@converastrategies.com` receives mail.
- `hello@converastrategies.com` receives mail.
- The one-time contribution checkout URL is live.
- The monthly contribution checkout URL is live, if monthly support will launch immediately.

Copy `.env.example` to `.env` for local testing only. Do not commit `.env`.

Required public values:

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=https://...
PUBLIC_SUPPORT_MONTHLY_URL=https://...
```

`PUBLIC_PLAUSIBLE_DOMAIN` is optional and may remain blank.

## 2. Put this source in the production GitHub repository

The recommended production branch is `main`.

The repository already contains a verification workflow. Every push to `main` should install dependencies, run release audits, run Astro diagnostics, and create a production build.

Do not proceed to the custom domain until the GitHub verification workflow passes.

## 3. Connect the repository to Netlify

Use the repository root as the base directory.

Netlify configuration is already committed in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 20

Add the public contribution variables in Netlify environment variables before the production build.

## 4. Confirm Netlify Forms

After the first deploy, Netlify should discover these forms:

- `website-contact`
- `work-with-convera`
- `convera-newsletter` only when the newsletter feature is enabled

Submit one test through Contact and one through Work With Convera. Confirm the submissions appear in Netlify and the visitor reaches the expected thank-you page.

## 5. Connect `converastrategies.com`

Add the custom domain in Netlify and follow the DNS instructions Netlify provides for the domain registrar/DNS provider.

Confirm both:

- `https://converastrategies.com`
- the preferred `www` behavior, if used

Do not change existing DNS records unrelated to the website or branded email unless required by the provider.

## 6. Run the live-site audit

After HTTPS is active:

```bash
npm run live:audit -- https://converastrategies.com
```

The audit checks the major public routes, canonical metadata, social metadata, founder image, security headers, robots, sitemap, RSS, redirects, and production form markup.

A GitHub manual workflow is also provided at `.github/workflows/postdeploy-verification.yml`.

## 7. Test the two revenue paths

### Professional work

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
