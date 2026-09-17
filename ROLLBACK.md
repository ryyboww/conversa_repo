# Production Rollback

If a deployment introduces a visible defect, broken form, or revenue-path problem, restore the last known-good Netlify deploy before attempting live repairs.

## Netlify rollback

1. Open the site in Netlify.
2. Open **Deploys**.
3. Locate the most recent known-good production deploy.
4. Publish/restore that deploy using the Netlify deploy controls.
5. Re-run the live-site audit against the production domain.

## Source rollback

After production is stable, revert or fix the source commit responsible for the problem. Do not leave production and `main` intentionally divergent longer than necessary.

## Payment/link incident

If a contribution link is wrong or unavailable, remove or disable the public support URL before leaving a broken checkout active. The site is designed so the support configuration can be changed independently of the core content architecture.

## Form incident

If a form stops arriving in Netlify, preserve the public page but temporarily direct urgent inquiries to the branded public mailbox until form processing is restored.
