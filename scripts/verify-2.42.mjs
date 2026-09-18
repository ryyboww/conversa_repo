import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const checks = [];
const add = (name, ok) => checks.push({ name, ok });
const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const header = read('src/components/SiteHeader.astro');
const hero = read('src/components/PageHero.astro');
const home = read('src/pages/index.astro');
const homeCss = read('src/styles/home.css');
const globalCss = read('src/styles/global.css');
const pages = ['mission','services','about','community','contact','work-with-convera'].map((x) => read(`src/pages/${x}.astro`)).join('\n');

add('package version is 2.42.0', pkg.version === '2.42.0');
add('VERSION metadata is 2.42.0', version.version === '2.42.0');
add('header brand lockup renders approved tagline', header.includes('site-brand__tagline') && header.includes('{site.tagline}'));
add('tagline is not rendered through PageHero', !hero.includes('tagline?: string') && !hero.includes('page-hero__tagline'));
add('key public page heroes do not inject tagline', !pages.includes('tagline={site.tagline}'));
add('Home hero does not float tagline above headline', !home.includes('home-tagline'));
add('About copy does not repeat approved tagline', !read('src/pages/about.astro').includes('<strong>People are what we do.</strong>'));
add('hero portrait owns quote and identity panel', home.includes('home-hero__identity') && home.includes('home-hero__identity-name'));
add('hero no longer has separate quote column', !home.includes('home-hero__quote'));
add('desktop hero reaches right viewport edge', homeCss.includes('width: calc(100% - max(var(--home-gutter)') && homeCss.includes('margin-right: 0'));
add('hero portrait has no visible border or card shadow', homeCss.includes('border-radius: 0;') && homeCss.includes('box-shadow: none;'));
add('hero identity panel is translucent', homeCss.includes('background: rgba(4, 31, 42, .74)'));
add('people connection feature no longer carries brand tagline', !home.includes('<strong>People are what we do.</strong>'));
add('people connection feature uses balanced editorial card', home.includes('home-connection-card') && homeCss.includes('.home-connection-card'));
add('mobile keeps dedicated hero composition', homeCss.includes('@media (max-width: 820px)') && homeCss.includes('.home-hero__identity { grid-template-columns: 1fr;'));
add('legacy page-hero tagline CSS removed', !globalCss.includes('.page-hero__tagline'));

const failures = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}`);
console.log(`\n${checks.length - failures.length}/${checks.length} 2.42 checks passed.`);
if (failures.length) process.exit(1);
