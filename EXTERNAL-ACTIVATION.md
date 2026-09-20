# Convera Strategies — External Activation

<<<<<<< HEAD
Release 2.14.0 keeps the site source stable and concentrates the remaining work on services outside the repository.
=======
Release 2.56.0 keeps the site source stable and concentrates the remaining work on services outside the repository.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

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
3. Submit the public Contact form, review the professional test manually, then send the private Intake link directly and submit a separate Intake test. Also test Follow the Work.
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


<<<<<<< HEAD
## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
=======
## 2.56.0 client operations note

Launch email verification covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. Professional inquiries begin through the public Contact pathway. The `/intake/` route (`client-intake` in Netlify) is private/noindex and is used only after manual review and a direct Intake invitation. The `/dashboard/` route remains a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
