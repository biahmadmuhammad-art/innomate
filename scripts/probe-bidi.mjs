// Checks that phone numbers inside Arabic text keep their LTR order on screen.
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const rows = await p.evaluate(() => [...document.querySelectorAll('.ltr')].map(el => {
  const t = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.includes('+20'));
  if (!t) return null;
  const s = t.textContent;
  const left = (i, n) => { const r = document.createRange(); r.setStart(t, i); r.setEnd(t, i + n); return Math.round(r.getBoundingClientRect().left); };
  const i = s.indexOf('+20'), plus = left(i, 1), two = left(i + 1, 1), a = left(i, 3), z = left(s.indexOf('2760'), 4);
  return `${el.parentElement.className || el.parentElement.tagName}: +@${plus} 2@${two} 2760@${z} ${plus < two && a < z ? 'OK' : 'REVERSED'}`;
}).filter(Boolean));
console.log(rows.join('\n'));
await b.close();
