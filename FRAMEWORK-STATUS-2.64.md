# Framework Status 2.64.0

## Status

Release 2.64.0 strengthens client-portal readiness without activating the portal, changing the private Intake workflow, or publishing to production.

## Guardrails added

- `PUBLIC_CLIENT_PORTAL_ENABLED` defaults to `false` and records the deliberate public handoff decision.
- A valid portal URL alone no longer activates the dashboard handoff.
- Portal activation requires both the explicit switch and a valid HTTPS URL.
- The supported configuration command now manages the portal switch, provider label, and URL.
- The configuration audit requires an HTTPS URL and provider label whenever activation is requested.

## Preserved baseline

- `/dashboard/` remains a noindex shell containing no client-specific information.
- `/intake/` remains outside public navigation and continues to follow Contact → manual review → direct private invitation.
- No authentication credentials, operator keys, client records, or secret values are stored in public configuration.
- Version 2.63 hosting-capacity controls remain in force, and production is unchanged.
- The Operations Manual remains a separate controlled workstream.
