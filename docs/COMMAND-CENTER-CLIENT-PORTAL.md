# Project Command Center & Client Portal

## Purpose

2.27 consolidates the operational modules created in 2.23–2.26 without collapsing their legal or accounting distinctions.

The Project # remains the common identifier. Estimates, Agreements, Change Orders, invoices, payments, documents, milestones, and closeout records remain separate objects.

## Operator Command Center

`/operator/project.html?project=CVR-YYYY-XXXXXXXX`

The Command Center provides one project-level view of:

- client and organization information;
- project status and next action;
- engagement-readiness blockers;
- latest Estimate, Agreement, Change Order, and invoice;
- outstanding balance;
- milestones;
- client-portal links and revocation;
- automatic reminder settings;
- secure document and billing shortcuts;
- project activity timeline;
- closeout and retention-review status.

The operator key is still required at the function layer. Keeping the HTML page unlinked or obscure is not a security control.

## Secure Client Portal

The operator creates a portal invitation only after a Project # exists. The portal token is:

- HMAC signed;
- bound to the approved project email;
- tied to a portal-access record;
- expiring;
- revocable.

The portal intentionally exposes only client-safe information. It does not expose internal notes, internal documents, operator activity metadata, conflict review, data-sensitivity review, or internal readiness notes.

A portal can display:

- Project #, working title, and high-level status;
- client-visible milestones;
- latest Estimate/Agreement/Change Order identifiers and status;
- invoice status and balances;
- client-visible project documents;
- final-deliverable acknowledgment when closeout is ready.

## Reminders

Automated reminders are opt-in at the Project # level and are off by default.

When enabled, the scheduled function checks published production data once daily. It skips Saturday and Sunday in America/New_York and can send:

- milestone reminder 3 days before a client-visible milestone due date;
- milestone reminder on the due date;
- invoice reminder 3 days before due date;
- invoice reminder on the due date;
- overdue invoice reminder 7 days after due date;
- operator retention-review notice when a closeout retention date arrives.

A reminder log prevents the same reminder event from being sent repeatedly.

The schedule runs in UTC because Netlify Scheduled Functions use UTC. The code uses a daily scheduled invocation and applies New York weekday rules before sending.

## Closeout and retention

Closeout is a separate record tied to Project #. Checklist items include:

- substantive work complete;
- final deliverables issued;
- final invoice issued;
- balance reviewed;
- client deliverable acknowledgment received or waived;
- project documents reviewed;
- follow-up / future-work decision recorded.

Retention controls include a retention-review date, legal/administrative hold, and archive notes.

**No automatic deletion is performed.** A retention date means “review this record,” not “destroy this record.” Records should only be deleted under a separately approved retention policy.

## Final-deliverable acknowledgment

When enabled by the operator, the client portal provides an acknowledgment button. It records receipt/availability of final deliverables; it does not create a release, waiver, satisfaction finding, or legal acceptance of the substantive work.

## Payment and signature boundaries

2.27 does not change earlier boundaries:

- estimates are not contracts;
- project agreements authorize the engagement;
- signature evidence remains external/provider-neutral unless separately integrated;
- invoices request payment;
- Convera does not collect raw card or bank credentials;
- the project ledger is not general accounting software.
