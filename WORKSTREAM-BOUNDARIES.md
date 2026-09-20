# Convera Strategies — Workstream Boundaries

## Purpose

The website and the Convera Strategies Operations Manual are separate controlled workstreams. Work may continue on both at the same time without either project overwriting, absorbing, or silently changing the other.

## Website workstream

This repository controls the public website, including its pages, navigation, forms, privacy protections, accessibility, publication records, public configuration, and deployment checks.

The website currently preserves this professional-services pathway:

**Contact → manual review → direct private Intake invitation → Intake**

The public Contact form and private Intake form must remain separate. The Intake route remains private, absent from public navigation, and marked noindex.

## Operations Manual workstream

The Operations Manual is maintained as a separate versioned master document. Its working files, approval records, appendices, and draft versions do not belong in the website repository or website release archive.

## Controlled alignment

A policy, procedure, mailbox, service description, form rule, or workflow may affect both projects. In those cases:

1. Complete the change in its originating workstream.
2. Identify whether the other workstream requires a corresponding update.
3. Review the wording and operational effect separately.
4. Record and verify the second change as its own versioned action.

Neither workstream automatically controls the other. A website edit does not revise the manual, and a manual revision does not change the website until a separate website decision is made.

## Release protection

Run `npm run workstreams:audit` before approving a website release. The check blocks:

- Microsoft Word working documents inside the website source;
- files whose names identify them as Convera Strategies Operations Manual versions; and
- reserved manual working directories inside the website project.

This protection concerns file separation. It does not prevent deliberate, reviewed alignment of public language or operating procedures.
