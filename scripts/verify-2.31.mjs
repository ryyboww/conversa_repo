import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

const header = read('src/components/navigation/SiteHeader.astro');
const home = read('src/components/home/LandingPage.astro');
const css = read('src/styles/home.css');
const footer = read('src/components/layout/SiteFooter.astro');
const primaryNav = header.split('const navItems = [')[1]?.split('];')[0] || '';

const checks = [
  ['approved reference included', exists('design-reference/homepage-approved.png')],
  ['before reference included', exists('design-reference/homepage-before-2.31.png')],
  ['header is sticky', header.includes('position: sticky') && header.includes('top: 0')],
  ['brand forced visible', header.includes('opacity: 1 !important') && header.includes('visibility: visible !important')],
  ['header reuses Brand component', header.includes("import Brand from '../layout/Brand.astro'")],
  ['support not primary nav item', !primaryNav.includes("label: 'Support'")],
  ['approved seven primary nav labels', ['Home','Mission','Services','Publications','Community','About','Contact'].every(x => header.includes(`label: '${x}'`))],
  ['theme control iconized', header.includes('data-cv-theme-toggle') && !header.includes('>Theme<')],
  ['search control present', header.includes('data-cv-search-toggle')],
  ['homepage imports compact stylesheet', home.includes("import '../../styles/home.css'")],
  ['hero headline restored', home.includes('People. Perspective.') && home.includes('A More Resilient Tomorrow.')],
  ['hero mission and support actions', home.includes('Explore Our Mission') && home.includes('Support the Work')],
  ['founder portrait uses real production asset', home.includes('/images/ryan-brown.jpg')],
  ['hero quote restored', home.includes('Stronger institutions aren’t just possible')],
  ['featured publication band present', home.includes('Featured Publication')],
  ['support band present', home.includes('Make a Difference')],
  ['three inquiry categories present', ['Social Perspectives','Workplace Culture','Organizational Strategy'].every(x => home.includes(x))],
  ['desktop hero capped', css.includes('height: clamp(380px, 31vw, 430px)')],
  ['hero uses three-column grid', css.includes('grid-template-columns: minmax(390px, 0.98fr) minmax(370px, 1.06fr) minmax(235px, 0.6fr)')],
  ['featured and support share a row', css.includes('grid-template-columns: minmax(0, 1.13fr) minmax(0, 0.9fr)')],
  ['inquiry band is three columns', css.includes('grid-template-columns: repeat(3, minmax(0, 1fr))')],
  ['footer is compact three-column', footer.includes('grid-template-columns: 1.05fr 0.9fr 1.15fr') && footer.includes('min-height: 190px')],
  ['reduced motion respected', css.includes('@media (prefers-reduced-motion: reduce)') && header.includes('@media (prefers-reduced-motion: reduce)')],
  ['no Intake link introduced on homepage', !home.toLowerCase().includes('/intake/') && !header.toLowerCase().includes('/intake/') && !footer.toLowerCase().includes('/intake/')],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed += 1;
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
if (failed) process.exit(1);
