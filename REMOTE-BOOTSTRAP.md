# Remote Repository Bootstrap

**Production repository:** `convera_published_codes`  
**Production branch:** `main_conversa`


Version 2.14.0 adds a guarded command for connecting the verified local Convera Strategies repository to its eventual GitHub destination without rewriting Git history.

## 1. Preview the destination

Run a plan-only check first:

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git
```

The command verifies the repository is on `main_conversa`, the working tree is clean, and release tag `v2.14.0` points at `HEAD`. It does not change Git configuration in plan mode.

## 2. Configure `origin`

After confirming the destination:

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git --apply
```

This adds `origin` when none exists. If `origin` already points elsewhere, the command blocks rather than silently replacing it. Use `--replace` only after confirming the new destination is intentional.

## 3. Publish the verified baseline

When GitHub authentication is available:

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git --push
```

This publishes only the `main_conversa` branch and the matching `v2.14.0` release tag, then uses `git ls-remote` to confirm both refs exist on the remote.

## Safety behavior

The bootstrap command:
- refuses to run outside a Git repository;
- requires `main_conversa` as the active branch;
- requires a clean working tree;
- requires the current release tag to point at `HEAD`;
- accepts GitHub HTTPS or SSH repository URLs;
- does not overwrite an existing different `origin` unless `--replace` is explicit;
- does not print embedded HTTPS credentials;
- performs no remote mutation unless `--apply` or `--push` is supplied.

No credentials are stored in the project files.
