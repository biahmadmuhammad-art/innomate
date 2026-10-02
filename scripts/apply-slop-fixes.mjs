// Applies research/ai-slop-copy-fixes.json, skipping entries that drifted
// and the ones listed in SKIP (kept on purpose — see the chat decision).
import { readFileSync, writeFileSync } from 'node:fs';
const SKIP = new Set([23, 25, 108, 110]); // align quote lines (a-lign structure requested) + "scroll or pick" hint (section is pinned)
const fixes = JSON.parse(readFileSync('research/ai-slop-copy-fixes.json', 'utf8'));
const files = {};
let ok = 0, skipped = [];
fixes.forEach((f, i) => {
  if (SKIP.has(i)) { skipped.push(`#${i} kept: ${f.key}`); return; }
  const src = (files[f.file] ??= readFileSync(f.file, 'utf8'));
  const n = src.split(f.find).length - 1;
  if (n !== 1) { skipped.push(`#${i} drifted (${n}x): ${f.file} ${f.key}`); return; }
  files[f.file] = src.replace(f.find, () => f.replace); ok++;
});
for (const [p, t] of Object.entries(files)) writeFileSync(p, t);
console.log(`applied ${ok}`); console.log(skipped.join('\n'));
