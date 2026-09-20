# Framework Status — 2.60.0

## Status

Release 2.60.0 restores the two workflow handlers absent from the 2.59.0 source archive and adds a release-blocking function-parity audit.

## Restored controls

- Contact, Follow the Work, and private Intake submissions can produce operator notifications without exposing mailbox credentials in source.
- Private Intake invitations can be sent only through an operator-authorized function after manual Contact review.
- Intake remains absent from public navigation and remains `noindex`.
- Function inventory is checked during every release audit.
- Source contains 21 deployable project functions. Netlify adds one internal `emails` function, producing the 22-function live inventory.

## Deployment boundary

This package is source-complete but is not deployed automatically. Production environment values and branded-mail delivery still require verification before public release.
