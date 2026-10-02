// Shared layout: <head>, header + mega menus, mobile menu + dock, footer.
// Every page is rendered through page(). `r` is the relative root of the
// current language ('' at its root, '../' one level down); assets live at the
// site root, which A(r) resolves (English pages sit one folder deeper, /en/).
import { icons, directional } from '../content/icons.mjs';
import { L } from '../content/locale.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const A = (r) => r + (L.base ? '../' : '');

export const ico = (name, cls = '') =>
  `<svg class="ico${directional.has(name) ? ' ico--' + name : ''}${cls ? ' ' + cls : ''}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

export const sprite = () =>
  `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${Object.entries(icons)
    .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('')}</defs></svg>`;

// Wrap Latin product names so they don't flip punctuation inside Arabic text
export const bidi = (s = '') => L.lang !== 'ar' ? s : s.replace(/\b(ERPNext|ZKTeco|Power BI|ETA|IoT|AI|ERP|API|Frappe|HR|BI|Excel|WhatsApp|GS1|EGS|HSM|USB Token|B2B|B2C|QR|FEFO|FIFO|BOM|MQTT|Modbus|OPC UA|SSL|ESG|HACCP|PDF|CRM|KPI)\b/g, '<bdi lang="en">$1</bdi>');

const firstSentence = (s) => esc(s.split(/[.،—]/)[0].trim()) + '.';

export const logoMark = (cls = 'logo-mark') => `
<svg class="${cls}" viewBox="0 0 44 36" aria-hidden="true">
  <circle class="lm-dot" cx="5.5" cy="5.5" r="5.5" fill="#66a8dc"/>
  <rect class="lm-i" x="0" y="14" width="11" height="22" rx="5.5" fill="#66a8dc"/>
  <rect class="lm-p1" x="16.5" y="0" width="11" height="36" rx="5.5" fill="#388ccc"/>
  <rect class="lm-p2" x="33" y="0" width="11" height="36" rx="5.5" fill="#388ccc"/>
</svg>`;

const brand = (r) => `
<a class="brand" href="${r}index.html" aria-label="${L.t.brandLabel}">
  ${logoMark()}
  <span class="brand-word" lang="en">innomate</span>
</a>`;

/* ---------------- Mega menus ---------------- */
// The page you are on is marked in the menus (background + aria-current)
const cur = (on) => on ? ' is-current" aria-current="page' : '';

const megaSolutions = (r, mocks, path) => {
  const { t, serviceBySlug, services } = L;
  const cols = [
    { title: t.megaCols[0], items: ['erpnext', 'hr-payroll', 'warehouse-management', 'business-intelligence'] },
    { title: t.megaCols[1], items: ['eta-e-invoice', 'ai-agents', 'zkteco-attendance', 'iot-integration'] },
    { title: t.megaCols[2], items: ['custom-development', 'cloud-hosting'] },
  ];
  const first = serviceBySlug['erpnext'];
  const f = t.megaFeature;
  return `
<div class="mega mega--solutions" id="mega-solutions" data-mega hidden>
  <div class="mega-inner container">
    <div class="mega-list">
      ${cols.map(c => `
      <div class="mega-group">
        <p class="mega-group-title">${c.title}</p>
        <ul>${c.items.map(slug => { const s = serviceBySlug[slug]; return `
          <li><a class="mega-link${cur(path === `services/${s.slug}.html`)}" href="${r}services/${s.slug}.html" data-preview="${s.slug}" data-lead="${firstSentence(s.lead)}">
            <span class="mega-link-ico">${ico(s.icon)}</span>
            <span class="mega-link-txt"><strong>${bidi(s.short)}</strong><small>${bidi(s.menu)}</small></span>
          </a></li>`; }).join('')}
        </ul>
      </div>`).join('')}
    </div>
    <div class="mega-preview" aria-live="polite">
      <div class="mega-preview-stage">
        ${services.map(s => `<figure class="mega-shot${s.slug === 'erpnext' ? ' is-on' : ''}" data-shot="${s.slug}">${mocks[s.mock] || ''}</figure>`).join('')}
      </div>
      <p class="mega-preview-title" data-preview-title>${bidi(first.short)}</p>
      <p class="mega-preview-desc" data-preview-desc>${firstSentence(first.lead)}</p>
    </div>
    <aside class="mega-feature">
      <p class="mega-feature-title">${f.title}</p>
      <p class="mega-feature-txt">${f.txt}</p>
      <a class="link-arrow" href="${r}services/eta-e-invoice.html">${f.link} ${ico('arrow')}</a>
      <div class="mega-feature-foot">
        <a class="btn btn-dark btn-sm" href="${r}services/index.html">${f.all} ${ico('arrow')}</a>
        <a class="btn btn-ghost btn-sm" href="${r}pricing.html">${f.pricing}</a>
      </div>
    </aside>
  </div>
