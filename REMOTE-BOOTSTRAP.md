<<<<<<< HEAD
# Remote Repository Bootstrap
=======
# Remote Repository Bootstrap — Convera Strategies 2.56.0
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

**Production repository:** `convera_published_codes`  
**Production branch:** `main_conversa`

<<<<<<< HEAD

Version 2.14.0 adds a guarded command for connecting the verified local Convera Strategies repository to its eventual GitHub destination without rewriting Git history.

## 1. Preview the destination

Run a plan-only check first:
=======
The guarded bootstrap command uses the package version dynamically. For this release, the required tag is `v2.56.0`.

## 1. Prepare the verified release commit

Before remote publication, the working tree must be clean, the active branch must be `main_conversa`, and tag `v2.56.0` must point at `HEAD`.

## 2. Preview the destination
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git
```

<<<<<<< HEAD
The command verifies the repository is on `main_conversa`, the working tree is clean, and release tag `v2.14.0` points at `HEAD`. It does not change Git configuration in plan mode.

## 2. Configure `origin`

After confirming the destination:
=======
Plan mode does not change Git configuration.

## 3. Configure `origin`
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git --apply
```

<<<<<<< HEAD
This adds `origin` when none exists. If `origin` already points elsewhere, the command blocks rather than silently replacing it. Use `--replace` only after confirming the new destination is intentional.

## 3. Publish the verified baseline

When GitHub authentication is available:
=======
If `origin` already points elsewhere, the command blocks. Use `--replace` only after confirming the destination is intentional.

## 4. Publish the verified branch and release tag
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997

```bash
npm run remote:bootstrap -- https://github.com/OWNER/convera_published_codes.git --push
```

<<<<<<< HEAD
This publishes only the `main_conversa` branch and the matching `v2.14.0` release tag, then uses `git ls-remote` to confirm both refs exist on the remote.

## Safety behavior

The bootstrap command:
- refuses to run outside a Git repository;
- requires `main_conversa` as the active branch;
- requires a clean working tree;
- requires the current release tag to point at `HEAD`;
- accepts GitHub HTTPS or SSH repository URLs;
- does not overwrite an existing different `origin` unless `--replace` is explicit;
- does not print embedded HTTPS credentials;
- performs no remote mutation unless `--apply` or `--push` is supplied.

No credentials are stored in the project files.
=======
The command publishes only `main_conversa` and the matching `v2.56.0` tag, then verifies both refs on the remote.

## Safety behavior

The command refuses to proceed when the repository, branch, clean-tree state, tag, or destination does not match the release controls. It does not print embedded HTTPS credentials and performs no remote mutation in plan mode.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
