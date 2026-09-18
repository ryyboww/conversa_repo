import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const expectedTag = `v${pkg.version}`;
const targets = JSON.parse(fs.readFileSync(path.join(root, 'deployment-targets.json'), 'utf8'));
const expectedBranch = targets.branch;
const expectedRepository = targets.repository;
const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const positionals = args.filter((arg) => !arg.startsWith('--'));
const remoteUrl = positionals[0] || '';
const apply = flags.has('--apply') || flags.has('--push');
const push = flags.has('--push');
const replace = flags.has('--replace');
const allowLocal = process.env.CONVERA_ALLOW_LOCAL_REMOTE === '1';

const run = (gitArgs, options = {}) => {
  const result = execFileSync('git', ['-C', root, ...gitArgs], {
    encoding: 'utf8',
    stdio: options.inherit ? 'inherit' : ['ignore', 'pipe', 'pipe']
  });
  return typeof result === 'string' ? result.trim() : '';
};

const safeUrl = (value) => value.replace(/^(https?:\/\/)[^/@]+@/i, '$1***@');
const isGithubHttps = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/i.test(remoteUrl);
const isGithubSsh = /^git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/i.test(remoteUrl);
const isLocal = allowLocal && (remoteUrl.startsWith('/') || remoteUrl.startsWith('./') || remoteUrl.startsWith('../') || remoteUrl.startsWith('file://'));

const fail = (message) => {
  console.error(`\nBLOCKED: ${message}\n`);
  process.exit(1);
};

let inside = '';
try { inside = run(['rev-parse', '--is-inside-work-tree']); } catch {}
if (inside !== 'true') fail('This command must run from the Convera Strategies Git repository.');

const branch = run(['branch', '--show-current']);
if (branch !== expectedBranch) fail(`Expected active branch ${expectedBranch}; found ${branch || 'detached HEAD'}.`);

const status = run(['status', '--porcelain']);
if (status) fail('Working tree is not clean. Commit or discard changes before configuring a remote.');

let tagCommit = '';
let head = '';
try { tagCommit = run(['rev-list', '-n', '1', expectedTag]); } catch {}
try { head = run(['rev-parse', 'HEAD']); } catch {}
if (!tagCommit || tagCommit !== head) fail(`Expected ${expectedTag} to point at HEAD before remote publication.`);

let currentOrigin = '';
try { currentOrigin = run(['remote', 'get-url', 'origin']); } catch {}

console.log(`\nConvera Strategies ${pkg.version} — remote bootstrap\n`);
console.log(`Branch: ${branch}`);
console.log(`Release tag: ${expectedTag}`);
console.log(`HEAD: ${head}`);
console.log(`Current origin: ${currentOrigin ? safeUrl(currentOrigin) : 'not configured'}`);

if (!remoteUrl) {
  console.log('\nNo repository URL supplied. This was a status-only run.');
  console.log(`Usage: npm run remote:bootstrap -- https://github.com/OWNER/${expectedRepository}.git`);
  console.log(`Add --apply to configure origin, or --push to configure and publish ${expectedBranch} plus the release tag.`);
  process.exit(0);
}

const normalizedRemote = remoteUrl.replace(/\.git\/?$/i, '').replace(/\/$/, '');
const remoteRepoName = normalizedRemote.split(/[\/:]/).pop() || '';
if (!(isGithubHttps || isGithubSsh || isLocal)) {
  fail('Remote must be a GitHub HTTPS/SSH repository URL. Local paths are accepted only for controlled self-tests.');
}
if (!isLocal && remoteRepoName !== expectedRepository) {
  fail(`Expected GitHub repository ${expectedRepository}; received ${remoteRepoName || 'unknown repository'}.`);
}

console.log(`Requested origin: ${safeUrl(remoteUrl)}`);
console.log(`Target repository: ${expectedRepository}`);
console.log(`Target branch: ${expectedBranch}`);
console.log(`Action: ${push ? `configure + push ${expectedBranch} and release tag` : apply ? 'configure origin only' : 'plan only'}`);

if (!apply) {
  console.log('\nPLAN ONLY — no repository settings were changed.');
  if (currentOrigin && currentOrigin !== remoteUrl) console.log('Existing origin differs; use --replace with --apply/--push only after confirming the destination.');
  process.exit(0);
}

if (currentOrigin && currentOrigin !== remoteUrl && !replace) {
  fail(`Origin already points to ${safeUrl(currentOrigin)}. Re-run with --replace only if the new destination is intentional.`);
}

if (!currentOrigin) {
  run(['remote', 'add', 'origin', remoteUrl]);
} else if (currentOrigin !== remoteUrl) {
  run(['remote', 'set-url', 'origin', remoteUrl]);
}

const configuredOrigin = run(['remote', 'get-url', 'origin']);
console.log(`\nOrigin configured: ${safeUrl(configuredOrigin)}`);

if (!push) {
  console.log('No push was performed.');
  process.exit(0);
}

console.log(`\nPublishing ${expectedBranch}...`);
run(['push', '-u', 'origin', expectedBranch], { inherit: true });
console.log(`Publishing ${expectedTag}...`);
run(['push', 'origin', expectedTag], { inherit: true });

const remoteRefs = run(['ls-remote', '--refs', 'origin', `refs/heads/${expectedBranch}`, `refs/tags/${expectedTag}`]);
const hasBranch = remoteRefs.includes(`refs/heads/${expectedBranch}`);
const hasTag = remoteRefs.includes(`refs/tags/${expectedTag}`);
if (!hasBranch || !hasTag) fail('Push returned without both expected remote refs. Verify the remote before deployment.');

console.log('\nPASS — remote publication verified.');
console.log(`Remote ${expectedBranch}: ${hasBranch ? 'present' : 'missing'}`);
console.log(`Remote ${expectedTag}: ${hasTag ? 'present' : 'missing'}`);
