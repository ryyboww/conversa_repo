import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const required = [
  'public/assets/convera-visibility.js',
  'public/assets/convera-growth.js',
  'src/components/visibility/VisibilityNavLinks.astro',
  'src/components/visibility/VisibilityFooterLinks.astro',
  'src/components/visibility/PublicationCTA.astro',
  'src/components/privacy/AttributionDisclosure.astro',
  'scripts/audit-public-journey.mjs',
  'docs/INSTALL-2.30.md',
  'docs/ANALYTICS-EVENTS.md',
  'docs/PRIVACY-AND-CONSENT-REVIEW.md',
  'docs/SEO-SITEMAP-LAUNCH.md',
  'docs/END-TO-END-LAUNCH-TEST.md',
  'docs/LAUNCH-GROWTH-CONTROL.md'
];
let checks = 0;
const assert = (ok, msg) => { checks++; if (!ok) throw new Error(`FAIL: ${msg}`); console.log(`PASS: ${msg}`); };
for (const file of required) assert(fs.existsSync(path.join(root, file)), `${file} exists`);

const attribution = fs.readFileSync(path.join(root,'public/assets/convera-visibility.js'),'utf8');
const growth = fs.readFileSync(path.join(root,'public/assets/convera-growth.js'),'utf8');
const cta = fs.readFileSync(path.join(root,'src/components/visibility/PublicationCTA.astro'),'utf8');
const nav = fs.readFileSync(path.join(root,'src/components/visibility/VisibilityNavLinks.astro'),'utf8');
const privacy = fs.readFileSync(path.join(root,'src/components/privacy/AttributionDisclosure.astro'),'utf8');
const launch = fs.readFileSync(path.join(root,'docs/END-TO-END-LAUNCH-TEST.md'),'utf8');
const events = fs.readFileSync(path.join(root,'docs/ANALYTICS-EVENTS.md'),'utf8');

assert(attribution.includes('sessionStorage'), 'attribution remains session-scoped');
assert(attribution.includes('website-contact'), 'Contact remains attribution-aware');
assert(!growth.includes('sendBeacon('), 'growth bridge does not transmit directly to an analytics endpoint');
assert(growth.includes("CustomEvent(EVENT_NAME"), 'growth bridge emits first-party browser events');
assert(growth.includes('window.dataLayer'), 'growth bridge can use an already-configured dataLayer');
assert(cta.includes('publication_contact'), 'publication Contact CTA has event annotation');
assert(cta.includes('/contact/?inquiry=professional'), 'publication professional pathway routes to Contact');
assert(!cta.includes('/intake/'), 'publication CTA does not expose Intake');
assert(!nav.includes('/intake/'), 'navigation component does not expose Intake');
assert(privacy.includes('does not use this feature to fingerprint'), 'privacy disclosure states no fingerprinting');
assert(privacy.includes('current browser session'), 'privacy disclosure states session boundary');
assert(launch.includes('no Project #'), 'launch test verifies Contact cannot create a Project automatically');
assert(launch.includes('creates no HubSpot Deal'), 'launch test preserves no-Deal rule for services');
assert(events.includes('not proof Netlify accepted'), 'analytics dictionary distinguishes submit attempt from accepted form receipt');

console.log(`\n2.30 verification complete: ${checks}/${checks} checks passed.`);
