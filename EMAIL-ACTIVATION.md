# Convera Strategies — Email Activation

The site is configured around five branded Convera addresses. Mail delivery still requires activation and real send/receive testing with the selected email provider.

## Mailboxes and roles

- `ryan@converastrategies.com` — founder, proposals, prospective clients, and direct professional correspondence
- `hello@converastrategies.com` — general public and website correspondence
- `help@converastrategies.com` — client/site support and dashboard-access questions
- `admin@converastrategies.com` — private administrative, vendor, software, domain, and account management; do not publish casually
- `billing@converastrategies.com` — invoices, payment administration, and billing correspondence

Do not place mailbox passwords, app passwords, SMTP credentials, recovery codes, or provider API secrets in the Astro repository.

## DNS authentication

Use only the exact MX, SPF, DKIM, and verification records supplied by the selected mail provider. DMARC belongs at `_dmarc.converastrategies.com`. Do not invent record values.

Before tightening DMARC enforcement, confirm legitimate Convera mail passes SPF/DKIM alignment.

## Launch verification

For each mailbox above:

1. Send a message from an unrelated external account to the Convera mailbox.
2. Confirm receipt without rejection or quarantine.
3. Reply from the Convera mailbox.
4. Confirm the reply reaches the external inbox rather than spam.
5. Confirm sender display/name is appropriate.
6. Inspect headers where practical and confirm SPF/DKIM results supplied by the provider.

Record successful tests only after they occur:

```text
OPS_RYAN_MAIL_VERIFIED=true
OPS_HELLO_MAIL_VERIFIED=true
OPS_HELP_MAIL_VERIFIED=true
OPS_ADMIN_MAIL_VERIFIED=true
OPS_BILLING_MAIL_VERIFIED=true
```

These flags are local operational records; they do not activate mail delivery.
