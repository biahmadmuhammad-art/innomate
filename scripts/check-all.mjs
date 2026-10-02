import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const pages = JSON.parse(readFileSync('docs/content.json', 'utf8')).pages.map(p => p.path);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const bad = [];
for (const w of [390, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 850 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  for (const path of pages) {
    errs.length = 0;
    await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(250);
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w + 1 || errs.length) bad.push({ w, path, sw, errs: errs.slice(0, 2) });
  }
  await p.close();
}
console.log(bad.length ? JSON.stringify(bad, null, 1) : 'all ' + pages.length + ' pages clean at 390 and 1440');
await b.close();
