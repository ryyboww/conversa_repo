# Engagement Controls

## Core sequence

Contact → manual review → secure Intake → Project # → Discovery/clarification → Proposal & Estimate → commercial acceptance → Project Agreement → signatures → readiness review → project start.

## Agreement IDs

Each Project # receives versioned agreements such as `AGR-4F9A21BC-01`. Revisions create a new agreement record and supersede the prior unsigned version. A signed agreement is not overwritten; later scope changes should use a Change Order or formal amendment.

## Change Order IDs

Change Orders use `CO-4F9A21BC-01`, `-02`, etc. A Change Order requires a signed Project Agreement. It records reason, additions/removals, fee adjustment, timeline adjustment, payment adjustment, effective impact, and approved Change Order terms.

## Engagement readiness

“Ready to Start” is computed. It requires:
- signed Project Agreement;
- conflict review cleared/not required/waived;
- data-sensitivity review cleared/not required/waived;
- deposit/payment prerequisite paid/not required/waived;
- any client-specific prerequisite (e.g., PO, vendor onboarding, insurance certificate) cleared/not required/waived.

Readiness does not automatically change the Project status to Active. It changes the next administrative action to scheduling kickoff/start.

## Signature separation

The client-facing agreement and Change Order pages allow the client to indicate readiness to sign, request changes, or decline. Those actions are workflow signals. Signature completion is recorded separately with timestamp, method, and signed-document/envelope reference.

## Activity history

Agreement creation/sending/viewing, response events, signatures, readiness reviews, and Change Orders are written to the existing Project activity store so Project # history can be reconstructed in one timeline.

## Client-supplied agreements

For organizations that require their own agreement or procurement form, select **Client-supplied agreement**. Record the external document/contract reference, review the terms internally, and record signature evidence when complete. This path does not require Convera to replace the client's document with its own form. The same readiness gates still apply.
