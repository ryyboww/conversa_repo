# Cross-Machine Git Workflow

Use GitHub as the handoff point between the MAC and Windows machine. Keep
`main_conversa` integration-ready and do day-to-day work on a short-lived
branch named for the machine and task. Use `MAC` for this machine and
`Windows` for the Windows device.

## Start of every work session

Run these commands from the repository root:

```text
git status --short --branch
git switch main_conversa
git pull --ff-only
git switch -c MAC/<task-name>
```

On Windows, use `Windows/<task-name>` instead of `MAC/<task-name>`. If the
task branch already exists, switch to it and update it from `main_conversa`
instead of creating it again.

Do not pull with uncommitted work. Commit it, or use `git stash push -u` with
a descriptive message before switching branches.

## Handoff between machines

1. Finish the smallest coherent change on the current device.
2. Run `npm run check` and `npm run build` when the change affects the site.
3. Commit with a specific message, then push the task branch:

```text
git add <files>
git commit -m "Describe the change"
git push -u origin MAC/<task-name>
```

4. Open a pull request into `main_conversa` and wait for checks to pass.
5. On the other machine, update `main_conversa` with `git pull --ff-only`,
   then create that machine's task branch.

Never force-push `main_conversa`, reset it hard, or have both machines edit the
same task branch at the same time.

## Keep machine state local

Do not commit `node_modules`, `dist`, `.astro`, `.env*` files, activation
reports, editor caches, or credentials. These are machine- or environment-
specific and can create misleading cross-machine changes.

The checked-in `.vscode/mcp.json` is shared project configuration. Keep
machine-specific MCP configuration outside the repository and do not replace
the shared file with a Mac- or Windows-only version.

## If branches diverge

Stop before merging blindly. Save local work, fetch the remote, and inspect
the commits:

```text
git status --short --branch
git fetch origin
git log --oneline --decorate --graph --left-right HEAD...origin/main_conversa
```

Prefer a pull request or a deliberate rebase of the task branch onto the
latest `origin/main_conversa`. Ask before resolving conflicts in shared
configuration, deployment files, or production content.