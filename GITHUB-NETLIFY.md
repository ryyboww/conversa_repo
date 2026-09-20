# Convera Strategies — GitHub + Netlify Handoff

**Production repository:** `convera_published_codes`  
**Production branch:** `main_conversa`

<<<<<<< HEAD

## GitHub repository: `convera_published_codes`
=======
## GitHub repository
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

Commit the complete 2.56.0 source package to the production repository.

```bash
git init
git add .
<<<<<<< HEAD
git commit -m "Prepare Convera Strategies 2.14.0 remote handoff"
=======
git commit -m "Prepare Convera Strategies 2.56.0 publication candidate"
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
git branch -M main_conversa
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main_conversa
```

Do not commit `.env`, `.env.operations`, `node_modules`, `.astro`, `dist`, or secrets. The repository includes a lockfile and verification workflows so CI can use the pinned dependency graph.

## Netlify connection

Connect the production GitHub repository to Netlify and use the repository root. `netlify.toml` already declares:

- build command: `npm run build`;
- publish directory: `dist`;
- Node 20;
- production security headers;
- utility-page noindex/no-store headers;
- route aliases; and
- canonical `www` → apex redirect.

## Public environment values

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
- `follow-the-work`
- `client-intake`
- `convera-newsletter` only if intentionally enabled

The professional-services flow is Contact first. `/work-with-convera/` directs prospects to Contact; detailed Intake is sent privately after manual review. Configure notifications according to `FORM-NOTIFICATIONS.md` and submit real production tests.

## Domain and post-deploy verification

Use `https://converastrategies.com` as the canonical host. After HTTPS is active, run:

```bash
npm run live:audit -- https://converastrategies.com
npm run go-live:status
```

Complete real-world activation flags only after the corresponding tests pass.
