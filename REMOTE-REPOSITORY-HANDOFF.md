# Remote Repository Handoff — Convera Strategies 2.14.0

This release is prepared for transfer from the verified local Git baseline to the existing GitHub repository `convera_published_codes` and then to Netlify.

## 1. Confirm the local baseline

```bash
npm run repository:audit
npm run git:remote-status
git status
git log -1 --oneline
git tag --points-at HEAD
```

The packaged baseline should be clean and tagged `v2.14.0`.

## 2. Connect the existing GitHub repository

After the empty private repository exists, set its URL as `origin`:

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
```

If `origin` already exists:

```bash
git remote set-url origin <YOUR_GITHUB_REPOSITORY_URL>
```

Then verify:

```bash
npm run git:remote-strict
```

## 3. Push the verified history

```bash
git push -u origin main_conversa
git push origin v2.14.0
```

Do not commit `.env`, `.env.operations`, `node_modules/`, `dist/`, or private credentials.

## 4. Allow GitHub verification to run

The repository workflow uses `npm ci` automatically when a `package-lock.json` exists; until then it uses `npm install`. A successful registry-connected install should generate the lockfile, which should then be committed so future builds become deterministic.

## 5. Connect Netlify

Import the GitHub repository in Netlify. The repository already contains `netlify.toml` with the production build command, `dist` publish directory, Node version, security headers, redirects, and hostname normalization.

The source remains frozen during this transfer except for launch-blocking corrections described in `SOURCE-FREEZE.md`.
