// Walk a page section by section at a given size and screenshot each one.
// node scripts/walk.mjs WxH path outPrefix
import { chromium } from 'playwright';
const [, , size, path, out] = process.argv;
const [W, H] = size.split('x').map(Number);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: W, height: H } });
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
const tops = await p.evaluate(() => [...document.querySelectorAll('main > section, main > .pin-spacer > section, main > div.container')].map(s => s.getBoundingClientRect().top + scrollY));
let k = 0;
for (const y of tops) {
  await p.evaluate(y => window.innoLenis ? window.innoLenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y), y);
  await p.waitForTimeout(1700);
  await p.screenshot({ path: `${out}-${String(k++).padStart(2, '0')}.png` });
}
console.log(JSON.stringify({ n: k, errs }));
await b.close();
