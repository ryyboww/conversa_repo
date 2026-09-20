# Convera Strategies 2.38.0 — Framework Status

## Completed in this release

- `npm run release:audit` passes.
- 51/51 release-readiness checks pass.
- 42/42 2.38-specific checks pass.
- Privacy/exposure audit passes 5/5.
- 79 JavaScript/MJS files pass `node --check`.
- Publication image assets are normalized to 1200 × 675.
- No nested `conversa_repo` source tree is included.
- `node_modules`, `dist`, and `.astro` are excluded from the distribution.

## Still required on the local Windows installation

This container could not complete the npm dependency download, so the Astro binary was unavailable here. After extracting into a clean directory, run:

```powershell
npm install
npm run check
npm run build
npm run dev
```

Do not merge old `node_modules`, `.astro`, `dist`, or a prior `conversa_repo` directory into this release.
