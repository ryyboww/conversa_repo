# Deployment Notes — Convera Strategies 2.4.0

## Recommended host

Netlify remains the intended deployment target for this package because the contact and optional newsletter forms use Netlify Forms markup.

## Build settings

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 20 (pinned in `.nvmrc`, `.node-version`, and `netlify.toml`)

## Environment variables

Copy only the values you intend to activate from `.env.example` into Netlify's environment settings.

### Contributions

- `PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe`
- `PUBLIC_SUPPORT_ONE_TIME_URL=<hosted payment link>`
- `PUBLIC_SUPPORT_MONTHLY_URL=<hosted recurring payment link>`

These are public hosted checkout URLs. Do **not** place secret payment-provider keys in public variables.

Configure hosted checkout success/return behavior to:

`https://converastrategies.com/support/thank-you/`

### Analytics

`PUBLIC_PLAUSIBLE_DOMAIN` is optional. Leave blank to keep analytics disabled.

## Forms

After the first production deploy, open Netlify Forms and verify both `website-contact` and `work-with-convera` appear. If the newsletter feature is later enabled, also verify `convera-newsletter` appears.

Configure form-submission notifications to the appropriate Convera mailbox. Submit live tests rather than assuming detection from local preview.

## Domain

Before launch, confirm:

- `converastrategies.com` resolves to the production Netlify site.
- `www.converastrategies.com` redirects consistently to the chosen canonical host.
- HTTPS is active.
- Search-engine canonical URLs use `https://converastrategies.com`.

## Verification commands

```bash
npm install
npm run release:audit
npm run check
npm run build
npm run preview
```

The package in this environment has passed the dependency-free release suite and standalone TypeScript checking for core configuration modules. Full Astro compilation still requires installed npm dependencies. A GitHub Actions workflow is included at `.github/workflows/site-verification.yml` to automate install, audits, Astro diagnostics, and production build verification.
