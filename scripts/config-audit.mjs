import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const site=fs.readFileSync(path.join(root,'src/config/site.ts'),'utf8');
const netlify=fs.readFileSync(path.join(root,'netlify.toml'),'utf8');
const contact=fs.readFileSync(path.join(root,'src/pages/contact.astro'),'utf8');
const follow=fs.readFileSync(path.join(root,'src/pages/follow.astro'),'utf8');
const intake=fs.readFileSync(path.join(root,'src/pages/intake.astro'),'utf8');
const envPath=path.join(root,'.env');
const parse=(txt)=>Object.fromEntries(txt.split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('#')&&x.includes('=')).map(x=>{const i=x.indexOf('=');return [x.slice(0,i).trim(),x.slice(i+1).trim()]}));
const env=fs.existsSync(envPath)?parse(fs.readFileSync(envPath,'utf8')):{};
const checks=[]; const add=(n,ok,note)=>checks.push({n,ok,note});
add('Canonical domain uses HTTPS', site.includes("url: 'https://converastrategies.com'"), 'converastrategies.com');
for (const mailbox of ['ryan@converastrategies.com','hello@converastrategies.com','help@converastrategies.com','admin@converastrategies.com','billing@converastrategies.com']) add(`Branded mailbox declared: ${mailbox.split('@')[0]}`, site.includes(mailbox), mailbox);
add('Content Security Policy present', netlify.includes('Content-Security-Policy'), 'Netlify production headers');
add('HSTS includes subdomains', netlify.includes('includeSubDomains'), 'HTTPS hardening');
add('WWW redirects to canonical apex domain', netlify.includes('https://www.converastrategies.com/*') && netlify.includes('https://converastrategies.com/:splat'), 'hostname normalization');
add('Netlify build command is committed', /command\s*=\s*"npm run build"/.test(netlify), 'npm run build');
add('Netlify publish directory is committed', /publish\s*=\s*"dist"/.test(netlify), 'dist');
add('Netlify Node version is pinned', /NODE_VERSION\s*=\s*"20"/.test(netlify), 'Node 20');
for (const header of ['X-Frame-Options','X-Content-Type-Options','Referrer-Policy','Permissions-Policy','Strict-Transport-Security','Cross-Origin-Opener-Policy']) {
  add(`Security header committed: ${header}`, netlify.includes(header), header);
}
for (const route of ['/thank-you/*','/support/thank-you/*','/work-with-convera/thank-you/*','/intake/*','/dashboard/*']) {
  const block=netlify.slice(netlify.indexOf(`for = "${route}"`));
  add(`Private/utility route is noindex: ${route}`, block.startsWith(`for = "${route}"`) && block.slice(0,260).includes('X-Robots-Tag = "noindex, nofollow"'), route);
}
for (const [name, source] of [['website-contact',contact],['follow-the-work',follow],['client-intake',intake]]) {
  add(`Netlify form is source-declared: ${name}`, source.includes(`name="${name}"`) && source.includes(`name="form-name" value="${name}"`) && source.includes('data-netlify="true"') && source.includes('data-netlify-honeypot="bot-field"'), name);
}
for (const key of ['PUBLIC_SUPPORT_ONE_TIME_URL','PUBLIC_SUPPORT_MONTHLY_URL']) {
  const value=env[key];
  const ok=!value || /^https:\/\//i.test(value);
  add(`${key} is HTTPS when configured`,ok,value||'not configured');
}
const portal=env.PUBLIC_CLIENT_PORTAL_URL;
add('PUBLIC_CLIENT_PORTAL_URL is HTTPS when configured', !portal || /^https:\/\//i.test(portal), portal || 'not configured');
console.log('\nConvera Strategies — configuration audit\n');
for(const c of checks) console.log(`${c.ok?'PASS':'FAIL'}  ${c.n} — ${c.note}`);
const bad=checks.filter(c=>!c.ok); console.log(`\n${checks.length-bad.length}/${checks.length} configuration checks passed.`); if(bad.length) process.exit(1);
