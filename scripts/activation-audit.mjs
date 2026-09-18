import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const envPath = path.join(root, '.env');

function parseEnv(text) {
  return Object.fromEntries(text.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#') && l.includes('=')).map(line => {
    const i = line.indexOf('=');
    return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')];
  }));
}
const fileEnv = fs.existsSync(envPath) ? parseEnv(fs.readFileSync(envPath, 'utf8')) : {};
const env = { ...fileEnv, ...process.env };
const checks = [];
const add = (name, ok, state, note) => checks.push({ name, ok, state, note });
const httpsUrl = (value) => {
  if (!value) return false;
  try { const u = new URL(value); return u.protocol === 'https:' && Boolean(u.hostname); } catch { return false; }
};

const one = env.PUBLIC_SUPPORT_ONE_TIME_URL?.trim() || '';
const monthly = env.PUBLIC_SUPPORT_MONTHLY_URL?.trim() || '';
const provider = env.PUBLIC_SUPPORT_PROVIDER_LABEL?.trim() || '';
const analytics = env.PUBLIC_PLAUSIBLE_DOMAIN?.trim() || '';

add('One-time contribution checkout', httpsUrl(one), one ? 'INVALID' : 'SETUP', one || 'PUBLIC_SUPPORT_ONE_TIME_URL is not configured');
add('Monthly contribution checkout', httpsUrl(monthly), monthly ? 'INVALID' : 'SETUP', monthly || 'PUBLIC_SUPPORT_MONTHLY_URL is not configured');
add('Payment provider label', Boolean(provider), provider ? 'READY' : 'SETUP', provider || 'PUBLIC_SUPPORT_PROVIDER_LABEL is not configured');
add('Analytics domain (optional)', !analytics || /^[A-Za-z0-9.-]+$/.test(analytics), analytics ? 'READY' : 'OPTIONAL', analytics || 'PUBLIC_PLAUSIBLE_DOMAIN may remain blank');

const site = fs.readFileSync(path.join(root, 'src/config/site.ts'), 'utf8');
for (const mailbox of ['ryan@converastrategies.com', 'hello@converastrategies.com', 'help@converastrategies.com', 'admin@converastrategies.com', 'billing@converastrategies.com']) {
  add(`Public mailbox declared: ${mailbox}`, site.includes(mailbox), site.includes(mailbox) ? 'READY' : 'FAIL', 'Delivery must still be verified with the mail provider.');
}

console.log('\nConvera Strategies — external activation audit\n');
for (const c of checks) console.log(`${c.ok ? 'PASS' : c.state.padEnd(4)}  ${c.name} — ${c.note}`);
const requiredNames = new Set(['One-time contribution checkout','Monthly contribution checkout','Payment provider label','Public mailbox declared: ryan@converastrategies.com','Public mailbox declared: hello@converastrategies.com','Public mailbox declared: help@converastrategies.com','Public mailbox declared: admin@converastrategies.com','Public mailbox declared: billing@converastrategies.com']);
const requiredFailures = checks.filter(c => requiredNames.has(c.name) && !c.ok);
console.log(`\nRequired activation items configured in this environment: ${requiredNames.size - requiredFailures.length}/${requiredNames.size}.`);
console.log('Mailbox entries above confirm site configuration only; actual mail delivery requires an external send/receive test.');
if (!fs.existsSync(envPath)) console.log('Local .env not found. This is normal for a clean release package; configure values locally or in Netlify.');
if (strict && requiredFailures.length) process.exit(1);
