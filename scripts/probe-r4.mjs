import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errs = [];
const page = async (path, W = 1366, H = 768) => { const p = await b.newPage({ viewport: { width: W, height: H } }); p.on('pageerror', e => errs.push(path + ' ' + e.message)); await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(900); return p; };
const to = async (p, sel) => { const y = await p.evaluate(s => document.querySelector(s).getBoundingClientRect().top + scrollY, sel); await p.evaluate(y => window.innoLenis.scrollTo(y, { immediate: true, force: true }), y); await p.waitForTimeout(1500); };
for (const lang of ['en/', '']) {
  const t = lang ? 'en' : 'ar';
  const p = await page(lang);
  await to(p, '.why-sec');
  const c = await p.evaluate(() => { const r = document.querySelector('.why-card:nth-child(2)').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.bottom - 4 }; });
  await p.mouse.move(c.x, c.y, { steps: 4 }); await p.waitForTimeout(1200);
  // pointer sits 4px above the bottom edge: the card must stay lifted, not flicker
  const lifted = await p.evaluate(() => getComputedStyle(document.querySelector('.why-card:nth-child(2) .why-in')).translate);
  await p.screenshot({ path: `.shots/r4-why-${t}.png` });
  await to(p, '.testi');
  await p.mouse.move(5, 5); await p.waitForTimeout(400);
  await p.screenshot({ path: `.shots/r4-testi-${t}.png` });
  await p.locator('[data-tt="2"]').click(); await p.waitForTimeout(1300);
  await p.mouse.move(5, 5);
  await p.screenshot({ path: `.shots/r4-testi2-${t}.png` });
  await p.evaluate(() => window.innoLenis.scrollTo(document.documentElement.scrollHeight, { immediate: true, force: true })); await p.waitForTimeout(1200);
  await p.screenshot({ path: `.shots/r4-foot-${t}.png` });
  console.log(t, 'why lifted:', lifted);
  await p.close();
  const h = await page(lang + 'how-we-work.html');
  const top = await h.evaluate(() => document.querySelector('.journey--phases').getBoundingClientRect().top + scrollY);
  for (const [k, f] of [[0, 0], [1, 0.5], [2, 1]]) {
    const end = await h.evaluate(() => { const t = document.querySelector('.journey--phases [data-journey-track]'); return t.scrollWidth - innerWidth; });
    await h.evaluate(y => window.innoLenis.scrollTo(y, { immediate: true, force: true }), top + end * f + 2); await h.waitForTimeout(1800);
    await h.screenshot({ path: `.shots/r4-how-${t}-${k}.png` });
  }
  await h.close();
}
console.log(JSON.stringify(errs));
await b.close();
