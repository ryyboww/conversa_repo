import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const checks = [];
const check = (name, ok) => checks.push({ name, ok: Boolean(ok) });

const header = read('src/components/navigation/SiteHeader.astro');
const footer = read('src/components/layout/SiteFooter.astro');
const home = read('src/styles/home.css');

check('Header has no scroll-state listener', !header.includes("addEventListener('scroll'") && !header.includes('data-scrolled'));
check('Theme has moon icon and no Theme title', header.includes('cv-icon--moon') && !header.includes('title="Theme"'));
check('Header logo uses direct stable image', header.includes('/images/convera-logo-header.png'));
check('Header logo dark-mode fallback exists', header.includes('/images/convera-logo-footer.png'));
check('Footer navigation removed', !footer.includes('navItems') && !footer.includes('<nav'));
check('Footer catchphrase removed', !footer.includes('thoughtful way forward') && !footer.includes('<blockquote'));
check('Footer descriptor exact text present', footer.includes('Social Perspectives · Workplace Culture · Organizational Strategy'));
check('Footer descriptor nowrap', footer.includes('white-space: nowrap'));
check('Footer logo reduced', footer.includes('width: 202px'));
check('Hero max height 350px', home.includes('height: clamp(315px, 23vw, 350px)'));
check('Hero headline max 48px', home.includes('font-size: clamp(36px, 3.05vw, 48px)'));
check('Homepage clips horizontal overflow', home.includes('overflow-x: clip'));
check('Responsive tablet rule exists', home.includes('@media (max-width: 1120px)'));
check('Responsive mobile rule exists', home.includes('@media (max-width: 760px)'));
check('Header logo asset exists', fs.existsSync(path.join(root, 'public/images/convera-logo-header.png')));
check('Footer logo asset exists', fs.existsSync(path.join(root, 'public/images/convera-logo-footer.png')));

for (const item of checks) console.log(`${item.ok ? 'PASS' : 'FAIL'}  ${item.name}`);
const failed = checks.filter((item) => !item.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
if (failed.length) process.exit(1);
