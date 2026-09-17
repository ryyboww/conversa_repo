# Convera Strategies 2.39.0 — Framework Status

Source-level validation for 2.39.0 passed in the packaging environment, including release readiness, repository handoff, route, forms, accessibility-source, content, metadata, configuration, privacy, JavaScript syntax, and the dedicated 2.39 verification suite.

A supplemental Astro check was attempted using the prior reference project's Astro 5.18.2 installation. It could not start because that archived dependency tree does not contain the Linux Rollup optional native module (`@rollup/rollup-linux-x64-gnu`). This is an environment/dependency-tree limitation rather than a reported Convera source diagnostic.

The release therefore still requires the pinned local framework sequence on the deployment machine:

```powershell
npm install
npm run check
npm run build
npm run dev
```

Do not reuse or copy `node_modules`, `.astro`, or `dist` from an older project or operating system.
