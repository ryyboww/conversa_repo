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
const header = read('src/components/SiteHeader.astro');
const footer = read('src/components/SiteFooter.astro');
const globalCss = read('src/styles/global.css');
const homeCss = read('src/styles/home.css');
const sourceFiles = [];
const walk = (dir) => { for (const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})) { const rel=path.join(dir,e.name); if(e.isDirectory()) walk(rel); else sourceFiles.push(rel); } };
walk('src');
const sourceText = sourceFiles.map(read).join('\n');
const publicPages = ['mission','services','publications','community','about','contact','support','speaking','press-kit','follow','work-with-convera'];

add('release version 2.35.1', pkg.version === '2.35.1');
add('Astro output explicitly static', /output:\s*['"]static['"]/.test(read('astro.config.mjs')));
add('shared PageHero exists', exists('src/components/PageHero.astro'));
for (const page of publicPages) add(`${page} uses shared PageHero`, read(`src/pages/${page}.astro`).includes('PageHero'));
add('only global header is sticky', (sourceText.match(/position\s*:\s*sticky/g) || []).length === 1 && /position\s*:\s*sticky/.test(header));
add('homepage scroll experience removed', !exists('src/components/home/ScrollExperience.astro'));
add('legacy standalone visibility pages removed', !exists('public/speaking/index.html') && !exists('public/press-kit/index.html') && !exists('public/follow/index.html'));
add('new founder portrait present', exists('public/images/ryan-brown.jpg'));
add('home headline capped at 48px', /font-size:\s*clamp\(36px,\s*3\.4vw,\s*48px\)/.test(homeCss));
add('shared page hero capped below prior oversized scale', /font-size:\s*clamp\(2\.55rem,\s*4\.3vw,\s*3\.75rem\)/.test(globalCss));
add('footer has no navigation element', !/<nav\b/.test(footer));
add('footer descriptor remains nowrap', /footer-brand p[\s\S]*white-space:\s*nowrap/.test(footer));
add('public source has no direct Intake links', !/href=["']\/intake\//.test(sourceText));
add('professional structured-data contact points to Contact', layout.includes("new URL('/contact/', site.url)"));
add('shared attribution loaded in BaseLayout', layout.includes('/assets/convera-attribution.js'));
add('public journey events loaded in BaseLayout', layout.includes('/assets/convera-growth.js'));
add('privacy attribution disclosure is used', read('src/pages/privacy.astro').includes('AttributionDisclosure'));
add('press kit offers approved portrait download', read('src/pages/press-kit.astro').includes('/images/ryan-brown.jpg'));

let failed=0;
for (const [name,ok] of checks) { console.log(`${ok?'PASS':'FAIL'}  ${name}`); if(!ok) failed++; }
console.log(`\n${checks.length-failed}/${checks.length} 2.35 checks passed.`);
if (failed) process.exit(1);
