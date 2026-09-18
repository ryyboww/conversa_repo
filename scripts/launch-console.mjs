import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const targets = JSON.parse(fs.readFileSync(path.join(root, 'deployment-targets.json'), 'utf8'));
const expectedBranch = targets.branch;
const expectedRepository = targets.repository;

const parseEnv = (name) => {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const i = line.indexOf('=');
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return out;
};
const yes = (v) => String(v ?? '').toLowerCase() === 'true';
const https = (v) => { try { const u = new URL(v ?? ''); return u.protocol === 'https:' && Boolean(u.hostname); } catch { return false; } };
const git = (...args) => {
  try { return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }).trim(); }
  catch { return ''; }
};

const env = { ...parseEnv('.env'), ...process.env };
const ops = parseEnv('.env.operations');
const origin = git('remote', 'get-url', 'origin');
const hasNodeModules = fs.existsSync(path.join(root, 'node_modules', 'astro', 'package.json'));
const hasLock = fs.existsSync(path.join(root, 'package-lock.json'));
const hasDist = fs.existsSync(path.join(root, 'dist', 'index.html'));
const remotePublished = Boolean(origin) && Boolean(git('ls-remote', '--exit-code', '--heads', 'origin', expectedBranch));

const stages = [
  {
    n: 1, name: 'Local setup and framework verification',
    done: hasNodeModules && hasDist,
    checks: [
      ['Dependencies installed', hasNodeModules],
      ['Production build verified', hasDist],
    ],
    next: !hasNodeModules ? 'npm run launch:bootstrap' : !hasDist ? 'npm run launch:bootstrap' : 'Complete'
  },
  {
    n: 2, name: 'GitHub repository publication',
    done: remotePublished,
    checks: [
      ['origin configured', Boolean(origin)],
      [`${expectedBranch} visible on remote`, remotePublished],
    ],
    next: !origin
      ? `npm run remote:bootstrap -- https://github.com/OWNER/${expectedRepository}.git --push`
      : !remotePublished ? 'npm run git:remote-status' : 'Complete'
  },
  {
    n: 3, name: 'Business activation settings',
    done: https(env.PUBLIC_SUPPORT_ONE_TIME_URL) && https(env.PUBLIC_SUPPORT_MONTHLY_URL) && yes(ops.OPS_RYAN_MAIL_VERIFIED) && yes(ops.OPS_HELLO_MAIL_VERIFIED) && yes(ops.OPS_HELP_MAIL_VERIFIED) && yes(ops.OPS_ADMIN_MAIL_VERIFIED) && yes(ops.OPS_BILLING_MAIL_VERIFIED),
    checks: [
      ['One-time contribution URL configured', https(env.PUBLIC_SUPPORT_ONE_TIME_URL)],
      ['Monthly contribution URL configured', https(env.PUBLIC_SUPPORT_MONTHLY_URL)],
      ['Founder mailbox verified', yes(ops.OPS_RYAN_MAIL_VERIFIED)],
      ['Public mailbox verified', yes(ops.OPS_HELLO_MAIL_VERIFIED)],
      ['Help mailbox verified', yes(ops.OPS_HELP_MAIL_VERIFIED)],
      ['Admin mailbox verified', yes(ops.OPS_ADMIN_MAIL_VERIFIED)],
      ['Billing mailbox verified', yes(ops.OPS_BILLING_MAIL_VERIFIED)],
    ],
    next: !https(env.PUBLIC_SUPPORT_ONE_TIME_URL)
      ? 'npm run activation:init, then set contribution URLs with npm run config:set'
      : !yes(ops.OPS_RYAN_MAIL_VERIFIED) ? 'Verify ryan@converastrategies.com send/receive and record it with activation:set'
      : !yes(ops.OPS_HELLO_MAIL_VERIFIED) ? 'Verify hello@converastrategies.com send/receive and record it with activation:set'
      : !yes(ops.OPS_HELP_MAIL_VERIFIED) ? 'Verify help@converastrategies.com send/receive and record it with activation:set'
      : !yes(ops.OPS_ADMIN_MAIL_VERIFIED) ? 'Verify admin@converastrategies.com send/receive and record it with activation:set'
      : !yes(ops.OPS_BILLING_MAIL_VERIFIED) ? 'Verify billing@converastrategies.com send/receive and record it with activation:set' : 'Complete'
  },
  {
    n: 4, name: 'Production deployment and live verification',
    done: yes(ops.OPS_PRODUCTION_DEPLOYED) && yes(ops.OPS_CANONICAL_DOMAIN_VERIFIED) && yes(ops.OPS_SSL_VERIFIED) && yes(ops.OPS_NETLIFY_FORMS_VERIFIED) && yes(ops.OPS_FORM_NOTIFICATIONS_VERIFIED) && yes(ops.OPS_SUPPORT_FLOW_VERIFIED) && yes(ops.OPS_BROWSER_QA_VERIFIED) && yes(ops.OPS_MOBILE_QA_VERIFIED) && yes(ops.OPS_SOCIAL_SHARE_VERIFIED),
    checks: [
      ['Production deployed', yes(ops.OPS_PRODUCTION_DEPLOYED)],
      ['Domain + SSL verified', yes(ops.OPS_CANONICAL_DOMAIN_VERIFIED) && yes(ops.OPS_SSL_VERIFIED)],
      ['Forms + notifications verified', yes(ops.OPS_NETLIFY_FORMS_VERIFIED) && yes(ops.OPS_FORM_NOTIFICATIONS_VERIFIED)],
      ['Contribution flow verified', yes(ops.OPS_SUPPORT_FLOW_VERIFIED)],
      ['Desktop/mobile/social QA verified', yes(ops.OPS_BROWSER_QA_VERIFIED) && yes(ops.OPS_MOBILE_QA_VERIFIED) && yes(ops.OPS_SOCIAL_SHARE_VERIFIED)],
    ],
    next: !yes(ops.OPS_PRODUCTION_DEPLOYED)
      ? 'Deploy the GitHub repository to Netlify, then run npm run live:audit -- https://converastrategies.com'
      : 'npm run go-live:status'
  }
];

console.log(`\nConvera Strategies ${pkg.version} — Launch Console`);
console.log(`Repository: ${expectedRepository}`);
console.log(`Production branch: ${expectedBranch}`);
console.log('Use this as the single operational status screen.\n');
for (const stage of stages) {
  console.log(`${stage.done ? 'PASS' : 'NEXT'}  Stage ${stage.n}: ${stage.name}`);
  for (const [label, ok] of stage.checks) console.log(`      ${ok ? '✓' : '○'} ${label}`);
  if (!stage.done) console.log(`      Next: ${stage.next}`);
  console.log('');
}
if (!hasLock) {
  console.log('ADVISORY  package-lock.json is not present yet. After the tagged release is on GitHub, run: npm run framework:lock\n');
}
const first = stages.find((s) => !s.done);
if (first) {
  console.log(`Recommended next step: Stage ${first.n} — ${first.next}`);
} else {
  console.log('All tracked launch stages are complete. Run npm run ready:strict for the final hard gate.');
}
console.log('\nPrimary reference: LAUNCH-NOW.md\n');
