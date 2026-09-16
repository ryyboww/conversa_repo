# Convera Strategies — External Activation

Release 2.4.0 keeps the site source stable and concentrates the remaining work on services outside the repository.

## 1. Branded email

Verify real send-and-receive delivery for:

- `ryan@converastrategies.com` — founder and professional correspondence
- `hello@converastrategies.com` — public/general correspondence

`help@converastrategies.com` and `admin@converastrategies.com` can be activated as operations require. Do not route the public site back to a personal Outlook address.

## 2. Contribution checkout

Create hosted HTTPS checkout links with the selected payment provider, then configure:

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=https://...
PUBLIC_SUPPORT_MONTHLY_URL=https://...
```

Keep voluntary contributions separate from paid professional services. The site does not describe contributions as charitable or tax-deductible.

## 3. Local activation check

Copy `.env.example` to `.env`, enter the live public values, and run:

```bash
npm run activation:audit
```

For a hard launch gate:

```bash
npm run activation:strict
```

The strict command fails until required checkout settings are present and valid HTTPS URLs.

## 4. Netlify

Add the same public environment variables to Netlify before the production build. Then deploy and verify Contact and Work With Convera submissions in Netlify Forms.

## 5. Mail delivery and payment tests

These cannot be proven from source code. Before launch:

1. Send a message from an unrelated account to both public Convera addresses.
2. Reply from each Convera mailbox and confirm delivery.
3. Submit the Contact and Work With Convera forms on the deployed site.
4. Open each hosted contribution checkout from the live Support page.
5. If the provider permits, complete a low-value live transaction and verify receipt/return behavior.

## 6. Final operational command

Before deployment:

```bash
npm run ops:audit
```

After all external values are activated:

```bash
npm run ops:strict
```
