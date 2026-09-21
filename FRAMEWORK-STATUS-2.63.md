# Framework Status 2.63.0

## Status

Release 2.63.0 adds a hosting-capacity release control after Netlify paused production deploys for the team while leaving the existing published site online.

## Control added

- `OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE` records whether the Netlify dashboard currently permits production publication.
- The flag defaults to `false` and remains local in `.env.operations`.
- The activation report presents hosting capacity separately from completed production deployment.
- The strict go-live gate blocks publication until capacity is explicitly verified.
- `HOSTING-CAPACITY.md` explains when to set or reset the flag without storing billing, payment, or access information in source.
- `.netlify/` is ignored because it contains generated local build and function artifacts, not source files.

## Preserved baseline

- Version 2.62 public architecture, routes, functions, email workflow, and security controls remain unchanged.
- The Operations Manual remains a separate controlled workstream.
- Production remains on the existing published deployment until Netlify restores production capacity.
- Preview work may continue, but preview availability does not satisfy the production-capacity control.
