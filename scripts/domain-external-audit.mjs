import dns from 'node:dns/promises';
import process from 'node:process';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const domainArg = args.find((arg) => !arg.startsWith('--'));
const domain = (domainArg || process.env.PUBLIC_SITE_DOMAIN || 'converastrategies.com').replace(/^https?:\/\//, '').replace(/\/$/, '');
const apex = domain.replace(/^www\./, '');
const www = `www.${apex}`;

const results = [];
const add = (name, status, detail) => results.push({ name, status, detail });
const safe = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

function withTimeout(promise, ms = 5000, label = 'DNS lookup') {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms); }),
  ]).finally(() => clearTimeout(timer));
}

async function resolveHost(host) {
  const records = { a: [], aaaa: [], cname: [] };
  try { records.a = await withTimeout(dns.resolve4(host), 5000, `${host} A lookup`); } catch {}
  try { records.aaaa = await withTimeout(dns.resolve6(host), 5000, `${host} AAAA lookup`); } catch {}
  try { records.cname = await withTimeout(dns.resolveCname(host), 5000, `${host} CNAME lookup`); } catch {}
  return records;
}

async function fetchHead(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'user-agent': 'ConveraStrategiesExternalAudit/2.6' },
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

console.log(`\nConvera Strategies — external domain audit (${apex})\n`);

let apexRecords;
try {
  apexRecords = await resolveHost(apex);
  const count = apexRecords.a.length + apexRecords.aaaa.length + apexRecords.cname.length;
  add('Apex DNS resolves', count > 0 ? 'PASS' : 'FAIL', count > 0 ? JSON.stringify(apexRecords) : 'No A/AAAA/CNAME records returned');
} catch (error) {
  add('Apex DNS resolves', 'FAIL', safe(error.message));
}

let wwwRecords;
try {
  wwwRecords = await resolveHost(www);
  const count = wwwRecords.a.length + wwwRecords.aaaa.length + wwwRecords.cname.length;
  add('www DNS resolves', count > 0 ? 'PASS' : 'WARN', count > 0 ? JSON.stringify(wwwRecords) : 'No A/AAAA/CNAME records returned');
} catch (error) {
  add('www DNS resolves', 'WARN', safe(error.message));
}

try {
  const response = await fetchHead(`https://${apex}/`);
  const ok = response.status >= 200 && response.status < 400;
  add('Apex HTTPS responds', ok ? 'PASS' : 'FAIL', `HTTP ${response.status}${response.headers.get('location') ? ` → ${response.headers.get('location')}` : ''}`);
  const hsts = response.headers.get('strict-transport-security');
  add('HSTS header present', hsts ? 'PASS' : 'WARN', hsts || 'Header not present');
} catch (error) {
  add('Apex HTTPS responds', 'FAIL', safe(error.message));
  add('HSTS header present', 'WARN', 'Could not inspect because HTTPS request failed');
}

try {
  const response = await fetchHead(`https://${www}/`);
  const location = response.headers.get('location') || '';
  const redirectsToApex = response.status >= 300 && response.status < 400 && location.includes(apex) && !location.includes(`://${www}`);
  const directOk = response.status >= 200 && response.status < 300;
  add('www behavior', redirectsToApex ? 'PASS' : directOk ? 'WARN' : 'WARN', redirectsToApex ? `HTTP ${response.status} → ${location}` : directOk ? 'www serves directly; canonical redirect to apex is preferred' : `HTTP ${response.status}${location ? ` → ${location}` : ''}`);
} catch (error) {
  add('www behavior', 'WARN', safe(error.message));
}

for (const item of results) console.log(`${item.status.padEnd(4)}  ${item.name} — ${item.detail}`);
const failures = results.filter((item) => item.status === 'FAIL');
const warnings = results.filter((item) => item.status === 'WARN');
console.log(`\n${results.length - failures.length - warnings.length}/${results.length} checks passed; ${warnings.length} warning(s); ${failures.length} failure(s).`);
if (strict && failures.length) process.exit(1);
