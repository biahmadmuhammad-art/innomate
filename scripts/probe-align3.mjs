import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.a-lign.studio/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
await p.mouse.move(720, 450);
const rows = [];
for (let i = 0; i < 26; i++) {
  await p.mouse.wheel(0, 90);
  await p.waitForTimeout(260);
  const st = await p.evaluate(() => {
    const sec = document.querySelector('.positioning_wrap');
    const words = [...document.querySelectorAll('.positioning_quote_word')].map(w => { const r = w.getBoundingClientRect(); return Math.round(r.left); });
    const lines = [...document.querySelectorAll('.positioning_quote_line')].map(l => getComputedStyle(l).justifyContent + '/' + getComputedStyle(l).columnGap);
    const col = getComputedStyle(document.querySelectorAll('.positioning_quote_word')[3]).color;
    const bars = [...document.querySelectorAll('.positioning_svg_wrap *')].slice(0, 3).map(e => getComputedStyle(e).transform).join('|');
    return { y: Math.round(scrollY), secTop: Math.round(sec.getBoundingClientRect().top), words: words.join(','), lines: lines.join(' '), col, bars: bars.slice(0, 80) };
  });
  rows.push(st);
  if ([4, 8, 12, 16, 20].includes(i)) await p.screenshot({ path: `.shots/align-w${i}.png` });
}
console.log(rows.map(r => `${r.y} top:${r.secTop} col:${r.col} | ${r.words} | ${r.lines}`).join('\n'));
const css = await p.evaluate(() => { const w = document.querySelector('.positioning_quote_word'); const l = w.parentElement; const s = getComputedStyle(l); return { lineGap: s.gap, lineW: l.getBoundingClientRect().width, wrapGap: getComputedStyle(l.parentElement).gap, wordTransition: getComputedStyle(w).transition, lineTransition: s.transition }; });
console.log(JSON.stringify(css));
await b.close();
