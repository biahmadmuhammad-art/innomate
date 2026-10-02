import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://grigoletti.ch/en/services', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
// find the service cards by their 'Timeline' rows
const cards = await p.evaluate(() => {
  const tl = [...document.querySelectorAll('p,div,span')].filter(e => e.children.length === 0 && e.textContent.trim() === 'Timeline');
  return tl.map(t => { let c = t; for (let i = 0; i < 8; i++) { c = c.parentElement; const r = c.getBoundingClientRect(); if (r.width > 400 && r.height > 500) break; } const r = c.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }; });
});
console.log('cards', JSON.stringify(cards));
const top0 = cards[0] ? cards[0].top : 1000;
const out = [];
for (let k = -6; k <= 10; k++) {
  const y = top0 - 900 + k * 120;
  await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(450);
  const st = await p.evaluate(() => {
    const tl = [...document.querySelectorAll('p,div,span')].filter(e => e.children.length === 0 && e.textContent.trim() === 'Timeline');
    return tl.map(t => { let c = t; for (let i = 0; i < 8; i++) { c = c.parentElement; const r = c.getBoundingClientRect(); if (r.width > 400 && r.height > 500) break; } const r = c.getBoundingClientRect(); const cs = getComputedStyle(c); return `${Math.round(r.left)},${Math.round(r.top)} ${cs.transform === 'none' ? '' : cs.transform.slice(0, 60)}`; }).join(' | ');
  });
  out.push(`${y}: ${st}`);
  if ([-3, 0, 3, 6].includes(k)) await p.screenshot({ path: `.shots/grig-svc-${k + 6}.png` });
}
console.log(out.join('\n'));
await b.close();
