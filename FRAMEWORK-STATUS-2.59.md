# Framework Status — 2.59.0

## Status

Release 2.59.0 preserves the verified public website and adds the security configuration record required for reliable deployment and recovery.

## Confirmed live state

- Netlify deployment is healthy and ready.
- The canonical domain and `www` redirect are attached.
- Team sign-in currently protects the entire site before public release.
- Netlify Forms recognizes Contact, Follow, and private Intake.
- Contact has recorded submissions; submission contents were not opened during this review.

## Security controls

- Operator functions require a secret operator key.
- Client links are signed, purpose-bound, expiring, and tamper-resistant.
- Client portal data remains hidden until email-code verification succeeds.
- Verification codes are HMAC-protected, expire, use request cooldowns, and lock after repeated failures.
- Client-visible records filter internal documents and internal agreement information.
- Downloads use private/no-store response controls.
- Real credentials remain outside the source package.

## Remaining external gates

- Deploy this 2.59 source state.
- Confirm all required private environment values in Netlify without copying them into source.
- Verify branded mailbox delivery and form-notification routing.
- Add and test one-time and monthly contribution links.
- Complete public desktop, mobile, social-sharing, and end-to-end form review.
- Remove team-login protection only when public release is authorized.
