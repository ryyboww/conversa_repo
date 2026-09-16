import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scanRoots = ['src', 'public'];
const issues = [];
const notes = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const textFiles = scanRoots.flatMap((r) => walk(path.join(root, r)))
  .filter((f) => /\.(astro|ts|js|mjs|css|md|txt|xml|json|webmanifest|toml)$/i.test(f));

const forbidden = [
  [/\bexample\.com\b/i, 'example.com placeholder'],
  [/\blorem ipsum\b/i, 'Lorem ipsum placeholder'],
  [/\bTODO\b/, 'TODO marker'],
  [/\bTBD\b/, 'TBD marker'],
  [/Scholar\.\s*Researcher\.\s*Visionary\./i, 'legacy personal-site identity line']
];

for (const file of textFiles) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  for (const [pattern, label] of forbidden) {
    if (pattern.test(text)) issues.push(`${rel}: ${label}`);
  }
  if (/href=["']#(?:["'])/.test(text)) notes.push(`${rel}: empty hash link found; review before launch.`);
}


// The separate RyanBrownOnline personal site may be intentionally cross-linked in metadata
// and preserved-platform notes. What we do not want is its branding surfacing in Convera's
// visitor-facing launch pages or shared presentation components.
const visitorFacing = [
  ...walk(path.join(root, 'src/pages')),
  ...walk(path.join(root, 'src/components'))
].filter((f) => /\.(astro|ts|js|mjs|css)$/i.test(f));
for (const file of visitorFacing) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  if (/Ryan Brown Online|RYAN BROWN ONLINE/i.test(text)) issues.push(`${rel}: legacy Ryan Brown Online branding is visible in Convera presentation code.`);
}

const site = fs.readFileSync(path.join(root, 'src/config/site.ts'), 'utf8');
for (const expected of ['Convera Strategies', 'Social Perspectives · Workplace Culture · Organizational Strategy', 'https://converastrategies.com']) {
  if (!site.includes(expected)) issues.push(`src/config/site.ts is missing expected brand value: ${expected}`);
}

const features = fs.readFileSync(path.join(root, 'src/config/features.ts'), 'utf8');
for (const [key, expected] of [['podcast', 'false'], ['institute', 'false'], ['studentResources', 'false'], ['supporterLounge', 'false']]) {
  const re = new RegExp(`${key}\\s*:\\s*${expected}`);
  if (!re.test(features)) notes.push(`Review launch feature flag '${key}'; expected ${expected}.`);
}

console.log(`Convera content audit: ${textFiles.length} text/code files scanned.`);
if (notes.length) {
  console.log('\nNotes:');
  for (const note of [...new Set(notes)]) console.log(`- ${note}`);
}
if (issues.length) {
  console.error('\nErrors:');
  for (const issue of [...new Set(issues)]) console.error(`- ${issue}`);
  process.exit(1);
}
console.log('\nContent audit passed: no placeholder or legacy-brand blockers detected.');
