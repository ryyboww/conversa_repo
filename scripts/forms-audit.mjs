import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'src');
const pagesDir = path.join(src, 'pages');
const issues = [];
const notes = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(src).filter((f) => f.endsWith('.astro'));
const forms = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/<form\b([\s\S]*?)>([\s\S]*?)<\/form>/g)) {
    const attrs = match[1];
    const body = match[2];
    const name = attrs.match(/\bname=["']([^"']+)["']/)?.[1];
    const action = attrs.match(/\baction=["']([^"']+)["']/)?.[1];
    const method = attrs.match(/\bmethod=["']([^"']+)["']/)?.[1]?.toUpperCase();
    const netlify = /data-netlify=["']true["']/.test(attrs);
    const honeypot = attrs.match(/data-netlify-honeypot=["']([^"']+)["']/)?.[1];
    const hiddenName = body.match(/<input[^>]+name=["']form-name["'][^>]+value=["']([^"']+)["'][^>]*>/)?.[1] ??
      body.match(/<input[^>]+value=["']([^"']+)["'][^>]+name=["']form-name["'][^>]*>/)?.[1];
    forms.push({ file, name, action, method, netlify, honeypot, hiddenName, body });
  }
}

const seen = new Set();
for (const form of forms) {
  const rel = path.relative(root, form.file);
  if (!form.name) issues.push(`${rel}: form is missing a name attribute.`);
  if (form.name && seen.has(form.name)) notes.push(`${rel}: duplicate form name '${form.name}' appears more than once in source; confirm this is intentional.`);
  if (form.name) seen.add(form.name);
  if (form.method !== 'POST') issues.push(`${rel}: form '${form.name ?? '(unnamed)'}' should use POST.`);
  if (!form.netlify) issues.push(`${rel}: form '${form.name ?? '(unnamed)'}' is missing data-netlify="true".`);
  if (form.name && form.hiddenName !== form.name) issues.push(`${rel}: hidden form-name does not match '${form.name}'.`);
  if (!form.honeypot) notes.push(`${rel}: form '${form.name ?? '(unnamed)'}' has no Netlify honeypot.`);
  if (form.honeypot && !new RegExp(`name=["']${form.honeypot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(form.body)) {
    issues.push(`${rel}: honeypot '${form.honeypot}' is declared but no matching field was found.`);
  }
  if (!form.action?.startsWith('/')) issues.push(`${rel}: form '${form.name ?? '(unnamed)'}' should use a site-relative success action.`);
  if (form.action?.startsWith('/')) {
    const clean = form.action.split(/[?#]/)[0];
    const candidate = clean === '/'
      ? path.join(pagesDir, 'index.astro')
      : path.join(pagesDir, clean.replace(/^\//, '').replace(/\/$/, ''), 'index.astro');
    const directCandidate = path.join(pagesDir, `${clean.replace(/^\//, '').replace(/\/$/, '')}.astro`);
    if (!fs.existsSync(candidate) && !fs.existsSync(directCandidate)) issues.push(`${rel}: success action '${form.action}' does not resolve to an Astro page.`);
  }
}

console.log(`Convera forms audit: ${forms.length} form(s) found.`);
for (const form of forms) console.log(`PASS  ${form.name ?? '(unnamed)'} — ${path.relative(root, form.file)} → ${form.action ?? '(no action)'}`);
if (notes.length) {
  console.log('\nNotes:');
  for (const note of notes) console.log(`- ${note}`);
}
if (issues.length) {
  console.error('\nErrors:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}
console.log('\nForms audit passed.');
