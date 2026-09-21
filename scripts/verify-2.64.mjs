import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const checks = [];
const add = (name, ok) => checks.push({ name, ok });

const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const env = read('.env.example');
const dashboard = read('src/config/dashboard.ts');
const setter = read('scripts/public-config-set.mjs');
const audit = read('scripts/config-audit.mjs');
const map = read('ENVIRONMENT-MAP.md');
const status = read('FRAMEWORK-STATUS-2.64.md');

add('Package version is 2.64.0', pkg.version === '2.64.0');
add('Release record is 2.64.0', version.version === '2.64.0');
add('Portal activation defaults to false', /^PUBLIC_CLIENT_PORTAL_ENABLED=false$/m.test(env));
add('Dashboard requires explicit activation and HTTPS', dashboard.includes('explicitlyEnabled && hasSecureUrl'));
add('Configuration command supports portal activation', setter.includes("'PUBLIC_CLIENT_PORTAL_ENABLED'"));
add('Configuration command supports portal provider label', setter.includes("'PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL'"));
add('Configuration command supports portal URL', setter.includes("'PUBLIC_CLIENT_PORTAL_URL'"));
add('Configuration audit checks enabled portal dependencies', audit.includes("if (portalEnabled === 'true')"));
add('Environment map preserves private Intake boundary', map.includes('Contact → manual review → direct invitation workflow'));
add('Framework status confirms production remains unchanged', status.includes('production is unchanged'));

for (const check of checks) console.log(`${check.ok ? 'PASS' : 'FAIL'}  ${check.name}`);
const failed = checks.filter((check) => !check.ok);
console.log(`\n2.64 verification: ${checks.length - failed.length}/${checks.length} passed.`);
if (failed.length) process.exit(1);
