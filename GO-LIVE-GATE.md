# Convera Strategies — Go-Live Gate

This release treats launch as an operational decision, not merely a successful source audit.

## 1. Source and release verification

Run:

```bash
npm run release:audit
npm run privacy:audit
```

Both should pass before deployment work continues.

## 2. Runtime and build verification

Run:

```bash
npm run doctor
npm install --no-audit --no-fund
npm run verify
```

`verify` includes Astro diagnostics, production build, and inspection of the generated `dist/` output.

## 3. Configure public build values

Configure locally in `.env` or in Netlify:

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=https://...
PUBLIC_SUPPORT_MONTHLY_URL=https://...
PUBLIC_PLAUSIBLE_DOMAIN=
```

Never place secret payment credentials in `PUBLIC_*` variables.

## 4. Track real-world activation

```bash
cp .env.operations.example .env.operations
```

Only change a flag to `true` after the corresponding test actually succeeds.

Then run:

```bash
npm run activation:report
npm run go-live:status
```

## 5. Final hard gate

When every external system is configured and tested:

```bash
npm run deploy:gate
```

This command is intentionally strict. A failed gate means the site is not yet treated as launch-complete.

## Launch principle

Do not convert a pending item into a passed item because configuration appears correct. Email, forms, payment checkout, DNS, TLS, browser presentation, and mobile behavior each require a real-world verification step.
