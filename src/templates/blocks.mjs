// Reusable section blocks shared by home and inner pages.
import { ico, esc, bidi, A } from './layout.mjs';
import { L } from '../content/locale.mjs';

// No label above a heading: the heading carries its own weight. (`eyebrow` is accepted and ignored.)
export const secHead = ({ title, lead = '', id = '' }) => `
<div class="sec-head"${id ? ` id="${id}"` : ''}>
  <h2>${title}</h2>
  ${lead ? `<p>${lead}</p>` : ''}
</div>`;

export const breadcrumbs = (r, items) => `
<nav class="crumbs" aria-label="${L.t.crumbsLabel}">
  <ol>
    <li><a href="${r}index.html">${L.t.home}</a></li>
    ${items.map((it, i) => i === items.length - 1
      ? `<li aria-current="page">${bidi(it.name)}</li>`
      : `<li><a href="${r}${it.path}">${bidi(it.name)}</a></li>`).join('')}
  </ol>
</nav>`;

export const logoMarquee = (r, label = L.t.logos.label) => {
  const row = L.clients.map(c => `<li><img src="${A(r)}assets/img/clients/${c.logo}" alt="${esc(c.name)}" loading="lazy" height="44" width="120"></li>`).join('');
  return `
<section class="logos" aria-label="${label}">
  <div class="container logos-head"><p>${label}</p><a class="link-arrow" href="${r}clients.html">${L.t.logos.all} ${ico('arrow')}</a></div>
  <div class="marquee" data-marquee>
    <ul class="marquee-track">${row}</ul>
    <ul class="marquee-track" aria-hidden="true">${row}</ul>
  </div>
</section>`;
};

// Numbers as cards on two rows; hovering a card fills it from the bottom and rolls the figure up.
// A live 3D illustration (live3d.js) over its rendered still.
export const m3d = (r, kind, name, { eager = false, cls = '' } = {}) => `<div class="m3d${cls ? ' ' + cls : ''}" data-model3d="${kind}:${name}"><img class="m3d-img" src="${A(r)}assets/img/${kind}/${name}.webp" alt="" width="900" height="900"${eager ? '' : ' loading="lazy"'}></div>`;

// Clients as a list of rows (grigoletti.ch "Projects"): industry, name, and on
// hover the row turns dark, the client's logo slides in and the industry link shows.
export const clientRows = (r, list = L.clients, cls = '') => `
<ul class="cl-list${cls ? ' ' + cls : ''}" data-filter-list>${list.map(c => { const s = L.sectorBySlug[c.sector]; return `
  <li class="cl-row" data-f="${c.sector}"><a href="${r}sectors/${c.sector}.html">
    <span class="cl-meta">${s ? s.short : ''}</span>
    <span class="cl-main">
      <span class="cl-thumb"><img src="${A(r)}assets/img/clients/${c.logo}" alt="" width="120" height="48" loading="lazy"></span>
      <span class="cl-name" lang="en">${esc(c.name)}</span>
      <span class="cl-chip">${s ? L.t.megaSectors.solutionsFor(s.short) : ''}</span>
    </span>
    <span class="cl-go">${ico('arrow')}</span>
  </a></li>`; }).join('')}
</ul>`;

export const clientsSec = (r, n = 7) => `
<section class="section clients-sec" aria-labelledby="clients-h">
  <div class="container">
    <div class="cl-head">
      <h2 id="clients-h">${L.t.clientsList.title}</h2>
      <p>${L.t.clientsList.lead}</p>
      <a class="link-arrow" href="${r}clients.html">${L.t.logos.all} ${ico('arrow')}</a>
    </div>
    ${clientRows(r, L.clients.filter((c, i, a) => a.findIndex(x => x.sector === c.sector) === i).slice(0, n))}
  </div>
</section>`;

