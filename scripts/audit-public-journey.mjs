import process from 'node:process';

const base = (process.argv[2] || '').replace(/\/$/, '');
if (!/^https?:\/\//.test(base)) {
  console.error('Usage: node scripts/audit-public-journey.mjs https://example.com');
  process.exit(2);
}

const publicRoutes = ['/', '/contact/', '/publications/', '/speaking/', '/press-kit/', '/follow/'];
const forbiddenPublicFragments = ['/intake/', '/operator/', '/.netlify/functions/project-'];
let failures = 0;

const pass = (message) => console.log(`PASS: ${message}`);
const fail = (message) => { failures++; console.error(`FAIL: ${message}`); };

for (const route of publicRoutes) {
  const url = `${base}${route}`;
  try {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) { fail(`${route} returned ${response.status}`); continue; }
    pass(`${route} returned ${response.status}`);
    const html = await response.text();
    const lower = html.toLowerCase();
    if (!lower.includes('<title')) fail(`${route} has no title element`); else pass(`${route} has a title`);
    if (!lower.includes('rel="canonical"') && route !== '/') console.warn(`WARN: ${route} canonical tag not detected by simple audit`);
    for (const fragment of forbiddenPublicFragments) {
      if (html.includes(fragment)) fail(`${route} exposes private fragment ${fragment}`);
    }
  } catch (error) {
    fail(`${route} request failed: ${error.message}`);
  }
}

if (failures) {
  console.error(`\nPublic journey audit finished with ${failures} failure(s).`);
  process.exit(1);
}
console.log('\nPublic journey audit passed. Continue with the manual end-to-end launch test.');
