# Convera Strategies — Contribution Checkout Activation

Convera separates voluntary mission support from paid professional services. The website does not collect card details directly; it expects hosted HTTPS checkout links from the selected payment provider.

## Required launch links

Create two distinct hosted checkout experiences:

1. **One-time contribution**
2. **Monthly recurring contribution**

Configure the public environment values:

```text
PUBLIC_SUPPORT_PROVIDER_LABEL=Stripe
PUBLIC_SUPPORT_ONE_TIME_URL=https://...
PUBLIC_SUPPORT_MONTHLY_URL=https://...
```

The provider label may be changed if a different hosted provider is selected.

## Public presentation

The checkout/business display should clearly identify Convera Strategies. Keep the contribution language consistent with the site:

- voluntary support for Convera’s publications, public-facing work, community engagement, and organizational development;
- separate from professional service fees;
- not represented as a tax-deductible charitable donation.

Accounting and tax treatment of business receipts should be handled outside the website with appropriate professional guidance.

## Return behavior

If the provider supports post-payment redirects, use:

`https://converastrategies.com/support/thank-you/`

## Test before launch

Verify:

- one-time checkout opens from the live Support page;
- recurring checkout opens from the live Support page;
- amount/frequency presentation is correct;
- contributor receipt contains the intended business identity;
- return behavior reaches the Convera thank-you page when configured;
- cancellation/back navigation does not trap the visitor;
- mobile checkout works;
- no private API key or secret appears in site source or browser-delivered environment data.

After a real or provider-approved test is completed, set:

```text
OPS_SUPPORT_FLOW_VERIFIED=true
```
