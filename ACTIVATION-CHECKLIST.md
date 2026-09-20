# Convera Strategies — Activation Checklist

Use this after source development is complete.

- [ ] `npm ci`, `npm run check`, and `npm run build:verify` pass in a dependency-enabled environment.
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
- [ ] `website-contact` appears in Netlify Forms and delivers a live test.
- [ ] Professional Contact review is completed manually before the private Intake invitation is sent.
- [ ] `follow-the-work` appears in Netlify Forms and delivers a live test.
- [ ] Private `client-intake` form appears in Netlify Forms and delivers a live operator/admin test after manual Contact review.
- [ ] Contribution checkout flow is tested from the production site.
- [ ] `npm run live:audit -- https://converastrategies.com` passes.
- [ ] Light mode is reviewed on desktop and mobile.
- [ ] Dark mode is reviewed on desktop and mobile.
- [ ] Publication links are checked from the production site.
- [ ] Social-sharing card is checked from the production URL.
- [ ] `npm run activation:report` reflects only tests actually completed.


<<<<<<< HEAD
## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
## 2.56.0 client operations note

Launch email verification covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. Professional inquiries begin through the public Contact pathway. The `/intake/` route (`client-intake` in Netlify) is private/noindex and is used only after manual review and a direct Intake invitation. The `/dashboard/` route remains a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
