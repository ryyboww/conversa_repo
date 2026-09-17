import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, copyFileSync, writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

const root = resolve(process.cwd());
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const version = pkg.version;
const targets = JSON.parse(readFileSync(join(root, 'deployment-targets.json'), 'utf8'));
const expectedBranch = targets.branch;
const tag = `v${version}`;
const outDir = resolve(root, '..', `ConveraStrategies-${version}-Distribution`);
const sourceZip = join(outDir, `ConveraStrategies-${version}-Source.zip`);
const gitBundle = join(outDir, `ConveraStrategies-${version}.gitbundle`);
const checksumFile = join(outDir, `SHA256SUMS.txt`);
const readmeFirst = join(outDir, `README-FIRST.md`);
const launchKit = resolve(root, '..', `ConveraStrategies-${version}-Launch-Kit.zip`);
const launchKitChecksum = `${launchKit}.sha256`;

function run(cmd, args) {
  return execFileSync(cmd, args, { cwd: root, encoding: 'utf8', stdio: ['ignore','pipe','pipe'] }).trim();
}
function sha256(file) {
  const hash = crypto.createHash('sha256');
  hash.update(readFileSync(file));
  return hash.digest('hex');
}
if (!existsSync(join(root, '.git'))) {
  console.error('BLOCK: release packaging requires a Git repository.');
  process.exit(1);
}
const status = run('git', ['status', '--porcelain']);
if (status) {
  console.error('BLOCK: working tree must be clean before packaging.');
  console.error(status);
  process.exit(1);
}
const head = run('git', ['rev-parse', 'HEAD']);
let tagCommit;
try { tagCommit = run('git', ['rev-list', '-n', '1', tag]); }
catch { console.error(`BLOCK: required release tag ${tag} does not exist.`); process.exit(1); }
if (head !== tagCommit) {
  console.error(`BLOCK: HEAD ${head} does not match ${tag} ${tagCommit}.`);
  process.exit(1);
}
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
rmSync(launchKit, { force: true });
rmSync(launchKitChecksum, { force: true });
run('git', ['archive', '--format=zip', `--output=${sourceZip}`, tag]);
run('git', ['bundle', 'create', gitBundle, 'HEAD', expectedBranch, '--tags']);
run('git', ['bundle', 'verify', gitBundle]);

// Confirm the bundle is directly clonable and checks out the production branch at the release commit.
const cloneRoot = mkdtempSync(join(os.tmpdir(), 'convera-release-'));
const cloneDir = join(cloneRoot, 'repo');
try {
  execFileSync('git', ['clone', '--quiet', gitBundle, cloneDir], { encoding: 'utf8', stdio: ['ignore','pipe','pipe'] });
  const clonedBranch = execFileSync('git', ['-C', cloneDir, 'branch', '--show-current'], { encoding: 'utf8' }).trim();
  const clonedHead = execFileSync('git', ['-C', cloneDir, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const clonedStatus = execFileSync('git', ['-C', cloneDir, 'status', '--porcelain'], { encoding: 'utf8' }).trim();
  if (clonedBranch !== expectedBranch || clonedHead !== head || clonedStatus) {
    console.error(`BLOCK: generated Git bundle did not clone to a clean ${expectedBranch} branch at the release commit.`);
    process.exit(1);
  }
} finally {
  rmSync(cloneRoot, { recursive: true, force: true });
}
for (const name of ['DOWNLOAD-CENTER.md','LAUNCH-NOW.md']) {
  const src = join(root, name);
  if (existsSync(src)) copyFileSync(src, join(outDir, name));
}
writeFileSync(readmeFirst, `# Convera Strategies ${version} — Start Here\n\nYou only need to keep this Launch Kit.\n\n1. Use **ConveraStrategies-${version}-Source.zip** for the normal project files.\n2. Use **ConveraStrategies-${version}.gitbundle** if you need to preserve or restore the verified Git history and release tag.\n3. Production repository: **${targets.repository}**. Production branch: **${expectedBranch}**.\n4. Open **LAUNCH-NOW.md** for the short launch sequence.\n5. Leave all other technical notes inside the source archive until they are needed.\n\nRelease tag: **${tag}**  \nRelease commit: **${head}**\n`);
const checksumTargets = [sourceZip, gitBundle];
writeFileSync(checksumFile, checksumTargets.map(f => `${sha256(f)}  ${basename(f)}`).join('\n') + '\n');
try { execFileSync('zip', ['-qr', launchKit, basename(outDir)], { cwd: resolve(root, '..') }); }
catch { console.error('BLOCK: system zip command is required.'); process.exit(1); }
writeFileSync(launchKitChecksum, `${sha256(launchKit)}  ${basename(launchKit)}\n`);
console.log(`PASS: packaged Convera Strategies ${version}`);
console.log(`Release tag: ${tag}`);
console.log(`Release commit: ${head}`);
console.log(`Launch kit: ${launchKit}`);
console.log('Distribution intentionally contains only launch-essential files.');
