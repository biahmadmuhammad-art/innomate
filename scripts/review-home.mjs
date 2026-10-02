import { chromium } from 'playwright';
const lang = process.argv[2] === 'en' ? 'en/' : '';
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(`http://localhost:4321/${lang}index.html`, { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const go = async (sel, extra = 0, wait = 1600) => {
  await p.evaluate(([sel, extra]) => { const el = document.querySelector(sel); const y = el.getBoundingClientRect().top + scrollY + extra; window.innoLenis.scrollTo(y, { immediate: true, force: true }); }, [sel, extra]);
  await p.waitForTimeout(wait);
};
await go('[data-align]', 0, 3800); await p.screenshot({ path: `.shots/rv-${lang ? 'en-' : ''}align.png` });
await go('[data-stats]', 0, 1400); await p.screenshot({ path: `.shots/rv-${lang ? 'en-' : ''}stats0.png` });
await go('[data-stats]', 900 * 0.75 * 1.5, 1600); await p.screenshot({ path: `.shots/rv-${lang ? 'en-' : ''}stats2.png` });
await go('[data-sectors]', 0, 1400); await p.screenshot({ path: `.shots/rv-${lang ? 'en-' : ''}sx0.png` });
await go('[data-sectors]', 900 * 0.32 * 4, 1600); await p.screenshot({ path: `.shots/rv-${lang ? 'en-' : ''}sx4.png` });
await go('#integrations', 0, 2500); await p.screenshot({ path: `.shots/rv-${lang ? 'en-' : ''}integ.png` });
console.log(JSON.stringify(errs));
await b.close();
