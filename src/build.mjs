// Static build: writes every page in both languages to /site (Arabic at the
// root, English under /en/), plus sitemap, robots, llms.txt and icon SVGs.
// Run: npm run build
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, breadcrumbSchema, faqSchema } from './templates/layout.mjs';
import { buildMocks } from './templates/mocks.mjs';
import { homePage, homeFaq } from './templates/home.mjs';
import * as P from './templates/pages.mjs';
import { L, setLocale, langs } from './content/locale.mjs';
import { icons } from './content/icons.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
// DRAFTS=1 npm run build → also render placeholder blocks (team, case studies, design notes)
globalThis.DRAFTS = process.env.DRAFTS === '1';
const built = [];   // { lang, path, title, desc }

// Western digits everywhere (data, prices, phone numbers read the same way)
const westernDigits = (html) => html.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

const make = (path, opts, mocks) => {
  const r = '../'.repeat(path.split('/').length - 1);
  const html = page({ r, path, mocks, ...opts, body: opts.body(r) });
  const file = join(root, L.base, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, westernDigits(html), 'utf8');
  built.push({ lang: L.lang, path, title: opts.title, desc: opts.desc });
};

for (const lang of langs) {
  setLocale(lang);
  const mocks = buildMocks();
  const { t, services, sectors, jobs, faqs, company } = L;
  const m = t.meta;
  const svcUrl = (slug) => `${company.url}/${L.base}services/${slug}.html`;

  /* ---- home ---- */
  make('index.html', {
    title: m.home[0], desc: m.home[1], bodyClass: 'is-home', body: r => homePage(r, mocks),
    schema: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Innomate', url: company.url + '/' + L.base, inLanguage: lang === 'ar' ? 'ar-EG' : 'en' }, faqSchema(homeFaq())],
    scripts: ['home.js'], modules: ['orbit3d.js', 'live3d.js'],
  }, mocks);

  /* ---- services ---- */
  make('services/index.html', {
    title: m.services[0], desc: m.services[1], active: 'services', bodyClass: 'services-hub', body: r => P.servicesHub(r, mocks),
    schema: [breadcrumbSchema([{ name: t.nav.solutions, path: 'services/index.html' }])],
  }, mocks);
  for (const s of services) {
    make(`services/${s.slug}.html`, {
      title: s.title, desc: s.desc, active: 'services', body: r => P.servicePage(r, s, mocks),
      schema: [
        { '@context': 'https://schema.org', '@type': 'Service', name: s.name, alternateName: s.nameEn, serviceType: s.nameEn, description: s.definition, provider: { '@id': company.url + '/#org' }, areaServed: 'EG', url: svcUrl(s.slug) },
        faqSchema(s.faq),
        breadcrumbSchema([{ name: t.nav.solutions, path: 'services/index.html' }, { name: s.short, path: `services/${s.slug}.html` }]),
      ],
    }, mocks);
  }

  /* ---- sectors ---- */
  make('sectors/index.html', {
    title: m.sectors[0], desc: m.sectors[1], active: 'sectors', bodyClass: 'sectors-hub', body: r => P.sectorsHub(r),
    schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: t.nav.sectors, hasPart: sectors.map(s => ({ '@type': 'WebPage', name: s.h1, url: `${company.url}/${L.base}sectors/${s.slug}.html` })) }],
  }, mocks);
  for (const s of sectors) {
    make(`sectors/${s.slug}.html`, {
      title: s.title, desc: s.desc, active: 'sectors', body: r => P.sectorPage(r, s),
      schema: [faqSchema(s.faq), breadcrumbSchema([{ name: t.nav.sectors, path: 'sectors/index.html' }, { name: s.short, path: `sectors/${s.slug}.html` }])],
    }, mocks);
  }

  /* ---- company & utility pages ---- */
  const simple = [
    ['integrations.html', 'integrations', 'integrations', P.integrationsPage],
    ['pricing.html', 'pricing', 'pricing', P.pricingPage],
    ['how-we-work.html', 'how', 'company', P.howPage],
    ['about.html', 'about', 'company', P.aboutPage],
    ['clients.html', 'clients', 'clients', P.clientsPage],
    ['careers.html', 'careers', 'company', P.careersPage],
    ['resources.html', 'resources', 'company', P.resourcesPage],
    ['faq.html', 'faq', 'company', P.faqPage],
    ['contact.html', 'contact', '', P.contactPage],
  ];
  for (const [path, key, active, fn] of simple) {
    const extra = key === 'faq' ? [faqSchema(faqs.map(f => [f.q, f.a]))] : key === 'contact' ? [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: m.contactSchema }] : [];
    make(path, { title: m[key][0], desc: m[key][1], active, body: r => fn(r), schema: extra }, mocks);
  }
  for (const j of jobs) {
    const [title, desc] = m.job(j);
    make(`careers/${j.slug}.html`, {
      title, desc, active: 'company', body: r => P.jobPage(r, j),
      schema: [{ '@context': 'https://schema.org', '@type': 'JobPosting', title: j.titleEn, description: j.summary, employmentType: 'FULL_TIME', hiringOrganization: { '@id': company.url + '/#org', name: 'Innomate' }, jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: '10th of Ramadan City', addressCountry: 'EG' } }, datePosted: '2026-09-08' }],
    }, mocks);
  }
  make('404.html', { title: m.notFound[0], desc: m.notFound[1], body: r => P.notFoundPage(r) }, mocks);
}