export const statsBand = () => `
<section class="section section--tight stats-cards" aria-labelledby="stats-h">
  <div class="container stats-cards-grid">
    <div class="stats-cards-head">
      <h2 id="stats-h">${L.t.statsTitle}</h2>
      <p>${L.t.statsLead}</p>
    </div>
    <div class="stat-cards">
      ${L.stats.map((s, i) => `
      <div class="stat-card hcard" data-reveal style="--d:${i * 90}ms">
        <p class="stat-num num"><span class="roll"><span class="roll-i"><span data-count="${s.value}">${s.value}</span><span class="stat-suf">${s.suffix}</span></span><span class="roll-i" aria-hidden="true">${s.value}<span class="stat-suf">${s.suffix}</span></span></span></p>
        <p class="stat-label">${s.label}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`;

export const stackCards = (r, mocks, list = L.groups) => `
<div class="stack" data-stack>
  ${list.map((g, i) => `
  <article class="stack-card stack-card--${g.tone}" style="--i:${i}" data-stack-card>
    <div class="stack-card-inner">
      <div class="stack-copy">
        <h3>${bidi(g.title)}</h3>
        <p class="stack-lead">${bidi(g.lead)}</p>
        <ul class="stack-links">
          ${g.services.map(slug => { const s = L.serviceBySlug[slug]; return `
          <li><a href="${r}services/${s.slug}.html"><span class="stack-link-ico">${ico(s.icon)}</span><span><strong>${bidi(s.name)}</strong><small>${bidi(s.menu)}</small></span>${ico('arrow')}</a></li>`; }).join('')}
        </ul>
      </div>
      <div class="stack-visual">${mocks[g.mock]}</div>
    </div>
  </article>`).join('')}
</div>`;

// Client words: one quote on stage at a time; the clients are tabs with a
// progress line that advances on its own (main.js [data-testi]).
export const testimonialsBlock = (r, list = L.testimonials) => `
<section class="section testi" aria-labelledby="testi-h">
  <div class="container testi-wrap" data-testi>
    <div class="testi-side">
      <h2 id="testi-h">${L.t.testi.title}</h2>
      <div class="testi-tabs" role="tablist" aria-label="${L.t.testi.title}">
        ${list.map((t, i) => { const c = L.clients.find(c => c.name === t.company); return `
        <button class="testi-tab${i === 0 ? ' is-on' : ''}" role="tab" aria-selected="${i === 0}" aria-controls="tq-${i}" id="tt-${i}" data-tt="${i}">
          ${c ? `<span class="testi-logo"><img src="${A(r)}assets/img/clients/${c.logo}" alt="" width="96" height="36" loading="lazy"></span>` : ''}
          <span class="testi-who"><strong>${t.name}</strong><small>${t.role}${L.t.svc.quoteSep}<bdi lang="en">${t.company}</bdi></small></span>
          <i class="testi-bar" aria-hidden="true"></i>
        </button>`; }).join('')}
      </div>
    </div>
    <div class="testi-stage">
      ${list.map((t, i) => { const s = L.serviceBySlug[t.service]; return `
      <figure class="testi-quote${i === 0 ? ' is-on' : ''}" id="tq-${i}" role="tabpanel" aria-labelledby="tt-${i}" aria-hidden="${i ? 'true' : 'false'}">
        <span class="testi-mark" aria-hidden="true">${L.lang === 'ar' ? '”' : '“'}</span>
        <blockquote>${bidi(t.quote)}</blockquote>
        <figcaption>${s ? `<a class="chip chip--link" href="${r}services/${s.slug}.html">${bidi(s.short)} ${ico('arrow')}</a>` : ''}<span>${t.name}${L.t.svc.quoteSep}<bdi lang="en">${t.company}</bdi></span></figcaption>
      </figure>`; }).join('')}
    </div>
  </div>
</section>`;

export const faqBlock = (faq, { title = L.t.faq.title, eyebrow = L.t.faq.eyebrow, id = 'faq', lead = '' } = {}) => `
<section class="section faq" id="${id}" aria-labelledby="${id}-h">
  <div class="container faq-wrap">
    <div class="faq-side">
      <h2 id="${id}-h">${title}</h2>
      ${lead ? `<p class="faq-lead" data-reveal>${lead}</p>` : ''}
      <a class="faq-ask" href="${L.company.whatsapp}" rel="noopener" data-reveal>${ico('whatsapp')}<span><strong>${L.t.faq.askTitle}</strong><small>${L.t.faq.askSub}</small></span></a>
    </div>
    <div class="faq-list">
      ${faq.map(([q, a], i) => `
      <details class="faq-item" data-reveal style="--d:${Math.min(i, 5) * 60}ms"${i === 0 ? ' open' : ''}>
        <summary><h3>${bidi(q)}</h3><span class="faq-plus" aria-hidden="true"></span></summary>
        <div class="faq-a"><p>${bidi(a)}</p></div>
      </details>`).join('')}
    </div>
  </div>
