import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checks = [];
const add = (label, ok) => checks.push({label, ok: Boolean(ok)});
const read = (p) => fs.readFileSync(path.join(root,p),'utf8');
const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));

add('package version is 2.45.0', pkg.version === '2.45.0');
add('VERSION metadata is 2.45.0', version.version === '2.45.0');
add('approved slogan is preserved', read('src/config/site.ts').includes("tagline: 'People are what we do.'"));
add('Mission eyebrow is neutral', read('src/pages/mission.astro').includes('eyebrow="Mission"'));
add('Mission action copy uses Convera Strategies', read('src/pages/mission.astro').includes('Convera Strategies approaches problems differently'));
add('Home CTA says Explore the Mission', read('src/pages/index.astro').includes('Explore the Mission'));
add('About method uses neutral heading', read('src/pages/about.astro').includes('The work begins where the organization is.'));
add('Community avoids collective question language', read('src/pages/community.astro').includes('questions worth asking'));
add('Support panel refers to the future', read('src/components/shared/SupportPanel.astro').includes('the institutions on which the future depends'));

const publicFiles = [
  'src/pages/index.astro','src/pages/mission.astro','src/pages/about.astro','src/pages/services.astro',
  'src/pages/community.astro','src/pages/contact.astro','src/pages/support.astro','src/pages/work-with-convera.astro',
  'src/components/shared/SupportPanel.astro'
];
const firstPlural = /\b(?:we|our|us)\b/i;
for (const file of publicFiles) {
  const lines = read(file).split(/\r?\n/);
  const offenders = lines.filter(line => firstPlural.test(line));
  add(`${file} avoids first-person plural company voice`, offenders.length === 0);
}

const failed = checks.filter(c => !c.ok);
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'} ${c.label}`);
console.log(`\n${checks.length - failed.length}/${checks.length} 2.45 checks passed.`);
if (failed.length) process.exit(1);
