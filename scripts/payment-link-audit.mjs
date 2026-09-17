import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const strict = process.argv.includes('--strict');
const root = process.cwd();

function parseEnvFile(file) {
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');
    out[key] = value;
  }
  return out;
}

const fileEnv = {
  ...parseEnvFile(path.join(root, '.env')),
  ...parseEnvFile(path.join(root, '.env.local')),
  ...parseEnvFile(path.join(root, '.env.production')),
};
const env = { ...fileEnv, ...process.env };

const links = [
  ['One-time contribution', env.PUBLIC_SUPPORT_ONE_TIME_URL],
  ['Monthly contribution', env.PUBLIC_SUPPORT_MONTHLY_URL],
];

const results = [];
const add = (name, status, detail) => results.push({ name, status, detail });

async function inspect(name, raw) {
  if (!raw) return add(name, 'PENDING', 'URL not configured');
  let url;
  try { url = new URL(raw); } catch { return add(name, 'FAIL', 'Configured value is not a valid URL'); }
  if (url.protocol !== 'https:') return add(name, 'FAIL', `${url.hostname}: HTTPS is required`);
  if (['localhost', '127.0.0.1'].includes(url.hostname)) return add(name, 'FAIL', `${url.hostname}: local URL is not valid for production`);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'ConveraStrategiesPaymentAudit/2.6' } });
    const ok = response.status >= 200 && response.status < 400;
    add(name, ok ? 'PASS' : 'FAIL', `${url.hostname} → HTTP ${response.status}; final host ${new URL(response.url).hostname}`);
  } catch (error) {
    add(name, 'FAIL', `${url.hostname} → ${error.name === 'AbortError' ? 'request timed out' : error.message}`);
  } finally {
    clearTimeout(timer);
  }
}

console.log('\nConvera Strategies — contribution-link audit\n');
for (const [name, url] of links) await inspect(name, url);
const configured = links.filter(([, value]) => Boolean(value));
if (configured.length === 2 && links[0][1] === links[1][1]) add('Distinct checkout links', 'WARN', 'One-time and monthly URLs are identical');
else if (configured.length === 2) add('Distinct checkout links', 'PASS', 'One-time and monthly links are distinct');
else add('Distinct checkout links', 'PENDING', 'Both contribution URLs are not yet configured');

for (const item of results) console.log(`${item.status.padEnd(7)}  ${item.name} — ${item.detail}`);
const failures = results.filter((item) => item.status === 'FAIL');
const pending = results.filter((item) => item.status === 'PENDING');
console.log(`\n${failures.length} failure(s); ${pending.length} pending item(s).`);
if (strict && (failures.length || pending.length)) process.exit(1);