</div>`;
};

const megaSectors = (r, path) => {
  const { t, sectors, clients } = L, m = t.megaSectors;
  return `
<div class="mega mega--sectors" id="mega-sectors" data-mega hidden>
  <div class="mega-inner container">
    <div class="mega-sectors-grid">
      ${sectors.map(s => `
      <a class="sector-tile${cur(path === `sectors/${s.slug}.html`)}" href="${r}sectors/${s.slug}.html" data-sector="${s.slug}">
        <span class="sector-tile-ico">${ico(s.icon)}</span>
        <span class="sector-tile-name">${s.short}</span>
        ${s.factory ? `<span class="sector-tile-tag">${m.factory}</span>` : ''}
      </a>`).join('')}
      <a class="sector-tile sector-tile--all${cur(path === 'sectors/index.html')}" href="${r}sectors/index.html"><span class="sector-tile-name">${m.allTitle}</span><span class="sector-tile-sub">${m.allSub}</span>${ico('arrow')}</a>
    </div>
    <div class="mega-sector-detail" aria-live="polite">
      ${sectors.map((s, i) => {
        const logos = clients.filter(c => c.sector === s.slug).slice(0, 3);
        return `
      <div class="msd${i === 0 ? ' is-on' : ''}" data-sector-detail="${s.slug}">
        <p class="msd-title">${bidi(s.h1)}</p>
        <ul class="msd-mods">${s.modules.slice(0, 4).map(mo => `<li>${ico('check')}${mo[0]}</li>`).join('')}</ul>
        ${logos.length ? `<div class="msd-logos"><span>${m.worksOn}</span>${logos.map(c => `<img src="${A(r)}assets/img/clients/${c.logo}" alt="${esc(c.name)}" loading="lazy" width="80" height="32">`).join('')}</div>` : ''}
        <a class="link-arrow" href="${r}sectors/${s.slug}.html">${m.solutionsFor(s.short)} ${ico('arrow')}</a>
      </div>`; }).join('')}
    </div>
  </div>
</div>`;
};

const megaCompany = (r, path) => {
  const { t, nav, company } = L;
  return `
<div class="mega mega--company" id="mega-company" data-mega hidden>
  <div class="mega-inner container">
    <ul class="mega-company-list">
      ${nav.company.map(l => `
      <li><a class="mega-link${cur(path === l.href || path.startsWith(l.href.replace('.html', '/')))}" href="${r}${l.href}">
        <span class="mega-link-ico">${ico(l.icon)}</span>
        <span class="mega-link-txt"><strong>${l.label}${l.badge ? ` <span class="chip chip--green">${l.badge}</span>` : ''}</strong><small>${l.desc}</small></span>
      </a></li>`).join('')}
    </ul>
    <aside class="mega-contact">
      <p class="mega-feature-title">${t.megaContact.title}</p>
      <a class="mega-contact-row" href="tel:${company.phoneHref}">${ico('phone')}<span class="ltr">${company.phone}</span></a>
      <a class="mega-contact-row" href="${company.whatsapp}" rel="noopener">${ico('whatsapp')}<span>${t.megaContact.whatsapp}</span></a>
      <a class="mega-contact-row" href="mailto:${company.email}">${ico('mail')}<span class="ltr">${company.email}</span></a>
      <p class="mega-contact-addr">${ico('pin')}<span>${company.addressShort}</span></p>
    </aside>
  </div>
</div>`;
};

// Link to the same page in the other language
const otherLang = (r, path) => L.lang === 'ar' ? `${r}en/${path}` : `${r}../${path}`;

export const header = (r, active = '', mocks = {}, path = 'index.html') => {
  const { t, services, sectors, nav, company } = L, n = t.nav;
  return `
