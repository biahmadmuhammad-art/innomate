import { chromium } from 'playwright';
const [, , size, path, sel, nth = '0'] = process.argv;
const [W, H] = size.split('x').map(Number);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.goto('http://localhost:4321/' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
console.log(await p.evaluate(([sel, nth]) => {
  const s = document.querySelectorAll(sel)[+nth];
  const walk = (e, d) => d > 3 ? [] : [...e.children].flatMap(c => [`${'  '.repeat(d)}${c.tagName.toLowerCase()}.${[...c.classList].join('.')} ${Math.round(c.getBoundingClientRect().height)}`, ...(c.getBoundingClientRect().height > 150 ? walk(c, d + 1) : [])]);
  const cs = getComputedStyle(s);
  return [`section ${Math.round(s.getBoundingClientRect().height)} pad ${cs.paddingTop} ${cs.paddingBottom}`, ...walk(s, 0)].join('\n');
}, [sel, nth]));
await b.close();
