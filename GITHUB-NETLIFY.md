# Convera Strategies — GitHub + Netlify Handoff

**Production repository:** `convera_published_codes`  
**Production branch:** `main_conversa`


## GitHub repository: `convera_published_codes`

Create or use the production repository for Convera Strategies, then commit the complete source package from this release.

Recommended first push sequence:

```bash
git init
git add .
git commit -m "Prepare Convera Strategies 2.14.0 remote handoff"
git branch -M main_conversa
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main_conversa
```

Do not commit `.env`, `.env.operations`, `node_modules`, `dist`, or generated activation reports.

The included GitHub workflow runs source audits, Astro diagnostics, the production build, and the built-output audit.

### Lockfile note

The current package does not claim a generated `package-lock.json` because npm registry installation has not completed in the present environment. After the first successful dependency installation, commit the resulting lockfile so future CI installs can be made more reproducible.

## Netlify connection

Connect the production GitHub repository to Netlify and use the repository root.

The repository already contains `netlify.toml` with:

- build command: `npm run build`;
- publish directory: `dist`;
- Node 20;
- production security headers;
- utility-page noindex/no-store headers;
- route aliases;
- canonical `www` → apex redirect.

## Environment values

Add only the public values needed by the static build:

```text
PUBLIC_SUPPORT_PROVIDER_LABEL
PUBLIC_SUPPORT_ONE_TIME_URL
PUBLIC_SUPPORT_MONTHLY_URL
PUBLIC_PLAUSIBLE_DOMAIN
```

Do not add payment-provider secret keys to `PUBLIC_*` variables.

## Forms

After the first production deploy, verify these forms are detected:

- `website-contact`
- `work-with-convera`

The newsletter form remains feature-flagged and should not be enabled until the newsletter workflow is ready.

Configure Netlify form notifications to the intended Convera mailbox and submit real production tests.

## Domain

Use `https://converastrategies.com` as canonical public host. The Netlify configuration redirects `https://www.converastrategies.com/*` to the apex domain.

Confirm both domain aliases are attached to the same production site and HTTPS is active before relying on the redirect.

## Post-deploy

Run:

```bash
npm run live:audit -- https://converastrategies.com
```

Then complete `ACTIVATION-CHECKLIST.md` and record verified external steps in `.env.operations` before running `npm run activation:report`.
