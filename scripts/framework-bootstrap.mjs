import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns/promises';
import { spawnSync, execFileSync } from 'node:child_process';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const statusOnly = args.has('--status');
const lockOnly = args.has('--lock-only');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const targets = JSON.parse(fs.readFileSync(path.join(root, 'deployment-targets.json'), 'utf8'));
const expectedBranch = targets.branch;

const exists = (rel) => fs.existsSync(path.join(root, rel));
const run = (cmd, cmdArgs, label) => {
  console.log(`\n→ ${label}`);
  const result = spawnSync(cmd, cmdArgs, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.error) {
    console.error(`\nBLOCKED: ${label} could not start: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`\nBLOCKED: ${label} exited with status ${result.status}.`);
    process.exit(result.status || 1);
  }
};
const git = (...gitArgs) => {
  try { return execFileSync('git', ['-C', root, ...gitArgs], { encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }).trim(); }
  catch { return ''; }
};
const nodeMajor = Number(process.versions.node.split('.')[0]);
const nodeOk = nodeMajor >= 20 && nodeMajor < 23;
const hasAstro = exists('node_modules/astro/package.json');
const hasLock = exists('package-lock.json');
const hasDist = exists('dist/index.html');
const branch = git('branch', '--show-current');
const dirty = Boolean(git('status', '--porcelain'));

async function registryReachable() {
  try {
    await Promise.race([
      dns.lookup('registry.npmjs.org'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    ]);
    return true;
  } catch {
    return false;
  }
}

console.log(`\nConvera Strategies ${pkg.version} — Framework Bootstrap`);
console.log('This command performs the framework-level work the source-only audits cannot prove.\n');
console.log(`${nodeOk ? 'PASS' : 'BLOCK'}  Node ${process.versions.node} (supported: 20–22)`);
console.log(`${hasAstro ? 'PASS' : 'PENDING'}  Astro dependencies installed`);
console.log(`${hasLock ? 'PASS' : 'ADVISORY'}  package-lock.json ${hasLock ? 'present' : 'not yet created'}`);
console.log(`${hasDist ? 'PASS' : 'PENDING'}  Production dist/ build ${hasDist ? 'present' : 'not yet verified'}`);
console.log(`${branch === expectedBranch ? 'PASS' : 'INFO'}  Git branch: ${branch || 'not detected'} (expected: ${expectedBranch})`);
console.log(`${dirty ? 'INFO' : 'PASS'}  Working tree ${dirty ? 'contains local changes' : 'is clean'}`);

if (!nodeOk) {
  console.error('\nBLOCKED: use Node 20, 21, or 22 before continuing.');
  process.exit(1);
}

if (statusOnly) {
  const registry = await registryReachable();
  console.log(`${registry ? 'PASS' : 'BLOCK'}  npm registry DNS ${registry ? 'resolves' : 'does not resolve from this environment'}`);
  console.log('\nStatus-only run; nothing was changed.\n');
  process.exit(0);
}

const registry = await registryReachable();
if (!registry) {
  console.error('\nBLOCKED: registry.npmjs.org cannot be resolved from this environment.');
  console.error('No source files were changed. Run this command again from a normal internet-connected computer.');
  console.error('Recommended command: npm run launch:bootstrap\n');
  process.exit(2);
}

if (lockOnly) {
  if (hasLock) {
    console.log('\nPASS: package-lock.json already exists; no lockfile generation was required.');
  } else {
    run('npm', ['install', '--package-lock-only', '--ignore-scripts', '--no-audit', '--no-fund'], 'Generate package-lock.json without changing application source');
  }
  if (!exists('package-lock.json')) {
    console.error('\nBLOCKED: npm completed without creating package-lock.json.');
    process.exit(1);
  }
  console.log('\nPASS: package-lock.json is ready.');
  console.log(`Next, review it and commit it to ${expectedBranch}:`);
  console.log('  git add package-lock.json');
  console.log('  git commit -m "Add npm dependency lockfile"');
  console.log(`  git push origin ${expectedBranch}\n`);
  process.exit(0);
}

if (!hasAstro) {
  if (hasLock) {
    run('npm', ['ci', '--no-audit', '--no-fund'], 'Install exact dependencies from package-lock.json');
  } else {
    run('npm', ['install', '--package-lock=false', '--no-audit', '--no-fund'], 'Install dependencies without changing the tagged source tree');
  }
}

run('npm', ['run', 'ready:source'], 'Run source, repository, and privacy verification');
run('npm', ['run', 'check'], 'Run Astro type/content checks');
run('npm', ['run', 'build:verify'], 'Build production output and inspect dist/');

console.log('\nPASS: framework bootstrap completed successfully.');
console.log('The source tree remains suitable for the tagged GitHub publication flow.');
if (!exists('package-lock.json')) {
  console.log('After the initial GitHub publication, create the dependency lockfile with:');
  console.log('  npm run framework:lock');
}
console.log('Then run:');
console.log('  npm run launch\n');
