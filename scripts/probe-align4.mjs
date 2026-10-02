import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.a-lign.studio/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
await p.mouse.move(720, 450);
for (let i = 0; i < 10; i++) { await p.mouse.wheel(0, 91); await p.waitForTimeout(120); }
const t0 = Date.now(); const log = [];
for (let i = 0; i < 24; i++) {
  const st = await p.evaluate(() => ({ top: Math.round(document.querySelector('.positioning_wrap').getBoundingClientRect().top), w: [...document.querySelectorAll('.positioning_quote_word')].map(w => Math.round(w.getBoundingClientRect().left)).join(',') }));
  log.push(`${Date.now() - t0}ms top:${st.top} ${st.w}`);
  if (i % 3 === 0) await p.screenshot({ path: `.shots/align-t${String(i).padStart(2, '0')}.png`, clip: { x: 300, y: 0, width: 840, height: 900 } });
  await p.waitForTimeout(160);
}
console.log(log.join('\n'));
await b.close();
