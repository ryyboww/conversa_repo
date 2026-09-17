# Install 2.29 — Public Visibility & Professional Conversion

Requires Convera Strategies 2.28.0.

## Copy the additive files

Copy these patch directories into the project root:

- `public/assets/`
- `public/speaking/`
- `public/press-kit/`
- `public/follow/`
- `src/components/visibility/PublicationCTA.astro`

The new public routes are:

- `/speaking/`
- `/press-kit/`
- `/follow/`
- `/follow/thank-you/`

## Navigation

Add **Speaking** to public navigation when you are ready to activate it. Press Kit may remain linked from Speaking rather than occupying main navigation. Add **Follow the Work** as a restrained header/footer or publication CTA rather than a dominant homepage conversion button.

## Publication integration

Import `PublicationCTA.astro` into the publication/article layout and render it near the end of public-facing publications. Pass a stable source identifier when useful:

```astro
---
import PublicationCTA from '../components/visibility/PublicationCTA.astro';
---
<PublicationCTA source={`publication:${slug}`} />
```

Do not place this CTA inside academic citations, PDFs, or external publisher pages.

## Session-level attribution

`/assets/convera-visibility.js` captures only session-level first-entry attribution:

- external referrer;
- landing path;
- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`.

It does not fingerprint visitors or create cross-site profiles.

For the existing public Contact form, load `/assets/convera-visibility.js` in the global layout. The script automatically recognizes a form named `website-contact`; no data is posted anywhere until the visitor submits the form.

## Follow the Work

The form is prepared for Netlify Forms under the name `follow-the-work`.

Before treating submissions as a mailing list:

1. choose an email/newsletter provider;
2. configure required consent and double-opt-in behavior;
3. configure unsubscribe handling;
4. update the Privacy page with the provider and retention details;
5. test confirmation, unsubscribe, and suppression behavior.

Until then, the form is only an expression-of-interest record.

## Press Kit

The Press Kit intentionally references the site's approved founder portrait rather than shipping a duplicate image. Once the production portrait filename is confirmed, add a direct high-resolution download link to `/press-kit/` if desired.

Verify all titles, affiliations, and public biographical claims before launch and after major professional changes.
