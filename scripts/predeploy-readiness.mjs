import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const envPath = path.join(root, '.env');
const envExamplePath = path.join(root, '.env.example');
const parseEnv = (text) => Object.fromEntries(text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#') && line.includes('=')).map((line) => { const i=line.indexOf('='); return [line.slice(0,i).trim(), line.slice(i+1).trim()]; }));
const env = fs.existsSync(envPath) ? parseEnv(fs.readFileSync(envPath,'utf8')) : {};
const example = fs.existsSync(envExamplePath) ? parseEnv(fs.readFileSync(envExamplePath,'utf8')) : {};

const checks = [
  ['Founder portrait', fs.existsSync(path.join(root,'public/images/ryan-brown.jpg')), 'public/images/ryan-brown.jpg'],
  ['Brand logo (light)', fs.existsSync(path.join(root,'public/brand/convera-logo-light-bg.png')), 'public/brand/convera-logo-light-bg.png'],
  ['Brand logo (dark)', fs.existsSync(path.join(root,'public/brand/convera-logo-dark-bg.png')), 'public/brand/convera-logo-dark-bg.png'],
  ['Professional intake page', fs.existsSync(path.join(root,'src/pages/work-with-convera.astro')), 'src/pages/work-with-convera.astro'],
  ['Netlify configuration', fs.existsSync(path.join(root,'netlify.toml')), 'netlify.toml'],
];

const optional = [
  ['One-time contribution URL', Boolean(env.PUBLIC_SUPPORT_ONE_TIME_URL), 'PUBLIC_SUPPORT_ONE_TIME_URL'],
  ['Monthly contribution URL', Boolean(env.PUBLIC_SUPPORT_MONTHLY_URL), 'PUBLIC_SUPPORT_MONTHLY_URL'],
  ['Analytics domain', Boolean(env.PUBLIC_PLAUSIBLE_DOMAIN), 'PUBLIC_PLAUSIBLE_DOMAIN'],
];

console.log('\nConvera Strategies — predeploy readiness\n');
for (const [name, ok, note] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${note}`);
console.log('');
for (const [name, ok, note] of optional) console.log(`${ok ? 'READY' : 'SETUP'} ${name} — ${note}`);

const failures = checks.filter(([,ok]) => !ok);
const setup = optional.filter(([,ok]) => !ok);
console.log(`\nRequired checks: ${checks.length-failures.length}/${checks.length} passing.`);
console.log(`External launch settings: ${optional.length-setup.length}/${optional.length} configured in local .env.`);
if (!fs.existsSync(envPath)) console.log('Note: .env is not present. Copy .env.example to .env for local production configuration; do not commit secrets.');
if (Object.keys(example).length === 0) console.log('Warning: .env.example does not document environment variables.');

if (failures.length || (strict && setup.length)) process.exit(1);
