import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
for (const lang of ['en/', '']) {
  const t = lang ? 'en' : 'ar';
  const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
  await p.goto('http://localhost:4321/' + lang, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  const to = async (y) => { await p.evaluate(y => window.innoLenis.scrollTo(y, { immediate: true, force: true }), y); await p.waitForTimeout(1800); };
  const sx = await p.evaluate(() => document.querySelector('[data-sectors]').getBoundingClientRect().top + scrollY);
  await to(sx + 768 * 0.32 * 2 + 5);
  await p.locator('.sx-left').screenshot({ path: `.shots/sxl-${t}.png` });
  const card = p.locator('.cta-card');
  await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  await card.screenshot({ path: `.shots/glow0-${t}.png` });
  await card.hover({ position: { x: 300, y: 60 } }); await p.waitForTimeout(1600);
  await card.screenshot({ path: `.shots/glow1-${t}.png` });
  await p.close();
}
await b.close();
