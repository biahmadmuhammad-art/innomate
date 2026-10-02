/* Innomate — site-wide behaviour.
   Motion model: Lenis smooths the scroll, GSAP's ticker drives Lenis, and
   every scroll-linked effect is a ScrollTrigger (scrubbed or triggered), so
   all of them move on the same smoothed timeline instead of reacting to raw
   wheel steps. Everything degrades to readable, static content. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 1100px)');
  const G = window.gsap, ST = window.ScrollTrigger;
  if (G && ST) G.registerPlugin(ST);

  /* ---------------- Smooth scroll ---------------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -90 } });
    if (G && ST) {
      lenis.on('scroll', ST.update);
      G.ticker.add((t) => lenis.raf(t * 1000));
      G.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  window.innoLenis = lenis;
  window.innoScrollTo = (target, opts = {}) => lenis ? lenis.scrollTo(target, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts }) : (typeof target === 'number' ? scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' }) : target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------------- Header: folds into a small island on the way down ----------------
     Scrolling down turns the full bar into a dark capsule (logo, a "Menu"
     button, the booking button); scrolling up, hovering it or pressing Menu
     unfolds it again. The width eases, so the bar visibly gathers itself. */
  const header = $('[data-header]');
  const hdr = $('.hdr', header);
  const dock = $('.dock'), wa = $('[data-wa-float]');
  let lastY = scrollY, ticking = false, pinnedOpen = false, anchorY = 0;
  const compact = (on) => {
    if (on === header.classList.contains('is-compact')) return;
    if (on && (header.classList.contains('is-open') || hdr.matches(':hover'))) return;
    header.classList.toggle('is-compact', on);
  };
  const onScroll = () => {
    const y = scrollY;
    if (pinnedOpen && Math.abs(y - anchorY) > 240) pinnedOpen = false;
    if (y < 120) compact(false);
    else if (y > lastY + 3 && !pinnedOpen) compact(true);
    else if (y < lastY - 8) compact(false);
    dock && dock.classList.toggle('is-on', y > 480);
    wa && wa.classList.toggle('is-on', y > 360);
    lastY = y; ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  const unfold = () => { pinnedOpen = true; anchorY = scrollY; compact(false); };
  $('[data-hdr-expand]')?.addEventListener('click', unfold);
  hdr.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && header.classList.contains('is-compact')) unfold(); });
  header.addEventListener('focusin', () => compact(false));

  /* ---------------- Mega menus ----------------
     Open on hover (with a short intent delay) or click. Close as soon as the
     pointer rests on anything that is neither the open trigger nor its panel:
     another nav link, the logo, the page behind (scrim), or outside the header. */
  const triggers = $$('[data-mega-trigger]');
  const scrim = $('[data-mega-scrim]');
  let openMega = null, openTimer = null, closeTimer = null;

  const openPanel = (btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (openMega && openMega.panel === panel) return;
    closePanel(true);
    panel.hidden = false;
    const inner = $('.mega-inner', panel), ir = inner.getBoundingClientRect(), br = btn.getBoundingClientRect();
    inner.style.setProperty('--ox', Math.round(br.left + br.width / 2 - ir.left) + 'px');
    btn.setAttribute('aria-expanded', 'true');
    header.classList.add('is-open');
    scrim.hidden = false;
    requestAnimationFrame(() => { panel.classList.add('is-open'); scrim.classList.add('is-on'); });
    openMega = { btn, panel };
  };
  const closePanel = (instant = false) => {
    clearTimeout(closeTimer);
    if (!openMega) return;
    const { btn, panel } = openMega;
    btn.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    scrim.classList.remove('is-on');
    header.classList.remove('is-open');
    const done = () => { if (!panel.classList.contains('is-open')) panel.hidden = true; if (!openMega) scrim.hidden = true; };
    instant ? done() : setTimeout(done, 380);
    openMega = null;
  };
  const scheduleClose = (ms = 160) => { clearTimeout(closeTimer); closeTimer = setTimeout(() => closePanel(), ms); };
  const cancelClose = () => clearTimeout(closeTimer);

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      isOpen ? closePanel() : openPanel(btn);
    });
    btn.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || !desktop.matches) return;
      cancelClose(); clearTimeout(openTimer);
      openTimer = setTimeout(() => openPanel(btn), openMega ? 0 : 110);
    });
    btn.addEventListener('pointerleave', () => clearTimeout(openTimer));
  });
  // Anything in the header that is not the open trigger or its panel closes it
  header.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse' || !openMega) return;
    const t = e.target;
    const onOwnTrigger = t.closest('[data-mega-trigger]') === openMega.btn;
    const onPanel = t.closest('.mega-inner') && t.closest('[data-mega]') === openMega.panel;
    if (onOwnTrigger || onPanel) cancelClose();
    else if (!t.closest('[data-mega-trigger]')) scheduleClose(t.closest('[data-mega-scrim]') ? 60 : 180);
  });
  header.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && openMega) scheduleClose(120); });
  scrim && scrim.addEventListener('click', () => closePanel());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openMega) { const b = openMega.btn; closePanel(); b.focus(); } });
  document.addEventListener('focusin', (e) => { if (openMega && !header.contains(e.target)) closePanel(); });
  addEventListener('scroll', () => { if (openMega && !openMega.panel.matches(':hover')) closePanel(); }, { passive: true });

  // solutions preview: hovered/focused service drives the preview pane
  const shots = $$('[data-shot]');
  const pTitle = $('[data-preview-title]'), pDesc = $('[data-preview-desc]');
  $$('.mega-link[data-preview]').forEach(a => {
    const show = () => {
      if (a.classList.contains('is-hot')) return;
      $$('.mega-link.is-hot').forEach(x => x.classList.remove('is-hot'));
      a.classList.add('is-hot');
      shots.forEach(s => s.classList.toggle('is-on', s.dataset.shot === a.dataset.preview));
      if (pTitle) { pTitle.textContent = a.querySelector('strong').textContent.trim(); pTitle.classList.remove('is-swap'); void pTitle.offsetWidth; pTitle.classList.add('is-swap'); }
      if (pDesc) pDesc.textContent = a.dataset.lead || '';
    };
    a.addEventListener('pointerenter', show);
    a.addEventListener('focus', show);
  });
  $$('.sector-tile[data-sector]').forEach(t => {
    const show = () => {
      $$('.sector-tile.is-hot').forEach(x => x.classList.remove('is-hot'));
      t.classList.add('is-hot');
      $$('[data-sector-detail]').forEach(d => d.classList.toggle('is-on', d.dataset.sectorDetail === t.dataset.sector));
    };
    t.addEventListener('pointerenter', show); t.addEventListener('focus', show);
  });

  /* ---------------- Mobile menu ---------------- */
  const burger = $('[data-burger]'), mm = $('[data-mobile-menu]');
  if (burger && mm) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.setAttribute('aria-label', open ? burger.dataset.labelOpen : burger.dataset.labelClose);
      if (!open) { mm.hidden = false; requestAnimationFrame(() => mm.classList.add('is-open')); document.body.style.overflow = 'hidden'; lenis && lenis.stop(); header.classList.remove('is-compact'); }
      else { mm.classList.remove('is-open'); document.body.style.overflow = ''; lenis && lenis.start(); setTimeout(() => { mm.hidden = true; }, 600); }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') burger.click(); });
  }

  /* ---------------- Reveal + mocks + counters ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.matches('[data-count]')) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal], .mock, .jstep, [data-count]').forEach(el => { if (!el.closest('.mega')) io.observe(el); });

  // headings rise out of a line as they arrive (CSS .rv-h). A fully clipped
  // element never reports as intersecting, so the parent is what is watched.
  const hio = new IntersectionObserver((entries) => entries.forEach(e => {
    if (!e.isIntersecting) return;
    [...e.target.children].forEach(c => c.classList.contains('rv-h') && c.classList.add('is-in'));
    hio.unobserve(e.target);
  }), { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  if (!reduce) $$('main h2, .phero h1').forEach(h => {
    if (h.closest('[data-reveal], .align-sec, .visually-hidden') || h.classList.contains('visually-hidden')) return;
    h.classList.add('rv-h'); hio.observe(h.parentElement);
  });

  // headings: reveal per word (Arabic words stay whole)
  $$('[data-split]').forEach(h => {
    if (h.closest('.mega') || reduce) return;
    const walk = (node) => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = 'sw';
            const i = document.createElement('span'); i.className = 'sw-i'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !['BR', 'svg'].includes(n.tagName)) {
          if (n.tagName === 'BDI') { const w = document.createElement('span'); w.className = 'sw'; n.replaceWith(w); const i = document.createElement('span'); i.className = 'sw-i'; i.appendChild(n); w.appendChild(i); }
          else walk(n);
        }
      });
    };
    walk(h);
    $$('.sw-i', h).forEach((s, i) => s.style.setProperty('--wi', i));
    h.classList.add('is-split');
    io.observe(h);
  });

  function countUp(el) {
    const target = +el.dataset.count;
    if (!target || reduce) return;
    const fmt = (v) => el.dataset.format === 'egp' ? v.toLocaleString('en-US') : String(v);
    const obj = { v: 0 };
    if (G) G.to(obj, { v: target, duration: 1.6, ease: 'expo.out', onUpdate: () => (el.textContent = fmt(Math.round(obj.v))) });
  }

  /* ---------------- IoT live values ---------------- */
  $$('[data-tick]').forEach(el => {
    if (reduce) return;
    let v = parseFloat(el.textContent.replace(/,/g, ''));
    const kind = el.dataset.tick;
    setInterval(() => {
      if (!el.closest('.is-in, .mega-shot.is-on')) return;
      if (kind === 'pcs') { v += 1 + (Math.random() * 3 | 0); el.textContent = v.toLocaleString('en-US'); }
      else { v += (Math.random() - .5) * (kind === 'temp' ? .6 : .4); el.textContent = v.toFixed(1); }
    }, 900);
  });

  /* ---------------- Stacked cards (grigoletti.ch pattern) ----------------
     --enter (.92→1) grows a card as it travels to its sticky top; --p (0→1)
     is how far the next card has covered it, which pushes it back. Both are
     scrubbed by ScrollTrigger on the smoothed scroll. */
  if (G && ST && !reduce) {
    const mm2 = G.matchMedia();
    mm2.add('(min-width: 900px)', () => {
      const made = [];
      $$('[data-stack]').forEach(stack => {
        const cards = $$('[data-stack-card]', stack);
        const topOf = (c) => parseFloat(getComputedStyle(c).top) || 100;
        cards.forEach((card, i) => {
          made.push(ST.create({ trigger: card, start: 'top bottom', end: () => `top top+=${topOf(card)}`, scrub: true,
            onUpdate: (st) => card.style.setProperty('--enter', (0.92 + 0.08 * st.progress).toFixed(4)) }));
          const next = cards[i + 1];
          if (next) made.push(ST.create({ trigger: next, start: 'top bottom', end: () => `top top+=${topOf(next)}`, scrub: true,
            onUpdate: (st) => card.style.setProperty('--p', st.progress.toFixed(4)) }));
        });
      });
      // Fanned rows: pulled into the middle, tilted, then spread with the scroll
      $$('[data-fan]').forEach(fan => {
        const cards = [...fan.children], n = cards.length;
        const tilt = [-7, 5, -3, 8, -5, 4];
        const tl = G.timeline({ scrollTrigger: { trigger: fan, start: 'top 92%', end: 'top 38%', scrub: 0.9, invalidateOnRefresh: true } });
        cards.forEach((c, i) => {
          c.style.zIndex = String(i + 1);
          tl.from(c, {
            x: () => fan.clientWidth / 2 - (c.offsetLeft + c.offsetWidth / 2) + (i - (n - 1) / 2) * 34,
            y: () => (i % 2 ? 26 : -8) + i * 4,
            rotation: tilt[i % tilt.length], ease: 'power2.out',
          }, 0);
        });
        made.push(tl.scrollTrigger);
      });
      return () => { made.forEach(s => s.kill()); $$('[data-fan] > *').forEach(c => { G.set(c, { clearProps: 'transform,zIndex' }); }); $$('[data-stack-card]').forEach(c => { c.style.removeProperty('--p'); c.style.removeProperty('--enter'); }); };
    });
  }

  /* ---------------- Journey: pinned horizontal scroll (pmmd.net pattern) ----------------
     Home "five phases" and the How We Work phases. Desktop pins the section
     and slides the track sideways; phones scroll the track natively. */
  $$('[data-journey]').forEach(journey => {
    const track = $('[data-journey-track]', journey), bar = $('[data-journey-bar]', journey);
    if (G && ST && !reduce) {
      G.matchMedia().add('(min-width: 1000px)', () => {
        journey.classList.add('is-pinned');
        const isRTL = document.documentElement.dir === 'rtl';
        const dist = () => track.scrollWidth - innerWidth;
        const tween = G.to(track, {
          x: () => (isRTL ? 1 : -1) * dist(), ease: 'none',
          scrollTrigger: {
            trigger: journey, pin: $('.journey-pin', journey), start: 'top top', end: () => '+=' + dist(), scrub: 1, invalidateOnRefresh: true,
            onUpdate: (st) => bar && bar.style.setProperty('--jp', Math.max(.08, st.progress)),
          },
        });
        $$('.jstep', track).forEach(step => ST.create({ trigger: step, containerAnimation: tween, start: isRTL ? 'right 85%' : 'left 85%', onEnter: () => step.classList.add('is-in') }));
        return () => { journey.classList.remove('is-pinned'); G.set(track, { clearProps: 'transform' }); };
      });
    }
    track.addEventListener('scroll', () => {
      const max = track.scrollWidth - track.clientWidth;
      bar && bar.style.setProperty('--jp', Math.max(.08, max ? Math.abs(track.scrollLeft) / max : 0));
    }, { passive: true });
  });

  /* ---------------- Client words: tabs that advance on their own ----------------
     The active tab's progress line is a CSS animation; when it ends, the next
     quote comes up. Hovering pauses the line, so it also pauses the change. */
  $$('[data-testi]').forEach(box => {
    const tabs = $$('[data-tt]', box), quotes = $$('.testi-quote', box);
    let cur = 0;
    const show = (i) => {
      if (i === cur) return;
      const from = quotes[cur], to = quotes[i];
      tabs.forEach((t, k) => { t.classList.toggle('is-on', k === i); t.setAttribute('aria-selected', String(k === i)); });
      quotes.forEach((q, k) => q.setAttribute('aria-hidden', String(k !== i)));
      from.classList.remove('is-on'); from.classList.add('is-out');
      to.classList.add('is-on');
      setTimeout(() => from.classList.remove('is-out'), 700);
      cur = i;
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
    box.addEventListener('animationend', (e) => { if (e.target.closest('.testi-tab.is-on')) show((cur + 1) % tabs.length); });
    box.addEventListener('pointerenter', () => box.classList.add('is-paused'));
    box.addEventListener('pointerleave', () => box.classList.remove('is-paused'));
    box.addEventListener('focusin', () => box.classList.add('is-paused'));
    box.addEventListener('focusout', () => box.classList.remove('is-paused'));
    new IntersectionObserver((es) => box.classList.toggle('is-running', es[0].isIntersecting), { threshold: .3 }).observe(box);
  });

  /* ---------------- Filters (clients, resources) ---------------- */
  $$('[data-filter]').forEach(group => {
    const list = group.nextElementSibling;
    group.addEventListener('click', (e) => {
      const b = e.target.closest('.filter-btn'); if (!b) return;
      $$('.filter-btn', group).forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      const f = b.dataset.f;
      $$('[data-f]', list).forEach(item => item.classList.toggle('is-filtered-out', f !== 'all' && item.dataset.f !== f));
      ST && ST.refresh();
    });
  });

  /* ---------------- Estimator ---------------- */
  const est = $('[data-estimator]');
  if (est) {
    const calc = () => {
      const users = +est.querySelector('[name=users]:checked').value;
      const br = +est.querySelector('[name=branches]:checked').value;
      const mods = $$('[name=mod]:checked', est);
      const w = mods.reduce((a, m) => a + +m.dataset.w, 0);
      const onlyEta = mods.length === 1 && mods[0].value === 'eta';
      let lo = onlyEta ? 2 : Math.max(4, 2 + w + users + br * 1.5);
      lo = Math.round(Math.min(lo, 14));
      const hi = onlyEta ? 4 : Math.min(lo + 2 + (users > 1 ? 1 : 0), 16);
      $('[data-est-weeks]', est).textContent = `${lo}–${hi}`;
      const hasMfg = mods.some(m => m.value === 'mfg');
      $('[data-est-pkg]', est).textContent = onlyEta ? est.dataset.pkgEta : (hasMfg || w >= 8 || br === 2) ? est.dataset.pkgFactory : est.dataset.pkgStarter;
      const cta = $('[data-est-cta]', est);
      cta.href = cta.href.split('?')[0] + `?weeks=${lo}-${hi}&mods=${mods.map(m => m.value).join(',')}`;
    };
    est.addEventListener('change', calc); calc();
  }

  /* ---------------- Contact form (front-end only in the prototype) ---------------- */
  const form = $('[data-contact-form]');
  if (form) {
    const params = new URLSearchParams(location.search);
    const pkg = params.get('package'), mods = params.get('mods');
    const msg = form.querySelector('#f-msg');
    const d = form.dataset;
    if (pkg || mods) msg.value = `${pkg ? d.prePkg + pkg + '\n' : ''}${mods ? d.preMods + mods + '\n' : ''}${params.get('weeks') ? d.preWeeks + params.get('weeks') + d.preWeeksUnit + '\n' : ''}`;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = $('[data-form-status]', form);
      let bad = null;
      $$('[required]', form).forEach(inp => {
        const ok = inp.value.trim() && (inp.type !== 'tel' || /^[+\d\s-]{8,}$/.test(inp.value));
        inp.setAttribute('aria-invalid', String(!ok));
        if (!ok && !bad) bad = inp;
      });
      if (bad) { status.textContent = form.dataset.msgErr; status.className = 'form-note is-err'; bad.focus(); return; }
      status.textContent = form.dataset.msgOk;
      status.className = 'form-note is-ok';
      form.querySelector('button[type=submit]').disabled = true;
    });
  }

  // Phones and short screens: FAQs start collapsed so the section fits one screen
  if (matchMedia('(max-width: 899px), (max-height: 820px)').matches) $$('.faq-item[open]').forEach(d => d.removeAttribute('open'));

  // Fonts change line lengths; re-measure pins once they are in.
  document.fonts && document.fonts.ready.then(() => ST && ST.refresh());
})();
