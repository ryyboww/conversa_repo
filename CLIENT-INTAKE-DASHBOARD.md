# Client Intake and Dashboard Foundation

## Direct client intake

The shareable prospective-client URL is:

`https://converastrategies.com/intake/`

The form is intentionally straightforward for launch and can be refined after real inquiries show which questions are most useful. It collects contact information, organization/role, engagement type, challenge, desired outcome, timing, optional budget range, referral source, and additional context.

The Netlify form name is `client-intake`. It redirects to `/intake/thank-you/` and is excluded from search indexing and the sitemap.

## Client dashboard

The staged dashboard URL is:

`https://converastrategies.com/dashboard/`

The current dashboard is a noindex, no-store public shell showing the future client workspace structure: engagement overview, documents, meetings/messages, and billing. It deliberately stores and displays no client-specific or confidential information.

Before any real client data is exposed, add secure authentication and an appropriate data/document provider. Until then, clients should use direct Convera correspondence. Dashboard support routes to `help@converastrategies.com`; billing correspondence routes to `billing@converastrategies.com`.

## Security boundary

Do not place client records, invoices, private documents, passwords, API keys, or authentication secrets directly in the static Astro source. Dashboard activation requires a secure authenticated layer and should be treated as a separate production milestone.

## Optional secure portal handoff

When a secure external portal is selected, set these public Netlify environment values:

```text
PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL=Your provider name
PUBLIC_CLIENT_PORTAL_URL=https://secure-provider.example/...
```

The dashboard page will then expose a button to the secure portal. Only the public sign-in URL belongs here; authentication secrets, API keys, tokens, and client records must remain outside the static repository.
