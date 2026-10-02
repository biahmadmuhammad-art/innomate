// Renders PNG assets from the live prototype: each product mock (2x) and the OG image.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('site/assets/img/mocks', { recursive: true }); mkdirSync('site/assets/img/og', { recursive: true });
const b = await chromium.launch();
const LANG = process.argv[2] === 'en' ? 'en' : 'ar';
const PRE = LANG === 'en' ? 'en/' : '';
mkdirSync(`site/assets/img/mocks${LANG === 'en' ? '/en' : ''}`, { recursive: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:4321/' + PRE + 'index.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
// mocks from the mega menu preview stage (one per service), rendered standalone
const slugs = await p.$$eval('[data-shot]', els => els.map(e => e.dataset.shot));
await p.addStyleTag({ content: '#stage{position:fixed;inset:0;z-index:9999;background:#f4f7fa;display:grid;place-items:center} #stage .mock{width:620px;box-shadow:0 30px 60px -20px rgba(14,58,95,.28)}' });
for (const slug of slugs) {
  await p.evaluate((slug) => {
    document.getElementById('stage')?.remove();
    const src = document.querySelector(`[data-shot="${slug}"] .mock`).cloneNode(true);
    src.classList.add('is-in');
    const st = document.createElement('div'); st.id = 'stage'; st.appendChild(src); document.body.appendChild(st);
  }, slug);
  await p.waitForTimeout(3400);
  const el = await p.$('#stage .mock');
  await el.screenshot({ path: `site/assets/img/mocks/${LANG === 'en' ? 'en/' : ''}${slug}.png`, omitBackground: true });
}
// OG image
const og = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await og.goto('http://localhost:4321/' + PRE + 'index.html', { waitUntil: 'networkidle' });
await og.evaluate(() => {
  const en = document.documentElement.lang === 'en';
  const html = `<div id="og" dir="${en ? 'ltr' : 'rtl'}" style="position:fixed;inset:0;z-index:99999;background:#f4f7fa;display:grid;grid-template-columns:1.05fr 1fr;align-items:center;gap:40px;padding:60px 70px;font-family:'Readex Pro',sans-serif;
    background-image:radial-gradient(ellipse 60% 70% at 15% 40%,rgba(102,168,220,.25),transparent 70%),linear-gradient(#dde5ee 1px,transparent 1px),linear-gradient(90deg,#dde5ee 1px,transparent 1px);background-size:auto,48px 48px,48px 48px">
    <div><div style="display:flex;align-items:center;gap:12px;margin-bottom:34px"><svg viewBox="0 0 44 36" width="52"><circle cx="5.5" cy="5.5" r="5.5" fill="#66a8dc"/><rect y="14" width="11" height="22" rx="5.5" fill="#66a8dc"/><rect x="16.5" width="11" height="36" rx="5.5" fill="#388ccc"/><rect x="33" width="11" height="36" rx="5.5" fill="#388ccc"/></svg><b style="font-size:34px;color:#0a1a2b" lang="en">innomate</b></div>
    <div style="font-size:58px;font-weight:700;line-height:${en ? 1.1 : 1.25};color:#0a1a2b">${en ? 'One ERP system<br>that runs <span style="color:#2b7bbd;border-bottom:8px solid #f3a93a">your company</span>' : 'نظام <span lang="en">ERP</span> واحد<br>يدير <span style="color:#2b7bbd;border-bottom:8px solid #f3a93a">شركتك</span>'}</div>
    <div style="margin-top:24px;font-size:24px;color:#52667c;font-family:${en ? "'IBM Plex Sans'" : "'IBM Plex Sans Arabic'"}">${en ? 'ERPNext partner in Egypt · ETA e-invoicing' : 'شريك تطبيق ERPNext في مصر · الفاتورة الإلكترونية'}</div></div>
    <div id="og-mock"></div></div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  const m = document.querySelector('[data-shot="erpnext"] .mock').cloneNode(true); m.classList.add('is-in'); m.style.boxShadow = '0 40px 80px -30px rgba(14,58,95,.35)';
  document.getElementById('og-mock').appendChild(m);
});
await og.waitForTimeout(2200);
await og.screenshot({ path: `site/assets/img/og/og-${LANG === 'en' ? 'en' : 'default'}.png` });
await b.close();
console.log('rendered', slugs.length, 'mocks + og');
