# Client Intake and Dashboard Foundation

## Private client intake

The private Intake route is:

`https://converastrategies.com/intake/`

It is not a public prospective-client entry point and should not be linked from public navigation, service calls to action, or general correspondence. Professional inquiries begin through Contact. After manual review, a private Intake invitation may be sent when additional project information is useful.

The Netlify form name is `client-intake`. It redirects to `/intake/thank-you/` and is excluded from search indexing and the sitemap.

After reviewing an initial Contact submission, the operator can send a private invitation from:

`https://converastrategies.com/operator/intake-invite.html`

The control requires the Convera operator key. The recipient name, recipient email, and optional note are entered manually; the Postmark-backed email includes the private Intake URL.

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
