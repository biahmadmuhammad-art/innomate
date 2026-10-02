import { chromium } from 'playwright';
const b = await chromium.launch();
const out = [];
for (const [path, tag] of [['en/services/warehouse-management.html', 'en'], ['services/warehouse-management.html', 'ar']]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  await p.mouse.move(700, 600);
  await p.mouse.wheel(0, 900); await p.waitForTimeout(1600);
  await p.screenshot({ path: `.shots/hdr-${tag}-compact.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  await p.mouse.wheel(0, -300); await p.waitForTimeout(1600);
  await p.screenshot({ path: `.shots/hdr-${tag}-open.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  const btn = p.locator('[aria-controls=mega-solutions]'); await btn.hover(); await p.waitForTimeout(250);
  await p.screenshot({ path: `.shots/hdr-${tag}-mega-mid.png` });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `.shots/hdr-${tag}-mega.png` });
  out.push({ tag, errs });
  await p.close();
}
const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
await p.goto('http://localhost:4321/en/', { waitUntil: 'networkidle' });
for (let i = 0; i < 3; i++) { await p.waitForTimeout(i ? 1400 : 3200); await p.screenshot({ path: `.shots/hero-word-${i}.png`, clip: { x: 0, y: 150, width: 760, height: 380 } }); }
console.log(JSON.stringify(out));
await b.close();
