import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
const versionMeta = JSON.parse(fs.readFileSync(path.join(root, 'VERSION.json'), 'utf8'));
const checks = [];
const warnings = [];
const add = (name, ok, detail) => checks.push({ name, ok, detail });
const exists = (rel) => fs.existsSync(path.join(root, rel));

const targets = JSON.parse(fs.readFileSync(path.join(root, 'deployment-targets.json'), 'utf8'));
add(`Release version is ${pkg.version}`, pkg.version === versionMeta.version, versionMeta.version);
add('Deployment target file exists', exists('deployment-targets.json'), 'deployment-targets.json');
add('Repository target is convera_published_codes', targets.repository === 'convera_published_codes', targets.repository);
add('Production branch is main_conversa', targets.branch === 'main_conversa', targets.branch);
add('.gitignore exists', exists('.gitignore'), '.gitignore');
add('.editorconfig exists', exists('.editorconfig'), '.editorconfig');
add('.gitattributes exists', exists('.gitattributes'), '.gitattributes');
add('Environment file is excluded', /^\.env$/m.test(gitignore), '.gitignore');
add('Operations environment file is excluded', /^\.env\.operations$/m.test(gitignore), '.gitignore');
add('node_modules is excluded', /^node_modules\/$/m.test(gitignore), '.gitignore');
add('dist is excluded', /^dist\/$/m.test(gitignore), '.gitignore');
add('Local .env is absent from release', !exists('.env'), '.env');
add('Local .env.operations is absent from release', !exists('.env.operations'), '.env.operations');
add('node_modules is absent from release', !exists('node_modules'), 'node_modules/');
add('dist is absent from release', !exists('dist'), 'dist/');
add('.astro cache is absent from release', !exists('.astro'), '.astro/');
add('Verification workflow exists', exists('.github/workflows/site-verification.yml'), '.github/workflows/site-verification.yml');
add('Post-deploy workflow exists', exists('.github/workflows/postdeploy-verification.yml'), '.github/workflows/postdeploy-verification.yml');
add('Dependabot configuration exists', exists('.github/dependabot.yml'), '.github/dependabot.yml');
add('Netlify configuration exists', exists('netlify.toml'), 'netlify.toml');
add('Node version pin exists', exists('.nvmrc') && exists('.node-version'), '.nvmrc + .node-version');
add('Public configuration template exists', exists('.env.example'), '.env.example');
add('Repository audit command exists', Boolean(pkg.scripts?.['repository:audit']), 'npm run repository:audit');
add('Deployment preflight command exists', Boolean(pkg.scripts?.['deploy:preflight']), 'npm run deploy:preflight');
add('Git remote audit command exists', Boolean(pkg.scripts?.['git:remote-status']), 'npm run git:remote-status');
add('Strict Git remote command exists', Boolean(pkg.scripts?.['git:remote-strict']), 'npm run git:remote-strict');
add('Remote handoff guide exists', exists('REMOTE-REPOSITORY-HANDOFF.md'), 'REMOTE-REPOSITORY-HANDOFF.md');
add('Source freeze guide exists', exists('SOURCE-FREEZE.md'), 'SOURCE-FREEZE.md');
add('Remote bootstrap command exists', Boolean(pkg.scripts?.['remote:bootstrap']), 'npm run remote:bootstrap');
add('Remote bootstrap script exists', exists('scripts/remote-bootstrap.mjs'), 'scripts/remote-bootstrap.mjs');
add('Remote bootstrap guide exists', exists('REMOTE-BOOTSTRAP.md'), 'REMOTE-BOOTSTRAP.md');
add('Framework bootstrap script exists', exists('scripts/framework-bootstrap.mjs'), 'scripts/framework-bootstrap.mjs');
add('Windows quick-start exists', exists('START-HERE.cmd'), 'START-HERE.cmd');
add('macOS quick-start exists', exists('START-HERE.command'), 'START-HERE.command');

for (const rel of ['.DS_Store', 'ACTIVATION-REPORT.md', 'ACTIVATION-REPORT.json']) {
  add(`${rel} is absent from release`, !exists(rel), rel);
}

if (!exists('package-lock.json')) {
  warnings.push('package-lock.json is not present because dependency installation has not completed in this environment. Generate and commit it after the first successful npm install.');
}

const failures = checks.filter((c) => !c.ok);
console.log(`\nConvera Strategies ${pkg.version} — repository handoff audit\n`);
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name} — ${c.detail}`);
console.log(`\n${checks.length - failures.length}/${checks.length} repository checks passed.`);
if (warnings.length) {
  console.log('\nAdvisories:');
  for (const warning of warnings) console.log(`- ${warning}`);
}
if (failures.length) process.exit(1);
