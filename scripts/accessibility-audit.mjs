import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const issues = [];
const notes = [];
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const layout = read('src/layouts/BaseLayout.astro');
const globalCss = read('src/styles/global.css');
const header = read('src/components/SiteHeader.astro');
const toggle = read('src/components/ThemeToggle.astro');
const home = read('src/pages/index.astro');
const about = read('src/pages/about.astro');

const checks = [
  ['Document language declared', /<html\s+lang=["']en["']/.test(layout)],
  ['Skip link targets main content', layout.includes('href="#main-content"') && layout.includes('id="main-content"')],
  ['Visible focus treatment exists', globalCss.includes(':focus-visible')],
  ['Reduced-motion preference respected', globalCss.includes('@media (prefers-reduced-motion: reduce)')],
  ['Theme toggle has accessible name', /aria-label=["'][^"']+["']/.test(toggle)],
  ['Theme toggle exposes state', toggle.includes('aria-pressed')],
  ['Primary navigation is labelled', header.includes('aria-label="Primary navigation"')],
  ['Mobile navigation is labelled', header.includes('aria-label="Mobile navigation"')],
  ['Founder portrait has descriptive alt text', /<img[^>]+alt=["']Ryan Brown, founder of Convera Strategies["']/.test(home) && /<img[^>]+alt=["']Ryan Brown, founder of Convera Strategies["']/.test(about)]
];
for (const [name, ok] of checks) if (!ok) issues.push(name);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const astroFiles = walk(path.join(root, 'src')).filter((file) => file.endsWith('.astro'));
let imageCount = 0;
for (const file of astroFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/<img\b[^>]*>/g)) {
    imageCount += 1;
    const tag = match[0];
    if (!/\balt\s*=/.test(tag)) issues.push(`${path.relative(root, file)} contains an <img> without alt text.`);
  }
  for (const match of text.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const attrs = match[1];
    const body = match[2].replace(/<[^>]*>/g, '').trim();
    if (!body && !/aria-label\s*=/.test(attrs)) issues.push(`${path.relative(root, file)} contains a button with no text or aria-label.`);
  }
}

const formFiles = ['src/pages/contact.astro', 'src/pages/follow.astro', 'src/pages/intake.astro'];
for (const rel of formFiles) {
  const text = read(rel);
  if (!/<form\b/.test(text)) continue;
  if (!/<label[\s>]/.test(text)) issues.push(`${rel} contains a form without visible labels.`);
  if (!/required/.test(text)) notes.push(`${rel} has no required fields; review whether this is intentional.`);
  if (!/type=["']email["']/.test(text)) issues.push(`${rel} does not identify its email input with type="email".`);
}

console.log(`Convera accessibility source audit: ${astroFiles.length} Astro file(s), ${imageCount} image element(s) checked.`);
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
if (notes.length) {
  console.log('\nNotes:');
  for (const note of notes) console.log(`- ${note}`);
}
if (issues.length) {
  console.error('\nErrors:');
  for (const issue of [...new Set(issues)]) console.error(`- ${issue}`);
  process.exit(1);
}
console.log('\nAccessibility source audit passed. Browser-assisted WCAG testing is still required after deployment.');
