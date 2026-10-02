// Lists sections taller than the viewport. Pinned sections are measured by
// their pinned stage; the stacked-services section is checked card by card.
// node scripts/heights.mjs [width] [pages...]
import { chromium } from 'playwright';
const [, , w = '1440', ...pagesArg] = process.argv;
const [width, height] = w.includes('x') ? w.split('x').map(Number) : [+w, +w < 700 ? 812 : 900];
const pages = pagesArg.length ? pagesArg : ['index.html', 'services/eta-e-invoice.html', 'services/erpnext.html', 'sectors/paints.html', 'services/index.html', 'sectors/index.html', 'pricing.html', 'how-we-work.html', 'about.html', 'clients.html', 'integrations.html', 'contact.html', 'faq.html', 'resources.html', 'careers.html', 'careers/b2b-sales-specialist.html'];
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const p = await b.newPage({ viewport: { width, height } });
for (const path of pages) {
  await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  const res = await p.evaluate((H) => {
    const out = [];
    const secs = [...document.querySelectorAll('main > section, main > .pin-spacer > section, main > div.container, footer.site-footer')];
    secs.forEach(s => {
      let el = s, label = (s.className || s.tagName).toString().split(' ').slice(0, 2).join('.');
      if (s.matches('.services-sec') || s.querySelector('[data-stack]')) {
        document.querySelectorAll('.stack-card').forEach((c, i) => { const h = c.getBoundingClientRect().height; if (h > H + 2) out.push(`stack-card#${i} ${Math.round(h)}`); });
        return;
      }
      const pin = s.querySelector('.stats-pin, .sx-pin, .journey-pin');
      if (pin) el = pin;
      const h = el.getBoundingClientRect().height;
      if (h > H + 2) out.push(`${label} ${Math.round(h)}`);
    });
    return out;
  }, height);
  console.log(`${path}: ${res.length ? res.join(' | ') : 'ok'}`);
}
await b.close();
