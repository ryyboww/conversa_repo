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
