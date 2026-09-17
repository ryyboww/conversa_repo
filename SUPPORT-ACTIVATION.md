# Support the Work — Activation Notes

Convera’s support pathway is intentionally separate from paid professional services.

## Public meaning

Support language should continue to communicate three ideas:

1. contributors are supporting a founder-led person and organization;
2. their support sustains publications, public-facing work, community participation, and organizational development;
3. strengthening institutions is treated as investment in the future.

The current Support page already carries this distinction and should not be rewritten into ordinary fundraising or consulting language simply to increase conversion.

## What a contribution is

A contribution is voluntary support for Convera Strategies’ public-facing mission and organizational development. It does not purchase consulting time, create a client relationship, or entitle a contributor to professional services.

## What a contribution is not

The site does not present Convera Strategies as a charitable organization and does not represent contributions as tax-deductible charitable donations.

## Checkout architecture

The site expects hosted checkout URLs through:

- `PUBLIC_SUPPORT_ONE_TIME_URL`
- `PUBLIC_SUPPORT_MONTHLY_URL`
- `PUBLIC_SUPPORT_PROVIDER_LABEL`

If a live checkout URL is absent, the Support page falls back to a direct support inquiry rather than exposing a broken payment button.

## Suggested launch testing

Before making the Support pathway public:

- complete a small one-time test contribution;
- complete or simulate a recurring contribution setup;
- verify provider receipts;
- verify the public merchant/business name shown to contributors;
- verify the provider’s cancellation/refund/contact information;
- verify the success redirect when available;
- test on mobile and desktop;
- confirm no secret keys are present in the site source or public environment variables.

## Paid services remain separate

Professional work begins through `/work-with-convera/`. Keep invoices, retainers, consulting fees, and other service payments outside the contribution pathway.
