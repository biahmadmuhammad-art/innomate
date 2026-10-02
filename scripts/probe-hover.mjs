import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('http://localhost:4321/en/about.html', { waitUntil: 'networkidle' });
const sc = async (sel, name, hover = true) => {
  const el = p.locator(sel).first();
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  if (hover) { await el.hover(); await p.waitForTimeout(1000); }
  const box = { x: 0, y: 0, width: 1440, height: 800 };
  await p.screenshot({ path: `.shots/${name}.png`, clip: box });
};
await sc('.stat-card:nth-child(2)', 'hv-stats');
await sc('.value:nth-child(1)', 'hv-values');
await sc('.cta-card', 'hv-cta');
console.log(JSON.stringify(errs));
await b.close();
