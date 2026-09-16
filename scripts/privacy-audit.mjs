import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scanRoots = ['src', 'public'];
const ignored = new Set(['node_modules', 'dist', '.astro', '.git']);
const textExt = new Set(['.astro','.ts','.js','.mjs','.json','.md','.txt','.html','.css','.xml','.toml','.webmanifest']);
const files = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (textExt.has(path.extname(entry.name)) || entry.name === 'site.webmanifest') files.push(full);
  }
}
for (const rel of scanRoots) walk(path.join(root, rel));

const forbidden = [
  { name: 'Personal Outlook address', pattern: /ryy_boww@outlook\.com/i },
  { name: 'Legacy personal email key', pattern: /personalEmail\s*:/i },
];
const secretPatterns = [
  { name: 'Private-key marker', pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'Stripe secret key pattern', pattern: /\bsk_(?:live|test)_[A-Za-z0-9]{16,}\b/ },
];

const findings = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const rule of [...forbidden, ...secretPatterns]) {
    if (rule.pattern.test(text)) findings.push({ file: path.relative(root, file), rule: rule.name });
  }
}

const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
const checks = [
  ['Private personal email absent from public source', !findings.some(f => f.rule === 'Personal Outlook address' || f.rule === 'Legacy personal email key'), 'src/ and public/'],
  ['Common secret patterns absent from public source', !findings.some(f => f.rule.includes('key') || f.rule.includes('Stripe')), 'src/ and public/'],
  ['.env is ignored by Git', /^\.env$/m.test(gitignore), '.gitignore'],
  ['.env.operations is ignored by Git', /^\.env\.operations$/m.test(gitignore), '.gitignore'],
  ['Generated activation reports are ignored by Git', /^ACTIVATION-REPORT\.md$/m.test(gitignore) && /^ACTIVATION-REPORT\.json$/m.test(gitignore), '.gitignore'],
];

console.log('\nConvera Strategies — privacy and exposure audit\n');
for (const [name, ok, note] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${note}`);
if (findings.length) {
  console.log('\nFindings:');
  for (const f of findings) console.log(`- ${f.file}: ${f.rule}`);
}
const failures = checks.filter(([, ok]) => !ok);
console.log(`\n${checks.length - failures.length}/${checks.length} privacy/exposure checks passed.`);
if (failures.length) process.exit(1);
