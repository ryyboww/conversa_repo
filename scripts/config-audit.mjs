import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const site=fs.readFileSync(path.join(root,'src/config/site.ts'),'utf8');
const netlify=fs.readFileSync(path.join(root,'netlify.toml'),'utf8');
const envPath=path.join(root,'.env');
const parse=(txt)=>Object.fromEntries(txt.split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('#')&&x.includes('=')).map(x=>{const i=x.indexOf('=');return [x.slice(0,i).trim(),x.slice(i+1).trim()]}));
const env=fs.existsSync(envPath)?parse(fs.readFileSync(envPath,'utf8')):{};
const checks=[]; const add=(n,ok,note)=>checks.push({n,ok,note});
add('Canonical domain uses HTTPS', site.includes("url: 'https://converastrategies.com'"), 'converastrategies.com');
for (const mailbox of ['ryan@converastrategies.com','hello@converastrategies.com','help@converastrategies.com','admin@converastrategies.com','billing@converastrategies.com']) add(`Branded mailbox declared: ${mailbox.split('@')[0]}`, site.includes(mailbox), mailbox);
add('Content Security Policy present', netlify.includes('Content-Security-Policy'), 'Netlify production headers');
add('HSTS includes subdomains', netlify.includes('includeSubDomains'), 'HTTPS hardening');
add('WWW redirects to canonical apex domain', netlify.includes('https://www.converastrategies.com/*') && netlify.includes('https://converastrategies.com/:splat'), 'hostname normalization');
for (const key of ['PUBLIC_SUPPORT_ONE_TIME_URL','PUBLIC_SUPPORT_MONTHLY_URL']) {
  const value=env[key];
  const ok=!value || /^https:\/\//i.test(value);
  add(`${key} is HTTPS when configured`,ok,value||'not configured');
}
const portal=env.PUBLIC_CLIENT_PORTAL_URL;
add('PUBLIC_CLIENT_PORTAL_URL is HTTPS when configured', !portal || /^https:\/\//i.test(portal), portal || 'not configured');
const portalEnabled=(env.PUBLIC_CLIENT_PORTAL_ENABLED || 'false').toLowerCase();
add('PUBLIC_CLIENT_PORTAL_ENABLED is true or false', ['true','false'].includes(portalEnabled), portalEnabled);
if (portalEnabled === 'true') {
  add('Enabled client portal has an HTTPS URL', /^https:\/\//i.test(portal || ''), portal || 'not configured');
  add('Enabled client portal has a provider label', Boolean(env.PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL), env.PUBLIC_CLIENT_PORTAL_PROVIDER_LABEL || 'not configured');
}
console.log('\nConvera Strategies — configuration audit\n');
for(const c of checks) console.log(`${c.ok?'PASS':'FAIL'}  ${c.n} — ${c.note}`);
const bad=checks.filter(c=>!c.ok); console.log(`\n${checks.length-bad.length}/${checks.length} configuration checks passed.`); if(bad.length) process.exit(1);
