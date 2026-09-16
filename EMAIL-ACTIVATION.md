# Convera Strategies — Email Activation

The public site is already configured around branded Convera addresses. Mail delivery itself must be activated and tested with the selected email provider.

## Public-facing addresses

- `ryan@converastrategies.com` — founder and direct professional correspondence
- `hello@converastrategies.com` — general public and website correspondence
- `help@converastrategies.com` — support/help pathway when operationally needed
- `admin@converastrategies.com` — private administrative use; do not promote as a public contact address

A future `billing@converastrategies.com` mailbox may be useful for invoices and payment administration, but it is not required for the website launch.

## DNS authentication

Use the exact DNS records supplied by the selected mail provider. Do not invent SPF, DKIM, or MX values.

The provider should normally supply or guide configuration for:

- MX records;
- SPF TXT record;
- DKIM record(s);
- DMARC policy at `_dmarc.converastrategies.com`.

Before tightening DMARC enforcement, confirm legitimate Convera mail is passing SPF/DKIM alignment.

## Minimum launch verification

For both `ryan@` and `hello@`:

1. Send a message from an unrelated external account to the Convera mailbox.
2. Confirm it arrives without being quarantined or rejected.
3. Reply from the Convera mailbox.
4. Confirm the reply reaches the external inbox rather than spam.
5. Inspect the received message headers and confirm the provider reports SPF/DKIM as expected.

Once complete, update the local operational file:

```text
OPS_RYAN_MAIL_VERIFIED=true
OPS_HELLO_MAIL_VERIFIED=true
```

These flags are only a local operational record. They do not alter the public site.
