import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const file = path.join(root, '.env.operations');
const template = path.join(root, '.env.operations.example');
const arg = process.argv.slice(2).find(v => v.includes('='));

if (!arg) {
  console.error('Usage: npm run activation:set -- OPS_RYAN_MAIL_VERIFIED=true');
  process.exit(1);
}

const i = arg.indexOf('=');
const key = arg.slice(0, i).trim();
const rawValue = arg.slice(i + 1).trim().toLowerCase();
if (!/^OPS_[A-Z0-9_]+$/.test(key)) {
  console.error('Only OPS_* verification flags may be changed with this command.');
  process.exit(1);
}
if (!['true', 'false'].includes(rawValue)) {
  console.error('Operational verification values must be true or false.');
  process.exit(1);
}
if (!fs.existsSync(template)) {
  console.error('Missing .env.operations.example.');
  process.exit(1);
}
const allowed = new Set(
  fs.readFileSync(template, 'utf8')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('OPS_') && line.includes('='))
    .map(line => line.slice(0, line.indexOf('=')))
);
if (!allowed.has(key)) {
  console.error(`Unknown operational flag: ${key}`);
  console.error(`Allowed: ${[...allowed].join(', ')}`);
  process.exit(1);
}
if (!fs.existsSync(file)) fs.copyFileSync(template, file);
let text = fs.readFileSync(file, 'utf8');
const rx = new RegExp(`^${key}=.*$`, 'm');
if (rx.test(text)) text = text.replace(rx, `${key}=${rawValue}`);
else text += `\n${key}=${rawValue}\n`;
fs.writeFileSync(file, text);
console.log(`${key}=${rawValue}`);
console.log(rawValue === 'true'
  ? 'Recorded as verified. Use true only after the real-world test has succeeded.'
  : 'Recorded as not yet verified.');
console.log('Run: npm run activation:report');
