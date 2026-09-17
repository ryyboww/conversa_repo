# Convera Strategies 2.35.1 — Clean Install

Use this release in a **new empty folder** rather than copying it over an older working directory.

Your previous `npm run check` output showed both `src/...` and `conversa_repo/src/...`, which means an older nested source tree remained in the local directory and Astro was scanning both copies.

Recommended Windows steps:

1. Rename the current folder to `convera_published_codes_backup`.
2. Create a fresh `convera_published_codes` folder.
3. Extract this release directly into the fresh folder.
4. Run `npm install` (or `npm ci` when the lockfile is unchanged).
5. Run `npm run check`.
6. Run `npm run build`.
7. Run `npm run dev` and review Home plus at least one interior page.

Do not copy `node_modules`, `dist`, `.astro`, or an old `conversa_repo` folder into the fresh release.
