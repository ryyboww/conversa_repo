import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const checks = [];
const add = (name, ok, state, detail) => checks.push({ name, ok, state, detail });

const major = Number(process.versions.node.split('.')[0]);
add('Supported Node runtime', major >= 20 && major < 23, major >= 20 && major < 23 ? 'READY' : 'FAIL', `Node ${process.versions.node}; package requires >=20 <23`);

let npmVersion = '';
try { npmVersion = execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim(); } catch {}
add('npm is available', Boolean(npmVersion), npmVersion ? 'READY' : 'FAIL', npmVersion ? `npm ${npmVersion}` : 'npm executable not available');

let gitVersion = '';
try { gitVersion = execFileSync('git', ['--version'], { encoding: 'utf8' }).trim(); } catch {}
add('Git is available', Boolean(gitVersion), gitVersion ? 'READY' : 'WARN', gitVersion || 'Git is not available in this environment');

const requiredFiles = ['package.json', 'astro.config.mjs', 'netlify.toml', 'src/pages/index.astro', 'public/images/ryan-brown.jpg'];
for (const file of requiredFiles) add(`Required file: ${file}`, fs.existsSync(path.join(root, file)), fs.existsSync(path.join(root, file)) ? 'READY' : 'FAIL', file);

const nodeModules = fs.existsSync(path.join(root, 'node_modules'));
add('Dependencies installed', nodeModules, nodeModules ? 'READY' : 'SETUP', nodeModules ? 'node_modules present' : 'Run npm install --no-audit --no-fund');

const astroBinary = fs.existsSync(path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'astro.cmd' : 'astro'));
add('Astro CLI available', astroBinary, astroBinary ? 'READY' : 'SETUP', astroBinary ? 'Local Astro CLI present' : 'Requires successful dependency installation');

const envExists = fs.existsSync(path.join(root, '.env'));
add('Public build environment file', envExists, envExists ? 'READY' : 'SETUP', envExists ? '.env present' : 'Optional locally; configure equivalent variables in Netlify');

const opsExists = fs.existsSync(path.join(root, '.env.operations'));
add('Operations verification file', opsExists, opsExists ? 'READY' : 'SETUP', opsExists ? '.env.operations present' : 'Copy .env.operations.example after external verification begins');

const distExists = fs.existsSync(path.join(root, 'dist', 'index.html'));
add('Built production output', distExists, distExists ? 'READY' : 'SETUP', distExists ? 'dist/index.html present' : 'Run npm run build:verify after dependencies install');

console.log('\nConvera Strategies — runtime doctor\n');
for (const c of checks) console.log(`${c.ok ? 'PASS' : c.state.padEnd(5)}  ${c.name} — ${c.detail}`);

const hardNames = new Set(['Supported Node runtime', 'npm is available', ...requiredFiles.map(file => `Required file: ${file}`)]);
const hardFailures = checks.filter(c => hardNames.has(c.name) && !c.ok);
console.log(`\nCore runtime prerequisites: ${hardNames.size - hardFailures.length}/${hardNames.size} ready.`);
console.log('SETUP items are expected before deployment and are not source-code failures.');
if (strict && hardFailures.length) process.exit(1);
