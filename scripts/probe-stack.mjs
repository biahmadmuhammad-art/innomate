import { chromium } from 'playwright';
const [, , size = '1280x720', lang = 'en/', tag = 'st'] = process.argv;
const [W, H] = size.split('x').map(Number);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.goto('http://localhost:4321/' + lang, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
const cards = await p.evaluate(() => [...document.querySelectorAll('.stack-card')].map(c => c.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(c).top)));
const out = [];
for (let i = 0; i < cards.length; i++) {
  await p.evaluate(y => window.innoLenis.scrollTo(y, { immediate: true, force: true }), cards[i] + 2);
  await p.waitForTimeout(900);
  out.push(await p.evaluate((i) => { const c = document.querySelectorAll('.stack-card-inner')[i].getBoundingClientRect(); const h = document.querySelector('.services-head').getBoundingClientRect(); return `card${i} top ${Math.round(c.top)} bottom ${Math.round(c.bottom)} (vh ${innerHeight}) head ${Math.round(h.top)}-${Math.round(h.bottom)}`; }, i));
  await p.screenshot({ path: `.shots/${tag}-${i}.png` });
}
console.log(out.join('\n'));
await b.close();
