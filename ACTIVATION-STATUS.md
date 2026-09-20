# Convera Strategies — Activation Status

**Release:** 2.56.0  
**Current state:** publication-source candidate; external business infrastructure remains pending.

| Area | Status | Next action |
|---|---|---|
| Approved public design/content | Source-frozen | Preserve unless a confirmed launch defect or deliberate content correction requires change |
| Contact/private Intake separation | Implemented | Verify on Netlify after deployment |
| Repository audit | Pass — 37/37 | Re-run after any source change |
| Release-readiness audit | Pass — 51/51 | Re-run after any source change |
| 2.56 workflow verification | Pass — 18/18 | Re-run after any source change |
| Privacy/exposure audit | Pass — 5/5 | Re-run after any source change |
| Package lock | Present | Use `npm ci` in registry-connected environment |
| Astro check/build | Pending | Run `npm run check` and `npm run build:verify` |
| One-time contribution URL | Pending | Create hosted checkout and configure environment |
| Monthly contribution URL | Pending | Create hosted checkout and configure environment |
| Branded mailbox delivery | Pending external verification | Send/receive tests for all configured mailboxes |
| Netlify production deployment | Pending | Deploy after CI/build passes |
| Production forms/notifications | Pending live verification | Test `website-contact`, `follow-the-work`, and private `client-intake` separately |
| Contribution flow | Pending live verification | Test one-time and monthly paths |
| Browser/mobile/social QA | Pending | Review the deployed production site |

Do not mark an external or operational flag complete until the corresponding real-world test succeeds.
