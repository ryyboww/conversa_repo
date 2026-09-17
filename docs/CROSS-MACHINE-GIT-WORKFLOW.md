# Cross-machine Git workflow

This project uses one stable branch, `main_conversa`, and machine-specific work branches for each device.

## Rules

1. Never commit directly to `main_conversa` from either machine.
2. Each machine gets its own branch, for example:
   - `windows/work`
   - `mac/work`
3. Keep each machine branch clean before syncing.
4. Pull/rebase before push.
5. Only merge or rebase machine branches back into `main_conversa` after review and cleanup.

## Windows setup

From PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-machine-branch.ps1 -Machine windows -Name work
```

To sync the current machine branch:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-machine-branch.ps1 -Machine windows
```

## Mac setup

From bash/zsh:

```bash
git fetch --all --prune
git switch main_conversa
git pull --rebase origin main_conversa
git switch -c mac/work
```

Then every sync:

```bash
git status --porcelain
if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree not clean; skipping pull/push."
else
  git fetch --all --prune
  git pull --rebase origin mac/work
  git push origin HEAD
fi
```

## When two machines both changed the same file

This is the safe pattern:

- Work on the branch tied to your machine.
- Push that machine branch.
- On the other machine, fetch and pull the remote branch for that machine.
- If both branches diverged, either:
  - merge one into the other with a deliberate conflict resolution, or
  - treat one machine branch as the source of truth and rebase the other branch onto it.

Do not directly push both machines into the same branch without resolving divergence.

## Final merge to production branch

When ready to publish:

```bash
git switch main_conversa
git pull --rebase origin main_conversa
git merge --no-ff windows/work
# or
# git merge --no-ff mac/work
# resolve conflicts
git push origin main_conversa
```

This workflow prevents silent overwrite conflicts while keeping your 15-minute auto-sync rules intact.
