# Convera Strategies 2.56.0 — Remote Status

The source package identifies the production target as repository `convera_published_codes`, branch `main_conversa`, release tag `v2.56.0`.

The distributed source ZIP does not claim a configured GitHub `origin`. Repository identity and authorization must be established by the account owner in the real Git worktree.

After committing/tagging the verified 2.56.0 release, run:

```bash
npm run git:remote-status
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git
```

After confirming the destination, use `--apply` or `--push` as described in `REMOTE-BOOTSTRAP.md`. A strict remote PASS requires the expected branch, clean worktree, matching release tag at HEAD, and correct `origin`.
