import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const dist = path.join(root, 'dist');
const checks = [];
const issues = [];
const add = (name, ok, detail) => checks.push({ name, ok, detail });
const exists = (rel) => fs.existsSync(path.join(dist, rel));
const read = (rel) => fs.readFileSync(path.join(dist, rel), 'utf8');

if (!fs.existsSync(dist)) {
  console.error('\nConvera built-output audit\n\nFAIL  dist/ does not exist. Run `npm run build` first.');
  process.exit(1);
}

const requiredHtml = [
  'index.html', 'mission/index.html', 'services/index.html', 'publications/index.html',
  'community/index.html', 'about/index.html', 'contact/index.html', 'support/index.html',
  'work-with-convera/index.html', 'follow/index.html', 'follow/thank-you/index.html',
  'intake/index.html', 'intake/thank-you/index.html', 'dashboard/index.html',
  'privacy/index.html', 'terms/index.html', 'accessibility/index.html',
  'thank-you/index.html', 'support/thank-you/index.html'
];

for (const rel of requiredHtml) add(`Built route: /${rel.replace(/index\.html$/, '')}`, exists(rel), rel);

for (const rel of [
  'robots.txt', 'rss.xml', 'site.webmanifest', 'og/convera-social-card.jpg',
  'images/ryan-brown.jpg', 'brand/convera-logo-light-bg.png', 'brand/convera-logo-dark-bg.png',
  'images/home/an_objective_strategy.png', 'images/home/talk_is_cheap.png'
]) add(`Built asset: ${rel}`, exists(rel), rel);

const sitemapExists = ['sitemap-index.xml', 'sitemap-0.xml', 'sitemap.xml'].some(exists);
add('Sitemap output exists', sitemapExists, 'sitemap-index.xml / sitemap-0.xml / sitemap.xml');

if (exists('index.html')) {
  const home = read('index.html');
  add('Homepage canonical uses production domain', /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/converastrategies\.com\/["']/i.test(home), 'https://converastrategies.com/');
  add('Homepage references branded social card', home.includes('https://converastrategies.com/og/convera-social-card.jpg'), 'Open Graph/Twitter image');
  add('Homepage contains founder portrait', home.includes('/images/ryan-brown.jpg'), '/images/ryan-brown.jpg');
  add('Homepage retains Featured Publication artwork', home.includes('/images/home/an_objective_strategy.png'), 'an_objective_strategy.png');
  add('Homepage retains Featured Essay artwork', home.includes('/images/home/talk_is_cheap.png'), 'talk_is_cheap.png');
  add('Private Outlook address absent from built homepage', !/ryy_boww@outlook\.com/i.test(home), 'privacy');
}

if (exists('contact/index.html')) {
  const contact = read('contact/index.html');
  add('Built Contact form retains Netlify marker', /name=["']form-name["'][^>]+value=["']website-contact["']|data-netlify=["']true["']/i.test(contact), 'website-contact');
}

if (exists('work-with-convera/index.html')) {
  const work = read('work-with-convera/index.html');
  add('Work With Convera remains orientation page, not retired intake form', !/name=["']form-name["'][^>]+value=["']work-with-convera["']/i.test(work), 'no work-with-convera form');
  add('Work With Convera routes professional inquiries to Contact', /href=["']\/contact\/?\?reason=professional["']|href=["']\/contact\/\?reason=professional["']/i.test(work), 'Contact professional preset');
}

if (exists('follow/index.html')) {
  const follow = read('follow/index.html');
  add('Built Follow form retains Netlify marker', /name=["']form-name["'][^>]+value=["']follow-the-work["']|data-netlify=["']true["']/i.test(follow), 'follow-the-work');
}

if (exists('intake/index.html')) {
  const clientIntake = read('intake/index.html');
  add('Built private client intake retains Netlify marker', /name=["']form-name["'][^>]+value=["']client-intake["']|data-netlify=["']true["']/i.test(clientIntake), 'client-intake');
  add('Direct intake remains noindex', /<meta[^>]+name=["']robots["'][^>]+content=["']noindex, nofollow["']/i.test(clientIntake), 'noindex, nofollow');
}

if (exists('dashboard/index.html')) {
  const dashboard = read('dashboard/index.html');
  add('Dashboard shell remains noindex', /<meta[^>]+name=["']robots["'][^>]+content=["']noindex, nofollow["']/i.test(dashboard), 'noindex, nofollow');
}

for (const rel of ['thank-you/index.html', 'support/thank-you/index.html', 'follow/thank-you/index.html', 'intake/thank-you/index.html']) {
  if (exists(rel)) {
    const html = read(rel);
    add(`Noindex retained: ${rel}`, /<meta[^>]+name=["']robots["'][^>]+content=["']noindex, nofollow["']/i.test(html), 'noindex, nofollow');
  }
}

const textFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(?:html|xml|txt|json|js|css)$/i.test(entry.name)) textFiles.push(full);
  }
};
walk(dist);
const builtText = textFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
add('Private personal email absent from built output', !/ryy_boww@outlook\.com/i.test(builtText), 'all text output');
add('No unresolved PUBLIC_ environment tokens in built output', !/PUBLIC_[A-Z0-9_]+/.test(builtText), 'all text output');

for (const check of checks) if (!check.ok) issues.push(check);
console.log('\nConvera Strategies — built-output audit\n');
for (const check of checks) console.log(`${check.ok ? 'PASS' : 'FAIL'}  ${check.name} — ${check.detail}`);
console.log(`\n${checks.length - issues.length}/${checks.length} built-output checks passed.`);
if (issues.length) process.exit(1);
