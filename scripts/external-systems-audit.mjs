import { spawnSync } from 'node:child_process';
import process from 'node:process';

const strict = process.argv.includes('--strict');
const domain = process.env.PUBLIC_SITE_DOMAIN || 'converastrategies.com';
const checks = [
  ['Domain / HTTPS', ['scripts/domain-external-audit.mjs', domain, ...(strict ? ['--strict'] : [])]],
  ['Email DNS', ['scripts/email-dns-audit.mjs', domain, ...(strict ? ['--strict'] : [])]],
  ['Contribution links', ['scripts/payment-link-audit.mjs', ...(strict ? ['--strict'] : [])]],
];
let failed = false;
console.log('\nConvera Strategies — external systems audit\n');
for (const [label, args] of checks) {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env });
  if ((result.status ?? 1) !== 0) failed = true;
}
console.log(`\nExternal systems audit complete${strict ? ' (strict mode)' : ''}.`);
if (strict && failed) process.exit(1);
