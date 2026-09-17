# Package Lock Status

`package-lock.json` is intentionally not fabricated in this release. Dependency installation repeatedly timed out in the current execution environment, so producing a lockfile without registry-resolved package metadata would create false build confidence.

On the first machine or CI environment with working npm registry access, run:

```bash
npm install
npm run verify
```

Then commit the generated `package-lock.json`. After it exists, the GitHub and Netlify install strategy can be changed from `npm install` to `npm ci` for deterministic installs.
