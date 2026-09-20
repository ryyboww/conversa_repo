# Deployment Notes — Convera Strategies 2.56.0

## Recommended host

Netlify remains the intended deployment target because Contact, Follow the Work, private Intake, and the optional newsletter use Netlify Forms markup.

## Build settings

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 20 (pinned in `.nvmrc`, `.node-version`, and `netlify.toml`)

## Environment variables

Copy only values intentionally activated from `.env.example` into Netlify environment settings.

### Contributions

- `PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe`
- `PUBLIC_SUPPORT_ONE_TIME_URL=<hosted payment link>`
- `PUBLIC_SUPPORT_MONTHLY_URL=<hosted recurring payment link>`

These are public hosted checkout URLs. Do **not** place secret payment-provider keys in public variables. Configure hosted checkout success/return behavior to `https://converastrategies.com/support/thank-you/`.

### Analytics

`PUBLIC_PLAUSIBLE_DOMAIN` is optional. Leave blank to keep analytics disabled.

## Forms

After the first production deploy, open Netlify Forms and verify:

- `website-contact`
- `follow-the-work`
- `client-intake`
- `convera-newsletter` only when intentionally enabled

`/work-with-convera/` is not a Netlify intake form. It is the public orientation page leading prospective clients to Contact. After manual Contact review, Convera sends the separate private Intake invitation directly when more project detail is useful.

Configure form-submission notifications using `FORM-NOTIFICATIONS.md` and submit live tests rather than assuming detection from local preview.

## Domain

Before launch, confirm:

- `converastrategies.com` resolves to the production Netlify site;
- `www.converastrategies.com` redirects consistently to the canonical host;
- HTTPS is active; and
- canonical URLs use `https://converastrategies.com`.

## Verification commands

```bash
npm ci
npm run release:audit
npm run verify:2.56
npm run check
npm run build:verify
npm run preview
```

GitHub Actions remains the preferred verification environment when local npm registry access is unavailable.