</section>`;

export const ctaBand = (r, { title = L.t.ctaBand.title, lead = L.t.ctaBand.lead, primary = [L.t.ctaBand.primary, 'contact.html'] } = {}) => `
<section class="cta-band">
  <div class="container">
    <div class="cta-card" data-reveal="scale">
      <div class="cta-copy">
        <h2>${title}</h2>
        <p>${lead}</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-primary" href="${r}${primary[1]}">${primary[0]} ${ico('arrow')}</a>
        <a class="cta-wa" href="${L.company.whatsapp}" rel="noopener">${ico('whatsapp')} ${L.t.ctaBand.whatsapp} <span class="ltr">${L.company.phone}</span></a>
      </div>
    </div>
  </div>
</section>`;

// Cards that start stacked and tilted over each other and spread into a row as
// the section scrolls in (grigoletti.ch/en/services). The dots show the card's place.
export const fan = (cards, { tag = 'div', cls = '' } = {}) => {
  const n = cards.length, it = tag === 'ol' ? 'li' : 'article';
  return `<${tag} class="fan${cls ? ' ' + cls : ''}" data-fan style="--n:${n}">${cards.map((c, i) => `
  <${it} class="fan-card hcard" style="--i:${i}">
    <div class="fan-top">${tag === 'ol' ? `<span class="fan-no num">${String(i + 1).padStart(2, '0')}</span>` : '<span></span>'}<span class="fan-dots" aria-hidden="true">${Array.from({ length: n }, (_, k) => `<i${k === i ? ' class="is-on"' : ''}></i>`).join('')}</span></div>
    <h3 class="fan-title">${c.title}</h3>
    ${c.desc ? `<p class="fan-desc">${c.desc}</p>` : ''}
    ${c.rows || c.link ? `<div class="fan-rows">${(c.rows || []).map(([l, v]) => `<p class="fan-row"><span>${l}</span><span>${v}</span></p>`).join('')}${c.link ? `<a class="fan-row fan-link" href="${c.link.href}"><span>${c.link.label}</span>${ico('arrow')}</a>` : ''}</div>` : ''}
  </${it}>`).join('')}
</${tag}>`;
};

export const relatedServices = (r, slugs, title = L.t.related.title) => `
<section class="section section--tight related">
  <div class="container">
    ${secHead({ eyebrow: L.t.related.eyebrow, title })}
    ${fan(slugs.map(slug => { const s = L.serviceBySlug[slug]; return { title: bidi(s.name), desc: bidi(s.menu), link: { href: `${r}services/${s.slug}.html`, label: L.t.related.details } }; }))}
  </div>
</section>`;

export const sectorChips = (r, slugs) => `<ul class="chip-row">${slugs.map(s => { const x = L.sectorBySlug[s]; return x ? `<li><a class="chip chip--link" href="${r}sectors/${x.slug}.html">${ico(x.icon)}${x.name}</a></li>` : ''; }).join('')}</ul>`;

export const pageHero = (r, { crumbs, eyebrow, h1, lead, actions = true, visual = '', definition = '', chips = '' }) => `
<section class="phero">
  <div class="container">
    ${breadcrumbs(r, crumbs)}
    <div class="phero-grid${visual ? '' : ' phero-grid--solo'}">
      <div class="phero-copy">
        <h1>${bidi(h1)}</h1>
        <p class="phero-lead" data-reveal style="--d:120ms">${bidi(lead)}</p>
        ${chips}
        ${actions ? `<div class="phero-actions" data-reveal style="--d:200ms">
          <a class="btn btn-primary" href="${r}contact.html">${L.t.cta} ${ico('arrow')}</a>
          <a class="phero-wa" href="${L.company.whatsapp}" rel="noopener">${ico('whatsapp')} ${L.t.phero.whatsapp}</a>
        </div>` : ''}
      </div>
      ${visual ? `<div class="phero-visual" data-reveal="scale" style="--d:160ms">${visual}</div>` : ''}
    </div>
    ${definition ? `<div class="definition" data-reveal><span class="definition-tag">${L.t.definitionTag}</span><p>${bidi(definition)}</p></div>` : ''}
  </div>
</section>`;
