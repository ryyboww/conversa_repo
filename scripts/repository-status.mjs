import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const exists = (rel) => fs.existsSync(path.join(root, rel));
const items = [
  ['GitHub verification workflow', exists('.github/workflows/site-verification.yml')],
  ['Post-deploy workflow', exists('.github/workflows/postdeploy-verification.yml')],
  ['Dependabot', exists('.github/dependabot.yml')],
  ['Netlify configuration', exists('netlify.toml')],
  ['Environment template', exists('.env.example')],
  ['Founder image', exists('public/images/ryan-brown.jpg')],
  ['Social share image', exists('public/og/convera-social-card.jpg')],
  ['Package lock', exists('package-lock.json')],
  ['Installed dependencies', exists('node_modules/astro/package.json')],
  ['Built production output', exists('dist/index.html')],
];

const lines = [
  `# Convera Strategies ${pkg.version} — Repository Status`,
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Repository handoff',
  '',
  ...items.map(([name, ok]) => `- [${ok ? 'x' : ' '}] ${name}`),
  '',
  '## Interpretation',
  '',
  '- Source repository controls are ready when the GitHub/Netlify/workflow items above are checked.',
  '- Package lock, installed dependencies, and dist output remain runtime/build artifacts until a registry-connected environment completes npm installation and the Astro production build.',
  '- Do not commit `.env`, `.env.operations`, `node_modules/`, `dist/`, or generated activation reports.',
  '',
];
fs.writeFileSync(path.join(root, 'REPOSITORY-STATUS.md'), lines.join('\n'));
console.log(`Wrote REPOSITORY-STATUS.md for Convera Strategies ${pkg.version}.`);
