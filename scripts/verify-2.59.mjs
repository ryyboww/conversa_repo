import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const exists = (relative) => fs.existsSync(path.join(root, relative));
const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const securityTemplate = read('.env.operations-security.example');
const checks = [
  ['Package version is 2.59.0', pkg.version === '2.59.0'],
  ['Version metadata is 2.59.0', version.version === '2.59.0'],
  ['Security configuration template exists', exists('.env.operations-security.example')],
  ['Operator key is documented without a value', /^CONVERA_OPERATOR_KEY=$/m.test(securityTemplate)],
  ['Engagement-token secret is documented without a value', /^CONVERA_ENGAGEMENT_TOKEN_SECRET=$/m.test(securityTemplate)],
  ['Separate portal-code secret is documented without a value', /^CONVERA_PORTAL_OTP_SECRET=$/m.test(securityTemplate)],
  ['Portal email verification defaults on', securityTemplate.includes('CONVERA_PORTAL_REQUIRE_EMAIL_VERIFICATION=true')],
  ['Portal code expires after ten minutes by default', securityTemplate.includes('CONVERA_PORTAL_OTP_TTL_MINUTES=10')],
  ['Portal code requests have a cooldown', securityTemplate.includes('CONVERA_PORTAL_OTP_COOLDOWN_SECONDS=60')],
  ['Portal locks after repeated failures', securityTemplate.includes('CONVERA_PORTAL_MAX_ATTEMPTS=5')],
  ['Security controls run during release audit', pkg.scripts?.['release:audit']?.includes('security:controls')],
  ['Workstream boundary remains in release audit', pkg.scripts?.['release:audit']?.includes('workstreams:audit')],
  ['Private Intake remains noindex', read('src/pages/intake.astro').includes('noindex')]
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} 2.59 checks passed.`);
if (failed) process.exit(1);
