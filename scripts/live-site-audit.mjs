import process from 'node:process';

const rawBase = process.argv[2] || process.env.CONVERA_LIVE_URL || 'https://converastrategies.com';
const base = rawBase.replace(/\/$/, '');
const failures = [];
const checks = [];
const add = (name, ok, detail='') => { checks.push({name, ok, detail}); if (!ok) failures.push(`${name}${detail ? `: ${detail}` : ''}`); };

async function fetchText(path, options={}) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, { redirect: options.redirect || 'follow' });
    const text = options.noBody ? '' : await res.text();
    return { url, res, text };
  } catch (error) {
    return { url, error, res: null, text: '' };
  }
}

const routes = [
  '/', '/mission/', '/services/', '/publications/', '/community/', '/about/', '/contact/',
  '/work-with-convera/', '/support/', '/privacy/', '/terms/', '/accessibility/'
];

console.log(`\nConvera Strategies — live-site audit\nTarget: ${base}\n`);

for (const route of routes) {
  const result = await fetchText(route);
  add(`HTTP 200 ${route}`, result.res?.status === 200, result.res ? `${result.res.status}` : String(result.error));
  if (result.res?.status === 200 && route === '/') {
    add('Homepage identifies Convera Strategies', /Convera Strategies/i.test(result.text), 'brand marker');
    add('Homepage exposes canonical URL', /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/converastrategies\.com\/?["']/i.test(result.text), 'canonical');
    add('Homepage includes Open Graph image', /property=["']og:image["']/i.test(result.text), 'og:image');
    add('Founder portrait is present', /ryan-brown\.jpg/i.test(result.text), 'founder image');
  }
}

const home = await fetchText('/');
if (home.res) {
  const h = home.res.headers;
  add('HSTS header present', Boolean(h.get('strict-transport-security')), h.get('strict-transport-security') || 'missing');
  add('X-Content-Type-Options header present', h.get('x-content-type-options') === 'nosniff', h.get('x-content-type-options') || 'missing');
  add('Referrer-Policy header present', Boolean(h.get('referrer-policy')), h.get('referrer-policy') || 'missing');
  add('Content-Security-Policy header present', Boolean(h.get('content-security-policy')), h.get('content-security-policy') ? 'present' : 'missing');
}

const robots = await fetchText('/robots.txt');
add('robots.txt returns 200', robots.res?.status === 200, robots.res ? `${robots.res.status}` : String(robots.error));
if (robots.res?.status === 200) add('robots.txt references sitemap', /sitemap:/i.test(robots.text), 'Sitemap directive');

let sitemap = await fetchText('/sitemap-index.xml');
if (sitemap.res?.status !== 200) sitemap = await fetchText('/sitemap-0.xml');
add('Sitemap is reachable', sitemap.res?.status === 200, sitemap.res ? `${sitemap.res.status} ${new URL(sitemap.res.url).pathname}` : String(sitemap.error));

const rss = await fetchText('/rss.xml');
add('RSS feed returns 200', rss.res?.status === 200, rss.res ? `${rss.res.status}` : String(rss.error));
if (rss.res?.status === 200) add('RSS feed identifies Convera', /Convera Strategies/i.test(rss.text), 'feed title');

const redirect = await fetchText('/consulting', { redirect: 'manual', noBody: true });
add('Legacy /consulting redirect works', [301,302,307,308].includes(redirect.res?.status), redirect.res ? `${redirect.res.status} → ${redirect.res.headers.get('location') || 'no location'}` : String(redirect.error));

const contact = await fetchText('/contact/');
if (contact.res?.status === 200) add('Contact form visible in production HTML', /name=["']website-contact["']/i.test(contact.text), 'website-contact');
const intake = await fetchText('/work-with-convera/');
if (intake.res?.status === 200) add('Client-intake form visible in production HTML', /name=["']work-with-convera["']/i.test(intake.text), 'work-with-convera');

for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}${c.detail ? ` — ${c.detail}` : ''}`);
console.log(`\n${checks.length - failures.length}/${checks.length} live checks passed.`);
if (failures.length) {
  console.error('\nLive verification requires attention:');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