<a class="skip" href="#main">${t.skip}</a>
<header class="site-header" data-header>
  <div class="hdr container">
    ${brand(r)}
    <nav class="nav" aria-label="${t.navLabel}">
      <ul class="nav-list">
        <li><button class="nav-link${active === 'services' ? ' is-active' : ''}" aria-expanded="false" aria-controls="mega-solutions" data-mega-trigger>${n.solutions} ${ico('chevron', 'ico--sm')}</button></li>
        <li><button class="nav-link${active === 'sectors' ? ' is-active' : ''}" aria-expanded="false" aria-controls="mega-sectors" data-mega-trigger>${n.sectors} ${ico('chevron', 'ico--sm')}</button></li>
        <li><a class="nav-link${active === 'integrations' ? ' is-active' : ''}" href="${r}integrations.html">${n.integrations}</a></li>
        <li><a class="nav-link${active === 'pricing' ? ' is-active' : ''}" href="${r}pricing.html">${n.pricing}</a></li>
        <li><a class="nav-link${active === 'clients' ? ' is-active' : ''}" href="${r}clients.html">${n.clients}</a></li>
        <li><button class="nav-link${active === 'company' ? ' is-active' : ''}" aria-expanded="false" aria-controls="mega-company" data-mega-trigger>${n.company} ${ico('chevron', 'ico--sm')}</button></li>
      </ul>
    </nav>
    <div class="hdr-actions">
      <a class="lang-switch" href="${otherLang(r, path)}" lang="${t.lang.code}" hreflang="${t.lang.code}" title="${t.lang.title}">${t.lang.label}</a>
      <a class="btn btn-primary btn-sm hdr-cta" href="${r}contact.html">${t.cta}</a>
      <button class="hdr-menu" type="button" data-hdr-expand tabindex="-1"><span class="hdr-menu-dots" aria-hidden="true"><i></i><i></i><i></i></span>${t.menu}</button>
      <button class="burger" aria-expanded="false" aria-controls="mobile-menu" aria-label="${t.menuOpen}" data-label-open="${t.menuOpen}" data-label-close="${t.menuClose}" data-burger><span></span><span></span></button>
    </div>
  </div>
  ${megaSolutions(r, mocks, path)}
  ${megaSectors(r, path)}
  ${megaCompany(r, path)}
  <div class="mega-scrim" data-mega-scrim hidden></div>
</header>

<div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
  <div class="mobile-menu-inner">
    <details class="mm-group" open>
      <summary>${n.solutions} ${ico('chevron')}</summary>
      <ul>${services.map(s => `<li><a href="${r}services/${s.slug}.html">${ico(s.icon)}${bidi(s.short)}</a></li>`).join('')}</ul>
    </details>
    <details class="mm-group">
      <summary>${n.sectors} ${ico('chevron')}</summary>
      <ul>${sectors.map(s => `<li><a href="${r}sectors/${s.slug}.html">${ico(s.icon)}${s.short}</a></li>`).join('')}</ul>
    </details>
    <details class="mm-group">
      <summary>${n.company} ${ico('chevron')}</summary>
      <ul>${nav.company.map(l => `<li><a href="${r}${l.href}">${ico(l.icon)}${l.label}</a></li>`).join('')}</ul>
    </details>
    <a class="mm-link" href="${r}integrations.html">${n.integrations}</a>
    <a class="mm-link" href="${r}pricing.html">${n.pricing}</a>
    <a class="mm-link" href="${r}clients.html">${n.clients}</a>
    <a class="mm-link" href="${otherLang(r, path)}" lang="${t.lang.code}">${ico('globe')} ${t.lang.label}</a>
    <a class="btn btn-primary" href="${r}contact.html">${t.cta}</a>
  </div>
</div>

<nav class="dock" aria-label="${t.dockLabel}">
  <a class="dock-item" href="${r}services/index.html">${ico('erp')}<span>${t.dock.solutions}</span></a>
  <a class="dock-item" href="${r}sectors/index.html">${ico('layers')}<span>${t.dock.sectors}</span></a>
  <a class="dock-item dock-item--cta" href="${r}contact.html">${ico('calendar')}<span>${t.dock.book}</span></a>
  <a class="dock-item" href="${company.whatsapp}" rel="noopener">${ico('whatsapp')}<span>${t.dock.whatsapp}</span></a>
</nav>

<a class="wa-float" href="${company.whatsapp}" rel="noopener" aria-label="${t.waFloat.label}" data-wa-float>
  <span class="wa-float-ico">${ico('whatsapp')}</span>
  <span class="wa-float-txt"><strong>${t.waFloat.label}</strong><small>${t.waFloat.sub}</small></span>
</a>`;
};

export const footer = (r) => {
  const { t, services, sectors, nav, company } = L, f = t.footer;
  return `
