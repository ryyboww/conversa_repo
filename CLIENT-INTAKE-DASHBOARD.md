# Client Intake and Dashboard Foundation

<<<<<<< HEAD
## Direct client intake

The shareable prospective-client URL is:

`https://converastrategies.com/intake/`

The form is intentionally straightforward for launch and can be refined after real inquiries show which questions are most useful. It collects contact information, organization/role, engagement type, challenge, desired outcome, timing, optional budget range, referral source, and additional context.
=======
## Private client intake

The private Intake route is:

`https://converastrategies.com/intake/`

It is not a public prospective-client entry point and should not be linked from public navigation, service calls to action, or general correspondence. Professional inquiries begin through Contact. After manual review, a private Intake invitation may be sent when additional project information is useful.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

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
