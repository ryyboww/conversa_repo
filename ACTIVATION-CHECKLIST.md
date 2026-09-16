# Convera Strategies — Activation Checklist

Use this after source development is complete.

- [ ] `npm run verify` passes in a dependency-enabled environment.
- [ ] GitHub verification workflow is green on the production branch.
- [ ] `ryan@converastrategies.com` send/receive test is complete.
- [ ] `hello@converastrategies.com` send/receive test is complete.
- [ ] One-time hosted contribution link is configured.
- [ ] Monthly hosted contribution link is configured.
- [ ] Netlify environment variables are configured.
- [ ] Production Netlify deploy succeeds.
- [ ] `converastrategies.com` resolves to the production deploy.
- [ ] `www.converastrategies.com` redirects to the apex domain.
- [ ] HTTPS is valid.
- [ ] Contact form appears in Netlify Forms and delivers a live test.
- [ ] Work With Convera form appears in Netlify Forms and delivers a live test.
- [ ] Contribution checkout flow is tested from the production site.
- [ ] `npm run live:audit -- https://converastrategies.com` passes.
- [ ] Light mode is reviewed on desktop and mobile.
- [ ] Dark mode is reviewed on desktop and mobile.
- [ ] Publication links are checked from the production site.
- [ ] Social-sharing card is checked from the production URL.
- [ ] `npm run activation:report` reflects only tests actually completed.
