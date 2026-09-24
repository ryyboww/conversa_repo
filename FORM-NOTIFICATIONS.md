# Netlify Forms and Notification Verification

Convera uses separate form pathways so public correspondence, follow-the-work subscriptions, and private project Intake remain distinguishable.

## Expected production forms

- `website-contact` — general website/community correspondence
- `client-intake` — private invitation-based project Intake at `/intake/` (no public site link; sent only after manual review)
- `follow-the-work` — public follow-the-work signup
- `convera-newsletter` — preserved behind its feature flag; disabled for launch unless intentionally activated

## Recommended notification routing

- `website-contact` → `hello@converastrategies.com`
- `follow-the-work` → `hello@converastrategies.com`
- `client-intake` → `ryan@converastrategies.com` with an optional second notification to `hello@converastrategies.com`
- billing questions handled manually → `billing@converastrategies.com`
- dashboard/access support → `help@converastrategies.com`

The branded email handlers use Netlify project environment variables:

- `CONVERA_FORM_FROM_EMAIL` — a sender verified with the configured Postmark account
- `CONVERA_PUBLIC_FORM_NOTIFICATION_EMAIL` — Contact and Follow recipient (recommended: `hello@converastrategies.com`)
- `CONVERA_INTAKE_NOTIFICATION_EMAIL` — private Intake recipient (recommended: `ryan@converastrategies.com`)
- `NETLIFY_EMAILS_SECRET` — the existing Netlify Emails function secret

The older `CONVERA_FORM_NOTIFICATION_EMAIL` remains a fallback for Contact and Follow during migration. Private Intake requires its own recipient and never falls back to the public mailbox. The operator-protected Intake invitation uses the shared verified sender but addresses the person selected manually after qualification.

Netlify's built-in submission notification should be scoped by form or removed only after the branded notifications are configured and delivery is verified. A catch-all notification sends every form, including private Intake, to the same mailbox. Do not place mailbox credentials or secret values in the repository.

## Production verification

After the first successful Netlify deployment:

1. Confirm all enabled forms appear in Netlify Forms.
2. Submit a test through Contact.
3. Submit a test through Follow the Work.
4. As an operator/admin test, submit the private Intake form without adding any public link to it.
5. Confirm each reaches its correct success page.
6. Confirm each submission appears in Netlify.
7. Configure the sender and separate public and private recipients above in Netlify; confirm each recipient mailbox can receive mail.
8. Submit fresh tests and confirm notification messages arrive at the intended mailbox(es).
9. Check spam/junk placement and sender labeling.
10. Only then record the form flags as verified.

```text
OPS_NETLIFY_FORMS_VERIFIED=true
OPS_FORM_NOTIFICATIONS_VERIFIED=true
```
