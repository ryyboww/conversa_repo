import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const release = pkg.version;
const parseEnv = (file) => {
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const idx = line.indexOf('=');
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    out[key] = value;
  }
  return out;
};

const local = parseEnv(path.join(root, '.env'));
const ops = parseEnv(path.join(root, '.env.operations'));
const env = { ...local, ...ops, ...process.env };
const yes = (v) => /^(1|true|yes|verified)$/i.test(String(v ?? '').trim());
const validHttps = (v) => {
  try { return new URL(v).protocol === 'https:'; } catch { return false; }
};
const host = (v) => {
  try { return new URL(v).host; } catch { return ''; }
};

const items = [
  { key: 'support_one_time', label: 'One-time contribution checkout', ready: validHttps(env.PUBLIC_SUPPORT_ONE_TIME_URL), detail: validHttps(env.PUBLIC_SUPPORT_ONE_TIME_URL) ? host(env.PUBLIC_SUPPORT_ONE_TIME_URL) : 'Not configured' },
  { key: 'support_monthly', label: 'Monthly contribution checkout', ready: validHttps(env.PUBLIC_SUPPORT_MONTHLY_URL), detail: validHttps(env.PUBLIC_SUPPORT_MONTHLY_URL) ? host(env.PUBLIC_SUPPORT_MONTHLY_URL) : 'Not configured' },
  { key: 'provider', label: 'Payment provider label', ready: Boolean(String(env.PUBLIC_SUPPORT_PROVIDER_LABEL ?? '').trim()), detail: String(env.PUBLIC_SUPPORT_PROVIDER_LABEL ?? '').trim() || 'Not configured' },
  { key: 'ryan_mail', label: 'ryan@converastrategies.com send/receive verified', ready: yes(env.OPS_RYAN_MAIL_VERIFIED), detail: yes(env.OPS_RYAN_MAIL_VERIFIED) ? 'Verified externally' : 'Pending external test' },
  { key: 'hello_mail', label: 'hello@converastrategies.com send/receive verified', ready: yes(env.OPS_HELLO_MAIL_VERIFIED), detail: yes(env.OPS_HELLO_MAIL_VERIFIED) ? 'Verified externally' : 'Pending external test' },
  { key: 'help_mail', label: 'help@converastrategies.com send/receive verified', ready: yes(env.OPS_HELP_MAIL_VERIFIED), detail: yes(env.OPS_HELP_MAIL_VERIFIED) ? 'Verified externally' : 'Pending external test' },
  { key: 'admin_mail', label: 'admin@converastrategies.com send/receive verified', ready: yes(env.OPS_ADMIN_MAIL_VERIFIED), detail: yes(env.OPS_ADMIN_MAIL_VERIFIED) ? 'Verified externally' : 'Pending external test' },
  { key: 'billing_mail', label: 'billing@converastrategies.com send/receive verified', ready: yes(env.OPS_BILLING_MAIL_VERIFIED), detail: yes(env.OPS_BILLING_MAIL_VERIFIED) ? 'Verified externally' : 'Pending external test' },
  { key: 'netlify_capacity', label: 'Netlify production deploy capacity available', ready: yes(env.OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE), detail: yes(env.OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE) ? 'Production deploys currently permitted' : 'Paused, unavailable, or not yet verified' },
  { key: 'netlify_deployed', label: 'Production Netlify deployment completed', ready: yes(env.OPS_PRODUCTION_DEPLOYED), detail: yes(env.OPS_PRODUCTION_DEPLOYED) ? 'Confirmed externally' : 'Pending' },
  { key: 'canonical_domain', label: 'Canonical production domain verified', ready: yes(env.OPS_CANONICAL_DOMAIN_VERIFIED), detail: yes(env.OPS_CANONICAL_DOMAIN_VERIFIED) ? 'Verified externally' : 'Pending DNS/domain test' },
  { key: 'ssl', label: 'Production TLS/SSL verified', ready: yes(env.OPS_SSL_VERIFIED), detail: yes(env.OPS_SSL_VERIFIED) ? 'Verified externally' : 'Pending HTTPS test' },
  { key: 'forms', label: 'Production Contact and intake forms verified', ready: yes(env.OPS_NETLIFY_FORMS_VERIFIED), detail: yes(env.OPS_NETLIFY_FORMS_VERIFIED) ? 'Verified externally' : 'Pending production test' },
  { key: 'form_notifications', label: 'Production form notifications verified', ready: yes(env.OPS_FORM_NOTIFICATIONS_VERIFIED), detail: yes(env.OPS_FORM_NOTIFICATIONS_VERIFIED) ? 'Verified externally' : 'Pending notification-delivery test' },
  { key: 'support_flow', label: 'Production contribution flow verified', ready: yes(env.OPS_SUPPORT_FLOW_VERIFIED), detail: yes(env.OPS_SUPPORT_FLOW_VERIFIED) ? 'Verified externally' : 'Pending production test' },
  { key: 'desktop_qa', label: 'Production desktop browser QA completed', ready: yes(env.OPS_BROWSER_QA_VERIFIED), detail: yes(env.OPS_BROWSER_QA_VERIFIED) ? 'Verified externally' : 'Pending production QA' },
  { key: 'mobile_qa', label: 'Production mobile QA completed', ready: yes(env.OPS_MOBILE_QA_VERIFIED), detail: yes(env.OPS_MOBILE_QA_VERIFIED) ? 'Verified externally' : 'Pending mobile QA' },
  { key: 'social_share', label: 'Social sharing preview verified', ready: yes(env.OPS_SOCIAL_SHARE_VERIFIED), detail: yes(env.OPS_SOCIAL_SHARE_VERIFIED) ? 'Verified externally' : 'Pending social-preview test' }
];

const readyCount = items.filter((x) => x.ready).length;
const state = readyCount === items.length ? 'ACTIVATION COMPLETE' : readyCount >= 3 ? 'ACTIVATION IN PROGRESS' : 'ACTIVATION PENDING';
const report = {
  release,
  generatedAt: new Date().toISOString(),
  state,
  ready: readyCount,
  total: items.length,
  items
};

const md = [
  '# Convera Strategies — Activation Report',
  '',
  `**Release:** ${release}  `,
  `**Generated:** ${report.generatedAt}  `,
  `**State:** ${state}  `,
  `**Completed:** ${readyCount}/${items.length}`,
  '',
  '| Item | Status | Detail |',
  '|---|---|---|',
  ...items.map((x) => `| ${x.label} | ${x.ready ? 'Ready' : 'Pending'} | ${x.detail} |`),
  '',
  'This report distinguishes source configuration from external verification. It does not infer mailbox delivery, payment success, Netlify production capacity, form delivery, or browser QA from source code.',
  ''
].join('\n');

fs.writeFileSync(path.join(root, 'ACTIVATION-REPORT.md'), md);
fs.writeFileSync(path.join(root, 'ACTIVATION-REPORT.json'), JSON.stringify(report, null, 2) + '\n');
console.log(md);
