import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'src');
const pagesDir = path.join(src, 'pages');
const issues = [];
const notes = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const pageFiles = walk(pagesDir).filter((file) => file.endsWith('.astro'));
const routeSet = new Set();
for (const file of pageFiles) {
  let rel = path.relative(pagesDir, file).replace(/\\/g, '/').replace(/\.astro$/, '');
  if (rel.includes('[')) continue;
  if (rel === 'index') routeSet.add('/');
  else {
    if (rel.endsWith('/index')) rel = rel.slice(0, -6);
    routeSet.add(`/${rel.replace(/^\/+|\/+$/g, '')}/`);
  }
}

const publicationsText = fs.readFileSync(path.join(src, 'config/publications.ts'), 'utf8');
for (const match of publicationsText.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)) {
  routeSet.add(`/publications/${match[1]}/`);
}

const requiredLaunchRoutes = [
  '/', '/mission/', '/services/', '/publications/', '/community/', '/about/', '/contact/',
  '/support/', '/work-with-convera/', '/profile/', '/blog/', '/intake/', '/dashboard/', '/privacy/', '/terms/', '/accessibility/'
];
for (const route of requiredLaunchRoutes) {
  if (!routeSet.has(route)) issues.push(`Missing required launch route: ${route}`);
}

const linkFiles = walk(src).filter((file) => /\.(astro|ts|js|mjs)$/.test(file));
const literalLinks = [];
for (const file of linkFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(?:href\s*=\s*|href:\s*)['"](\/[^'"]*)['"]/g)) {
    literalLinks.push({ file, href: match[1] });
  }
}

function normalizeRoute(href) {
  const clean = href.split(/[?#]/)[0];
  if (!clean || clean === '/') return '/';
  if (/\.[a-z0-9]+$/i.test(clean)) return null;
  return `/${clean.replace(/^\/+|\/+$/g, '')}/`;
}

for (const { file, href } of literalLinks) {
  const route = normalizeRoute(href);
  if (!route) continue;
  if (!routeSet.has(route)) issues.push(`${path.relative(root, file)} links to missing internal route ${href}`);
}

const netlifyPath = path.join(root, 'netlify.toml');
if (fs.existsSync(netlifyPath)) {
  const netlify = fs.readFileSync(netlifyPath, 'utf8');
  for (const match of netlify.matchAll(/\bto\s*=\s*"(\/[^"?#]*)"/g)) {
    const route = normalizeRoute(match[1]);
    if (route && !routeSet.has(route)) issues.push(`netlify.toml redirects to missing route ${match[1]}`);
  }
}

const navigationPath = path.join(src, 'config/navigation.ts');
const navigation = fs.readFileSync(navigationPath, 'utf8');
for (const match of navigation.matchAll(/\bhref:\s*['"](\/[^'"]*)['"]/g)) {
  const route = normalizeRoute(match[1]);
  if (route && !routeSet.has(route)) issues.push(`Navigation references missing route ${match[1]}`);
}

const robotsPath = path.join(root, 'public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!/Sitemap:\s*https:\/\/converastrategies\.com\/sitemap-index\.xml/i.test(robots)) {
    notes.push('robots.txt does not explicitly reference the expected Astro sitemap index URL.');
  }
}

console.log(`Convera route audit: ${routeSet.size} concrete route(s), ${literalLinks.length} literal internal link(s) checked.`);
if (notes.length) {
  console.log('\nNotes:');
  for (const note of [...new Set(notes)]) console.log(`- ${note}`);
}
if (issues.length) {
  console.error('\nErrors:');
  for (const issue of [...new Set(issues)]) console.error(`- ${issue}`);
  process.exit(1);
}
console.log('\nRoute audit passed: launch routes, literal internal links, navigation, and redirect targets resolve to known pages.');
