# Privacy & Consent Review — 2.30

Before public launch, review the full Privacy page and confirm it accurately describes the production configuration.

At minimum, the page should distinguish:

1. ordinary server/request logs and hosting operations;
2. public Contact submissions;
3. Follow the Work expressions of interest;
4. first-party session attribution attached to forms only when a visitor submits;
5. any analytics provider activated after this release;
6. payment/e-signature/file-service providers, if and when activated;
7. project/client records maintained after a professional relationship begins.

The included `AttributionDisclosure.astro` covers the 2.29/2.30 referral-attribution behavior but is not a substitute for a complete production privacy review.

## Follow the Work

Until a mailing provider is selected, the form should remain an expression-of-interest record. Once a provider is selected, verify:

- how the provider records consent;
- whether confirmation/double opt-in is enabled;
- unsubscribe behavior;
- suppression behavior after unsubscribe;
- data retention/deletion options;
- any international transfer or subprocessor disclosures relevant to the production audience.
