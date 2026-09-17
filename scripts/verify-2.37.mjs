import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root,p),'utf8');
const exists = (p) => fs.existsSync(path.join(root,p));
const checks = [];
const add = (name, ok) => checks.push([name, Boolean(ok)]);
const pkg = JSON.parse(read('package.json'));
const layout = read('src/layouts/BaseLayout.astro');
const globalCss = read('src/styles/global.css');
const home = read('src/pages/index.astro');
const homeCss = read('src/styles/home.css');
const pubs = read('src/config/publications.ts');
const pubPage = read('src/pages/publications.astro');
const pubRecord = read('src/pages/publications/[slug].astro');
const about = read('src/pages/about.astro');
const community = read('src/pages/community.astro');
const speaking = read('src/pages/speaking.astro');
const press = read('src/pages/press-kit.astro');

add('release version 2.37.0', pkg.version === '2.37.0');
add('shared motion asset exists', exists('public/assets/convera-motion.js'));
add('BaseLayout loads shared motion asset', layout.includes('/assets/convera-motion.js'));
add('motion respects reduced-motion preference', read('public/assets/convera-motion.js').includes('prefers-reduced-motion'));
add('global reveal CSS has reduced-motion fallback', globalCss.includes("[data-reveal='true']") && globalCss.includes('@media (prefers-reduced-motion: reduce)'));
add('legacy homepage scroll component remains absent', !exists('src/components/home/ScrollExperience.astro'));
add('home uses new hero portrait', home.includes('/images/ryan-brown-hero.jpg'));
add('home portrait has softened edge overlay', homeCss.includes('.home-hero__portrait::before') && homeCss.includes('linear-gradient(90deg'));
add('home supporting copy raised above prior 18px cap', homeCss.includes('19.5px'));
add('home inquiry grid remains equal thirds', /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(homeCss));
add('all three publication images configured', (pubs.match(/image:\s*'\/images\/publications\//g)||[]).length === 3);
add('publication archive uses real img elements', pubPage.includes('publication-card__image') && pubPage.includes('aspect-ratio:16/9'));
add('featured publication uses normalized image', pubPage.includes('publication-feature__image') && pubPage.includes('featuredPublication.image'));
add('publication record hero includes image', pubRecord.includes('record-hero-image') && pubRecord.includes('publication.image'));
add('about uses dedicated founder portrait', about.includes('/images/ryan-brown-about.jpg'));
add('about includes prior-site service image', about.includes('/images/editorial/service-experience.jpg'));
add('community includes curated public-life photography', community.includes('/images/editorial/community-fellows.jpg') && community.includes('/images/editorial/community-statehouse.jpg'));
add('speaking includes public-engagement photography', speaking.includes('/images/editorial/speaking-conversation.jpg') && speaking.includes('/images/editorial/speaking-room.jpg'));
add('press kit uses dedicated downloadable portrait', press.includes('/images/ryan-brown-press.jpg'));
for (const file of [
  'public/images/ryan-brown-hero.jpg','public/images/ryan-brown-about.jpg','public/images/ryan-brown-press.jpg',
  'public/images/publications/publication-objective-strategy.jpg','public/images/publications/publication-prosecutorial-errors.jpg','public/images/publications/publication-appellate-court.jpg'
]) add(`asset exists: ${file}`, exists(file));

let failed=0;
for (const [name,ok] of checks) { console.log(`${ok?'PASS':'FAIL'}  ${name}`); if(!ok) failed++; }
console.log(`\n${checks.length-failed}/${checks.length} 2.37 checks passed.`);
if (failed) process.exit(1);
