# Install 2.27

Apply after 2.26.

1. Copy/merge the `netlify/functions/` and `public/` additions into the Convera project.
2. Replace `_shared/engagement-token.mjs`, `project-registry.mjs`, and `public/operator/projects.html` with the 2.27 versions supplied here.
3. Preserve all prior 2.23–2.26 functions and environment values.
4. Add the optional values from `.env.command-center.example`.
5. Deploy to a Netlify preview and verify operator access to `/operator/project.html`.
6. Create a client portal link, open it in a private/incognito browser, and confirm only client-safe information is displayed.
7. Revoke the portal link and confirm it stops working immediately.
8. Create a client-visible milestone and verify it appears in the portal.
9. Test final-deliverable acknowledgment with a non-production Project #.
10. Enable automatic reminders only on a test Project first. Scheduled Functions run only on published deploys; use Netlify's **Run now** control or `netlify functions:invoke project-reminders` for test invocation.
11. Confirm reminder email sender/reply-to values are valid before enabling reminders on live projects.
12. Review closeout and retention settings before marking any live project Archived.

## Netlify schedule

`project-reminders.mjs` exports an inline schedule of `0 14 * * *` (14:00 UTC daily). The handler itself skips weekends using America/New_York calendar days.

## Important boundaries

- Client portal access is token-based and should be treated like a private link. Do not post it publicly.
- Portal tokens can be revoked from the Command Center.
- Automatic reminders are disabled by default per project.
- Retention dates create review obligations only; the patch never automatically deletes project records.
- Large/regulated/sensitive document exchange remains subject to the 2.26 external-secure-upload boundary.
