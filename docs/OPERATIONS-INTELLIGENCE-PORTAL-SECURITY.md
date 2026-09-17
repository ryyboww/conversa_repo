# Operations Intelligence & Client Portal Security — 2.28

## Purpose

2.28 consolidates portfolio-level visibility and strengthens the private client portal without changing the underlying professional-services workflow.

The release adds:

- one-time email verification for client project portals;
- short-lived verified portal sessions;
- code-request throttling and repeated-attempt lockout;
- no plaintext storage of one-time verification codes;
- portal security status visible to the operator;
- portfolio-level project, workload, aging, deadline, source/referral, billing, and portal-security summaries;
- per-project priority, capacity weight, target completion date, source detail, and referral source.

## Portal verification model

A client still receives an expiring, revocable project-portal link. When email verification is enabled, the link alone does not expose project information. The client must request and enter a six-digit code sent to the approved portal email address.

The verification code:

- is generated server-side;
- is never stored in plaintext;
- expires after the configured TTL;
- is rate limited;
- locks temporarily after repeated failed attempts;
- creates a short-lived portal session after successful verification.

The verified session is kept in browser `sessionStorage`, so it is normally removed when that browser session ends.

This is **two-step email verification**, not strong multi-factor authentication. If both the portal link and the email mailbox are compromised, this control cannot provide independent-factor protection. Particularly sensitive or regulated work should still use an appropriately approved secure platform.

## Operations Intelligence

`/operator/operations.html` summarizes the existing Project # registry. It does not create a second project database.

The dashboard reports:

- project counts by status;
- active-project aging;
- priority mix;
- source/referral mix;
- operator-defined workload units;
- optional capacity utilization;
- outstanding invoice balance;
- overdue invoices;
- net payments recorded in the Convera project ledger;
- overdue and near-term milestones;
- overdue project target dates;
- projects requiring attention;
- active portals with and without email verification.

Financial figures are **administrative ledger summaries**, not accounting statements, tax records, recognized revenue, or financial advice.

## Capacity weight

Each project can carry a planning weight from `0.5` to `5`. The unit is intentionally abstract. It should represent relative operational load, not billable hours.

If `CONVERA_CAPACITY_UNITS` is configured, the dashboard displays weighted utilization. Example: if the configured capacity is 20 units and active work totals 12 units, the dashboard shows 60% utilization.

## Source and referral tracking

Each Project # can retain:

- source;
- source detail;
- referral source.

Examples:

- Source: `Website`
- Source detail: `Talk Is Cheap essay`
- Referral source: `Organization / person name`

This supports later assessment of which publications, public platforms, referrals, and professional activities actually generate substantive work.

## Security boundaries

2.28 does not:

- claim to provide MFA;
- replace identity-provider authentication;
- replace malware scanning, DLP, HIPAA-compliant storage, or enterprise document controls;
- expose internal conflict review, internal notes, or private activity through the client portal;
- activate HubSpot Deals for professional services.
