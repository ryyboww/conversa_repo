import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const parse = (name) => {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const i = line.indexOf('=');
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return out;
};
const env = parse('.env');
const ops = parse('.env.operations');
const yes = (v) => String(v ?? '').toLowerCase() === 'true';
const https = (v) => { try { return new URL(v ?? '').protocol === 'https:'; } catch { return false; } };

const items = [
  ['Astro dependencies installed', fs.existsSync(path.join(root, 'node_modules', 'astro', 'package.json')), 'npm install'],
  ['Production dist exists', fs.existsSync(path.join(root, 'dist', 'index.html')), 'npm run build:verify'],
  ['One-time contribution URL', https(env.PUBLIC_SUPPORT_ONE_TIME_URL), 'npm run config:set -- PUBLIC_SUPPORT_ONE_TIME_URL=https://...'],
  ['Monthly contribution URL', https(env.PUBLIC_SUPPORT_MONTHLY_URL), 'npm run config:set -- PUBLIC_SUPPORT_MONTHLY_URL=https://...'],
  ['Founder mailbox verified', yes(ops.OPS_RYAN_MAIL_VERIFIED), 'npm run activation:set -- OPS_RYAN_MAIL_VERIFIED=true'],
  ['Public mailbox verified', yes(ops.OPS_HELLO_MAIL_VERIFIED), 'npm run activation:set -- OPS_HELLO_MAIL_VERIFIED=true'],
  ['Help mailbox verified', yes(ops.OPS_HELP_MAIL_VERIFIED), 'npm run activation:set -- OPS_HELP_MAIL_VERIFIED=true'],
  ['Admin mailbox verified', yes(ops.OPS_ADMIN_MAIL_VERIFIED), 'npm run activation:set -- OPS_ADMIN_MAIL_VERIFIED=true'],
  ['Billing mailbox verified', yes(ops.OPS_BILLING_MAIL_VERIFIED), 'npm run activation:set -- OPS_BILLING_MAIL_VERIFIED=true'],
  ['Production deployed', yes(ops.OPS_PRODUCTION_DEPLOYED), 'npm run activation:set -- OPS_PRODUCTION_DEPLOYED=true'],
  ['Domain verified', yes(ops.OPS_CANONICAL_DOMAIN_VERIFIED), 'npm run activation:set -- OPS_CANONICAL_DOMAIN_VERIFIED=true'],
  ['SSL verified', yes(ops.OPS_SSL_VERIFIED), 'npm run activation:set -- OPS_SSL_VERIFIED=true'],
  ['Forms verified', yes(ops.OPS_NETLIFY_FORMS_VERIFIED), 'npm run activation:set -- OPS_NETLIFY_FORMS_VERIFIED=true'],
  ['Form notifications verified', yes(ops.OPS_FORM_NOTIFICATIONS_VERIFIED), 'npm run activation:set -- OPS_FORM_NOTIFICATIONS_VERIFIED=true'],
  ['Contribution flow verified', yes(ops.OPS_SUPPORT_FLOW_VERIFIED), 'npm run activation:set -- OPS_SUPPORT_FLOW_VERIFIED=true'],
  ['Desktop QA verified', yes(ops.OPS_BROWSER_QA_VERIFIED), 'npm run activation:set -- OPS_BROWSER_QA_VERIFIED=true'],
  ['Mobile QA verified', yes(ops.OPS_MOBILE_QA_VERIFIED), 'npm run activation:set -- OPS_MOBILE_QA_VERIFIED=true'],
  ['Social share preview verified', yes(ops.OPS_SOCIAL_SHARE_VERIFIED), 'npm run activation:set -- OPS_SOCIAL_SHARE_VERIFIED=true']
];
const ready = items.filter(([,ok]) => ok).length;
console.log(`\nConvera Strategies ${pkg.version} — launch operator summary\n`);
for (const [name, ok, next] of items) {
  console.log(`${ok ? 'PASS' : 'NEXT'}  ${name}${ok ? '' : ` — ${next}`}`);
}
console.log(`\nCompleted locally/externally: ${ready}/${items.length}`);
if (ready < items.length) {
  const next = items.find(([,ok]) => !ok);
  console.log(`Recommended next action: ${next[2]}`);
} else {
  console.log('All tracked launch items are marked complete. Run npm run deploy:gate for the strict final gate.');
}
console.log('');
