import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const expectedTag = `v${pkg.version}`;
const targets = JSON.parse(fs.readFileSync(path.join(root, 'deployment-targets.json'), 'utf8'));
const expectedBranch = targets.branch;
const expectedRepository = targets.repository;

const git = (...args) => {
  try {
    return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return '';
  }
};

const checks = [];
const add = (name, ok, detail, required = true) => checks.push({ name, ok, detail, required });

const inside = git('rev-parse', '--is-inside-work-tree') === 'true';
add('Git repository is initialized', inside, inside ? '.git present' : 'not a Git work tree');

if (inside) {
  const branch = git('branch', '--show-current');
  const head = git('rev-parse', 'HEAD');
  const status = git('status', '--porcelain');
  const origin = git('remote', 'get-url', 'origin');
  const tagCommit = git('rev-list', '-n', '1', expectedTag);
  const tagAtHead = Boolean(tagCommit) && tagCommit === head;

  add(`Active branch is ${expectedBranch}`, branch === expectedBranch, branch || 'detached/unknown');
  add('Working tree is clean', status.length === 0, status.length === 0 ? 'clean' : status.split('\n').slice(0, 6).join(' | '));
  const originMatchesRepo = Boolean(origin) && origin.replace(/\.git\/?$/i, '').split(/[\/:]/).pop() === expectedRepository;
  add('Origin remote is configured', Boolean(origin), origin || 'pending GitHub connection', strict);
  add(`Origin targets ${expectedRepository}`, originMatchesRepo, origin || 'pending GitHub connection', strict);
  add(`Release tag ${expectedTag} exists at HEAD`, tagAtHead, tagCommit ? `${expectedTag} -> ${tagCommit.slice(0, 12)}` : 'tag pending until release commit', strict);
  add('HEAD commit exists', /^[0-9a-f]{40}$/i.test(head), head || 'missing');
}

const failures = checks.filter((c) => c.required && !c.ok);
console.log(`\nConvera Strategies ${pkg.version} — Git remote status\n`);
for (const c of checks) {
  const label = c.ok ? 'PASS' : c.required ? 'FAIL' : 'PENDING';
  console.log(`${label.padEnd(7)} ${c.name} — ${c.detail}`);
}
console.log(`\nMode: ${strict ? 'strict' : 'informational'}`);
if (failures.length) process.exit(1);