/* ---- icons as files (for Elementor uploads) ---- */
mkdirSync(join(root, 'assets/img/icons'), { recursive: true });
for (const [k, v] of Object.entries(icons)) {
  writeFileSync(join(root, `assets/img/icons/${k}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2b7bbd" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${v}</svg>\n`);
}

/* ---- sitemap (both languages, with hreflang alternates), robots, llms ---- */
setLocale('en');
const { company, services, sectors } = L;
const loc = (lang, path) => `${company.url}/${lang === 'en' ? 'en/' : ''}${path}`.replace(/\/index\.html$/, '/');
const paths = [...new Set(built.filter(p => p.path !== '404.html').map(p => p.path))];
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.flatMap(p => ['ar', 'en'].map(lang => `  <url><loc>${loc(lang, p)}</loc><lastmod>2026-09-30</lastmod><xhtml:link rel="alternate" hreflang="ar-EG" href="${loc('ar', p)}"/><xhtml:link rel="alternate" hreflang="en" href="${loc('en', p)}"/></url>`)).join('\n')}
</urlset>
`);
writeFileSync(join(root, 'robots.txt'), `User-agent: *
Allow: /

# AI search crawlers are welcome
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${company.url}/sitemap.xml
`);
writeFileSync(join(root, 'llms.txt'), `# Innomate (إنوميت)

> Innomate is an Egyptian ERPNext implementation partner based in 10th of Ramadan City, Sharqia, Egypt. It implements ERPNext (open-source ERP by Frappe) and integrates it with the Egyptian Tax Authority's e-invoice and e-receipt systems (ETA), ZKTeco biometric attendance devices, Power BI, WhatsApp and IoT sensors, and builds AI agents that work inside ERPNext with human approval. The site is published in Arabic (root) and English (/en/).

- Contact: ${company.email} · ${company.phone} · WhatsApp ${company.whatsapp}
- Address: ${company.address}
- Implementation time: typically 4–12 weeks depending on scope (company's stated range)
- Languages: Arabic, English

## Services
${services.map(s => `- [${s.name}](${company.url}/en/services/${s.slug}.html): ${s.definition}`).join('\n')}

## Sectors
${sectors.map(s => `- [${s.h1}](${company.url}/en/sectors/${s.slug}.html)`).join('\n')}

## Key pages
- [Pricing and implementation cost](${company.url}/en/pricing.html)
- [Implementation methodology](${company.url}/en/how-we-work.html)
- [Integrations](${company.url}/en/integrations.html)
- [FAQ](${company.url}/en/faq.html)
- [Contact](${company.url}/en/contact.html)
- [Arabic version](${company.url}/)

## Official references
- Egyptian Tax Authority: https://www.eta.gov.eg
- ERPNext: https://frappe.io/erpnext
`);

console.log(`Built ${built.length} pages (${langs.join(' + ')}) → site/`);
