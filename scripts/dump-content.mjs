// Dumps content + built page metadata to docs/content.json for the sources workbook.
import { writeFileSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { services } from '../src/content/ar/services.mjs';
import { sectors } from '../src/content/ar/sectors.mjs';
import { services as enServices } from '../src/content/en/services.mjs';
const walk = (d) => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? (f === 'assets' ? [] : walk(p)) : p.endsWith('.html') ? [p] : []; });
const pages = walk('site').map(p => {
  const s = readFileSync(p, 'utf8');
  const g = (re) => (s.match(re) || [, ''])[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return { path: p.split('\\').join('/').replace(/^site\//, ''), title: g(/<title>(.*?)<\/title>/), desc: g(/name="description" content="([^"]*)"/), h1: g(/<h1[^>]*>([\s\S]*?)<\/h1>/), schema: [...s.matchAll(/"@type":("?\[?[^,]*)/g)].map(m => m[1].replace(/[\["]/g, '')).filter((v, i, a) => a.indexOf(v) === i).join(', ') };
});
writeFileSync('docs/content.json', JSON.stringify({ services: services.map(s => ({ slug: s.slug, name: s.name, kw: s.kw, title: s.title, enKw: enServices.find(e => e.slug === s.slug).kw })), sectors: sectors.map(s => ({ slug: s.slug, name: s.name, title: s.title })), pages }, null, 1));
console.log(pages.length, 'pages dumped');
