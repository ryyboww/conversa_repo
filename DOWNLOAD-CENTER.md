<<<<<<< HEAD
# Convera Strategies 2.14.0 — Download Center

Keep one file only: `ConveraStrategies-2.14.0-Launch-Kit.zip`.

It contains the tagged source, portable Git bundle, quick-start launch material, direct intake/dashboard notes, and integrity information. Optional technical files remain inside the source archive until needed.

The annotated Git tag `v2.14.0` is the release source of truth. Production targets remain `convera_published_codes` and `main_conversa`.
=======
# Convera Strategies 2.57.0 — Download Center

The current working source package is the **2.57.0 Founder Identity Clarification** release.

Before public launch, create the final tagged Launch Kit only after the verified release is committed on `main_conversa` and tag `v2.57.0` points at `HEAD`:

```bash
npm run release:package
```

That command produces the reproducible source ZIP, Git bundle, checksums, launch instructions, and all-in-one Launch Kit from the verified Git tag.

Until the Git-tagged packaging step is complete, treat the current 2.57.0 source ZIP as the working publication candidate rather than the final launch archive.
>>>>>>> 18869ceba24513e112b27a234f935784f3c71997
