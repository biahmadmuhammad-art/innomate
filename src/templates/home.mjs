// Home page. Section order and each section's job:
// hero (state the offer, earn a scroll) → problem statement (a-lign quote) →
// services stack (what we do) → AI demo (the differentiator) → journey (how
// we work, removes risk) → industries (find yourself) → clients (proof) →
// integrations (3D) → why us + numbers → client words → FAQ → CTA.
// The ETA spotlight lives on the ETA service page; the numbers sit in "why".
import { ico, bidi, esc, A } from './layout.mjs';
import { stackCards, testimonialsBlock, faqBlock, ctaBand, clientsSec } from './blocks.mjs';
import { L } from '../content/locale.mjs';

const hero = (r, mocks, h) => `
<section class="hero" data-hero>
  <div class="container hero-grid">
    <div class="hero-copy">
      <h1 class="hero-title" data-hero-in>
        <span class="hero-line">${h.line1}</span>
        <span class="hero-line">${h.line2} <span class="hero-word" data-words='${JSON.stringify(h.words)}' aria-live="off">${h.words.map(w => `<span class="hw-g" aria-hidden="true">${w}</span>`).join('')}<span class="hw-i">${h.words[0]}</span></span></span>
        <span class="hero-line hero-line--muted">${h.line3}</span>
      </h1>
      <p class="hero-lead" data-hero-in>${h.lead}</p>
      <div class="hero-actions" data-hero-in>
        <a class="btn btn-primary" href="${r}contact.html">${h.primary} ${ico('arrow')}</a>
        <a class="btn btn-ghost" href="#journey">${h.secondary}</a>
      </div>
      <div class="hero-proof" data-hero-in>
        <p>${h.proof}</p>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true" data-hero-visual>
      <div class="hero-pills">
        <span class="hp hp-dot" data-depth=".25"></span>
        <span class="hp hp-i" data-depth=".25"></span>
        <span class="hp hp-a" data-depth=".45"></span>
        <span class="hp hp-b" data-depth=".6"></span>
      </div>
      <div class="hero-screen" data-depth="1">${mocks.erp}</div>
    </div>
  </div>
</section>`;

// "Why one system" — a-lign.studio's quote: words start scattered across
// their lines and slide, one by one, into a fully justified block.
const bars = (n = 14) => Array.from({ length: n }, (_, i) => {
  const t = i / (n - 1);                                   // 0→1 down the bracket
  const off = Math.round(58 * Math.sin(Math.PI * t));      // equal bars shifted along a curve: a "(" in bars
  const w = [30, 44, 36, 52, 40][i % 5];
  return `<i style="--w:${w}%;--off:${off}%;--i:${i}"></i>`;
}).join('');
const alignSec = (h) => {
  const a = h.align;
  let wi = 0;
  const lines = a.lines.map((line, li) => {
    const words = line.split(' ');
    return `<span class="al-line">${words.map((w, i) => {
      const first = li === 0 && i === 0, last = li === a.lines.length - 1 && i === words.length - 1;
      return `<span class="al-word" style="--wi:${wi++}">${first ? `<span class="al-q">${a.open}</span>` : ''}${w}${last ? `<span class="al-q">${a.close}</span>` : ''}</span>`;
    }).join('')}</span>`;
  }).join('');
  return `
<section class="align-sec" id="problem" aria-label="${a.label}" data-align>
  <p class="visually-hidden">${a.lines.join(' ')} ${a.caption}</p>
  <div class="al-stage" aria-hidden="true">
    <span class="al-bracket al-bracket--s">${bars()}</span>
    <div class="al-quote">${lines}
      <p class="al-cap" data-al-cap data-text="${a.caption}"></p>
    </div>
    <span class="al-bracket al-bracket--e">${bars()}</span>
  </div>
</section>`;
};

const servicesStack = (r, mocks, h) => `
<section class="section services-sec" id="services" aria-labelledby="services-h">
  <div class="container">
    <div class="sec-head services-head">
      <h2 id="services-h">${h.svcTitle}</h2>
      <p>${h.svcLead}</p>
    </div>
    ${stackCards(r, mocks)}
    <div class="services-more"><a class="btn btn-ghost" href="${r}services/index.html">${h.svcMore} ${ico('arrow')}</a></div>
  </div>
</section>`;

