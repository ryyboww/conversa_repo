import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root=process.cwd(), dir=path.join(root,'netlify/functions');
const files=fs.readdirSync(dir).filter(name=>name.endsWith('.mjs')).sort();
const required=['contact-form-notification.mjs','follow-form-notification.mjs','intake-form-notification.mjs','intake-invitation.mjs'];
const authoritativeProjectFunctions=23;
const failures=required.filter(name=>!files.includes(name));
for(const name of required) console.log(`${files.includes(name)?'PASS':'FAIL'} required function: ${name}`);
console.log(`PASS deployable function inventory: ${files.length}`);
if(files.length!==authoritativeProjectFunctions){console.log(`FAIL authoritative repository parity: expected ${authoritativeProjectFunctions}`);failures.push('function-count')}else console.log(`PASS authoritative repository parity: ${authoritativeProjectFunctions} project functions; protected live deploy remains on its earlier 21-function project set`);
if(failures.length) process.exit(1);
