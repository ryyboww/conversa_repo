import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));
const checks = [];
const add = (name, ok) => checks.push({ name, ok });

const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const contact = read('src/pages/contact.astro');
const work = read('src/pages/work-with-convera.astro');
const intake = read('src/pages/intake.astro');
const forms = read('FORM-NOTIFICATIONS.md');
const operations = read('OPERATIONS.md');
const distAudit = read('scripts/dist-audit.mjs');
const liveAudit = read('scripts/live-site-audit.mjs');
const home = read('src/pages/index.astro');

add('package version is 2.56.0', pkg.version === '2.56.0');
add('VERSION metadata is 2.56.0', version.version === '2.56.0');
add('Contact remains public professional entry point', contact.includes('use this Contact form first') && contact.includes('separate Intake invitation'));
add('Work With Convera is orientation-only', !/name=["']work-with-convera["']/.test(work) && work.includes('/contact/?reason=professional'));
add('Private Intake remains noindex', intake.includes('noindex'));
add('Private Intake uses separate client-intake form', intake.includes('name="client-intake"') && intake.includes('form-name') && intake.includes('/intake/thank-you/'));
add('Form documentation names current forms', forms.includes('website-contact') && forms.includes('follow-the-work') && forms.includes('client-intake'));
add('Form documentation does not restore retired work-with-convera form', !forms.includes('`work-with-convera` —'));
add('Operations document preserves manual review boundary', operations.includes('manual review') && operations.includes('direct private Intake invitation'));
add('Built-output audit verifies current workflow', distAudit.includes('website-contact') && distAudit.includes('follow-the-work') && distAudit.includes('client-intake') && distAudit.includes('not retired intake form'));
add('Live-site audit verifies current workflow', liveAudit.includes('website-contact') && liveAudit.includes('follow-the-work') && liveAudit.includes('client-intake') && liveAudit.includes('retired public intake form'));
add('Home Featured Publication artwork is preserved', home.includes('/images/home/an_objective_strategy.png'));
add('Home Featured Essay artwork is preserved', home.includes('/images/home/talk_is_cheap.png'));
add('Supplied Featured Publication artwork exists', exists('public/images/home/an_objective_strategy.png'));
add('Supplied Featured Essay artwork exists', exists('public/images/home/talk_is_cheap.png'));
add('Current framework status exists', exists('FRAMEWORK-STATUS-2.56.md'));
add('README points to current verification script', read('README.md').includes('npm run verify:2.56'));
add('Source freeze identifies current release', read('SOURCE-FREEZE.md').includes('2.56.0'));

let failed = 0;
for (const check of checks) {
  console.log(`${check.ok ? 'PASS' : 'FAIL'} ${check.name}`);
  if (!check.ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} 2.56 checks passed.`);
if (failed) process.exit(1);
