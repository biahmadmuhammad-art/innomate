import { chromium } from 'playwright';
const b = await chromium.launch();
for (const [lang, w, h] of [['en/', 1280, 720], ['', 1280, 720], ['en/', 1440, 900], ['', 390, 812]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto('http://localhost:4321/' + lang, { waitUntil: 'networkidle' });
  const seen = new Set();
  for (let k = 0; k < 26; k++) {
    seen.add(await p.evaluate(() => { const t = document.querySelector('.hero-title').getBoundingClientRect(), l = document.querySelector('.hero-lead').getBoundingClientRect(); return `${Math.round(t.height)}/${Math.round(l.top)}`; }));
    await p.waitForTimeout(600);
  }
  console.log(lang || 'ar', w, [...seen].join(' '));
  await p.close();
}
await b.close();
