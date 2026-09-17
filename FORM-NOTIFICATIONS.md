# Netlify Forms and Notification Verification

Convera uses separate form pathways so general correspondence and prospective-client intake remain distinguishable.

## Expected production forms

- `website-contact` — general website/community correspondence
- `work-with-convera` — detailed professional inquiry
- `client-intake` — direct shareable prospective-client intake at `/intake/`
- `convera-newsletter` — preserved behind its feature flag; disabled for launch unless intentionally activated

## Recommended notification routing

- `website-contact` → `hello@converastrategies.com`
- `work-with-convera` → `ryan@converastrategies.com`
- `client-intake` → `ryan@converastrategies.com` with an optional second notification to `hello@converastrategies.com`
- billing questions handled manually → `billing@converastrategies.com`
- dashboard/access support → `help@converastrategies.com`

Notification routing is configured in Netlify after the forms are detected. Do not place mailbox credentials in the repository.

## Production verification

After the first successful Netlify deployment:

1. Confirm all enabled forms appear in Netlify Forms.
2. Submit a test through Contact.
3. Submit a test through Work With Convera.
4. Submit a test through the direct Client Intake page.
5. Confirm each reaches its correct success page.
6. Confirm each submission appears in Netlify.
7. Configure the notification routing above.
8. Submit fresh tests and confirm notification messages arrive at the intended mailbox(es).
9. Check spam/junk placement and sender labeling.
10. Only then record the form flags as verified.

```text
OPS_NETLIFY_FORMS_VERIFIED=true
OPS_FORM_NOTIFICATIONS_VERIFIED=true
```
