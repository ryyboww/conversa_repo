import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';

const root = process.cwd();
const files = [
  'package.json', 'deployment-targets.json', 'astro.config.mjs', 'netlify.toml',
  'src/config/site.ts', 'src/config/support.ts', 'src/config/navigation.ts',
  'src/pages/index.astro', 'src/pages/mission.astro', 'src/pages/services.astro',
  'src/pages/publications.astro', 'src/pages/community.astro', 'src/pages/about.astro',
  'src/pages/contact.astro', 'src/pages/support.astro', 'src/pages/work-with-convera.astro',
  'public/images/ryan-brown.jpg', 'public/og/convera-social-card.jpg',
  'public/brand/convera-logo-light-bg.png', 'public/brand/convera-logo-dark-bg.png'
];

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const lines = [`Convera Strategies release fingerprint`, `Version: ${pkg.version}`, `Generated: ${new Date().toISOString()}`, ''];
for (const rel of files) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) { lines.push(`MISSING  ${rel}`); continue; }
  const hash = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
  lines.push(`${hash}  ${rel}`);
}
const output = lines.join('\n') + '\n';
const outPath = path.join(root, 'RELEASE-FINGERPRINT.txt');
fs.writeFileSync(outPath, output);
console.log(output);
console.log(`Wrote ${outPath}`);
