# Convera Strategies — Operator Console

Release 2.14.0 adds safe local commands for moving the launch forward without editing environment files by hand.

## 1. Initialize local activation files

```bash
npm run activation:init
```

This creates `.env` and `.env.operations` only when they do not already exist. It never overwrites existing values.

## 2. Enter public checkout configuration

```bash
npm run config:set -- PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
npm run config:set -- PUBLIC_SUPPORT_ONE_TIME_URL=https://YOUR-CHECKOUT-URL
npm run config:set -- PUBLIC_SUPPORT_MONTHLY_URL=https://YOUR-CHECKOUT-URL
```

Optional analytics:

```bash
npm run config:set -- PUBLIC_PLAUSIBLE_DOMAIN=converastrategies.com
```

Only public values belong in `.env`. Never place Stripe secret keys, mailbox passwords, DNS credentials, GitHub tokens, or Netlify tokens in a `PUBLIC_*` variable.

## 3. Record real-world verification

After a test actually succeeds, record it explicitly. Example:

```bash
npm run activation:set -- OPS_RYAN_MAIL_VERIFIED=true
npm run activation:set -- OPS_HELLO_MAIL_VERIFIED=true
```

Do not mark future tests complete in advance.

## 4. See the next action

```bash
npm run launch:summary
```

The summary identifies the first unresolved launch item and gives the command associated with it.

## 5. Refresh reports

```bash
npm run activation:report
npm run go-live:status
npm run operator:audit
```


## 5A. Verify external systems

After DNS, email, and contribution checkout are configured:

```bash
npm run external:domain
npm run external:email
npm run external:payments
npm run external:audit
```

Use `npm run external:strict` only when those external systems are expected to be fully live.

## 6. Final gate

Only after dependencies, build verification, deployment, payments, email, forms, domain, SSL, and human QA are complete:

```bash
npm run deploy:gate
```

A failing gate is not a defect by itself. It means one or more required launch checks have not yet been verified.


## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
