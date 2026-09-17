# Framework Status — 2.44.0

Source-level repository, route, forms, content, metadata, configuration, privacy, accessibility, release-readiness, and version-specific checks are included with this release.

The final pinned Astro framework verification remains the clean-install sequence on the deployment workstation:

```powershell
npm install
npm run check
npm run build
npm run dev
```

Do not reuse `node_modules`, `.astro`, or `dist` from an older release.
