import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const exists = (relative) => fs.existsSync(path.join(root, relative));
const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const intake = read('src/pages/intake.astro');
const navigation = read('src/config/navigation.ts');
const checks = [
  ['Package version is 2.58.0', pkg.version === '2.58.0'],
  ['Version metadata is 2.58.0', version.version === '2.58.0'],
  ['Boundary guide exists', exists('WORKSTREAM-BOUNDARIES.md')],
  ['Boundary audit exists', exists('scripts/workstream-boundary-audit.mjs')],
  ['Boundary audit command exists', Boolean(pkg.scripts?.['workstreams:audit'])],
  ['Boundary audit is part of release audit', pkg.scripts?.['release:audit']?.includes('workstreams:audit')],
  ['Private Intake remains noindex', intake.includes('noindex')],
  ['Private Intake remains absent from primary navigation', !navigation.includes("'/intake/'")],
  ['Contact-first workflow remains documented', read('WORKSTREAM-BOUNDARIES.md').includes('Contact → manual review → direct private Intake invitation → Intake')],
  ['Founder identity remains centralized', read('src/config/site.ts').includes("founderIdentity: 'M.A. · Ph.D. Student · Lecturer · Researcher'")]
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} 2.58 checks passed.`);
if (failed) process.exit(1);
