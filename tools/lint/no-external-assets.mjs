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
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      return collectFiles(fullPath);
    }
    return EXTENSIONS.has(extname(entry)) ? [fullPath] : [];
  });
}

function safeCollectFiles(dir) {
  try {
    return collectFiles(dir);
  } catch {
    return [];
  }
}

const violations = ROOTS.flatMap((root) => safeCollectFiles(root).flatMap((file) => {
  const content = readFileSync(file, 'utf8');
  return FORBIDDEN_PATTERNS
    .filter(({ regex }) => regex.test(content))
    .map(({ name }) => `${file}: contiene ${name}`);
}));

if (violations.length > 0) {
  console.error('lint:assets - URLs externas de Figma encontradas (deben subirse al DAM y usar /content/dam/...):');
  violations.forEach((v) => console.error(`  - ${v}`));
  process.exit(1);
}

console.log('lint:assets - OK, sin URLs externas de Figma en blocks/ ni styles/');
