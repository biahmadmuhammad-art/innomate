// UI audit probes for one page: length in screens (pins included), per-section
// scroll cost, text contrast, tap targets, headings, names, and payload.
// node scripts/audit-ui.mjs [path] [WxH]
import { chromium } from 'playwright';
const [, , path = 'en/', size = '1440x900'] = process.argv;
const [W, H] = size.split('x').map(Number);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport: { width: W, height: H }, hasTouch: W < 700 });
const p = await ctx.newPage();
const bytes = { js: 0, css: 0, img: 0, font: 0, other: 0 };
p.on('response', async r => {
  try {
    const t = r.request().resourceType(); const len = +(r.headers()['content-length'] || (await r.body()).length);
    bytes[t === 'script' ? 'js' : t === 'stylesheet' ? 'css' : t === 'image' ? 'img' : t === 'font' ? 'font' : 'other'] += len;
  } catch {}
});
await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
// visit the whole page so lazy things load and pins measure
const total = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += H) { await p.evaluate(y => window.innoLenis ? window.innoLenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y), y); await p.waitForTimeout(150); }
await p.evaluate(() => window.innoLenis ? window.innoLenis.scrollTo(0, { immediate: true, force: true }) : scrollTo(0, 0));
await p.waitForTimeout(600);
const r = await p.evaluate(({ H }) => {
  const out = {};
  const doc = document.documentElement.scrollHeight;
  out.screens = +(doc / H).toFixed(1);
  // per-section scroll cost: the section (or its pin-spacer) height in screens
  out.sections = [...document.querySelectorAll('main > section, main > .pin-spacer')].map(s => {
    const sec = s.matches('.pin-spacer') ? s.firstElementChild : s;
    const name = (sec.querySelector('h1, h2')?.textContent || sec.getAttribute('aria-label') || sec.className).trim().replace(/\s+/g, ' ').slice(0, 42);
    return [name, +(s.getBoundingClientRect().height / H).toFixed(2)];
  });
  // contrast
  const lum = (c) => { const [r, g, b] = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
  const rgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);
  const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const cs = getComputedStyle(e); const c = rgb(cs.backgroundColor); if (cs.backgroundImage !== 'none' && !cs.backgroundImage.startsWith('url')) return null; if (c.length && (c[3] === undefined || c[3] > .9)) return c.slice(0, 3); } return [255, 255, 255]; };
  const bad = [];
  const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode; const el = t.parentElement;
    if (!t.textContent.trim() || seen.has(el)) continue; seen.add(el);
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || +cs.opacity === 0 || el.closest('[aria-hidden="true"], .visually-hidden, .mock')) continue;
    const r = el.getBoundingClientRect(); if (!r.width) continue;
    const bg = bgOf(el); if (!bg) continue;
    const fg = rgb(cs.color); if (fg[3] !== undefined && fg[3] < 1) { fg[0] = fg[0] * fg[3] + bg[0] * (1 - fg[3]); fg[1] = fg[1] * fg[3] + bg[1] * (1 - fg[3]); fg[2] = fg[2] * fg[3] + bg[2] * (1 - fg[3]); }
    const L1 = lum(fg.slice(0, 3)), L2 = lum(bg); const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
    const px = parseFloat(cs.fontSize), large = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700);
    if (ratio < (large ? 3 : 4.5)) bad.push(`${ratio.toFixed(2)} ${Math.round(px)}px "${t.textContent.trim().slice(0, 30)}" .${[...el.classList].join('.')}`);
  }
  out.contrast = bad;
  // tap targets
  out.smallTargets = [...document.querySelectorAll('a, button, input, summary, [role=tab]')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width && cs.visibility !== 'hidden' && (r.width < 44 || r.height < 44) && !e.closest('.mega, [hidden], .mobile-menu'); }).map(e => `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)} ${e.tagName.toLowerCase()}.${[...e.classList].slice(0, 2).join('.')} "${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 24)}"`);
  // headings
  const hs = [...document.querySelectorAll('h1, h2, h3, h4')].filter(h => !h.closest('.mega, .mobile-menu')).map(h => +h.tagName[1]);
  out.h1 = hs.filter(x => x === 1).length;
  out.skips = hs.reduce((a, h, i) => (i && h > hs[i - 1] + 1 ? a + 1 : a), 0);
  out.unnamed = [...document.querySelectorAll('a, button')].filter(e => !(e.textContent.trim() || e.getAttribute('aria-label') || e.querySelector('img[alt]:not([alt=""])'))).length;
  out.imgNoAlt = [...document.querySelectorAll('img:not([alt])')].length;
  out.eyebrows = [...document.querySelectorAll('main .eyebrow')].filter(e => e.getBoundingClientRect().width).map(e => e.textContent.trim());
  out.selection = getComputedStyle(document.body, '::selection').backgroundColor;
  out.focusRule = [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.cssText.includes(':focus-visible')); } catch { return false; } });
  out.ctas = [...document.querySelectorAll('main a.btn-primary')].length;
  out.words = document.querySelector('main').innerText.split(/\s+/).length;
  return out;
}, { H });
const perf = await p.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; const lcp = performance.getEntriesByType('largest-contentful-paint').pop(); return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) }; });
console.log(JSON.stringify({ path, size, ...r, kb: Object.fromEntries(Object.entries(bytes).map(([k, v]) => [k, Math.round(v / 1024)])), perf }, null, 1));
await b.close();
