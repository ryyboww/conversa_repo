# Convera Strategies — Launch Activation Sequence

This document is the shortest path from the 1.8.0 code package to a public launch.

## 1. Activate branded correspondence

Confirm these mailboxes can send and receive before publishing the domain:

- `ryan@converastrategies.com` — founder and direct professional correspondence
- `hello@converastrategies.com` — general/public inquiries
- `help@converastrategies.com` — visitor and client support
- `admin@converastrategies.com` — private administration; do not publish unless needed

Send a message into and out of each public mailbox and confirm SPF/DKIM/DMARC behavior through your email provider.

## 2. Activate contribution checkout

Convera is designed to use hosted checkout pages rather than collect card details directly.

Create one-time and recurring contribution links with your chosen provider, then set these environment variables in Netlify:

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=<your hosted one-time checkout URL>
PUBLIC_SUPPORT_MONTHLY_URL=<your hosted recurring checkout URL>
```

Where the provider permits a success redirect, use:

```text
https://converastrategies.com/support/thank-you/
```

Do not place secret API keys in `PUBLIC_` environment variables.

## 3. Install and build locally

```bash
npm install
npm run launch:final
npm run check
npm run build
npm run preview
```

`launch:final` is dependency-free and can run before Astro is installed. `check`, `build`, and `preview` require the package dependencies.

## 4. Connect the repository to Netlify

Expected build settings are already in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`

Add the public environment variables from Step 2 to the production site settings.

## 5. Verify Netlify Forms after first deployment

The production site should detect these forms:

- `website-contact`
- `work-with-convera`
- `convera-newsletter` only when the newsletter feature flag is enabled

Configure form notifications for an appropriate Convera mailbox and submit one real test through each enabled form.

## 6. Verify production visitor journeys

Test each journey from the public domain, not only the local preview:

### Prospective client
Home/Services → **Work With Convera** → intake form → thank-you page → submission notification.

### Contributor
Home/Header/Support panel → **Support the Work** → hosted checkout → provider confirmation → Convera support thank-you page where supported.

### Reader
Home/Publications → Convera publication record → original publisher page.

### Community participant
Home/Community → relevant participation pathway → Contact form preset.

## 7. Verify presentation

Test at minimum:

- light mode
- dark mode
- desktop navigation
- narrow mobile navigation
- keyboard-only navigation
- founder portrait crop
- homepage support visibility
- Mission page “A Moment of Transition” section
- publication records
- 404 page

## 8. Publish deliberately

Before announcing the site publicly, complete `PRE-LAUNCH-QA.md` and `LAUNCH-CHECKLIST.md`, then preserve the deployed ZIP/repository tag as the launch baseline.


## 2.14.0 client operations note

Launch email verification now covers `ryan@converastrategies.com`, `hello@converastrategies.com`, `help@converastrategies.com`, `admin@converastrategies.com`, and `billing@converastrategies.com`. The direct prospective-client form is `/intake/` (`client-intake` in Netlify). The `/dashboard/` route is a staged noindex/no-store shell and must not contain client-specific information before secure authentication is connected.
