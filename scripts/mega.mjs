import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/' + (process.argv[2] || 'index.html') + '', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const btns = await page.$$('[data-mega-trigger]');
for (const [i, b] of btns.entries()) {
  await b.click(); await page.waitForTimeout(900);
  if (i === 0) { await page.hover('.mega-link[data-preview="eta-e-invoice"]'); await page.waitForTimeout(3200); }
  if (i === 1) { await page.hover('.sector-tile[data-sector="pharma"]'); await page.waitForTimeout(900); }
  await page.screenshot({ path: `.shots/mega-${(process.argv[2]||"").startsWith("en")?"en-":""}${i}.png` });
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
}
await browser.close();
