// Integrations in 3D: the logo at the centre, integration tiles orbiting on
// two tilted rings, data packets flowing from the tiles into the core. Tilts
// toward the pointer; hovering a tile names it. Renders only while visible.
// Falls back to the CSS orbit already in the markup when WebGL is missing or
// the visitor prefers reduced motion.
import { THREE, C, logo3d, rbox, sph, tor, studio, mat } from './models3d.js';

const host = document.querySelector('[data-orbit3d]');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canGL = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } })();

if (host && canGL && !reduce) {
  const items = JSON.parse(host.dataset.items || '[]');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  const tip = document.createElement('span'); tip.className = 'orbit-tip'; host.appendChild(tip);
  host.classList.add('has-3d');

  const scene = new THREE.Scene();
  studio(renderer, scene, { shadowY: -2.35, shadowSize: 14, shadowOpacity: 0.1 });
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  cam.position.set(0, 2.4, 11.5); cam.lookAt(0, 0.1, 0);

  const world = new THREE.Group(); scene.add(world);
  const core = logo3d(); core.position.set(0, -0.95, 0); core.scale.setScalar(1.05); world.add(core);

  // icon textures from the page's own SVG sprite
  const iconTexture = (name) => {
    const sym = document.getElementById('i-' + name);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256" fill="none" stroke="#2b7bbd" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${sym ? sym.innerHTML : ''}</svg>`;
    const img = new Image();
    const cv = document.createElement('canvas'); cv.width = cv.height = 256;
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    img.onload = () => { cv.getContext('2d').drawImage(img, 28, 28, 200, 200); tex.needsUpdate = true; };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    return tex;
  };

  const rings = [
    { r: 2.5, tilt: 0.34, speed: 0.12, items: items.slice(0, 5) },
    { r: 3.8, tilt: -0.22, speed: -0.075, items: items.slice(5) },
  ];
  const tiles = [];
  rings.forEach((ring, ri) => {
    const pivot = new THREE.Group(); pivot.rotation.x = ring.tilt + 0.18; world.add(pivot);
    const line = tor(ring.r, 0.012, C.blue3, Math.PI * 2, { transparent: true, opacity: 0.55, roughness: 1 });
    line.rotation.x = Math.PI / 2; line.castShadow = false; pivot.add(line);
    ring.items.forEach((it, i) => {
      const t = new THREE.Group();
      const body = rbox(0.86, 0.86, 0.22, 0.12, C.white); t.add(body);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), new THREE.MeshBasicMaterial({ map: iconTexture(it.icon), transparent: true }));
      face.position.z = 0.115; t.add(face);
      t.userData = { name: it.name, a0: (i / ring.items.length) * Math.PI * 2 + ri * 0.4, ring, pivot, hover: 0 };
      pivot.add(t); tiles.push(t);
    });
  });

  // packets: small amber beads travelling from a tile to the core
  const packets = Array.from({ length: 7 }, (_, i) => {
    const m = sph(0.075, C.amber, { emissive: C.amber, emissiveIntensity: 0.35 }); m.castShadow = false; world.add(m);
    return { m, t: i / 7, from: tiles[(i * 3) % tiles.length] };
  });
  const tmp = new THREE.Vector3(), a = new THREE.Vector3(), ctrl = new THREE.Vector3(), target = new THREE.Vector3(0, 0.2, 0);

  // sizing
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight || w;
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  };
  resize(); new ResizeObserver(resize).observe(host);

  // pointer tilt + hover
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(9, 9);
  let tiltX = 0, tiltY = 0, hovered = null;
  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    tiltY = ptr.x * 0.25; tiltX = -ptr.y * 0.12;
  });
  host.addEventListener('pointerleave', () => { ptr.set(9, 9); tiltX = tiltY = 0; });

  let visible = false, last = performance.now(), time = 0;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { last = performance.now(); requestAnimationFrame(loop); } }, { threshold: 0.05 }).observe(host);

  function loop(now) {
    if (!visible || document.hidden) return;
    const dt = Math.min((now - last) / 1000, 0.05); last = now; time += dt;
    world.rotation.y += (tiltY - world.rotation.y) * 0.04;
    world.rotation.x += (tiltX - world.rotation.x) * 0.04;
    core.rotation.y = Math.sin(time * 0.5) * 0.35;
    core.position.y = -0.95 + Math.sin(time * 1.2) * 0.06;

    // hover
    ray.setFromCamera(ptr, cam);
    const hit = ray.intersectObjects(tiles, true)[0];
    const h = hit ? tiles.find(t => t === hit.object.parent || t === hit.object.parent?.parent) : null;
    if (h !== hovered) {
      hovered = h;
      tip.textContent = h ? h.userData.name : '';
      tip.classList.toggle('is-on', !!h);
      host.style.cursor = h ? 'pointer' : '';
    }

    tiles.forEach(t => {
      const u = t.userData;
      if (t !== hovered) u.a0 += u.ring.speed * dt;
      t.position.set(Math.cos(u.a0) * u.ring.r, 0, Math.sin(u.a0) * u.ring.r);
      u.hover += ((t === hovered ? 1 : 0) - u.hover) * 0.15;
      t.scale.setScalar(1 + u.hover * 0.22);
      t.quaternion.copy(cam.quaternion);                     // billboard, then undo parent tilt
      t.quaternion.premultiply(u.pivot.getWorldQuaternion(new THREE.Quaternion()).invert());
    });
    if (hovered) {
      hovered.getWorldPosition(tmp).project(cam);
      tip.style.left = ((tmp.x + 1) / 2 * 100) + '%';
      tip.style.top = ((-tmp.y + 1) / 2 * 100) + '%';
    }

    packets.forEach(p => {
      p.t += dt * 0.55;
      if (p.t >= 1) { p.t = 0; p.from = tiles[(Math.random() * tiles.length) | 0]; }
      p.from.getWorldPosition(a); world.worldToLocal(a);
      ctrl.copy(a).lerp(target, 0.5); ctrl.y += 1.1;
      const k = p.t, ik = 1 - k;
      p.m.position.set(ik * ik * a.x + 2 * ik * k * ctrl.x + k * k * target.x, ik * ik * a.y + 2 * ik * k * ctrl.y + k * k * target.y, ik * ik * a.z + 2 * ik * k * ctrl.z + k * k * target.z);
      p.m.scale.setScalar(Math.sin(Math.PI * k) * 1.2 + 0.2);
    });

    renderer.render(scene, cam);
    requestAnimationFrame(loop);
  }
}
