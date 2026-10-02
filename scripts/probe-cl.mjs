import { chromium } from 'playwright';
const W = 1280, H = 720;
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errs = [];
for (const lang of ['en/', '']) {
  const p = await b.newPage({ viewport: { width: W, height: H } });
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
  await p.goto('http://localhost:4321/' + lang, { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
  const to = async (y) => { await p.evaluate(y => window.innoLenis.scrollTo(y, { immediate: true, force: true }), y); await p.waitForTimeout(2000); };
  const sx = await p.evaluate(() => document.querySelector('[data-sectors]').getBoundingClientRect().top + scrollY);
  await to(sx + H * 0.32 * 2 + 5); await p.screenshot({ path: `.shots/cl-sx-${lang ? 'en' : 'ar'}.png` });
  const cl = await p.evaluate(() => document.querySelector('.clients-sec').getBoundingClientRect().top + scrollY);
  await to(cl); await p.mouse.move(640, 400); await p.waitForTimeout(300);
  const row = await p.evaluate(() => { const r = document.querySelectorAll('.cl-row')[2].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.move(row.x, row.y, { steps: 5 }); await p.waitForTimeout(900);
  await p.screenshot({ path: `.shots/cl-list-${lang ? 'en' : 'ar'}.png` });
  await p.close();
}
console.log(JSON.stringify(errs));
await b.close();
