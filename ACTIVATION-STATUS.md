# Convera Strategies — Activation Status

**Release:** 2.4.0  
**Current state:** source ready; external business infrastructure remains pending.

| Area | Status | Next action |
|---|---|---|
| Approved site architecture | Ready | Preserve unless a confirmed change is needed |
| Dependency-free source/operations audits | Pass | Continue using current release |
| Built-output audit | Ready to run | Runs after first successful Astro build |
| One-time contribution URL | Pending | Create hosted checkout and configure environment |
| Monthly contribution URL | Pending | Create hosted checkout and configure environment |
| Ryan mailbox delivery | Pending external verification | Send/receive test |
| Hello mailbox delivery | Pending external verification | Send/receive test |
| Netlify production deployment | Pending | Deploy after CI/build passes |
| Production forms | Pending live verification | Submit real tests |
| Contribution flow | Pending live verification | Test one-time and monthly paths |
| Browser/mobile QA | Pending | Review production site |

Use `.env.operations.example` only as a local verification ledger. Do not mark a flag complete until the corresponding external test succeeds.

Generate a fresh local report with:

```bash
npm run activation:report
```
