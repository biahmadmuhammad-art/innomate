import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 390, height: 812 } });
await p.goto('http://localhost:4321/en/', { waitUntil: 'networkidle' });
await p.locator('.sx-pin').scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
console.log(await p.evaluate(() => {
  const m = document.querySelector('.sx-media'), n = document.querySelector('.sx-name'), btn = document.querySelector('.sx-btn');
  const r = (e) => { const b = e.getBoundingClientRect(); return `${Math.round(b.width)}x${Math.round(b.height)}@${Math.round(b.top)}`; };
  return { media: r(m), mediaCls: m.className, mediaCS: getComputedStyle(m).display + ' ' + getComputedStyle(m).inlineSize, name: r(n), btn: r(btn), btnGrid: getComputedStyle(btn).gridTemplateColumns, right: r(document.querySelector('.sx-right')) };
}));
await b.close();
