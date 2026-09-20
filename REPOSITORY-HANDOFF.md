<<<<<<< HEAD
# Repository Handoff — Convera Strategies 2.14.0
=======
# Repository Handoff — Convera Strategies 2.56.0
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

This release already contains verified Git history. Do not reinitialize the repository when using the Git bundle. Connect the existing `main_conversa` branch to the GitHub repository `convera_published_codes`, then push the release tag.

## Before connecting GitHub

```bash
npm run repository:audit
npm run git:remote-status
git status
git tag --points-at HEAD
```

<<<<<<< HEAD
The source tree should be clean and HEAD should carry `v2.14.0`.
=======
The source tree should be clean and HEAD should carry `v2.56.0`.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

## Connect the remote

```bash
git remote add origin <YOUR_PRIVATE_GITHUB_REPOSITORY_URL>
npm run git:remote-strict
git push -u origin main_conversa
<<<<<<< HEAD
git push origin v2.14.0
=======
git push origin v2.56.0
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
```

If `origin` already exists, use `git remote set-url origin <URL>` instead.

## Dependency lock transition

The GitHub verification workflow uses `npm install` while no lockfile exists and automatically switches to `npm ci` after `package-lock.json` is committed. The first successful registry-connected install should therefore be followed by `npm run verify`, then a commit containing the generated lockfile.

## Netlify

Import the private GitHub repository. `netlify.toml` already defines the build command, `dist` directory, Node version, security headers, redirects, and canonical-host behavior. Public runtime values belong in Netlify environment settings; secrets do not belong in this static site.

See `REMOTE-REPOSITORY-HANDOFF.md` for the full sequence and `SOURCE-FREEZE.md` for the launch freeze boundary.
