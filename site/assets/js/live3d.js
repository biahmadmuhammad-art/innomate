// Live 3D illustrations. Any element with data-model3d="kind:name" gets a
// WebGL canvas over its still image (the image stays as the fallback). A comma
// list ("sectors:food,sectors:pharma,…") makes a swapping stage: dispatch
// `m3d:show` with detail = index on the element or an ancestor to change model.
// Motion: a slow idle sway and float, a tilt toward the pointer, and on swap
// the old model spins out small while the new one springs in.
import { THREE, sectors, services, pages, studio, fit, frame } from './models3d.js';

const LIB = { sectors, services, pages };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = window.gsap;
const hasGL = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } })();

function mount(host) {
  const list = host.dataset.model3d.split(',').map(s => s.trim().split(':'));
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'm3d-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  studio(renderer, scene, { shadowOpacity: 0.18 });
  const cam = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  const tilt = new THREE.Group();            // pointer tilt
  scene.add(tilt);

  const cache = new Map();
  const views = new Map();
  const get = (i) => {
    if (!cache.has(i)) {
      const [kind, name] = list[i];
      const make = LIB[kind] && LIB[kind][name];
      if (!make) return null;
      const model = fit(make(), 3.5);
      model.rotation.y = -0.35;
      const pivot = new THREE.Group();       // idle sway + swap transforms
      pivot.add(model);
      // camera placement for this model, measured once
      const probe = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
      frame(probe, model, [5.4, 4.3, 6.6], 0.98);
      const box = new THREE.Box3().setFromObject(model);
      views.set(i, { pos: probe.position.clone(), look: box.getCenter(new THREE.Vector3()) });
      cache.set(i, pivot);
    }
    return cache.get(i);
  };

  let cur = -1, current = null;
  const camPos = new THREE.Vector3(), camLook = new THREE.Vector3(), wantPos = new THREE.Vector3(), wantLook = new THREE.Vector3();
  const show = (i, instant = false) => {
    if (i === cur) return;
    const next = get(i);
    if (!next) return;
    const prev = current;
    cur = i; current = next;
    wantPos.copy(views.get(i).pos); wantLook.copy(views.get(i).look);
    if (instant || !G || reduce) {
      if (prev) tilt.remove(prev);
      tilt.add(next); next.scale.setScalar(1); next.rotation.y = 0;
      camPos.copy(wantPos); camLook.copy(wantLook);
      return;
    }
    if (prev) {
      G.killTweensOf([prev.scale, prev.rotation]);
      G.to(prev.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.45, ease: 'power3.in', onComplete: () => tilt.remove(prev) });
      G.to(prev.rotation, { y: prev.rotation.y + 1.1, duration: 0.45, ease: 'power3.in' });
    }
    tilt.add(next);
    G.killTweensOf([next.scale, next.rotation]);
    next.scale.setScalar(0.001); next.rotation.y = -1.2;
    G.to(next.scale, { x: 1, y: 1, z: 1, duration: 1.0, ease: 'back.out(1.5)', delay: prev ? 0.28 : 0 });
    G.to(next.rotation, { y: 0, duration: 1.3, ease: 'expo.out', delay: prev ? 0.28 : 0 });
  };

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(host);
  resize();

  // pointer tilt (desktop)
  const ptr = { x: 0, y: 0 };
  if (matchMedia('(pointer: fine)').matches) {
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      ptr.x = (e.clientX - r.left) / r.width - 0.5; ptr.y = (e.clientY - r.top) / r.height - 0.5;
    });
    host.addEventListener('pointerleave', () => { ptr.x = ptr.y = 0; });
  }

  const evHost = host.closest('[data-m3d-events]') || host;
  evHost.addEventListener('m3d:show', (e) => show(+e.detail));
  show(+(evHost.dataset.m3dIndex || 0), true);   // the stage may mount after the list already moved

  let visible = false, raf = 0, first = true;
  const t0 = performance.now();
  const loop = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    const t = (performance.now() - t0) / 1000;
    if (current && !reduce) {
      current.children[0].rotation.y = -0.35 + Math.sin(t * 0.45) * 0.28;
      current.position.y = Math.sin(t * 1.1) * 0.07;
    }
    tilt.rotation.x += ((ptr.y * 0.18) - tilt.rotation.x) * 0.06;
    tilt.rotation.z += ((-ptr.x * 0.12) - tilt.rotation.z) * 0.06;
    camPos.lerp(wantPos, 0.07); camLook.lerp(wantLook, 0.07);
    cam.position.copy(camPos); cam.lookAt(camLook);
    renderer.render(scene, cam);
    if (first) { first = false; host.classList.add('is-3d'); }
    if (!reduce) raf = requestAnimationFrame(loop);
  };
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }, { rootMargin: '120px' }).observe(host);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(loop); });
}

if (hasGL) {
  // build each stage only when it is about to be seen
  const io = new IntersectionObserver((es) => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    try { mount(e.target); } catch (err) { console.warn('live3d', err); }
  }), { rootMargin: '300px' });
  document.querySelectorAll('[data-model3d]').forEach(el => io.observe(el));
}