<footer class="site-footer">
  <div class="container">
    <div class="ft-grid">
      <div class="ft-brand">
        ${brand(r)}
        <p>${company.tagline}.</p>
        <address>
          <span>${ico('pin')}${company.address}</span>
          <a href="tel:${company.phoneHref}">${ico('phone')}<span class="ltr">${company.phone}</span></a>
          <a href="mailto:${company.email}">${ico('mail')}<span class="ltr">${company.email}</span></a>
        </address>
      </div>
      <nav class="ft-col" aria-label="${f.solutions}"><p class="ft-title">${f.solutions}</p><ul>
        ${services.map(s => `<li><a href="${r}services/${s.slug}.html">${bidi(s.short)}</a></li>`).join('')}
      </ul></nav>
      <nav class="ft-col" aria-label="${f.sectors}"><p class="ft-title">${f.sectors}</p><ul>
        ${sectors.map(s => `<li><a href="${r}sectors/${s.slug}.html">${s.short}</a></li>`).join('')}
      </ul></nav>
      <nav class="ft-col" aria-label="${f.company}"><p class="ft-title">${f.company}</p><ul>
        ${nav.company.map(l => `<li><a href="${r}${l.href}">${l.label}</a></li>`).join('')}
        <li><a href="${r}integrations.html">${f.integrations}</a></li>
        <li><a href="${r}pricing.html">${f.pricing}</a></li>
        <li><a href="${r}contact.html">${f.contact}</a></li>
      </ul></nav>
    </div>
    <div class="ft-bottom">
      <p>© <span class="num">2026</span> Innomate. ${f.rights}</p>
      <div class="ft-social">
        <a href="${company.linkedin}" rel="noopener" aria-label="LinkedIn">${ico('linkedin')}</a>
        <a href="${company.facebook}" rel="noopener" aria-label="Facebook">${ico('facebook')}</a>
        <a href="${company.whatsapp}" rel="noopener" aria-label="WhatsApp">${ico('whatsapp')}</a>
      </div>
    </div>
  </div>
</footer>`;
};

/* ---------------- JSON-LD ---------------- */
export const orgSchema = () => {
  const { company, t } = L;
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': company.url + '/#org',
    name: 'Innomate',
    alternateName: t.org.alternateName,
    url: company.url,
    logo: company.url + '/assets/img/brand/innomate-mark.png',
    email: company.email,
    telephone: company.phone,
    address: { '@type': 'PostalAddress', streetAddress: '103, NH 26', addressLocality: t.org.locality, addressRegion: t.org.region, addressCountry: 'EG' },
    areaServed: 'EG',
    knowsLanguage: ['ar', 'en'],
    description: t.org.description,
    sameAs: [company.linkedin, company.facebook],
  };
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: L.company.url + '/' + L.base + it.path })),
});

export const faqSchema = (faq) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

/* ---------------- Page ---------------- */
export const page = ({ r = '', path, title, desc, body, active = '', schema = [], mocks = {}, bodyClass = '', ogImage, scripts = [], modules = [] }) => {
  ogImage = ogImage || `assets/img/og/og-${L.lang === 'en' ? 'en' : 'default'}.png`;
  const { company } = L, a = A(r);
  if (body.includes('data-model3d') && !modules.includes('live3d.js')) modules = [...modules, 'live3d.js'];
  const url = (lang) => `${company.url}/${lang === 'en' ? 'en/' : ''}${path}`.replace(/\/index\.html$/, '/');
  return `<!doctype html>
<html lang="${L.lang}" dir="${L.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url(L.lang)}">
<link rel="alternate" hreflang="ar-EG" href="${url('ar')}">
<link rel="alternate" hreflang="en" href="${url('en')}">
<link rel="alternate" hreflang="x-default" href="${url('ar')}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${L.ogLocale}">
<meta property="og:locale:alternate" content="${L.lang === 'ar' ? 'en_US' : 'ar_EG'}">
<meta property="og:site_name" content="Innomate">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url(L.lang)}">
<meta property="og:image" content="${company.url}/${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f4f7fa">
<link rel="icon" href="${a}assets/img/brand/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&${L.lang === 'ar' ? 'family=IBM+Plex+Sans+Arabic:wght@400;500;600' : 'family=IBM+Plex+Sans:wght@400;500;600'}&family=Readex+Pro:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${a}assets/vendor/lenis.css">
<link rel="stylesheet" href="${a}assets/css/tokens.css">
<link rel="stylesheet" href="${a}assets/css/base.css">
<link rel="stylesheet" href="${a}assets/css/layout.css">
<link rel="stylesheet" href="${a}assets/css/sections.css">
<link rel="stylesheet" href="${a}assets/css/mocks.css">
<script>document.documentElement.classList.add('js')</script>
${[orgSchema(), ...schema].map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body class="${bodyClass}">
${sprite()}
${header(r, active, mocks, path)}
<main id="main">
${body}
</main>
${footer(r)}
<script src="${a}assets/vendor/gsap.min.js" defer></script>
<script src="${a}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${a}assets/vendor/lenis.min.js" defer></script>
<script src="${a}assets/js/main.js" defer></script>
${scripts.map(s => `<script src="${a}assets/js/${s}" defer></script>`).join('\n')}
${modules.length ? `<script type="importmap">{"imports":{"three":"${a || "./"}assets/vendor/three/three.module.js","three/addons/":"${a || "./"}assets/vendor/three/addons/"}}</script>\n` + modules.map(m => `<script type="module" src="${a}assets/js/${m}"></script>`).join('\n') : ''}
</body>
</html>
`;
};
