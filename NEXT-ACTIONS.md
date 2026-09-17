# Convera Strategies — Next Actions

The site architecture is stable. Work from this sequence rather than adding more design features.

1. **Connect GitHub and Netlify.** Put this release in the production repository and let CI perform the full Astro install/check/build/dist audit in an environment with registry access.
2. **Activate branded email.** Configure provider DNS, run `npm run external:email`, then verify send and receive for `ryan@converastrategies.com` and `hello@converastrategies.com` before recording the successful tests in `.env.operations`.
3. **Create hosted contribution checkout links.** Add one-time and monthly public HTTPS URLs, then run `npm run external:payments`. Do not add secret API keys to the static site.
4. **Deploy and verify the domain.** Run `npm run external:domain`, then confirm forms, notifications, social card, desktop display, and mobile display on the production site.
5. **Run the strict gate.** When each real-world test is complete, `npm run deploy:gate` becomes the final launch decision tool.

Use `npm run activation:init` once, `npm run launch:summary` whenever you need orientation, and `npm run activation:report` after each verified external step.


## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
