import dns from 'node:dns/promises';
import process from 'node:process';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const domainArg = args.find((arg) => !arg.startsWith('--'));
const domain = (domainArg || process.env.PUBLIC_SITE_DOMAIN || 'converastrategies.com').replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
const results = [];
const add = (name, status, detail) => results.push({ name, status, detail });
const flattenTxt = (records = []) => records.map((row) => row.join(''));

function withTimeout(promise, ms = 5000, label = 'DNS lookup') {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms); }),
  ]).finally(() => clearTimeout(timer));
}

console.log(`\nConvera Strategies — branded-email DNS audit (${domain})\n`);

try {
  const mx = await withTimeout(dns.resolveMx(domain), 5000, `${domain} MX lookup`);
  mx.sort((a, b) => a.priority - b.priority);
  add('MX records', mx.length ? 'PASS' : 'FAIL', mx.length ? mx.map((r) => `${r.priority} ${r.exchange}`).join('; ') : 'No MX records returned');
} catch (error) {
  add('MX records', 'FAIL', error.code || error.message);
}

try {
  const txt = flattenTxt(await withTimeout(dns.resolveTxt(domain), 5000, `${domain} TXT lookup`));
  const spf = txt.filter((entry) => /^v=spf1\b/i.test(entry));
  add('SPF record', spf.length === 1 ? 'PASS' : spf.length > 1 ? 'FAIL' : 'WARN', spf.length ? spf.join(' | ') : 'No SPF record found');
} catch (error) {
  add('SPF record', 'WARN', error.code || error.message);
}

try {
  const txt = flattenTxt(await withTimeout(dns.resolveTxt(`_dmarc.${domain}`), 5000, `_dmarc.${domain} TXT lookup`));
  const dmarc = txt.filter((entry) => /^v=DMARC1\b/i.test(entry));
  add('DMARC record', dmarc.length === 1 ? 'PASS' : dmarc.length > 1 ? 'FAIL' : 'WARN', dmarc.length ? dmarc.join(' | ') : 'No DMARC record found');
} catch (error) {
  add('DMARC record', 'WARN', error.code || error.message);
}

try {
  const txt = flattenTxt(await withTimeout(dns.resolveTxt(domain), 5000, `${domain} TXT lookup`));
  const siteVerifications = txt.filter((entry) => /verification|verify/i.test(entry));
  add('Verification TXT records', 'INFO', siteVerifications.length ? `${siteVerifications.length} verification-related TXT record(s) present` : 'No verification-related TXT record detected; this may be normal');
} catch {
  add('Verification TXT records', 'INFO', 'TXT lookup unavailable');
}

for (const item of results) console.log(`${item.status.padEnd(4)}  ${item.name} — ${item.detail}`);
const failures = results.filter((item) => item.status === 'FAIL');
const warnings = results.filter((item) => item.status === 'WARN');
console.log(`\n${failures.length} failure(s); ${warnings.length} warning(s). DKIM is provider-specific and must be checked using the selector supplied by the mailbox provider.`);
if (strict && failures.length) process.exit(1);
