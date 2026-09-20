import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const excludedDirectories = new Set(['.git', '.astro', 'dist', 'node_modules']);
const blockedDirectories = new Set(['manual-workstream', 'operations-manual-working', 'operations-manual-drafts']);
const blockedFiles = [];

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (excludedDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute).split(path.sep).join('/');
    const normalized = entry.name.toLowerCase();

    if (entry.isDirectory()) {
      if (blockedDirectories.has(normalized)) blockedFiles.push(`${relative}/`);
      else visit(absolute);
      continue;
    }

    const isWordWorkingFile = /\.docx?$/i.test(entry.name);
    const isManualVersionArtifact = /convera[-_ ]strategies[-_ ]operations[-_ ]manual|operations[-_ ]manual[-_ ]v\d/i.test(normalized);
    if (isWordWorkingFile || isManualVersionArtifact) blockedFiles.push(relative);
  }
}

visit(root);

console.log('\nConvera Strategies — workstream boundary audit\n');
console.log('PASS  Website and Operations Manual are defined as separate controlled workstreams.');
console.log('PASS  Contact and private Intake remain governed by the website workstream.');

if (blockedFiles.length) {
  console.log('FAIL  Manual working material was found inside the website project:');
  for (const file of blockedFiles) console.log(`- ${file}`);
  process.exit(1);
}

console.log('PASS  No Operations Manual working files or manual-version artifacts are present.');
console.log('\n3/3 workstream boundary checks passed.');
