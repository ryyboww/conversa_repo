import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checks = [];
const add = (name, status, note) => checks.push({ name, status, note });

const exists = (p) => fs.existsSync(path.join(root, p));
add('Founder portrait', exists('public/images/ryan-brown.jpg'), 'public/images/ryan-brown.jpg');
add('Light logo', exists('public/brand/convera-logo-light-bg.png'), 'public/brand/convera-logo-light-bg.png');
add('Dark logo', exists('public/brand/convera-logo-dark-bg.png'), 'public/brand/convera-logo-dark-bg.png');
add('Netlify config', exists('netlify.toml'), 'netlify.toml');
add('Robots file', exists('public/robots.txt'), 'public/robots.txt');
add('Manifest', exists('public/site.webmanifest'), 'public/site.webmanifest');
add('Support thank-you page', exists('src/pages/support/thank-you.astro'), '/support/thank-you/');

const envExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
add('Contribution configuration documented', envExample.includes('PUBLIC_SUPPORT_ONE_TIME_URL') && envExample.includes('PUBLIC_SUPPORT_MONTHLY_URL'), 'Set live hosted checkout URLs before launch.');
add('Analytics remains opt-in', envExample.includes('PUBLIC_PLAUSIBLE_DOMAIN'), 'Leave blank to disable.');

const failed = checks.filter((c) => !c.status);
for (const check of checks) {
  console.log(`${check.status ? 'PASS' : 'FAIL'}  ${check.name}${check.note ? ` — ${check.note}` : ''}`);
}
console.log(`\n${checks.length - failed.length}/${checks.length} readiness checks passed.`);
if (failed.length) process.exitCode = 1;
