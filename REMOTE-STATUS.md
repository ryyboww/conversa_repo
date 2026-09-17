# Convera Strategies 2.14.0 — Remote Status

The source repository is locally prepared and release-tagged. A GitHub `origin` remote is intentionally not embedded in the public handoff package because repository identity and authorization must come from the account owner.

Run:

```bash
npm run git:remote-status
```

After connecting GitHub, run:

```bash
npm run git:remote-strict
```

A strict PASS means the local repository has an `origin` remote, the `main_conversa` branch is active, the worktree is clean, and the release tag matches HEAD.
