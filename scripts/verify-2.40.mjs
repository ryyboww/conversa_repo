import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const checks = [];
const add = (name, ok) => checks.push({ name, ok });
const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const globalCss = read('src/styles/global.css');
const homeCss = read('src/styles/home.css');
const pubs = read('src/pages/publications.astro');
const blog = read('src/pages/blog.astro');
const community = read('src/pages/community.astro');
const work = read('src/pages/work-with-convera.astro');

add('package version is 2.40.0', pkg.version === '2.40.0');
add('VERSION metadata is 2.40.0', version.version === '2.40.0');
add('shared section rhythm tightened', globalCss.includes('clamp(2.8rem, 4.6vw, 4.5rem)'));
add('shared tight section rhythm tightened', globalCss.includes('clamp(1.9rem, 3.2vw, 3rem)'));
add('compact heroes tightened', globalCss.includes('clamp(2.2rem, 3.6vw, 3.05rem)'));
add('home primary button text improved', homeCss.includes('font-size: 15px;'));
add('publication cards are denser', pubs.includes('grid-template-columns:156px minmax(0,1fr)') && pubs.includes('min-height:156px'));
add('publication descriptions retain readable size', pubs.includes('font-size:.82rem;line-height:1.4'));
add('blog cards are denser', blog.includes('grid-template-columns:154px minmax(0,1fr)') && blog.includes('min-height:166px'));
add('blog descriptions retain readable size', blog.includes('font-size:.82rem;line-height:1.4'));
add('Community uses public-facing participation language', community.includes('Community begins with what people bring to the conversation.') && !community.includes('Community is not a photo gallery.'));
add('Work With Convera defines FAQ schema', work.includes("'@type': 'FAQPage'") && work.includes('acceptedAnswer'));
add('Work With Convera emits FAQ JSON-LD', work.includes('JSON.stringify(faqSchema)'));
add('public Intake boundary remains stated', work.includes('Intake is not public'));

const failures = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}`);
console.log(`\n${checks.length - failures.length}/${checks.length} 2.40 checks passed.`);
if (failures.length) process.exit(1);
