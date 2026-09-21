import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const checks = [];
const add = (name, ok) => checks.push({ name, ok });

const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const ops = read('.env.operations.example');
const report = read('scripts/activation-report.mjs');
const gate = read('scripts/go-live-gate.mjs');
const guide = read('HOSTING-CAPACITY.md');
const gitignore = read('.gitignore');

add('Package version is 2.63.0', pkg.version === '2.63.0');
add('Release record is 2.63.0', version.version === '2.63.0');
add('Operational template defaults hosting capacity to false', /^OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE=false$/m.test(ops));
add('Activation report includes hosting capacity', report.includes('OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE'));
add('Strict go-live gate includes hosting capacity', gate.includes('OPS_NETLIFY_PRODUCTION_DEPLOYS_AVAILABLE'));
add('Operator guide explains paused production deploys', guide.includes('Production deployment availability is an external operating condition'));
add('Operator guide prohibits sensitive billing and access data in source', guide.includes('Do not store billing details'));
add('Generated Netlify workspace is ignored', /^\.netlify\/$/m.test(gitignore));

for (const check of checks) console.log(`${check.ok ? 'PASS' : 'FAIL'}  ${check.name}`);
const failed = checks.filter((check) => !check.ok);
console.log(`\n2.63 verification: ${checks.length - failed.length}/${checks.length} passed.`);
if (failed.length) process.exit(1);
