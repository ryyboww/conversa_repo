import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

const brand = read('src/components/layout/Brand.astro');
const header = read('src/components/navigation/SiteHeader.astro');
const footer = read('src/components/layout/SiteFooter.astro');

const checks = [
  ['Brand component included', exists('src/components/layout/Brand.astro')],
  ['header logo asset included', exists('public/images/convera-logo-header.png')],
  ['footer logo asset included', exists('public/images/convera-logo-footer.png')],
  ['Brand supports variants', brand.includes("variant?: 'header' | 'footer'")],
  ['header uses header variant', header.includes('<Brand variant="header" />')],
  ['footer uses footer variant', footer.includes('<Brand variant="footer" />')],
  ['header import resolves locally', header.includes("import Brand from '../layout/Brand.astro'")],
  ['footer import resolves locally', footer.includes("import Brand from './Brand.astro'")],
  ['logo proportions preserved', brand.includes('width: auto') && brand.includes('height: auto') && brand.includes('object-fit: contain')],
];

let failed = 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed++;
}

if (failed) process.exit(1);
console.log(`\n${checks.length}/${checks.length} checks passed.`);
