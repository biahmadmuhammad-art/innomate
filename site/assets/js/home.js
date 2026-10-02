/* Home-only motion: hero intro + word roll + parallax, the a-lign quote,
   AI agent demo, and the pinned industries list
   (the horizontal journey lives in main.js; inner pages use it too). Pins are created in page order so ScrollTrigger
   spaces them correctly. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isRTL = document.documentElement.dir === 'rtl';
  const G = window.gsap, ST = window.ScrollTrigger;
  const motion = G && ST && !reduce;

  /* ---------------- Hero intro: the logo pills rise, then the screen ---------------- */
  const heroIn = $$('[data-hero-in]');
  const screen = $('.hero-screen');
  if (motion) {
    G.timeline({ defaults: { ease: 'expo.out' } })
      .from('.hp', { yPercent: 60, opacity: 0, duration: 1.6, stagger: 0.1 })
      .from(heroIn, { y: 30, opacity: 0, duration: 1.3, stagger: 0.09 }, 0.1)
      .from(screen, { y: 70, opacity: 0, scale: 0.95, duration: 1.5 }, 0.4);
    setTimeout(() => screen?.querySelector('.mock')?.classList.add('is-in'), 900);
  } else screen?.querySelector('.mock')?.classList.add('is-in');

  /* ---------------- Hero word rotation ----------------
     The box is as wide as the longest word (hidden copies), so the heading
     never reflows; only the word itself rolls up and the next rolls in. */
  const word = $('[data-words]');
  if (word && G && !reduce) {
    const words = JSON.parse(word.dataset.words);
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % words.length;
      const old = $('.hw-i', word);
      const next = document.createElement('span');
      next.className = 'hw-i'; next.textContent = words[i];
      word.appendChild(next);
      G.to(old, { yPercent: -110, duration: 0.8, ease: 'expo.inOut', onComplete: () => old.remove() });
      G.fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.inOut' });
    }, 3000);
  }

  /* ---------------- Hero parallax (pointer), eased with quickTo ---------------- */
  const vis = $('[data-hero-visual]');
  if (vis && motion && matchMedia('(pointer: fine)').matches) {
    const layers = $$('[data-depth]', vis).map(el => ({ d: +el.dataset.depth, x: G.quickTo(el, 'x', { duration: 1.2, ease: 'expo.out' }), y: G.quickTo(el, 'y', { duration: 1.2, ease: 'expo.out' }) }));
    addEventListener('pointermove', (e) => {
      const tx = e.clientX / innerWidth - .5, ty = e.clientY / innerHeight - .5;
      layers.forEach(l => { l.x(tx * l.d * -14); l.y(ty * l.d * -12); });
    }, { passive: true });
  }

  /* ---------------- "Why one system": words align (a-lign.studio) ---------------- */
  const al = $('[data-align]');
  if (al) {
    const words = $$('.al-word', al), lines = $$('.al-line', al), cap = $('[data-al-cap]', al);
    const typeCaption = () => {
      const text = cap.dataset.text;
      if (reduce) { cap.textContent = text; return; }
      let n = 0;
      const glyph = isRTL ? 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*';
      const tick = () => {
        n += 2;
        const done = text.slice(0, Math.max(0, n - 6));
        const noise = [...text.slice(Math.max(0, n - 6), n)].map(ch => ch === ' ' ? ' ' : glyph[(Math.random() * glyph.length) | 0]).join('');
        cap.textContent = done + noise;
        if (n < text.length + 6) setTimeout(tick, 28); else cap.textContent = text;
      };
      tick();
    };
    if (!motion) { words.forEach(w => w.classList.add('is-set')); al.classList.add('is-in'); typeCaption(); }
    else {
      const modes = ['flex-end', 'flex-start', 'flex-end', 'center', 'flex-start', 'space-around'];
      let played = false;
      const scatter = () => {
        if (played) return;
        G.set(words, { x: 0 });
        const finals = words.map(w => w.getBoundingClientRect().left);
        lines.forEach((ln, i) => { ln.style.justifyContent = modes[i % modes.length]; });
        const scat = words.map(w => w.getBoundingClientRect().left);
        lines.forEach(ln => { ln.style.justifyContent = ''; });
        words.forEach((w, i) => G.set(w, { x: scat[i] - finals[i] }));
      };
      scatter();
      document.fonts && document.fonts.ready.then(scatter);
      addEventListener('resize', scatter);
      ST.create({
        trigger: al, start: 'top 30%', once: true,
        onEnter: () => {
          played = true;
          al.classList.add('is-in');
          G.to(words, { x: 0, duration: 1.1, ease: 'expo.inOut', stagger: 0.085, onComplete: typeCaption });
          words.forEach((w, i) => setTimeout(() => w.classList.add('is-set'), 700 + i * 85));
        },
      });
    }
  }

  /* ---------------- AI agent demo ---------------- */
  const demo = $('[data-ai-demo]');
  if (demo) {
    const data = JSON.parse($('[data-ai-data]').textContent);
    const thread = $('[data-ai-thread]', demo);
    const typing = $('[data-ai-typing]', demo);
    let run = 0;
    const wait = (ms) => new Promise(r => setTimeout(r, reduce ? 0 : ms));
    const play = async (key) => {
      const id = ++run;
      const a = data.find(d => d.key === key);
      thread.innerHTML = ''; typing.innerHTML = '';
      for (let i = 1; i <= a.q.length; i += 2) {
        if (id !== run) return;
        typing.innerHTML = a.q.slice(0, i) + '<span class="caret"></span>';
        await wait(24);
      }
      await wait(280); if (id !== run) return;
      typing.innerHTML = '';
      thread.insertAdjacentHTML('beforeend', `<div class="m-msg me">${a.q}</div>`);
      await wait(380); if (id !== run) return;
      thread.insertAdjacentHTML('beforeend', `<div class="m-typing"><span class="pills"><i></i><i></i><i></i></span> ${demo.dataset.reading}</div>`);
      await wait(1100); if (id !== run) return;
      thread.lastElementChild.remove();
      thread.insertAdjacentHTML('beforeend', `<div class="m-msg bot">${a.a}<span class="m-src">${a.src}</span></div>`);
      await wait(700); if (id !== run) return;
      thread.insertAdjacentHTML('beforeend', `<div class="m-action"><div><b>${a.act}</b><small>${a.actSub}</small></div><span class="m-approve">${demo.dataset.approve}</span></div>`);
    };
    const tabs = $$('.ai-tab');
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => { x.classList.toggle('is-on', x === t); x.setAttribute('aria-selected', String(x === t)); });
      play(t.dataset.agent);
    }));
    let started = false;
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting && !started) { started = true; play(data[0].key); o.disconnect(); } }, { threshold: .4 }).observe(demo);
  }

  /* ---------------- Industries: pinned list, fixed image ---------------- */
  const sx = $('[data-sectors]');
  if (sx) {
    const items = $$('.sx-item', sx), btns = $$('[data-sx]', sx), imgs = $$('[data-sx-img]', sx), cards = $$('[data-sx-card]', sx);
    const list = $('.sx-list', sx);
    const n = items.length;
    let cur = 0, st = null;
    const setActive = (i) => {
      if (i === cur) return;
      cur = i;
      items.forEach((it, k) => it.classList.toggle('is-on', k === i));
      btns.forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
      imgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
      cards.forEach((c, k) => c.classList.toggle('is-on', k === i));
      sx.dataset.m3dIndex = i;
      sx.dispatchEvent(new CustomEvent('m3d:show', { detail: i }));
      if (list.scrollWidth > list.clientWidth + 4) {           // chips row on phones
        const b = btns[i];
        const off = b.offsetLeft - (list.clientWidth - b.offsetWidth) / 2;
        list.scrollTo({ left: off, behavior: reduce ? 'auto' : 'smooth' });
      }
    };
    if (motion) {
      st = ST.create({
        trigger: sx, pin: '.sx-pin', start: 'top top', end: () => '+=' + innerHeight * 0.12 * (n - 1),   // ~1.5 screens for all thirteen
        onUpdate: (s) => setActive(Math.round(s.progress * (n - 1))),
      });
    }
    btns.forEach((b, i) => b.addEventListener('click', () => {
      if (st) window.innoScrollTo(st.start + (st.end - st.start) * (i / (n - 1)) + 2);
      else setActive(i);
    }));
  }
  // main.js made the journey pin before the pins above it: put them back in page order
  if (motion) { ST.sort(); ST.refresh(); }
})();
