<<<<<<< HEAD
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
=======
# Repository Import — Convera Strategies 2.56.0

The working 2.56.0 source ZIP is a publication candidate. A portable Git bundle should be generated only after the verified release is committed on `main_conversa` and tag `v2.56.0` points at `HEAD`.

## Create the tagged Launch Kit

```bash
npm run release:package
```

The packaging command produces:

- `ConveraStrategies-2.56.0-Source.zip`
- `ConveraStrategies-2.56.0.gitbundle`
- checksums and launch instructions
- `ConveraStrategies-2.56.0-Launch-Kit.zip`

## Import from the generated Git bundle

```bash
git clone ConveraStrategies-2.56.0.gitbundle convera-strategies
cd convera-strategies
git status
git branch --show-current
```

Expected production branch: `main_conversa`. Expected release tag: `v2.56.0`.

The generated bundle should be treated as authoritative only after `npm run release:package` completes successfully from a clean, tagged release worktree.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
