# Install 2.26

Apply after 2.25.

1. Copy/merge `netlify/functions/` and `public/` files into the Convera project.
2. Preserve existing 2.23–2.25 functions and configuration; 2.26 intentionally replaces `_shared/engagement-token.mjs`, `project-registry.mjs`, and `public/operator/projects.html` with backward-compatible expanded versions.
3. Confirm existing `@netlify/blobs` support remains installed.
4. Configure values from `.env.billing-documents.example` in Netlify environment variables.
5. Deploy and verify `/operator/billing.html` and `/operator/documents.html` remain non-public in navigation and protected at the function layer with `CONVERA_OPERATOR_KEY`.
6. Create a test Project with signed Agreement, create a Deposit invoice, send it, record partial/full payment, and verify readiness deposit status clears only when the requirement is satisfied.
7. Test a ≤4 MB native document upload and an external secure-upload request.
8. Do not use native upload for regulated or client-restricted records until security/privacy review is complete.
