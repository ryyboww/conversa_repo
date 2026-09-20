# Remote Repository Bootstrap — Convera Strategies 2.56.0

**Production repository:** `convera_published_codes`  
**Production branch:** `main_conversa`

The guarded bootstrap command uses the package version dynamically. For this release, the required tag is `v2.56.0`.

## 1. Prepare the verified release commit

Before remote publication, the working tree must be clean, the active branch must be `main_conversa`, and tag `v2.56.0` must point at `HEAD`.

## 2. Preview the destination

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git
```

Plan mode does not change Git configuration.

## 3. Configure `origin`

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git --apply
```

If `origin` already points elsewhere, the command blocks. Use `--replace` only after confirming the destination is intentional.

## 4. Publish the verified branch and release tag

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git --push
```

The command publishes only `main_conversa` and the matching `v2.56.0` tag, then verifies both refs on the remote.

## Safety behavior

The command refuses to proceed when the repository, branch, clean-tree state, tag, or destination does not match the release controls. It does not print embedded HTTPS credentials and performs no remote mutation in plan mode.
