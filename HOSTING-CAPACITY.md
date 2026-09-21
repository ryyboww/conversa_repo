# Convera Strategies Hosting Capacity Control

Production deployment availability is an external operating condition. A clean build, valid Netlify login, and correct project link do not establish that Netlify currently permits a production deploy.

## Before a production attempt

1. Open the Convera Strategies project in Netlify.
2. Confirm the team is not paused for operational credits, billing, usage, permissions, or another account restriction.
3. Confirm production deploys are available.
4. Record the current result locally only after the dashboard check succeeds:

```bash
npm run activation:set -- OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE=true
```

If production deploys are paused or the status is uncertain, keep the value `false`. Preview deploys may remain available, but they do not satisfy this control.

## After capacity changes

This flag represents current operating capacity, not a permanent accomplishment. Reset it to `false` whenever Netlify reports a credit, billing, usage, team, or production-deploy restriction:

```bash
npm run activation:set -- OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE=false
```

Do not store billing details, payment information, account credentials, or Netlify access tokens in `.env.operations` or website source.

## Release sequence

Run `npm run go-live:status` before publication. The Deploy group must show both production capacity available and production deployment completed as separate controls. A production attempt must stop while the capacity control is blocked.
