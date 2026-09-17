import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const src = path.join(root, 'src');
const publicDir = path.join(root, 'public');
const issues = [];
const notes = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(src).filter((f) => /\.(astro|ts|js|mjs)$/.test(f));
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(?:import|from)\s+(?:[^'\"]+\s+from\s+)?['\"](\.[^'\"]+)['\"]/g)) {
    const spec = match[1];
    const base = path.resolve(path.dirname(file), spec);
    const candidates = [base, `${base}.ts`, `${base}.js`, `${base}.mjs`, `${base}.astro`, path.join(base, 'index.ts'), path.join(base, 'index.astro')];
    if (!candidates.some((c) => fs.existsSync(c))) {
      issues.push(`Missing import from ${path.relative(root, file)}: ${spec}`);
    }
  }
}

const pageFiles = walk(path.join(src, 'pages')).filter((f) => f.endsWith('.astro'));
const routes = new Set(pageFiles.map((file) => {
  let rel = path.relative(path.join(src, 'pages'), file).replace(/\\/g, '/').replace(/\.astro$/, '');
  if (rel === 'index') return '/';
  if (rel.endsWith('/index')) rel = rel.slice(0, -6);
  return `/${rel}/`;
}));

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/href=[{]?['\"](\/[A-Za-z0-9_\-\/?=#.]*)['\"][}]?/g)) {
    const href = match[1];
    if (href.startsWith('/#') || href.includes('?') || href.includes('#') || /\.[A-Za-z0-9]+$/.test(href)) continue;
    const normalized = href === '/' ? '/' : `${href.replace(/\/$/, '')}/`;
    if (!routes.has(normalized)) notes.push(`Review internal href ${href} in ${path.relative(root, file)}`);
  }
}

const requiredAssets = [
  'brand/convera-logo-light-bg.png',
  'brand/convera-logo-dark-bg.png',
  'favicon.ico'
];
for (const asset of requiredAssets) {
  if (!fs.existsSync(path.join(publicDir, asset))) issues.push(`Missing required public asset: ${asset}`);
}
if (!fs.existsSync(path.join(publicDir, 'images/ryan-brown.jpg'))) {
  notes.push('Founder portrait is still pending: public/images/ryan-brown.jpg');
}

console.log(`Convera source audit: ${sourceFiles.length} source files, ${pageFiles.length} pages.`);
if (issues.length) {
  console.error('\nErrors:');
  for (const issue of issues) console.error(`- ${issue}`);
}
if (notes.length) {
  console.log('\nNotes:');
  for (const note of [...new Set(notes)]) console.log(`- ${note}`);
}
if (issues.length) process.exit(1);
console.log('\nAudit passed: no missing relative imports or required brand assets detected.');
