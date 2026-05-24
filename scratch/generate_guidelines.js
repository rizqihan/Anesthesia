const fs = require('fs');
const path = require('path');

const group1Path = path.join(__dirname, 'guidelines_group1.json');
const group2Path = path.join(__dirname, 'guidelines_group2.json');
const group3Path = path.join(__dirname, 'guidelines_group3.json');
const existingPath = path.join(__dirname, 'guidelines_existing.json');

const group1 = JSON.parse(fs.readFileSync(group1Path, 'utf-8'));
const group2 = JSON.parse(fs.readFileSync(group2Path, 'utf-8'));
const group3 = JSON.parse(fs.readFileSync(group3Path, 'utf-8'));
const existing = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));

// Combine all 17 converted entries + 10 reformatted existing ones = 27 total guidelines!
const allGuidelines = [...group1, ...group2, ...group3, ...existing];

// Let's add ID fields dynamically so that they are sequentially indexed starting from 1
allGuidelines.forEach((g, idx) => {
  g.id = idx + 1;
  // Ensure legacy compatibility content fallback is set to definition
  g.content = g.definition;
});

const tsFileContent = `import type { GuidelineRecord } from './db';\n\nexport const GUIDELINES_DB: GuidelineRecord[] = ${JSON.stringify(allGuidelines, null, 2)};\n`;

const targetPath = path.join(__dirname, '../lib/guidelines.ts');
fs.writeFileSync(targetPath, tsFileContent, 'utf-8');

console.log(`Successfully compiled and wrote ${allGuidelines.length} structured Clinical Practice Guidelines to ${targetPath}`);
