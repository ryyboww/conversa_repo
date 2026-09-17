import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pairs = [
  ['.env.example', '.env'],
  ['.env.operations.example', '.env.operations']
];

console.log('\nConvera Strategies — activation workspace initializer\n');
for (const [sourceName, targetName] of pairs) {
  const source = path.join(root, sourceName);
  const target = path.join(root, targetName);
  if (!fs.existsSync(source)) {
    console.error(`FAIL  Missing template: ${sourceName}`);
    process.exitCode = 1;
    continue;
  }
  if (fs.existsSync(target)) {
    console.log(`KEEP  ${targetName} already exists; no changes made.`);
    continue;
  }
  fs.copyFileSync(source, target);
  console.log(`MAKE  ${targetName} created from ${sourceName}.`);
}

console.log('\nNo credentials or secrets were created. Public checkout URLs belong in .env; verification flags belong in .env.operations.');
console.log('Next: npm run launch:summary\n');
