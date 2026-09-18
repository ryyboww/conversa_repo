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
const home = read('src/pages/index.astro');
const css = read('src/styles/home.css');
const brand = read('BRAND-NOTES.md');

add('package version is 2.43.0', pkg.version === '2.43.0');
add('VERSION metadata is 2.43.0', version.version === '2.43.0');
add('header still owns approved tagline', header.includes('site-brand__tagline') && header.includes('{site.tagline}'));
add('tagline aligns under wordmark segment', header.includes('padding-left: 34.5%') && header.includes('text-align: center'));
add('brand notes preserve logo + tagline relationship', brand.includes('People are what we do.') && brand.toLowerCase().includes('business-card'));
add('hero remains two-part copy and portrait composition', css.includes('grid-template-columns: minmax(0, .92fr) minmax(420px, 1.08fr)'));
add('portrait remains flush right with no card treatment', css.includes('margin-right: 0') && css.includes('border-radius: 0;') && css.includes('box-shadow: none;'));
add('portrait uses true mask fade into hero', css.includes('mask-image: linear-gradient(90deg, transparent 0%'));
add('founder identity panel remains attached beneath portrait', home.includes('home-hero__identity') && home.includes('Founder, Convera Strategies'));
add('Support card uses shared side-card system', home.includes('home-side-card home-support-card'));
add('Connection card uses shared side-card system', home.includes('home-side-card home-connection-card'));
add('shared side-card dimensions are defined once', css.includes('.home-side-card {') && css.includes('.home-side-card__visual {') && css.includes('.home-side-card__copy {'));
add('Connection feature does not repeat brand tagline', !home.includes('<strong>People are what we do.</strong>'));
add('mobile maintains dedicated stacked hero and feature cards', css.includes('@media (max-width: 820px)') && css.includes('.home-side-card { grid-template-columns: 1fr; }'));

const failures = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}`);
console.log(`\n${checks.length - failures.length}/${checks.length} 2.43 checks passed.`);
if (failures.length) process.exit(1);
