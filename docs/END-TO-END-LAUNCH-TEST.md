# End-to-End Public Journey Test — 2.30

Run this after the production deployment and again after any major provider integration.

## A. External discovery

1. Open a tagged test URL such as `/?utm_source=launch-test&utm_medium=manual&utm_campaign=journey-test` in a private/incognito browser.
2. Confirm the homepage renders correctly in light and dark modes.
3. Navigate to a public publication and confirm the publication CTA is visible but restrained.

## B. Audience path

1. Choose **Follow the Work**.
2. Confirm the form explains the low-frequency purpose and requires consent.
3. Submit a test record.
4. Confirm Netlify records `follow-the-work` and the expected `source_*` fields.
5. Confirm no third-party marketing enrollment occurs unless intentionally configured.

## C. Speaking/media path

1. Open `/speaking/`.
2. Open `/press-kit/` and verify biography, credentials, print/save path, and media Contact links.
3. Confirm all invitation/media buttons route to Contact—not Intake.

## D. Professional inquiry path

1. Use a publication or Speaking CTA to open Contact.
2. Confirm Contact remains separate from Intake.
3. Submit a test Contact.
4. Confirm the automatic Contact acknowledgment arrives.
5. Confirm source/referral fields are retained with the submission.
6. Confirm no Project # and no Intake invitation are generated automatically.

## E. Manual qualification path

1. Review the Contact manually.
2. Send the secure Intake invitation from the operator workflow.
3. Complete the Intake using the approved address.
4. Confirm a Project # is created only after verified Intake receipt.
5. Confirm the Intake acknowledgment references the Project #.

## F. Private project path

1. Confirm the Project appears in the operator registry/command center.
2. Verify source/referral and capacity fields can be recorded.
3. Confirm estimate, agreement, billing, secure documents, and client portal remain private.
4. Confirm professional-service activity creates no HubSpot Deal.

## G. Privacy/security

1. Search the rendered public site for `/intake/`, `/operator/`, project tokens, invoice tokens, proposal tokens, and portal tokens.
2. Confirm none are exposed in public navigation, sitemap, canonical tags, or social metadata.
3. Confirm portal two-step verification works on projects where enabled.
4. Confirm revoked/expired portal links fail as expected.

Record failures before launch rather than relying on memory.
