# Install 2.28 — Operations Intelligence & Portal Security

1. Apply this patch after the 2.27 release.
2. Preserve all existing 2.27 environment values.
3. Add the values from `.env.operations-security.example` to local/Netlify environment configuration.
4. Set `CONVERA_PORTAL_OTP_SECRET` to a random secret of at least 32 characters. A separate OTP secret is recommended even though the engagement-token secret can be used as fallback.
5. Confirm `RESEND_API_KEY` and `CONVERA_FROM_EMAIL` are active before testing one-time codes.
6. Optionally set `CONVERA_CAPACITY_UNITS` if you want portfolio utilization displayed.
7. Deploy the patch to the same Netlify site that hosts the earlier Convera functions and Blobs stores.
8. Create a fresh client portal with **Require one-time email verification** enabled.
9. Test: open portal → request code → receive code → verify → view project → download client-visible document.
10. Test code expiration, repeated incorrect attempts, and portal revocation.
11. Open `/operator/operations.html` and confirm project, billing, deadline, and source/referral summaries match known records.
12. Review older active portal records. Legacy records created before 2.28 may show as `link only`; revoke and reissue them with email verification if needed.

## Recommended production defaults

- `CONVERA_PORTAL_REQUIRE_EMAIL_VERIFICATION=true`
- `CONVERA_PORTAL_OTP_TTL_MINUTES=10`
- `CONVERA_PORTAL_OTP_COOLDOWN_SECONDS=60`
- `CONVERA_PORTAL_MAX_ATTEMPTS=5`
- `CONVERA_PORTAL_SESSION_HOURS=8`

## Important

Do not describe the email-code control as MFA. It is a useful step-up verification layer, but both the portal invitation and verification code may ultimately depend on the same email account.
