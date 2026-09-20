# Framework Status — 2.62.0

## Status

Release 2.62.0 replaces the reconstructed mail fallback with the authoritative workflow files recovered from `ryyboww/conversa_repo`, branch `main_conversa`.

## Recovered source

- `contact-form-notification` routes verified Contact submissions to the branded Contact template.
- `follow-form-notification` routes Follow the Work submissions to its separate template.
- `intake-form-notification` routes private Intake submissions to its separate template.
- `intake-invitation` remains operator-authorized and sends only to the manually entered recipient.
- The recovered invitation handler now resolves its configured site URL correctly and retains the canonical-domain fallback.
- Four matching templates are retained under `emails/` for the Netlify Emails integration backed by Postmark.

## Inventory distinction

- Authoritative queued source: 23 project functions.
- Currently protected live deployment: 21 project functions plus one Netlify-generated `emails` transport function.
- The additional Follow and Intake notification handlers are source-ready but not live because this recovery pass does not deploy.

## Live evidence

- Netlify Forms detects `website-contact`, `follow-the-work`, and `client-intake`.
- Contact has recorded submissions; Follow and Intake still require post-deployment live tests.
- Team sign-in continues to protect the live site.
- No environment-variable values were retrieved or copied.
