# Convera Strategies 2.4.0 — Go-Live Gate Handoff

Use this release as the current working baseline:

`ConveraStrategies-2.4.0-Go-Live-Gate.zip`

The approved public design and content architecture should remain stable unless a confirmed defect, accessibility issue, content correction, or deliberate business decision requires a change.

## Before deployment

1. Activate and test `ryan@converastrategies.com` and `hello@converastrategies.com`.
2. Create one-time and monthly hosted contribution checkout URLs.
3. Configure public environment values in Netlify.
4. Run `npm run ops:strict` once contribution values are present.
5. Push the package to the production GitHub repository.
6. Wait for the verification workflow to pass.
7. Preserve the resulting `package-lock.json` after the first successful install.

## After deployment

1. Confirm the apex domain is canonical and `www` redirects to it.
2. Confirm Netlify detects Contact and Work With Convera forms.
3. Submit real form tests and verify mailbox delivery.
4. Test both contribution pathways.
5. Run `npm run live:audit -- https://converastrategies.com`.
6. Complete desktop/mobile and light/dark QA.
7. Record only verified external steps in `.env.operations` and run `npm run activation:report`.

## Boundaries

- Do not publish the private Outlook address.
- Do not place payment-provider secret keys in public environment variables.
- Do not describe voluntary support as tax-deductible charitable donations.
- Do not merge consulting/service payments with voluntary contributions.
- Do not enable unfinished feature-flag modules simply to make the launch appear larger.
- Do not mark external activation complete without real tests.

## 2.4.0 operational gate additions

Before treating the launch as complete, use:

- `GO-LIVE-GATE.md`
- `ENVIRONMENT-MAP.md`
- `DOMAIN-DNS-SSL.md`
- `FORM-NOTIFICATIONS.md`
- `FIRST-24-HOURS.md`

The final strict command is `npm run deploy:gate`. It is intentionally expected to fail until every external system has been configured and verified in the real production environment.
