import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const required = [
  'public/assets/convera-visibility.css',
  'public/assets/convera-visibility.js',
  'public/speaking/index.html',
  'public/press-kit/index.html',
  'public/press-kit/downloads/ryan-brown-bios.txt',
  'public/follow/index.html',
  'public/follow/thank-you/index.html',
  'src/components/visibility/PublicationCTA.astro',
  'docs/INSTALL-2.29.md',
  'docs/PUBLIC-VISIBILITY-STRATEGY.md'
];
let checks = 0;
const assert = (ok, msg) => { checks++; if (!ok) throw new Error(`FAIL: ${msg}`); console.log(`PASS: ${msg}`); };
for (const f of required) assert(fs.existsSync(path.join(root, f)), `${f} exists`);
const speaking = fs.readFileSync(path.join(root,'public/speaking/index.html'),'utf8');
const press = fs.readFileSync(path.join(root,'public/press-kit/index.html'),'utf8');
const follow = fs.readFileSync(path.join(root,'public/follow/index.html'),'utf8');
const js = fs.readFileSync(path.join(root,'public/assets/convera-visibility.js'),'utf8');
const cta = fs.readFileSync(path.join(root,'src/components/visibility/PublicationCTA.astro'),'utf8');
assert(!speaking.includes('/intake/'), 'Speaking page does not expose Intake');
assert(!press.includes('Ph.D.</'), 'Press kit does not claim a completed Ph.D.');
assert(follow.includes('data-netlify="true"'), 'Follow form is prepared for Netlify Forms');
assert(follow.includes('name="consent"'), 'Follow form requires consent');
assert(follow.includes('does not silently add'), 'Follow page states provider-neutral enrollment boundary');
assert(js.includes('sessionStorage'), 'Attribution is session-level');
assert(!js.includes('fingerprint'), 'Attribution script contains no fingerprinting implementation');
assert(js.includes('website-contact'), 'Attribution can attach to existing Contact form');
assert(cta.includes('/contact/?inquiry=professional'), 'Publication CTA routes professional interest to Contact');
assert(!cta.includes('/intake/'), 'Publication CTA does not expose Intake');
assert(press.includes('doctoral researcher'), 'Press kit uses doctoral researcher language');
assert(press.includes('Print / Save as PDF'), 'Press kit provides print/save pathway');
console.log(`\n2.29 verification complete: ${checks}/${checks} checks passed.`);
