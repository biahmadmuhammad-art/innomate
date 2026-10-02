// node scripts/sec-shot.mjs WxH out path:selector[:nth] ...  — element screenshots of sections
import { chromium } from 'playwright';
const [, , size, out, ...items] = process.argv;
const [W, H] = size.split('x').map(Number);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: W, height: H } });
let k = 0;
for (const it of items) {
  const [path, sel, nth = '0'] = it.split('|');
  await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
  const el = p.locator(sel).nth(+nth);
  await el.scrollIntoViewIfNeeded();
  for (let y = 0; y < 6; y++) { await p.mouse.wheel(0, 1); }
  await p.evaluate(() => document.querySelectorAll('[data-reveal], .rv-h').forEach(e => e.classList.add('is-in')));
  await p.waitForTimeout(1400);
  await el.screenshot({ path: `${out}-${k++}.png` });
}
await b.close();
