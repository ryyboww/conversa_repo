import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const strict = process.argv.includes('--strict');

function parseEnvFile(file) {
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs.readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#') && l.includes('='))
      .map(line => {
        const i = line.indexOf('=');
        return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')];
      })
  );
}

const buildEnv = { ...parseEnvFile(path.join(root, '.env')), ...process.env };
const ops = parseEnvFile(path.join(root, '.env.operations'));
const bool = (key) => String(ops[key] ?? '').toLowerCase() === 'true';
const https = (value) => {
  try { const u = new URL(value ?? ''); return u.protocol === 'https:' && Boolean(u.hostname); } catch { return false; }
};

const checks = [];
const add = (group, name, ok, detail) => checks.push({ group, name, ok, detail });

add('Build', 'Production dist exists', fs.existsSync(path.join(root, 'dist', 'index.html')), 'npm run build:verify');
add('Payments', 'One-time contribution URL configured', https(buildEnv.PUBLIC_SUPPORT_ONE_TIME_URL), buildEnv.PUBLIC_SUPPORT_ONE_TIME_URL || 'PUBLIC_SUPPORT_ONE_TIME_URL missing');
add('Payments', 'Monthly contribution URL configured', https(buildEnv.PUBLIC_SUPPORT_MONTHLY_URL), buildEnv.PUBLIC_SUPPORT_MONTHLY_URL || 'PUBLIC_SUPPORT_MONTHLY_URL missing');
add('Email', 'Founder mailbox send/receive verified', bool('OPS_RYAN_MAIL_VERIFIED'), 'OPS_RYAN_MAIL_VERIFIED');
add('Email', 'Public mailbox send/receive verified', bool('OPS_HELLO_MAIL_VERIFIED'), 'OPS_HELLO_MAIL_VERIFIED');
add('Email', 'Help mailbox send/receive verified', bool('OPS_HELP_MAIL_VERIFIED'), 'OPS_HELP_MAIL_VERIFIED');
add('Email', 'Admin mailbox send/receive verified', bool('OPS_ADMIN_MAIL_VERIFIED'), 'OPS_ADMIN_MAIL_VERIFIED');
add('Email', 'Billing mailbox send/receive verified', bool('OPS_BILLING_MAIL_VERIFIED'), 'OPS_BILLING_MAIL_VERIFIED');
add('Deploy', 'Production deployment completed', bool('OPS_PRODUCTION_DEPLOYED'), 'OPS_PRODUCTION_DEPLOYED');
add('Domain', 'Canonical domain verified', bool('OPS_CANONICAL_DOMAIN_VERIFIED'), 'OPS_CANONICAL_DOMAIN_VERIFIED');
add('Domain', 'TLS/SSL verified', bool('OPS_SSL_VERIFIED'), 'OPS_SSL_VERIFIED');
add('Forms', 'Netlify form submissions verified', bool('OPS_NETLIFY_FORMS_VERIFIED'), 'OPS_NETLIFY_FORMS_VERIFIED');
add('Forms', 'Form notifications verified', bool('OPS_FORM_NOTIFICATIONS_VERIFIED'), 'OPS_FORM_NOTIFICATIONS_VERIFIED');
add('Support', 'Contribution flow verified end to end', bool('OPS_SUPPORT_FLOW_VERIFIED'), 'OPS_SUPPORT_FLOW_VERIFIED');
add('QA', 'Desktop browser QA completed', bool('OPS_BROWSER_QA_VERIFIED'), 'OPS_BROWSER_QA_VERIFIED');
add('QA', 'Mobile QA completed', bool('OPS_MOBILE_QA_VERIFIED'), 'OPS_MOBILE_QA_VERIFIED');
add('QA', 'Social sharing preview verified', bool('OPS_SOCIAL_SHARE_VERIFIED'), 'OPS_SOCIAL_SHARE_VERIFIED');

console.log('\nConvera Strategies — go-live gate\n');
let current = '';
for (const c of checks) {
  if (c.group !== current) { current = c.group; console.log(`\n[${current}]`); }
  console.log(`${c.ok ? 'PASS' : 'BLOCK'}  ${c.name} — ${c.detail}`);
}
const failures = checks.filter(c => !c.ok);
console.log(`\nGo-live checks passed: ${checks.length - failures.length}/${checks.length}.`);
if (failures.length) {
  console.log('Launch remains gated until every BLOCK item is verified. Do not mark operational flags true before completing the corresponding real-world test.');
}
if (strict && failures.length) process.exit(1);
