import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.a-lign.studio/', { waitUntil: 'networkidle' });
await p.waitForTimeout(3000);
const info = await p.evaluate(() => {
  const all = [...document.querySelectorAll('body *')];
  const w = all.find(e => e.children.length === 0 && e.textContent.trim() === 'deserve');
  if (!w) return { err: 'not found' };
  let sec = w; const chain = [];
  for (let i = 0; i < 12 && sec; i++) { const cs = getComputedStyle(sec); const r = sec.getBoundingClientRect(); chain.push({ tag: sec.tagName, cls: String(sec.className).slice(0, 60), pos: cs.position, h: Math.round(r.height), w: Math.round(r.width), top: Math.round(r.top + scrollY), disp: cs.display, bg: cs.backgroundColor, color: cs.color }); sec = sec.parentElement; }
  const cs = getComputedStyle(w);
  return { chain, font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing, color: cs.color, opacity: cs.opacity, transform: cs.transform, text: w.parentElement.parentElement.innerText.slice(0, 300) };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