const aiDemo = (r, h) => `
<section class="section ai-sec" id="ai" aria-labelledby="ai-h">
  <div class="container ai-grid">
    <div class="ai-copy">
      <h2 id="ai-h">${h.aiTitle}</h2>
      <p class="ai-lead" data-reveal>${h.aiLead}</p>
      <div class="ai-tabs" role="tablist" aria-label="${h.aiTabsLabel}">
        ${h.agents.map((a, i) => `<button class="ai-tab${i === 0 ? ' is-on' : ''}" role="tab" aria-selected="${i === 0}" data-agent="${a.key}">${ico(a.icon)}<span>${a.label}</span></button>`).join('')}
      </div>
      <ul class="ai-guard" data-reveal>
        <li>${ico('shield')}${h.aiGuard[0]}</li>
        <li>${ico('check')}${h.aiGuard[1]}</li>
        <li>${ico('refresh')}${h.aiGuard[2]}</li>
      </ul>
      <a class="link-arrow" href="${r}services/ai-agents.html">${h.aiLink} ${ico('arrow')}</a>
    </div>
    <div class="ai-demo" data-reveal="scale">
      <div class="mock mock--ai mock--live" data-ai-demo data-reading="${h.aiReading}" data-approve="${h.aiApprove}">
        <div class="mock-bar"><span class="mock-title">${h.aiWindow}</span><span class="m-live">${h.aiLive}</span></div>
        <div class="mock-body"><div class="m-ai" data-ai-thread></div>
          <div class="ai-input"><span data-ai-typing></span><span class="ai-send">${ico('arrow')}</span></div>
        </div>
      </div>
      <script type="application/json" data-ai-data>${JSON.stringify(h.agents)}</script>
    </div>
  </div>
</section>`;

// Diagrams follow the reading direction: flows run right→left in Arabic.
export const journeyArt = (h) => {
  const rtl = L.dir === 'rtl';
  const px = (i) => rtl ? 176 - i * 42 : 8 + i * 42;
  return {
    sketch: `<svg viewBox="0 0 220 140" class="jart jart--sketch"><path class="draw" d="M20 40 h50 v28 h-50z M100 20 h50 v28 h-50z M100 90 h50 v28 h-50z M170 55 h36 v28 h-36z" /><path class="draw d2" d="M70 54 C85 54 85 34 100 34 M70 54 C85 54 85 104 100 104 M150 34 C165 34 160 69 170 69 M150 104 C165 104 160 69 170 69"/><circle class="draw d3" cx="45" cy="100" r="12"/><path class="draw d3" d="M40 100 l4 4 7-8"/></svg>`,
    pipeline: `<svg viewBox="0 0 220 140" class="jart"><g class="jp">${h.pipeline.map((t, i) => `<rect x="${px(i)}" y="54" width="36" height="32" rx="16" class="jp-node" style="--i:${i}"/><text x="${px(i) + 18}" y="74" text-anchor="middle">${t}</text>`).join('')}</g></svg>`,
    migrate: `<svg viewBox="0 0 220 140" class="jart"><g class="jm"${rtl ? ' transform="translate(220 0) scale(-1 1)"' : ''}>${[0, 1, 2, 3].map(i => `<rect x="14" y="${22 + i * 26}" width="62" height="16" rx="4" class="jm-row" style="--i:${i}"/>`).join('')}${[0, 1, 2, 3].map(i => `<rect x="144" y="${22 + i * 26}" width="62" height="16" rx="8" class="jm-row jm-new" style="--i:${i}"/>`).join('')}<path d="M86 70 h48" class="jm-arrow"/><path d="M126 62 l8 8 -8 8" class="jm-arrow"/></g></svg>`,
    train: `<svg viewBox="0 0 220 140" class="jart"><rect x="40" y="22" width="140" height="84" rx="10" class="jt-screen"/><rect x="54" y="36" width="60" height="8" rx="4" class="jt-l"/><rect x="54" y="52" width="100" height="8" rx="4" class="jt-l"/><rect x="54" y="68" width="80" height="8" rx="4" class="jt-l"/><circle cx="160" cy="84" r="10" class="jt-ok"/><path d="M155 84 l4 4 6-7" class="jt-tick"/><path d="M90 106 h40 M110 106 v14 M92 120 h36" class="jt-stand"/></svg>`,
    live: `<svg viewBox="0 0 220 140" class="jart"><g class="jl">${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${30 + i * 24}" y="${110 - [30, 44, 38, 58, 52, 72, 86][i]}" width="12" height="${[30, 44, 38, 58, 52, 72, 86][i]}" rx="6" class="jl-bar" style="--i:${i}"/>`).join('')}</g><circle cx="190" cy="26" r="6" class="jl-pulse"/></svg>`,
  };
};

const journey = (r, h) => {
  const art = journeyArt(h);
  return `
