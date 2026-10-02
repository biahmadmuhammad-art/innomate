// Inner page templates. All words come from L (see content/locale.mjs).
import { ico, bidi, esc, logoMark, A } from './layout.mjs';
import { secHead, pageHero, faqBlock, ctaBand, relatedServices, sectorChips, testimonialsBlock, logoMarquee, stackCards, statsBand, breadcrumbs, fan, m3d, clientRows } from './blocks.mjs';
import { L } from '../content/locale.mjs';
import { journeyArt } from './home.mjs';

/* =========================== SERVICE =========================== */
const etaExtras = () => {
  const e = L.t.eta;
  return `
<section class="section section--white" aria-labelledby="eta-cmp-h">
  <div class="container">
    ${secHead({ eyebrow: e.cmpEyebrow, keep: true, title: `<span id="eta-cmp-h">${e.cmpTitle}</span>`, lead: e.cmpLead })}
    <div class="table-wrap" data-reveal>
      <table class="cmp-table">
        <thead><tr><th scope="col"></th><th scope="col">${e.cols[0]}</th><th scope="col">${e.cols[1]}</th></tr></thead>
        <tbody>
          ${e.rows.map(([h, a, b]) => `<tr><th scope="row">${h}</th><td>${a}</td><td>${b}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>
    <p class="source-note">${ico('link')} ${e.source(L.t.reviewed)}</p>
  </div>
</section>
<section class="section" aria-labelledby="eta-err-h">
  <div class="container">
    ${secHead({ eyebrow: e.errEyebrow, title: `<span id="eta-err-h">${e.errTitle}</span>` })}
    <div class="grid grid-2">
      ${e.errors.map(([t, d, fix], i) => `
      <article class="card err-card" data-reveal style="--d:${i * 70}ms">
        <span class="err-tag">${ico('alert')} ${e.errTag}</span>
        <h3>${bidi(t)}</h3>
        <p>${bidi(d)}</p>
        <p class="err-fix">${ico('check')}<span>${bidi(fix)}</span></p>
      </article>`).join('')}
    </div>
  </div>
</section>`;
};

export const servicePage = (r, s, mocks) => {
  const v = L.t.svc;
  const t = L.testimonials.find(t => t.service === s.slug);
  return [
    pageHero(r, {
      crumbs: [{ name: v.crumb, path: 'services/index.html' }, { name: s.short }],
      eyebrow: L.lang === 'ar' ? bidi(s.nameEn) : s.eyebrow, h1: s.h1, lead: s.lead, visual: mocks[s.mock], definition: s.definition,
    }),
    `<section class="section section--white feat-sec" aria-labelledby="feat-h">
      <div class="container feat-split">
        <div class="feat-art" data-reveal="scale">${m3d(r, 'services', s.slug)}</div>
        <div class="feat-body">
          ${secHead({ eyebrow: v.featEyebrow, title: `<span id="feat-h">${v.featTitle(bidi(s.short))}</span>`, lead: v.featLead })}
          <ol class="feat-list">
            ${s.features.map(([fi, ft, fd], i) => `
            <li class="feat-row" data-reveal style="--d:${Math.min(i, 5) * 60}ms"><span class="feat-no num">${String(i + 1).padStart(2, '0')}</span><div><h3>${bidi(ft)}</h3><p>${bidi(fd)}</p></div></li>`).join('')}
          </ol>
        </div>
      </div>
    </section>`,
    s.slug === 'eta-e-invoice' ? etaExtras() : '',
    `<section class="section steps-sec" aria-labelledby="steps-h">
      <div class="container">
        ${secHead({ eyebrow: v.stepsEyebrow, title: `<span id="steps-h">${v.stepsTitle}</span>` })}
        ${fan(s.steps.map(([st, sd]) => ({ title: bidi(st), desc: bidi(sd) })), { tag: 'ol' })}
      </div>
    </section>`,
    `<section class="section section--white" aria-labelledby="ba-h">
      <div class="container">
        ${secHead({ eyebrow: v.baEyebrow, title: `<span id="ba-h">${v.baTitle}</span>` })}
        <div class="table-wrap" data-reveal>
          <table class="cmp-table cmp-table--ba">
            <thead><tr><th scope="col">${v.baToday}</th><th scope="col">${v.baWith}</th></tr></thead>
            <tbody>${s.pains.map(([pt], i) => `<tr><td><span class="ba-x">${ico('close')}</span>${bidi(pt)}</td><td><span class="ba-ok">${ico('check')}</span>${bidi(s.outcomes[i] || '')}</td></tr>`).join('')}</tbody>
          </table>
        </div>
        <div class="pains-sectors" data-reveal><p>${v.usedIn}</p>${sectorChips(r, s.sectors)}</div>
      </div>
    </section>`,
    t ? `<section class="section section--tight quote-band"><div class="container"><figure class="big-quote" data-reveal><blockquote>${bidi(t.quote)}</blockquote><figcaption>${(() => { const c = L.clients.find(c => c.name === t.company); return c ? `<img src="${A(r)}assets/img/clients/${c.logo}" alt="${esc(c.name)}" width="96" height="36" loading="lazy">` : ''; })()}<span><strong>${t.name}</strong>${v.quoteSep}${t.role}${v.quoteSep}<bdi lang="en">${t.company}</bdi></span></figcaption></figure></div></section>` : '',
    `<section class="section section--tight price-cue">
      <div class="container price-cue-inner" data-reveal>
        <div><p class="price-cue-t">${v.costTitle}</p><p>${v.costLead}</p></div>
        <a class="btn btn-dark" href="${r}pricing.html#estimator">${v.costCta} ${ico('arrow')}</a>
      </div>
    </section>`,
    faqBlock(s.faq, { title: v.faqTitle(bidi(s.short)), id: 'faq' }),
    `<div class="container reviewed"><p>${ico('check')} ${v.reviewed(L.t.reviewed)}</p></div>`,
    relatedServices(r, s.related),
    ctaBand(r, { title: v.ctaTitle(bidi(s.short)) }),
  ].join('\n');
};

/* =========================== SECTOR =========================== */
export const sectorPage = (r, s) => {
  const c = L.t.sec;
  const logos = L.clients.filter(x => x.sector === s.slug);
  return [
    pageHero(r, { crumbs: [{ name: c.crumb, path: 'sectors/index.html' }, { name: s.short }], eyebrow: s.factory ? c.eyebrowFactory : c.eyebrowOther, h1: s.h1, lead: s.lead, visual: m3d(r, 'sectors', s.slug, { eager: true }) }),
    logos.length ? `<div class="container sector-logos" data-reveal><p>${c.worksOn}</p><ul>${logos.map(x => `<li><img src="${A(r)}assets/img/clients/${x.logo}" alt="${esc(x.name)}" width="120" height="44" loading="lazy"></li>`).join('')}</ul></div>` : '',
    `<section class="section section--tight pains">
      <div class="container">
        ${secHead({ eyebrow: c.painsEyebrow, title: c.painsTitle(s.short) })}
        ${fan(s.pains.map(([pt, pd]) => ({ title: bidi(pt), desc: bidi(pd) })))}
      </div>
    </section>`,
    `<section class="section section--white">
      <div class="container">
        ${secHead({ eyebrow: c.modsEyebrow, title: c.modsTitle, lead: c.modsLead(s.short) })}
        <div class="table-wrap" data-reveal>
          <table class="cmp-table cmp-table--mods">
            <thead><tr><th scope="col">${c.modsCols[0]}</th><th scope="col">${c.modsCols[1]}</th></tr></thead>
            <tbody>${s.modules.map(([m, d]) => `<tr><th scope="row">${bidi(m)}</th><td>${bidi(d)}</td></tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
    </section>`,
    relatedServices(r, s.services.slice(0, 3), c.relatedTitle),
    faqBlock(s.faq, { title: c.faqTitle(s.short) }),
    ctaBand(r, { title: c.ctaTitle(s.short), lead: c.ctaLead }),
  ].join('\n');
};

/* =========================== HUBS =========================== */
export const servicesHub = (r, mocks) => {
  const h = L.t.hub;
  return [
    pageHero(r, { crumbs: [{ name: h.svcEyebrow }], eyebrow: h.svcEyebrow, h1: h.svcH1, lead: h.svcLead, actions: true, visual: m3d(r, 'pages', 'services', { eager: true }) }),
    `<section class="section section--tight" aria-labelledby="caps-h"><div class="container"><h2 class="visually-hidden" id="caps-h">${h.capsHidden}</h2>${stackCards(r, mocks)}</div></section>`,
    `<section class="section section--white"><div class="container">
      ${secHead({ eyebrow: h.allEyebrow, title: h.allTitle })}
      <div class="grid grid-3">${L.services.map((s, i) => `
        <a class="card svc-card" href="${r}services/${s.slug}.html" data-reveal style="--d:${(i % 3) * 70}ms">
          <h3>${bidi(s.name)}</h3><p>${bidi(s.menu)}</p><span class="link-arrow">${L.t.related.details} ${ico('arrow')}</span>
        </a>`).join('')}</div>
    </div></section>`,
    ctaBand(r),
  ].join('\n');
};

export const sectorsHub = (r) => {
  const h = L.t.hub;
  const fac = L.sectors.filter(s => s.factory), other = L.sectors.filter(s => !s.factory);
  const card = (s, i) => `
    <a class="card sector-card" href="${r}sectors/${s.slug}.html" data-reveal style="--d:${(i % 3) * 70}ms">
      <h3>${s.name}</h3>
      <ul>${s.modules.slice(0, 3).map(m => `<li>${ico('check')}${m[0]}</li>`).join('')}</ul>
      <span class="link-arrow">${L.t.megaSectors.solutionsFor(s.short)} ${ico('arrow')}</span>
    </a>`;
  return [
    pageHero(r, { crumbs: [{ name: h.secEyebrow }], eyebrow: h.secEyebrow, h1: h.secH1, lead: h.secLead, visual: m3d(r, 'pages', 'sectors', { eager: true }) }),
    `<section class="section section--tight"><div class="container">
      ${secHead({ eyebrow: h.facEyebrow, title: h.facTitle, lead: h.facLead })}
      <div class="grid grid-3">${fac.map(card).join('')}</div>
    </div></section>`,
    `<section class="section section--white"><div class="container">
      ${secHead({ eyebrow: h.otherEyebrow, title: h.otherTitle })}
      <div class="grid grid-3">${other.map(card).join('')}</div>
    </div></section>`,
    logoMarquee(r),
    ctaBand(r),
  ].join('\n');
};

/* =========================== INTEGRATIONS =========================== */
export const integrationsPage = (r) => {
  const g = L.t.integ;
  return [
    pageHero(r, { crumbs: [{ name: g.eyebrow }], eyebrow: g.eyebrow, h1: g.h1, lead: g.lead, definition: g.definition, visual: m3d(r, 'pages', 'integrations', { eager: true }) }),
    `<section class="section section--tight"><div class="container">
      <div class="integ-cards">${L.integrations.map((it, i) => `
        <article class="card integ-card" id="${it.key}" data-reveal style="--d:${(i % 3) * 70}ms">
          <p class="integ-card-ico">${ico(it.icon)}</p>
          <h2 class="integ-card-t">${bidi(it.name)}</h2>
          ${L.lang === 'ar' ? `<p class="integ-card-en" lang="en">${it.en}</p>` : ''}
          <p>${bidi(it.desc)}</p>
          ${it.link.startsWith('services') ? `<a class="link-arrow" href="${r}${it.link}">${L.t.related.details} ${ico('arrow')}</a>` : ''}
        </article>`).join('')}</div>
      <p class="source-note">${ico('alert')} ${g.note}</p>
    </div></section>`,
    ctaBand(r, { title: g.ctaTitle, lead: g.ctaLead }),
  ].join('\n');
};

/* =========================== PRICING =========================== */
export const pricingPage = (r) => {
  const p = L.t.pricing;
  return [
    pageHero(r, { crumbs: [{ name: L.t.nav.pricing }], eyebrow: p.eyebrow, h1: p.h1, lead: p.lead, actions: false, definition: p.definition, visual: m3d(r, 'pages', 'pricing', { eager: true }) }),
    `<section class="section section--tight"><div class="container">
      <div class="pkg-grid" data-fan style="--n:${p.packages.length}">${p.packages.map((k, i) => `
        <article class="pkg${k.featured ? ' pkg--featured' : ''}" style="--i:${i}">
          ${k.featured ? `<span class="pkg-flag">${p.flag}</span>` : ''}
          <h2 class="pkg-name">${bidi(k.name)}</h2>
          <p class="pkg-for">${k.for}</p>
          <p class="pkg-weeks">${ico('clock')}<span>${k.weeks}</span></p>
          <ul>${k.items.map(it => `<li>${ico('check')}${bidi(it)}</li>`).join('')}</ul>
          <a class="btn ${k.featured ? 'btn-primary' : 'btn-ghost'}" href="${r}contact.html?package=${k.key}">${k.cta} ${ico('arrow')}</a>
        </article>`).join('')}</div>
      <p class="source-note">${ico('alert')} ${p.note}${globalThis.DRAFTS ? ` <span class="todo-note">${p.todo}</span>` : ''}</p>
    </div></section>`,
    `<section class="section section--white" id="estimator" aria-labelledby="est-h"><div class="container">
      ${secHead({ eyebrow: p.estEyebrow, title: `<span id="est-h">${p.estTitle}</span>`, lead: p.estLead })}
      <form class="estimator" data-estimator data-pkg-eta="${p.pkgNames.eta}" data-pkg-starter="${p.pkgNames.starter}" data-pkg-factory="${p.pkgNames.factory}">
        <fieldset><legend>${p.users}</legend>
          <div class="seg">${p.usersOpts.map((l, i) => `<label><input type="radio" name="users" value="${i}"${i === 1 ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>
        </fieldset>
        <fieldset><legend>${p.branches}</legend>
          <div class="seg">${['1', '2–3', '4+'].map((l, i) => `<label><input type="radio" name="branches" value="${i}"${i === 0 ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>
        </fieldset>
        <fieldset><legend>${p.needs}</legend>
          <div class="checks">${p.mods.map(([k, l, w, on]) => `<label class="check"><input type="checkbox" name="mod" value="${k}" data-w="${w}"${on ? ' checked' : ''}><span>${bidi(l)}</span></label>`).join('')}</div>
        </fieldset>
        <output class="est-out" aria-live="polite">
          <span class="est-label">${p.estLabel}</span>
          <span class="est-weeks"><b class="num" data-est-weeks>6–8</b> ${p.weeks}</span>
          <span class="est-pkg">${p.nearest} <b data-est-pkg>${p.pkgNames.starter}</b></span>
          <a class="btn btn-primary" href="${r}contact.html" data-est-cta>${p.estCta} ${ico('arrow')}</a>
        </output>
      </form>
    </div></section>`,
    faqBlock(p.faq, { title: p.faqTitle }),
    ctaBand(r),
  ].join('\n');
};

/* =========================== HOW WE WORK =========================== */
export const howPage = (r) => {
  const w = L.t.how;
  return [
    pageHero(r, { crumbs: [{ name: w.eyebrow }], eyebrow: w.eyebrow, h1: w.h1, lead: w.lead, definition: w.definition, visual: m3d(r, 'pages', 'how', { eager: true }) }),
    (() => { const art = journeyArt(L.t.homeCopy), arts = L.t.homeCopy.jSteps.map(j => j.art); return `
    <section class="journey journey--phases" id="phases" aria-labelledby="phases-h" data-journey>
      <div class="journey-pin">
        <div class="container journey-head">
          <div><h2 id="phases-h">${w.phasesTitle}</h2></div>
          <p class="journey-sub">${w.phasesSub}</p>
        </div>
        <ol class="journey-track" data-journey-track>
          ${w.phases.map(([t, wk, d, del], i) => `
          <li class="jstep jphase" style="--i:${i}">
            <div class="jstep-art">${art[arts[i]] || ''}</div>
            <div class="jstep-meta"><span class="jstep-no num">${String(i + 1).padStart(2, '0')}</span><span class="chip">${wk}</span></div>
            <h3>${t}</h3>
            <p>${d}</p>
            <ul class="jphase-del">${del.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul>
          </li>`).join('')}
        </ol>
        <div class="container journey-progress" aria-hidden="true"><span class="jp-bar"><i data-journey-bar></i></span></div>
      </div>
    </section>`; })(),
    `<section class="section section--white"><div class="container">
      ${secHead({ eyebrow: w.needEyebrow, title: w.needTitle })}
      ${fan(w.needs.map(([ic, t, d]) => ({ title: t, desc: d })))}
    </div></section>`,
    ctaBand(r),
  ].join('\n');
};

/* =========================== ABOUT =========================== */
export const aboutPage = (r) => {
  const a = L.t.about;
  return [
    pageHero(r, { crumbs: [{ name: a.eyebrow }], eyebrow: a.eyebrow, h1: a.h1, lead: a.lead, actions: false, visual: m3d(r, 'pages', 'about', { eager: true }) }),
    statsBand(),
    `<section class="section section--white"><div class="container about-grid">
      <div data-reveal>
        <h2>${a.beliefTitle}</h2>
      </div>
      <div class="about-values">${a.values.map(([ic, t, d], i) => `<article class="value" data-reveal style="--d:${i * 70}ms"><div><h3>${bidi(t)}</h3><p>${bidi(d)}</p></div></article>`).join('')}</div>
    </div></section>`,
    !globalThis.DRAFTS ? '' : `<section class="section team-sec"><div class="container">
      ${secHead({ eyebrow: a.teamEyebrow, title: a.teamTitle, lead: a.teamLead })}
      <div class="team-grid" data-team>${a.roles.map((role, i) => `
        <figure class="member" data-reveal style="--d:${(i % 3) * 80}ms">
          <div class="member-ph" style="--h:${[205, 212, 198, 220, 208, 216][i]}">${logoMark('member-mark')}</div>
          <figcaption><strong>${a.memberName}</strong><small>${bidi(role)}</small></figcaption>
        </figure>`).join('')}</div>
      <p class="source-note"><span class="todo-note">${a.teamTodo}</span></p>
    </div></section>`,
    logoMarquee(r),
    ctaBand(r),
  ].join('\n');
};

/* =========================== CLIENTS =========================== */
export const clientsPage = (r) => {
  const c = L.t.clientsPage;
  const sectorKeys = [...new Set(L.clients.map(x => x.sector))];
  const label = k => (L.sectorBySlug[k] || {}).short || k;
  return [
    pageHero(r, { crumbs: [{ name: c.eyebrow }], eyebrow: c.eyebrow, h1: c.h1, lead: c.lead, actions: false, visual: m3d(r, 'pages', 'clients', { eager: true }) }),
    `<section class="section section--tight"><div class="container">
      <div class="filter" role="group" aria-label="${c.filterLabel}" data-filter>
        <button class="filter-btn is-on" data-f="all" aria-pressed="true">${c.all}</button>
        ${sectorKeys.map(k => `<button class="filter-btn" data-f="${k}" aria-pressed="false">${label(k)}</button>`).join('')}
      </div>
      ${clientRows(r, L.clients, 'cl-list--cols')}
    </div></section>`,
    testimonialsBlock(r),
    !globalThis.DRAFTS ? '' : `<section class="section section--white"><div class="container">
      ${secHead({ eyebrow: c.casesEyebrow, title: c.casesTitle, lead: c.casesLead })}
      <div class="grid grid-3">${[['Electro Metal', 'electrical', 'warehouse-management'], ['Trend Pharm', 'pharma', 'eta-e-invoice'], ['Naturetex', 'apparel', 'ai-agents']].map(([n, sec, svc], i) => { const x = L.clients.find(y => y.name === n); return `
        <article class="card case-card" data-reveal style="--d:${i * 80}ms">
          <img src="${A(r)}assets/img/clients/${x.logo}" alt="${esc(n)}" width="120" height="44" loading="lazy">
          <p class="case-tags"><span class="chip">${label(sec)}</span><span class="chip chip--amber">${bidi(L.serviceBySlug[svc].short)}</span></p>
          <h3>${c.caseTitle(n)}</h3>
          <p class="todo-note">${c.caseTodo}</p>
        </article>`; }).join('')}</div>
    </div></section>`,
    ctaBand(r),
  ].join('\n');
};

/* =========================== CAREERS =========================== */
export const careersPage = (r) => {
  const c = L.t.careers;
  return [
    pageHero(r, { crumbs: [{ name: c.eyebrow }], eyebrow: c.eyebrow, h1: c.h1, lead: c.lead, actions: false, visual: m3d(r, 'pages', 'careers', { eager: true }) }),
    `<section class="section section--tight"><div class="container">
      <ul class="jobs">${L.jobs.map(j => `
        <li><a class="job-row" href="${r}careers/${j.slug}.html">
          <span class="job-t"><strong>${bidi(j.title)}</strong>${L.lang === 'ar' ? `<small lang="en">${j.titleEn}</small>` : ''}</span>
          <span class="job-meta"><span>${ico('pin')}${j.location}</span><span>${ico('briefcase')}${j.type}</span></span>
          <span class="job-go">${ico('arrow')}</span>
        </a></li>`).join('')}</ul>
      <div class="card open-app" data-reveal><h2>${c.openTitle}</h2><p>${c.openTxt}</p><a class="btn btn-dark" href="mailto:${L.company.email}?subject=CV">${ico('mail')} ${c.openCta}</a></div>
    </div></section>`,
  ].join('\n');
};

export const jobPage = (r, j) => {
  const c = L.t.careers;
  return [
    pageHero(r, { crumbs: [{ name: c.eyebrow, path: 'careers.html' }, { name: j.title }], eyebrow: j.dept, h1: j.title, lead: j.summary, actions: false,
      chips: `<ul class="chip-row"><li class="chip">${ico('pin')}${j.location}</li><li class="chip">${ico('briefcase')}${j.type}</li>${L.lang === 'ar' ? `<li class="chip" lang="en">${j.titleEn}</li>` : ''}</ul>` }),
    `<section class="section section--tight"><div class="container job-body">
      <div>
        <h2>${c.resp}</h2>
        <dl class="job-list">${j.responsibilities.map(([t, d]) => `<dt>${t}</dt><dd>${bidi(d)}</dd>`).join('')}</dl>
        <h2>${c.req}</h2>
        <dl class="job-list">${j.requirements.map(([t, d]) => `<dt>${t}</dt><dd>${bidi(d)}</dd>`).join('')}</dl>
      </div>
      <aside class="job-apply card"><h2>${c.applyTitle}</h2><p>${c.applyTxt}</p><a class="btn btn-primary" href="mailto:${L.company.email}?subject=${encodeURIComponent(j.titleEn)}">${ico('mail')} ${c.applyCta}</a></aside>
    </div></section>`,
  ].join('\n');
};

/* =========================== RESOURCES =========================== */
export const resourcesPage = (r) => {
  const c = L.t.resources;
  return [
    pageHero(r, { crumbs: [{ name: c.eyebrow }], eyebrow: c.eyebrow, h1: c.h1, lead: c.lead, actions: false, visual: m3d(r, 'pages', 'resources', { eager: true }) }),
    `<section class="section section--tight"><div class="container">
      <div class="filter" role="group" aria-label="${c.filterLabel}" data-filter>
        <button class="filter-btn is-on" data-f="all" aria-pressed="true">${c.all}</button>
        ${Object.entries(c.cats).map(([k, v]) => `<button class="filter-btn" data-f="${k}" aria-pressed="false">${v}</button>`).join('\n        ')}
      </div>
      <div class="art-grid" data-filter-list>${c.articles.map(([k, t, d], i) => `
        <article class="art-card" data-f="${k}" data-reveal style="--d:${(i % 4) * 60}ms">
          <div class="art-thumb art-thumb--${k}" aria-hidden="true"><span></span><span></span><span></span></div>
          <p class="art-cat">${c.cats[k]}</p>
          <h2>${bidi(t)}</h2>
          <p>${bidi(d)}</p>
        </article>`).join('')}</div>
    </div></section>`,
    ctaBand(r),
  ].join('\n');
};

/* =========================== FAQ =========================== */
export const faqPage = (r) => {
  const c = L.t.faqPage;
  return [
    pageHero(r, { crumbs: [{ name: c.eyebrow }], eyebrow: c.eyebrow, h1: c.h1, lead: c.lead, actions: false, visual: m3d(r, 'pages', 'faq', { eager: true }) }),
    faqBlock(L.faqs.map(f => [f.q, f.a]), { title: c.general, id: 'faq-general' }),
    faqBlock(L.serviceBySlug['eta-e-invoice'].faq, { title: c.eta, eyebrow: c.etaEyebrow, id: 'faq-eta' }),
    faqBlock(L.serviceBySlug['ai-agents'].faq, { title: c.ai, eyebrow: c.aiEyebrow, id: 'faq-ai' }),
    ctaBand(r),
  ].join('\n');
};

/* =========================== CONTACT =========================== */
export const contactPage = (r) => {
  const c = L.t.contact, co = L.company;
  return [
    `<section class="phero phero--contact"><div class="container">
      ${breadcrumbs(r, [{ name: c.crumb }])}
      <div class="contact-grid">
        <div class="contact-copy">
          <h1>${c.h1}</h1>
          <p class="phero-lead" data-reveal>${c.lead}</p>
          <ul class="contact-ways">
            <li><a href="${co.whatsapp}" rel="noopener">${ico('whatsapp')}<span><strong>${c.whatsapp}</strong><small>${c.whatsappSub}</small></span></a></li>
            <li><a href="tel:${co.phoneHref}">${ico('phone')}<span><strong class="ltr">${co.phone}</strong><small>${co.hours}</small></span></a></li>
            <li><a href="mailto:${co.email}">${ico('mail')}<span><strong class="ltr">${co.email}</strong><small>${c.emailSub}</small></span></a></li>
            <li><span class="contact-addr">${ico('pin')}<span><strong>${co.address}</strong><small>${c.visit}</small></span></span></li>
          </ul>
        </div>
        <form class="contact-form card" data-contact-form novalidate data-msg-err="${esc(c.err)}" data-msg-ok="${esc(c.ok)}" data-pre-pkg="${c.prePkg}" data-pre-mods="${c.preMods}" data-pre-weeks="${c.preWeeks}" data-pre-weeks-unit="${c.preWeeksUnit}">
          <div class="field-row">
            <div class="field"><label for="f-name">${c.name}</label><input id="f-name" name="name" autocomplete="name" required></div>
            <div class="field"><label for="f-co">${c.company}</label><input id="f-co" name="company" autocomplete="organization" required></div>
          </div>
          <div class="field-row">
            <div class="field"><label for="f-phone">${c.phone}</label><input id="f-phone" name="phone" type="tel" dir="ltr" autocomplete="tel" required inputmode="tel"></div>
            <div class="field"><label for="f-email">${c.email}</label><input id="f-email" name="email" type="email" dir="ltr" autocomplete="email"></div>
          </div>
          <fieldset class="field"><legend>${c.needs}</legend>
            <div class="pick">${L.services.map(s => `<label><input type="checkbox" name="need" value="${s.slug}"><span>${bidi(s.short)}</span></label>`).join('')}</div>
          </fieldset>
          <div class="field"><label for="f-msg">${c.msg}</label><textarea id="f-msg" name="message" rows="3" placeholder="${c.msgPh}"></textarea></div>
          <button class="btn btn-primary btn-block" type="submit">${c.submit} ${ico('arrow')}</button>
          <p class="form-note" data-form-status role="status">${c.note}</p>
        </form>
      </div>
    </div></section>`,
    `<section class="section section--tight"><div class="container">
      <div class="map-card" data-reveal>
        <div class="map-art" aria-hidden="true"><svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice"><defs><pattern id="mg" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" stroke="#dde5ee" stroke-width="1"/></pattern></defs><rect width="600" height="260" fill="url(#mg)"/><path d="M0 170 C120 150 180 190 300 160 S480 110 600 130" fill="none" stroke="#c9d5e2" stroke-width="10" stroke-linecap="round"/><path d="M220 0 C240 80 260 140 250 260" fill="none" stroke="#dde5ee" stroke-width="8"/><circle cx="330" cy="150" r="30" fill="#388ccc" opacity=".12"/><circle cx="330" cy="150" r="9" fill="#388ccc"/></svg></div>
        <div class="map-info"><p class="eyebrow">${c.office}</p><p class="map-t">${co.address}</p><a class="link-arrow" href="https://maps.google.com/?q=10th+of+Ramadan+City" rel="noopener">${c.map} ${ico('arrow')}</a></div>
      </div>
    </div></section>`,
  ].join('\n');
};

/* =========================== 404 =========================== */
export const notFoundPage = (r) => {
  const n = L.t.notFound;
  return `
<section class="phero nf"><div class="container nf-inner">
  <div class="nf-pills" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
  <h1>${n.h1}</h1>
  <p class="phero-lead">${n.lead}</p>
  <div class="phero-actions"><a class="btn btn-primary" href="${r}index.html">${n.home} ${ico('arrow')}</a><a class="btn btn-ghost" href="${r}services/index.html">${n.solutions}</a><a class="btn btn-ghost" href="${r}contact.html">${n.contact}</a></div>
</div></section>`;
};
