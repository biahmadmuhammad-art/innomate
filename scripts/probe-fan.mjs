import { chromium } from 'playwright';
const [, , path = 'en/services/warehouse-management.html', sel = '.fan', tag = 'fan'] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 800 } });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(1000);
const top = await p.evaluate(s => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
const shots = [];
for (const [k, f] of [[0, 0.95], [1, 0.75], [2, 0.55], [3, 0.3]]) {
  await p.evaluate(y => window.innoLenis.scrollTo(y, { immediate: true, force: true }), top - 800 * f);
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `.shots/${tag}-${k}.png` });
}
console.log(JSON.stringify(errs));
await b.close();
