import { chromium } from 'playwright';
const path = process.argv[2] || 'index.html', width = +(process.argv[3] || 390);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width, height: 812 } });
await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
const r = await p.evaluate((W) => {
  const out = { docW: document.documentElement.scrollWidth, bodyW: document.body.scrollWidth, main: document.querySelector('main').getBoundingClientRect().width };
  out.bad = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > W + 1 || r.left < -1) && !e.closest('.marquee,.mega,.mobile-menu,svg,.dock'); })
    .slice(0, 15).map(e => `${e.tagName}.${[...e.classList].join('.')} L${Math.round(e.getBoundingClientRect().left)} R${Math.round(e.getBoundingClientRect().right)} W${Math.round(e.getBoundingClientRect().width)}`);
  return out;
}, width);
console.log(JSON.stringify(r, null, 1)); await b.close();
