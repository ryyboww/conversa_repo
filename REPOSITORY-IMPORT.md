# Repository Import — Convera Strategies 2.14.0

Release 2.14.0 is distributed both as a normal source ZIP and as a portable Git bundle. The Git bundle preserves the verified `main_conversa` branch and annotated `v2.14.0` tag without requiring a live GitHub connection during packaging.

## Import the bundle

Place `ConveraStrategies-2.14.0.gitbundle` in the directory where you want the repository, then run:

```bash
git clone ConveraStrategies-2.14.0.gitbundle convera-strategies
cd convera-strategies
git status
git tag --list
```

Expected branch: `main_conversa`  
Expected release tag: `v2.14.0`

## Connect GitHub

Using the existing GitHub repository `convera_published_codes`:

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main_conversa
git push origin v2.14.0
```

Do not commit `.env`, `.env.operations`, `node_modules/`, `dist/`, `.astro/`, or generated activation reports.

## First registry-connected install

`package-lock.json` remains intentionally absent until a registry-connected `npm install` completes successfully. Once generated:

```bash
npm run verify
git add package-lock.json
git commit -m "Add npm lockfile after verified install"
```

After the lockfile is committed, CI and Netlify can be changed from `npm install` to deterministic `npm ci`.
