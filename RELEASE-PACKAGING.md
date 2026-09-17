# Release Packaging

The release packaging command creates a single distribution directory and one all-in-one Launch Kit ZIP.

```bash
npm run release:package
```

The command refuses to package when:

- the working tree is dirty;
- the matching version tag does not exist; or
- `HEAD` does not match the release tag.

When those checks pass it generates a tagged source ZIP, portable Git bundle, checksums, `README-FIRST.md`, `LAUNCH-NOW.md`, and the master Launch Kit ZIP. The bundle is clone-tested and must check out a clean `main_conversa` branch at the release commit.

This makes release distribution reproducible and keeps all user-facing downloads in one predictable location.
