import fs from 'node:fs';
const header = fs.readFileSync(new URL('../src/components/navigation/SiteHeader.astro', import.meta.url), 'utf8');
const footer = fs.readFileSync(new URL('../src/components/layout/SiteFooter.astro', import.meta.url), 'utf8');
const home = fs.readFileSync(new URL('../src/styles/home.css', import.meta.url), 'utf8');
const checks = [
  ['sticky header retained', header.includes('position: sticky') && header.includes('top: 0')],
  ['header gains bottom breathing room', header.includes('padding-bottom: 14px')],
  ['logo native proportions protected', header.includes('width: auto !important') && header.includes('height: auto !important') && header.includes('object-fit: contain')],
  ['header logo contrast strengthened', header.includes('contrast(1.11)')],
  ['nav made darker', header.includes('#0b3043')],
  ['footer duplicate Brand descriptor suppressed', footer.includes('.cv-footer__brand-mark :global(p)') && footer.includes('display: none !important')],
  ['footer descriptor is explicit', footer.includes('Social Perspectives · Workplace Culture · Organizational Strategy')],
  ['footer descriptor cannot wrap', footer.includes('white-space: nowrap')],
  ['footer logo native proportions protected', footer.includes('object-fit: contain') && footer.includes('max-height: 68px !important')],
  ['footer contrast strengthened', footer.includes('contrast(1.10)')],
  ['home navy darkened', home.includes('--cv-navy: #062b39')],
  ['home teal darkened', home.includes('--cv-teal: #0b8298')],
];
let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
if (failed) process.exit(1);
