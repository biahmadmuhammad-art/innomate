// Viewport-slice screenshots for review.
// node scripts/shots.mjs <path> <width> <outPrefix> [slices] [--full]
import { chromium } from 'playwright';
const [, , path = '/', w = '1440', out = 'shot', slices = '8', ...flags] = process.argv;
const width = +w, height = width < 700 ? 812 : 900;
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const browser2 = browser;
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: flags.includes('--reduce') ? 'reduce' : 'no-preference' });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto('http://localhost:4321/' + path.replace(/^\/+/, ''), { waitUntil: 'networkidle' });
await page.waitForTimeout(2600);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
if (flags.includes('--full')) {
  // pre-scroll to trigger reveals, then full-page
  for (let y = 0; y < total; y += 500) { await page.evaluate(y => window.innoLenis ? window.innoLenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y), y); await page.waitForTimeout(120); }
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}-full.png`, fullPage: true });
} else {
  const n = +slices;
  for (let i = 0; i < n; i++) {
    const y = Math.round((total - height) * (i / Math.max(n - 1, 1)));
    await page.evaluate(y => window.innoLenis ? window.innoLenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y), y);
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `${out}-${String(i).padStart(2, '0')}.png` });
  }
}
console.log(JSON.stringify({ total, errors }));
await browser.close();
