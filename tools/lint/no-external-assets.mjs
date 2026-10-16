#!/usr/bin/env node
// Falla si un bloque commitea una URL externa de Figma (temporal, expira) en vez de la ruta
// /content/dam/... del DAM - ver GATE en ia-seidor-teammate prompts/skills/figma.md.
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOTS = ['blocks', 'styles'];
const EXTENSIONS = new Set(['.css', '.js']);
const FORBIDDEN_PATTERNS = [
  { name: 'figma-alpha-api (export temporal de Figma)', regex: /figma-alpha-api/i },
  { name: 'URL directa a figma.com', regex: /figma\.com\/(file|design)/i },
];

function collectFiles(dir) {
  let files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files = files.concat(collectFiles(fullPath));
    } else if (EXTENSIONS.has(extname(entry))) {
      files.push(fullPath);
    }
  }
  return files;
}

const violations = [];
for (const root of ROOTS) {
  let files;
  try {
    files = collectFiles(root);
  } catch {
    continue;
  }
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    for (const { name, regex } of FORBIDDEN_PATTERNS) {
      if (regex.test(content)) {
        violations.push(`${file}: contiene ${name}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error('lint:assets - URLs externas de Figma encontradas (deben subirse al DAM y usar /content/dam/...):');
  for (const v of violations) {
    console.error(`  - ${v}`);
  }
  process.exit(1);
}

console.log('lint:assets - OK, sin URLs externas de Figma en blocks/ ni styles/');
