import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));
const checks = [];
const add = (name, ok) => checks.push({ name, ok });

const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const site = read('src/config/site.ts');
const home = read('src/pages/index.astro');
const profile = read('src/pages/profile.astro');
const about = read('src/pages/about.astro');
const press = read('src/pages/press-kit.astro');
const bios = read('public/press-kit/downloads/ryan-brown-bios.txt');
const layout = read('src/layouts/BaseLayout.astro');
const intake = read('src/pages/intake.astro');

add('package version is 2.57.0', pkg.version === '2.57.0');
add('VERSION metadata is 2.57.0', version.version === '2.57.0');
add('Founder credential is centralized', site.includes("founderCredential: 'M.A.'"));
add('Founder roles are centralized', site.includes("founderRoles: ['Ph.D. Student', 'Lecturer', 'Researcher']"));
add('Founder identity string is centralized', site.includes("founderIdentity: 'M.A. · Ph.D. Student · Lecturer · Researcher'"));
add('Homepage exposes founder credentials', home.includes('home-founder-line') && home.includes('site.founderRoles.join'));
add('Homepage founder name includes M.A.', home.includes('site.founderCredential'));
add('Founder Profile states current identifiers', profile.includes('site.founderRoles[0]') && profile.includes('site.founderCredential'));
add('About founder bridge shows identifiers', about.includes('site.founderIdentity'));
add('Press Kit uses current identifiers', press.includes("site.founderRoles.join") && press.includes('Ph.D. Student') && press.includes('Lecturer') && press.includes('Researcher'));
add('Press guidance avoids implying conferred Ph.D.', press.includes('do not style Ryan as “Ph.D.” until the degree is conferred'));
add('Downloadable bios use current identifiers', bios.includes('Ryan Brown, M.A.') && bios.includes('Ph.D. student, lecturer, and researcher'));
add('Structured Person metadata includes credential', layout.includes('honorificSuffix: site.founderCredential'));
add('Structured Person metadata includes founder roles', layout.includes('jobTitle: [site.founderTitle, ...site.founderRoles]'));
add('2.55 landing publication art is preserved', home.includes('/images/home/an_objective_strategy.png'));
add('2.55 landing essay art is preserved', home.includes('/images/home/talk_is_cheap.png'));
add('Private Intake remains noindex', intake.includes('noindex'));
add('Current framework status exists', exists('FRAMEWORK-STATUS-2.57.md'));
add('README points to current verification script', read('README.md').includes('npm run verify:2.57'));
add('Source freeze identifies current release', read('SOURCE-FREEZE.md').includes('2.57.0'));

let failed = 0;
for (const check of checks) {
  console.log(`${check.ok ? 'PASS' : 'FAIL'} ${check.name}`);
  if (!check.ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} 2.57 checks passed.`);
if (failed) process.exit(1);
