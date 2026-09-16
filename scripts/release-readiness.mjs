import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const netlify = fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8');
const issues = [];
const checks = [];
const add = (name, ok, detail) => checks.push({ name, ok, detail });

add('Release version is 2.4.0', pkg.version === '2.4.0', pkg.version);
add('Node version is pinned for local work', fs.existsSync(path.join(root, '.nvmrc')), '.nvmrc');
add('Node version is pinned for alternate managers', fs.existsSync(path.join(root, '.node-version')), '.node-version');
add('Supported Node range is declared', typeof pkg.engines?.node === 'string', pkg.engines?.node ?? 'missing');
add('Astro dependency is exact-pinned', /^\d+\.\d+\.\d+$/.test(pkg.dependencies?.astro ?? ''), pkg.dependencies?.astro ?? 'missing');
add('Sitemap dependency is exact-pinned', /^\d+\.\d+\.\d+$/.test(pkg.dependencies?.['@astrojs/sitemap'] ?? ''), pkg.dependencies?.['@astrojs/sitemap'] ?? 'missing');
add('GitHub verification workflow exists', fs.existsSync(path.join(root, '.github/workflows/site-verification.yml')), '.github/workflows/site-verification.yml');
add('Post-deploy verification workflow exists', fs.existsSync(path.join(root, '.github/workflows/postdeploy-verification.yml')), '.github/workflows/postdeploy-verification.yml');
add('Live-site audit command exists', Boolean(pkg.scripts?.['live:audit']), 'npm run live:audit -- https://converastrategies.com');
add('Netlify Node version is pinned', /NODE_VERSION\s*=\s*"20"/.test(netlify), 'netlify.toml');
add('Release audit command exists', Boolean(pkg.scripts?.['release:audit']), 'npm run release:audit');
add('Full verification command exists', Boolean(pkg.scripts?.verify), 'npm run verify');
add('Privacy audit command exists', Boolean(pkg.scripts?.['privacy:audit']), 'npm run privacy:audit');
add('Activation audit command exists', Boolean(pkg.scripts?.['activation:audit']), 'npm run activation:audit');
add('Built-output audit command exists', Boolean(pkg.scripts?.['dist:audit']), 'npm run dist:audit');
add('Build verification command exists', Boolean(pkg.scripts?.['build:verify']), 'npm run build:verify');
add('Activation report command exists', Boolean(pkg.scripts?.['activation:report']), 'npm run activation:report');
add('Runtime doctor command exists', Boolean(pkg.scripts?.doctor), 'npm run doctor');
add('Release fingerprint command exists', Boolean(pkg.scripts?.['release:fingerprint']), 'npm run release:fingerprint');
add('Go-live status command exists', Boolean(pkg.scripts?.['go-live:status']), 'npm run go-live:status');
add('Strict deployment gate exists', Boolean(pkg.scripts?.['deploy:gate']), 'npm run deploy:gate');

for (const check of checks) if (!check.ok) issues.push(`${check.name}: ${check.detail}`);

console.log('\nConvera Strategies — release readiness\n');
for (const check of checks) console.log(`${check.ok ? 'PASS' : 'FAIL'}  ${check.name} — ${check.detail}`);
console.log(`\n${checks.length - issues.length}/${checks.length} release-readiness checks passed.`);
if (issues.length) process.exit(1);
