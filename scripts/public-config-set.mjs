import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const file = path.join(root, '.env');
const template = path.join(root, '.env.example');
const arg = process.argv.slice(2).find(v => v.includes('='));

if (!arg) {
  console.error('Usage: npm run config:set -- PUBLIC_SUPPORT_ONE_TIME_URL=https://...');
  process.exit(1);
}
const i = arg.indexOf('=');
const key = arg.slice(0, i).trim();
const value = arg.slice(i + 1).trim();
const allowed = new Set([
  'PUBLIC_SUPPORT_PROVIDER_LABEL',
  'PUBLIC_SUPPORT_ONE_TIME_URL',
  'PUBLIC_SUPPORT_MONTHLY_URL',
  'PUBLIC_PLAUSIBLE_DOMAIN'
]);
if (!allowed.has(key)) {
  console.error(`Unsupported public setting: ${key}`);
  console.error(`Allowed: ${[...allowed].join(', ')}`);
  process.exit(1);
}
const isHttps = (v) => {
  try { const u = new URL(v); return u.protocol === 'https:' && Boolean(u.hostname); } catch { return false; }
};
if (['PUBLIC_SUPPORT_ONE_TIME_URL', 'PUBLIC_SUPPORT_MONTHLY_URL'].includes(key) && value && !isHttps(value)) {
  console.error(`${key} must be a full https:// URL.`);
  process.exit(1);
}
if (key === 'PUBLIC_SUPPORT_PROVIDER_LABEL' && !value) {
  console.error('PUBLIC_SUPPORT_PROVIDER_LABEL cannot be blank when set with this command.');
  process.exit(1);
}
if (key === 'PUBLIC_PLAUSIBLE_DOMAIN' && value && !/^[A-Za-z0-9.-]+$/.test(value)) {
  console.error('PUBLIC_PLAUSIBLE_DOMAIN should be a hostname such as converastrategies.com, not a full URL.');
  process.exit(1);
}
if (!fs.existsSync(file)) {
  if (!fs.existsSync(template)) {
    console.error('Missing .env.example.');
    process.exit(1);
  }
  fs.copyFileSync(template, file);
}
let text = fs.readFileSync(file, 'utf8');
const rx = new RegExp(`^${key}=.*$`, 'm');
if (rx.test(text)) text = text.replace(rx, `${key}=${value}`);
else text += `\n${key}=${value}\n`;
fs.writeFileSync(file, text);
console.log(`${key}=${value || '(blank)'}`);
console.log('Only public build values belong here. Never place API secret keys in PUBLIC_* variables.');
console.log('Run: npm run activation:audit');