<section class="journey" id="journey" aria-labelledby="journey-h" data-journey>
  <div class="journey-pin">
    <div class="container journey-head">
      <div>
        <h2 id="journey-h">${h.jTitle}</h2>
      </div>
      <p class="journey-sub" data-reveal>${h.jSub}</p>
    </div>
    <div class="journey-track" data-journey-track>
      ${h.jSteps.map((s, i) => `
      <article class="jstep" style="--i:${i}">
        <div class="jstep-art">${art[s.art]}</div>
        <div class="jstep-meta"><span class="jstep-no num">${s.no}</span><span class="chip">${s.w}</span></div>
        <h3>${s.t}</h3>
        <p>${s.d}</p>
      </article>`).join('')}
      <a class="jstep jstep--end" href="${r}how-we-work.html"><span>${h.jMore}</span>${ico('arrow')}</a>
    </div>
    <div class="container journey-progress" aria-hidden="true"><span class="jp-bar"><i data-journey-bar></i></span></div>
  </div>
</section>`;
};

// Industries — pinned: the list's active row and the fixed image change with
// scroll; clicking a row jumps the scroll to it.
const sectorsSec = (r, h) => `
<section class="sectors-sec" id="sectors" aria-labelledby="sectors-h" data-sectors data-m3d-events>
  <div class="sx-pin">
    <div class="container sx-grid">
      <div class="sx-left">
        <h2 id="sectors-h" class="sx-title">${h.secTitle}</h2>
        <ol class="sx-list" role="tablist" aria-label="${h.secEyebrow}">
          ${L.sectors.map((s, i) => `
          <li style="--i:${i}" class="sx-item${i === 0 ? ' is-on' : ''}" role="presentation">
            <button class="sx-btn" role="tab" aria-selected="${i === 0}" data-sx="${i}"><span class="sx-name">${s.short}</span></button>
          </li>`).join('')}
        </ol>
        <p class="sx-hint">${h.sectorsHint}</p>
      </div>
      <div class="sx-right">
        <div class="sx-media" data-model3d="${L.sectors.map(s => `sectors:${s.slug}`).join(',')}">
          ${L.sectors.map((s, i) => `<img class="sx-img${i === 0 ? ' is-on' : ''}" src="${A(r)}assets/img/sectors/${s.slug}.webp" alt="" width="900" height="900" ${i < 2 ? '' : 'loading="lazy"'} data-sx-img="${i}">`).join('')}
        </div>
        <div class="sx-cards">        ${L.sectors.map((s, i) => `
        <div class="sx-card${i === 0 ? ' is-on' : ''}" data-sx-card="${i}">
          <p class="sx-card-t">${bidi(s.h1)}</p>
          <ul>${s.modules.slice(0, 3).map(m => `<li>${m[0]}</li>`).join('')}</ul>
          <a class="link-arrow" href="${r}sectors/${s.slug}.html">${L.t.megaSectors.solutionsFor(s.short)} ${ico('arrow')}</a>
        </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>`;

const integrationsSec = (r, h) => `
<section class="section integ-sec" id="integrations" aria-labelledby="integ-h">
  <div class="container integ-grid">
    <div class="integ-copy">
      <h2 id="integ-h">${h.intTitle}</h2>
      <p data-reveal>${h.intLead}</p>
      <ul class="integ-list">
        ${L.integrations.slice(0, 6).map((it, i) => `<li data-reveal style="--d:${i * 60}ms"><a href="${r}${it.link}">${ico(it.icon)}<span><b>${bidi(it.name)}</b><small>${bidi(it.desc)}</small></span></a></li>`).join('')}
      </ul>
      <a class="link-arrow" href="${r}integrations.html">${h.intAll} ${ico('arrow')}</a>
    </div>
    <div class="orbit" aria-hidden="true" data-orbit3d data-items="${esc(JSON.stringify(L.integrations.map(i => ({ icon: i.icon, name: i.name }))))}">
      <div class="orbit-ring orbit-ring--1"></div>
      <div class="orbit-ring orbit-ring--2"></div>
      <div class="orbit-core"><svg viewBox="0 0 44 36"><circle cx="5.5" cy="5.5" r="5.5" fill="#66a8dc"/><rect y="14" width="11" height="22" rx="5.5" fill="#66a8dc"/><rect x="16.5" width="11" height="36" rx="5.5" fill="#388ccc"/><rect x="33" width="11" height="36" rx="5.5" fill="#388ccc"/></svg><span lang="en">ERPNext</span></div>
      <div class="orbit-spin orbit-spin--1">
        ${L.integrations.slice(0, 5).map((it, i) => `<span class="orbit-node" style="--a:${i * 72}deg">${ico(it.icon)}<em>${it.en.split(' ')[0]}</em></span>`).join('')}
      </div>
      <div class="orbit-spin orbit-spin--2">
        ${L.integrations.slice(5, 10).map((it, i) => `<span class="orbit-node orbit-node--sm" style="--a:${i * 72 + 36}deg">${ico(it.icon)}</span>`).join('')}
      </div>
      <span class="orbit-packet" style="--a:20deg"></span><span class="orbit-packet" style="--a:160deg;--dl:1.2s"></span><span class="orbit-packet" style="--a:260deg;--dl:2.1s"></span>
    </div>
  </div>
</section>`;

const why = (h) => {
  const [local, open, weeks, support, beyond] = h.why;
  return `
<section class="section why-sec" aria-labelledby="why-h">
  <div class="container">
    <div class="why-head">
      <h2 id="why-h">${h.whyTitle}</h2>
      <dl class="why-nums">${L.stats.slice(0, 3).map(s => `<div class="why-num"><dt class="num"><span data-count="${s.value}">${s.value}</span>${s.suffix}</dt><dd>${s.label}</dd></div>`).join('')}</dl>
    </div>
    <div class="why-bento">
      <article class="why-card why-card--wide" data-reveal><div class="why-in">
        <span class="why-k">${local[0]}</span>
        <h3>${local[1]}</h3>
        <p>${local[2]}</p>
        
      </div></article>
      <article class="why-card why-card--blue" data-reveal style="--d:80ms"><div class="why-in">
        <span class="why-k">${open[0]}</span>
        <h3>${open[1]}</h3>
        <p>${open[2]}</p>
      </div></article>
      <article class="why-card" data-reveal style="--d:120ms"><div class="why-in">
        <span class="why-k num">${weeks[0]}</span>
        <h3>${weeks[1]}</h3>
        <p>${weeks[2]}</p>
      </div></article>
      <article class="why-card" data-reveal style="--d:160ms"><div class="why-in">
        <span class="why-k num">${support[0]}</span>
        <h3>${support[1]}</h3>
        <p>${support[2]}</p>
      </div></article>
      <article class="why-card why-card--ink why-card--wide" data-reveal style="--d:200ms"><div class="why-in">
        <span class="why-k">${beyond[0]}</span>
        <h3>${beyond[1]}</h3>
        <p>${beyond[2]}</p>
        <div class="why-chips">${h.whyChips.map(c => `<span class="chip chip--dark">${c}</span>`).join('')}</div>
      </div></article>
    </div>
  </div>
</section>`;
};

export const homeFaq = () => L.faqs.slice(0, 6).map(f => [f.q, f.a]);

export const homePage = (r, mocks) => {
  const h = L.t.homeCopy;
  return [
    hero(r, mocks, h),
    alignSec(h),
    servicesStack(r, mocks, h),
    aiDemo(r, h),
    journey(r, h),
    sectorsSec(r, h),
    clientsSec(r),
    integrationsSec(r, h),
    why(h),
    testimonialsBlock(r),
    faqBlock(homeFaq(), { lead: h.faqLead }),
    ctaBand(r),
  ].join('\n');
};
