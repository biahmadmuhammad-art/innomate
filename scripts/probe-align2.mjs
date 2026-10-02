import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.a-lign.studio/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const grid = await p.evaluate(() => {
  const g = document.querySelector('.positioning_layout');
  const kids = [...g.children].map(k => ({ cls: String(k.className), txt: k.innerText.slice(0, 120), r: (({ left, top, width, height }) => ({ left: Math.round(left), top: Math.round(top + scrollY), width: Math.round(width), height: Math.round(height) }))(k.getBoundingClientRect()) }));
  const lines = [...document.querySelectorAll('.positioning_quote_line')].map(l => l.innerText.replace(/\n/g, ' '));
  const sec = document.querySelector('.positioning_wrap');
  const others = [...sec.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() && !e.closest('.positioning_quote_wrap')).map(e => e.className + ': ' + e.textContent.trim().slice(0, 80));
  return { kids, lines, others, gridCols: getComputedStyle(g).gridTemplateColumns };
});
console.log(JSON.stringify(grid, null, 1));
const out = [];
for (const y of [300, 500, 700, 900, 1100, 1300, 1500]) {
  await p.mouse.wheel(0, 0);
  await p.evaluate(y => window.scrollTo(0, y), y);
  await p.waitForTimeout(700);
  const cols = await p.evaluate(() => [...document.querySelectorAll('.positioning_quote_word')].map(w => { const c = getComputedStyle(w); return c.color.replace(/rgb\((\d+), \d+, \d+\)/, '$1') + (c.opacity !== '1' ? '/o' + c.opacity : '') + (c.transform !== 'none' && c.transform !== 'matrix(1, 0, 0, 1, 0, 0)' ? '/t' : ''); }).join(' '));
  const secTop = await p.evaluate(() => Math.round(document.querySelector('.positioning_wrap').getBoundingClientRect().top));
  out.push({ y, secTop, cols });
  await p.screenshot({ path: `.shots/align-${y}.png` });
}
console.log(JSON.stringify(out, null, 1));
await b.close();
