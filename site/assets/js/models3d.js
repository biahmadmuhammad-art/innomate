// Innomate 3D kit — one material language for every 3D thing on the site:
// soft matte plastic in the brand palette, studio light, soft contact shadow.
// Used live (orbit3d.js) and offline (scripts/render-sectors.mjs renders the
// industry images from the same models).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/RoomEnvironment.js';

export const C = {
  blue: 0x388ccc, blue2: 0x66a8dc, blue3: 0xa9cdec, ink: 0x14283d, ink2: 0x243a52,
  amber: 0xf3a93a, amber2: 0xf8c77d, white: 0xf7f9fc, paper: 0xe6edf4, green: 0x2fae7c, red: 0xe06a55,
};

const mats = new Map();
export const mat = (color, o = {}) => {
  const key = color + JSON.stringify(o);
  if (!mats.has(key)) mats.set(key, new THREE.MeshPhysicalMaterial({ color, roughness: 0.5, metalness: 0, clearcoat: 0.25, clearcoatRoughness: 0.4, ...o }));
  return mats.get(key);
};
const mesh = (geo, color, o) => { const m = new THREE.Mesh(geo, mat(color, o)); m.castShadow = true; m.receiveShadow = true; return m; };
export const rbox = (w, h, d, r, color, o) => mesh(new RoundedBoxGeometry(w, h, d, 5, Math.min(r, w / 2, h / 2, d / 2)), color, o);
export const cyl = (rt, rb, h, color, o, seg = 56) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg), color, o);
export const sph = (r, color, o) => mesh(new THREE.SphereGeometry(r, 48, 32), color, o);
export const cap = (r, len, color, o) => mesh(new THREE.CapsuleGeometry(r, len, 12, 36), color, o);
export const tor = (R, r, color, arc = Math.PI * 2, o) => mesh(new THREE.TorusGeometry(R, r, 20, 72, arc), color, o);
export const tube = (pts, r, color, o) => mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 64, r, 16, false), color, o);
export const lathe = (pts, color, o) => mesh(new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), 72), color, o);
export const extrude = (shape, depth, color, bevel = 0.06, o) => {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 6, curveSegments: 32 });
  g.center();
  return mesh(g, color, o);
};
const at = (obj, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => { obj.position.set(x, y, z); obj.rotation.set(rx, ry, rz); return obj; };
const grp = (...kids) => { const g = new THREE.Group(); kids.forEach(k => g.add(k)); return g; };

export const heartShape = (s = 1) => {
  const h = new THREE.Shape();
  h.moveTo(0, -0.9 * s);
  h.bezierCurveTo(-0.2 * s, -0.7 * s, -1 * s, -0.2 * s, -1 * s, 0.25 * s);
  h.bezierCurveTo(-1 * s, 0.75 * s, -0.4 * s, 1 * s, 0, 0.55 * s);
  h.bezierCurveTo(0.4 * s, 1 * s, 1 * s, 0.75 * s, 1 * s, 0.25 * s);
  h.bezierCurveTo(1 * s, -0.2 * s, 0.2 * s, -0.7 * s, 0, -0.9 * s);
  return h;
};
const leafShape = (s = 1) => {
  const l = new THREE.Shape();
  l.moveTo(0, 0);
  l.bezierCurveTo(0.55 * s, 0.25 * s, 0.7 * s, 0.95 * s, 0, 1.5 * s);
  l.bezierCurveTo(-0.7 * s, 0.95 * s, -0.55 * s, 0.25 * s, 0, 0);
  return l;
};
const boltShape = (s = 1) => {
  const b = new THREE.Shape();
  [[0.1, 1], [-0.45, 0], [-0.05, 0], [-0.2, -1], [0.45, 0.15], [0.05, 0.15], [0.1, 1]].forEach(([x, y], i) => i ? b.lineTo(x * s, y * s) : b.moveTo(x * s, y * s));
  return b;
};

/* ---------------- the logo in 3D ---------------- */
export const logo3d = () => grp(
  at(sph(0.28, C.blue2), -0.84, 1.62, 0),
  at(cap(0.28, 0.6, C.blue2), -0.84, 0.58, 0),
  at(cap(0.28, 1.28, C.blue), 0, 0.92, 0),
  at(cap(0.28, 1.28, C.blue), 0.84, 0.92, 0),
);

/* ---------------- industry models ---------------- */
const two = (r, len, a, b) => grp(at(cap(r, len / 2, a), 0, len / 4, 0), at(cap(r * 1.02, len / 2, b), 0, -len / 4, 0));

export const sectors = {
  food: () => grp(
    at(cyl(1.55, 1.55, 0.08, C.white), 0, 0.04, 0),
    at(lathe([[0, 0.1], [0.55, 0.1], [0.9, 0.22], [1.2, 0.55], [1.32, 0.95], [1.36, 1.05], [1.28, 1.05], [1.22, 0.96], [1.1, 0.6], [0.8, 0.32], [0, 0.26]], C.blue), 0, 0, 0),
    at(cyl(1.22, 1.22, 0.04, 0xe89a2c), 0, 0.9, 0),
    at(sph(0.13, C.white), -0.35, 0.95, 0.2), at(sph(0.1, C.green), 0.3, 0.94, -0.25), at(sph(0.11, C.amber2), 0.1, 0.95, 0.42),
    at(tube([[-0.3, 1.2, 0], [-0.45, 1.7, 0.1], [-0.2, 2.2, 0], [-0.35, 2.7, -0.1]], 0.05, C.white, { transparent: true, opacity: 0.85 }), 0, 0, 0),
    at(tube([[0.25, 1.2, 0.1], [0.4, 1.65, 0], [0.2, 2.1, 0.15], [0.35, 2.5, 0]], 0.045, C.white, { transparent: true, opacity: 0.8 }), 0, 0, 0),
    at(grp(at(cap(0.06, 1.2, C.ink2), 0, 0, 0, 0, 0, Math.PI / 2), (() => { const b = sph(0.24, C.ink2); b.scale.set(1.4, 0.35, 1); return at(b, -0.85, 0, 0); })()), 1.55, 0.14, 0.75, 0, 0.9, 0),
  ),
  pharma: () => {
    const blister = grp(at(rbox(2.6, 0.1, 1.7, 0.05, C.white), 0, 0, 0));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
      const d = sph(0.24, C.blue3, { transparent: true, opacity: 0.7, roughness: 0.15 }); d.scale.set(1.3, 0.55, 1); blister.add(at(d, -0.9 + i * 0.6, 0.06, -0.38 + j * 0.76));
      if ((i + j) % 2) blister.add(at(two(0.12, 0.5, C.amber, C.white), -0.9 + i * 0.6, 0.12, -0.38 + j * 0.76, Math.PI / 2, 0, 0));
    }
    return grp(
      at(blister, -0.3, 0.12, 0, 0, 0.35, 0.05),
      at(two(0.26, 1.1, C.blue, C.white), 1.2, 0.27, 0.9, 0, 0.6, Math.PI / 2),
      at(two(0.26, 1.1, C.amber, C.white), 0.8, 0.27, 1.6, 0, -0.3, Math.PI / 2),
      at(cyl(0.34, 0.34, 0.14, C.white), -1.4, 0.07, 1.2),
      at(cyl(0.3, 0.3, 0.14, C.white), -0.9, 0.07, 1.5),
    );
  },
  electrical: () => {
    const cab = grp(at(rbox(1.9, 2.7, 0.95, 0.12, C.white), 0, 1.35, 0), at(rbox(1.62, 2.4, 0.06, 0.05, C.paper), 0, 1.35, 0.48));
    for (let row = 0; row < 3; row++) {
      cab.add(at(rbox(1.3, 0.08, 0.06, 0.03, C.ink2), 0, 2.15 - row * 0.62 + 0.25, 0.53));
      for (let k = 0; k < 5; k++) {
        cab.add(at(rbox(0.2, 0.36, 0.14, 0.04, row === 1 && k === 3 ? C.amber : C.ink), -0.52 + k * 0.26, 2.15 - row * 0.62, 0.56));
        cab.add(at(rbox(0.08, 0.1, 0.08, 0.02, C.white), -0.52 + k * 0.26, 2.2 - row * 0.62, 0.64));
      }
    }
    return grp(
      cab,
      at(tube([[-0.45, 2.66, 0], [-0.45, 3.0, 0], [-0.7, 3.25, -0.3], [-1.1, 3.3, -0.6]], 0.07, C.blue), 0, 0, 0),
      at(tube([[0.45, 2.66, 0], [0.45, 2.95, 0], [0.7, 3.15, -0.3], [1.1, 3.2, -0.6]], 0.07, C.amber), 0, 0, 0),
      at(extrude(boltShape(0.6), 0.14, C.amber, 0.05), 1.4, 0.45, 0.85, 0, 0.5, 0),
    );
  },
  paints: () => {
    const can = (col) => grp(
      at(cyl(0.72, 0.72, 1.3, C.white), 0, 0.65, 0),
      at(cyl(0.735, 0.735, 0.5, col), 0, 0.62, 0),
      at(tor(0.7, 0.05, C.paper), 0, 1.3, 0, Math.PI / 2, 0, 0),
      at(cyl(0.68, 0.68, 0.05, col), 0, 1.31, 0),
    );
    const roller = grp(
      at(cyl(0.32, 0.32, 1.2, C.amber), 0, 0, 0, 0, 0, Math.PI / 2),
      at(tube([[0.62, 0, 0], [0.8, 0, 0], [0.8, 0.5, 0], [0.3, 0.9, 0], [0.1, 1.5, 0]], 0.05, C.ink2), 0, 0, 0),
      at(cap(0.12, 0.5, C.ink), 0.05, 1.75, 0, 0, 0, 0.15),
    );
    const puddle = cyl(0.9, 0.9, 0.03, C.blue); puddle.scale.set(1, 1, 0.6);
    return grp(
      at(can(C.blue), -0.7, 0, -0.3), at(can(C.amber), 0.75, 0, -0.55),
      at(cap(0.09, 0.28, C.blue), -0.07, 0.95, 0.35),
      at(puddle, -0.3, 0.015, 0.95),
      at(roller, 0.9, 0.33, 1.0, 0, -0.5, 0.25),
    );
  },
  apparel: () => {
    const t = new THREE.Shape();
    [[-0.32, 1.1], [-0.78, 1.02], [-1.22, 0.66], [-0.98, 0.38], [-0.7, 0.55], [-0.7, -1.0], [0.7, -1.0], [0.7, 0.55], [0.98, 0.38], [1.22, 0.66], [0.78, 1.02], [0.32, 1.1]].forEach(([x, y], i) => i ? t.lineTo(x, y) : t.moveTo(x, y));
    t.quadraticCurveTo(0, 0.78, -0.32, 1.1);
    const shirt = extrude(t, 0.16, C.blue, 0.07);
    const folded = (col, y) => grp(at(rbox(1.5, 0.24, 1.1, 0.1, col), 0, y, 0), at(tor(0.2, 0.05, C.white, Math.PI), 0, y + 0.11, -0.38, -Math.PI / 2, 0, 0));
    return grp(
      at(grp(shirt, at(tube([[-0.75, 1.02, 0], [0, 1.28, 0], [0.75, 1.02, 0]], 0.04, C.ink2), 0, 0, 0), at(tor(0.14, 0.035, C.ink2, Math.PI * 1.4), 0, 1.44, 0, 0, 0, -0.4)), -0.35, 1.55, -0.2, 0, 0.75, 0),
      at(folded(C.white, 0.12), 1.35, 0, 0.9, 0, 0.3, 0), at(folded(C.amber, 0.37), 1.35, 0, 0.9, 0, 0.18, 0),
      at(grp(at(cyl(0.22, 0.22, 0.5, C.blue2), 0, 0, 0), at(cyl(0.3, 0.3, 0.06, C.ink2), 0, 0.27, 0), at(cyl(0.3, 0.3, 0.06, C.ink2), 0, -0.27, 0)), -1.45, 0.3, 1.0),
    );
  },
  furniture: () => grp(
    at(rbox(2.9, 0.42, 1.3, 0.14, C.blue), 0, 0.42, 0),
    at(rbox(1.36, 0.28, 1.1, 0.13, C.blue2), -0.7, 0.76, 0.08), at(rbox(1.36, 0.28, 1.1, 0.13, C.blue2), 0.7, 0.76, 0.08),
    at(rbox(2.9, 0.95, 0.34, 0.15, C.blue), 0, 1.0, -0.5),
    at(rbox(0.34, 0.75, 1.3, 0.15, C.blue), -1.55, 0.7, 0), at(rbox(0.34, 0.75, 1.3, 0.15, C.blue), 1.55, 0.7, 0),
    ...[[-1.3, -0.5], [1.3, -0.5], [-1.3, 0.5], [1.3, 0.5]].map(([x, z]) => at(cyl(0.06, 0.05, 0.22, C.ink), x, 0.11, z)),
    at(rbox(0.55, 0.55, 0.16, 0.08, C.amber), 0.8, 1.05, -0.2, -0.2, 0, 0.15),
    at(grp(at(cyl(0.45, 0.45, 0.05, C.white), 0, 0.7, 0), at(cyl(0.04, 0.04, 0.7, C.ink), 0, 0.35, 0), at(cyl(0.22, 0.22, 0.04, C.ink), 0, 0.02, 0)), 2.3, 0, 0.6),
  ),
  contracting: () => {
    const brick = (x, y, z, c) => at(rbox(0.9, 0.36, 0.45, 0.05, c), x, y, z);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.66, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2), mat(C.amber)); helmet.castShadow = true;
    const cone = grp(at(cyl(0.06, 0.42, 1.1, C.amber), 0, 0.62, 0), at(cyl(0.2, 0.28, 0.2, C.white), 0, 0.72, 0), at(rbox(1.0, 0.08, 1.0, 0.04, C.amber), 0, 0.04, 0));
    return grp(
      brick(-0.9, 0.18, -0.4, C.white), brick(0.05, 0.18, -0.4, C.blue3), brick(1.0, 0.18, -0.4, C.white),
      brick(-0.45, 0.56, -0.4, C.blue3), brick(0.5, 0.56, -0.4, C.white), brick(0.02, 0.94, -0.4, C.blue3),
      at(grp(helmet, at(cyl(0.88, 0.88, 0.05, C.amber), 0, 0.03, 0.1), at(rbox(0.15, 0.1, 1.0, 0.05, C.amber2), 0, 0.63, 0)), -0.55, 0.02, 0.9, 0, 0.5, 0),
      at(cone, 1.35, 0, 0.75),
    );
  },
  education: () => grp(
    at(rbox(2.2, 0.32, 1.5, 0.05, C.blue), 0, 0.16, 0, 0, 0.1, 0), at(rbox(2.1, 0.24, 1.4, 0.03, C.white), 0.04, 0.16, 0.02, 0, 0.1, 0),
    at(rbox(2.0, 0.3, 1.4, 0.05, C.amber), 0.05, 0.47, 0, 0, -0.12, 0), at(rbox(1.9, 0.22, 1.3, 0.03, C.white), 0.09, 0.47, 0.02, 0, -0.12, 0),
    at(rbox(1.9, 0.28, 1.3, 0.05, C.ink2), -0.05, 0.76, 0, 0, 0.2, 0), at(rbox(1.8, 0.2, 1.2, 0.03, C.white), -0.01, 0.76, 0.02, 0, 0.2, 0),
    at(grp(at(cyl(0.5, 0.55, 0.36, C.ink), 0, 0.18, 0), at(rbox(1.7, 0.06, 1.7, 0.02, C.ink), 0, 0.39, 0, 0, Math.PI / 4, 0), at(sph(0.07, C.amber), 0, 0.44, 0), at(tube([[0, 0.44, 0], [0.5, 0.42, 0.3], [0.75, 0.2, 0.45], [0.78, -0.1, 0.46]], 0.025, C.amber), 0, 0, 0)), 0, 0.92, 0, 0.12, 0.3, 0),
  ),
  health: () => grp(
    at(extrude(heartShape(0.95), 0.5, C.red, 0.12), -0.2, 1.15, -0.2, 0, 0.75, 0),
    at(grp(at(rbox(1.2, 0.36, 0.3, 0.08, C.white), 0, 0, 0), at(rbox(0.36, 1.2, 0.3, 0.08, C.white), 0, 0, 0), at(rbox(0.9, 0.18, 0.32, 0.05, C.blue), 0, 0, 0.01), at(rbox(0.18, 0.9, 0.32, 0.05, C.blue), 0, 0, 0.01)), 1.35, 0.62, 0.8, 0, 0.75, 0),
    at(tube([[-2, 0.03, 1.3], [-1.3, 0.03, 1.3], [-1.1, 0.03, 0.8], [-0.85, 0.03, 1.8], [-0.6, 0.03, 1.3], [0.3, 0.03, 1.3]], 0.05, C.amber), 0, 0, 0),
    at(two(0.18, 0.8, C.blue, C.white), -1.45, 0.19, 0.2, 0, 0.9, Math.PI / 2),
  ),
  agri: () => {
    const g = grp(
      at(lathe([[0, 0], [0.62, 0], [0.8, 0.9], [0.86, 0.95], [0, 0.95]], C.amber), 0, 0, 0),
      at(cyl(0.76, 0.76, 0.05, C.ink2), 0, 0.9, 0),
      at(tube([[0, 0.9, 0], [0.05, 1.5, 0], [-0.05, 2.1, 0]], 0.04, C.green), 0, 0, 0),
      at(extrude(leafShape(0.7), 0.05, C.green, 0.02), 0.35, 1.65, 0, 0, 0, -0.9),
      at(extrude(leafShape(0.6), 0.05, C.green, 0.02), -0.33, 1.35, 0, 0, 0, 0.9),
    );
    for (let s = 0; s < 3; s++) {
      const x = 1.3 + s * 0.28, z = 0.3 - s * 0.35;
      g.add(at(tube([[x, 0, z], [x + 0.05, 1, z], [x + 0.15 - s * 0.1, 1.9, z]], 0.025, C.amber2), 0, 0, 0));
      for (let k = 0; k < 7; k++) g.add(at(cap(0.06, 0.1, C.amber), x + 0.15 - s * 0.1 + (k % 2 ? 0.07 : -0.07), 1.6 + k * 0.08, z, 0, 0, k % 2 ? -0.5 : 0.5));
    }
    return g;
  },
  sustainability: () => {
    const blades = grp();
    for (let i = 0; i < 3; i++) { const b = rbox(0.2, 1.05, 0.05, 0.08, C.white); b.position.y = 0.55; const p = grp(b); p.rotation.z = i * Math.PI * 2 / 3 + 0.3; blades.add(p); }
    const panel = grp(at(rbox(1.6, 0.06, 1.05, 0.03, C.ink), 0, 0, 0));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) panel.add(at(rbox(0.34, 0.02, 0.29, 0.01, C.blue), -0.57 + i * 0.38, 0.04, -0.33 + j * 0.33));
    return grp(
      at(cyl(0.08, 0.14, 2.0, C.white), -1.0, 1.0, -0.4), at(cap(0.15, 0.32, C.white), -1.0, 2.02, -0.33, Math.PI / 2, 0, 0), at(sph(0.1, C.blue), -1.0, 2.02, -0.1), at(blades, -1.0, 2.02, -0.12),
      at(extrude(leafShape(1.35), 0.14, C.green, 0.05), 0.55, 1.0, 0.25, -0.2, 0.6, -0.35),
      at(panel, 1.0, 0.5, 1.15, -0.55, 0.4, 0), at(cyl(0.05, 0.05, 0.5, C.ink2), 1.0, 0.22, 1.15),
    );
  },
  nonprofit: () => grp(
    at(rbox(2, 1.4, 1.4, 0.14, C.white), 0, 0.7, 0),
    at(rbox(0.9, 0.06, 0.14, 0.03, C.ink), 0, 1.41, 0),
    at(rbox(2.02, 0.28, 1.42, 0.08, C.blue), 0, 0.5, 0),
    at(extrude(heartShape(0.42), 0.14, C.amber, 0.05), 0, 1.72, 0, 0, 0.2, 0.08),
    ...[0, 1, 2].map(i => at(cyl(0.26, 0.26, 0.07, C.amber2), 1.45 - i * 0.12, 0.04 + i * 0.075, 0.9 + i * 0.05)),
    at(cyl(0.26, 0.26, 0.07, C.amber2), 1.1, 0.24, 1.3, 1.2, 0, 0.3),
  ),
  professionals: () => grp(
    at(rbox(2.2, 1.35, 0.7, 0.14, C.ink), 0, 0.68, 0),
    at(rbox(2.22, 0.12, 0.72, 0.05, C.ink2), 0, 0.95, 0),
    at(tor(0.32, 0.07, C.ink2, Math.PI), 0, 1.36, 0),
    at(rbox(0.26, 0.2, 0.08, 0.03, C.amber), -0.55, 0.95, 0.37), at(rbox(0.26, 0.2, 0.08, 0.03, C.amber), 0.55, 0.95, 0.37),
    at(rbox(1.1, 0.02, 1.45, 0.01, C.white), 1.1, 0.02, 1.05, 0, -0.3, 0), at(rbox(1.1, 0.02, 1.45, 0.01, C.white), 1.2, 0.05, 1.1, 0, -0.12, 0),
    at(rbox(0.7, 0.03, 0.06, 0.02, C.blue3), 1.15, 0.08, 0.7, 0, -0.12, 0), at(rbox(0.8, 0.03, 0.06, 0.02, C.blue3), 1.2, 0.08, 0.9, 0, -0.12, 0),
    at(grp(at(cyl(0.45, 0.45, 0.14, C.white), 0, 0, 0), at(tor(0.45, 0.05, C.blue), 0, 0.07, 0, Math.PI / 2, 0, 0), at(rbox(0.05, 0.02, 0.3, 0.01, C.ink), 0, 0.09, -0.12), at(rbox(0.22, 0.02, 0.05, 0.01, C.ink), 0.09, 0.09, 0)), -1.45, 0.07, 1.0),
  ),
};

/* ---------------- service + page models (same kit, same light) ---------------- */
const pie = (r, h, start, len, color) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 64, 1, false, start, len), mat(color)); m.castShadow = m.receiveShadow = true; return m; };
const starShape = (s = 1) => {
  const st = new THREE.Shape();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + Math.PI / 2, rr = i % 2 ? 0.28 * s : s; const x = Math.cos(a) * rr, y = Math.sin(a) * rr; i ? st.lineTo(x, y) : st.moveTo(x, y); }
  return st;
};
const polyShape = (pts) => { const sh = new THREE.Shape(); pts.forEach(([x, y], i) => i ? sh.lineTo(x, y) : sh.moveTo(x, y)); return sh; };
const chevron = (s = 1) => polyShape([[0.5 * s, 0.8 * s], [-0.4 * s, 0], [0.5 * s, -0.8 * s], [0.5 * s, -0.45 * s], [-0.02 * s, 0], [0.5 * s, 0.45 * s]]);
const bubble = (w, h, color) => grp(at(rbox(w, h, 0.36, Math.min(w, h) * 0.45, color), 0, 0, 0), at(extrude(polyShape([[0, 0], [0.42, 0], [0, -0.42]]), 0.2, color, 0.05), -w / 2 + 0.45, -h / 2 - 0.12, 0));
const lines = (n, w, x, y, z, gap = 0.2, color = C.blue3) => Array.from({ length: n }, (_, i) => at(rbox(i === n - 1 ? w * 0.6 : w, 0.07, 0.04, 0.03, color), x - (i === n - 1 ? w * 0.2 : 0), y - i * gap, z));
const coins = (n, x, z) => Array.from({ length: n }, (_, i) => at(cyl(0.34, 0.34, 0.1, i % 2 ? C.amber2 : C.amber), x + (i % 3 - 1) * 0.02, 0.05 + i * 0.105, z));
const check = (color = C.white) => grp(at(cap(0.07, 0.22, color), -0.12, -0.04, 0, 0, 0, 0.75), at(cap(0.07, 0.46, color), 0.12, 0.08, 0, 0, 0, -0.65));

export const services = {
  erpnext: () => grp(
    at(rbox(2.8, 0.3, 2.8, 0.16, C.white), 0, 0.15, 0),
    at(rbox(2.3, 0.3, 2.3, 0.15, C.blue3), 0, 0.48, 0),
    at(rbox(1.8, 0.3, 1.8, 0.14, C.blue), 0, 0.81, 0),
    at((() => { const l = logo3d(); l.scale.setScalar(0.62); return l; })(), 0.05, 0.96, 0),
    at(rbox(0.5, 0.5, 0.5, 0.12, C.amber), 1.25, 0.55, 1.25),
  ),
  'eta-e-invoice': () => grp(
    at(grp(at(rbox(1.9, 2.5, 0.08, 0.05, C.white), 0, 0, 0), ...lines(4, 1.2, -0.1, 0.85, 0.06), at(rbox(0.5, 0.07, 0.04, 0.03, C.ink2), 0.45, -0.3, 0.06), at(rbox(0.7, 0.1, 0.04, 0.03, C.blue), 0.3, -0.62, 0.06),
      ...Array.from({ length: 9 }, (_, k) => at(rbox(0.13, 0.13, 0.05, 0.02, (k * 7) % 3 ? C.ink : C.white), -0.62 + (k % 3) * 0.15, -0.5 - ((k / 3) | 0) * 0.15, 0.07))), -0.2, 1.3, 0, -0.12, 0.35, 0),
    at(grp(at(cyl(0.48, 0.48, 0.16, C.green), 0, 0, 0, Math.PI / 2, 0, 0), at(check(), 0, 0, 0.1)), 0.95, 0.62, 0.75, 0, 0.45, 0),
    at(cyl(0.34, 0.34, 0.12, C.amber), -1.2, 0.06, 0.8),
  ),
  'hr-payroll': () => grp(
    at(grp(at(rbox(1.6, 2.1, 0.1, 0.12, C.white), 0, 0, 0), at(rbox(0.5, 0.12, 0.12, 0.05, C.ink2), 0, 1.02, 0), at(sph(0.3, C.blue2), 0, 0.42, 0.08), at(cap(0.32, 0.2, C.blue), 0, -0.12, 0.05, 0, 0, Math.PI / 2), ...lines(2, 0.9, 0, -0.55, 0.06, 0.2, C.paper)), -0.4, 1.12, 0, -0.08, 0.35, 0),
    ...coins(5, 1.05, 0.7),
    at(cyl(0.34, 0.34, 0.1, C.amber), 1.45, 0.34, 0.05, 1.1, 0, 0.3),
  ),
  'zkteco-attendance': () => {
    const pad = grp(at(rbox(0.9, 0.9, 0.08, 0.2, C.ink2), 0, 0, 0));
    [0.12, 0.22, 0.32].forEach((R, k) => pad.add(at(tor(R, 0.025, C.blue2, Math.PI * 1.5), 0, 0, 0.06, 0, 0, 0.3 + k * 0.4)));
    return grp(
      at(grp(at(rbox(1.4, 2.4, 0.4, 0.18, C.ink), 0, 0, 0), at(rbox(1.1, 0.8, 0.05, 0.06, C.blue), 0, 0.62, 0.21), ...lines(2, 0.6, 0, 0.75, 0.25, 0.2, C.white), at(pad, 0, -0.45, 0.2)), 0, 1.25, 0, 0, 0.35, 0),
      at(grp(at(cyl(0.5, 0.5, 0.12, C.white), 0, 0, 0, Math.PI / 2, 0, 0), at(rbox(0.05, 0.3, 0.05, 0.02, C.ink), 0, 0.12, 0.07), at(rbox(0.22, 0.05, 0.05, 0.02, C.amber), 0.1, 0, 0.07)), 1.35, 0.5, 0.7, 0, 0.45, 0),
    );
  },
  'warehouse-management': () => {
    const rack = grp();
    [[-1.2, -0.45], [1.2, -0.45], [-1.2, 0.45], [1.2, 0.45]].forEach(([x, z]) => rack.add(at(rbox(0.1, 2.6, 0.1, 0.03, C.ink2), x, 1.3, z)));
    [0.1, 0.95, 1.8].forEach(y => rack.add(at(rbox(2.5, 0.08, 1.0, 0.03, C.white), 0, y, 0)));
    const box = (x, y, w, h, c) => at(rbox(w, h, 0.7, 0.06, c), x, y + h / 2 + 0.04, 0);
    rack.add(box(-0.6, 0.1, 0.8, 0.6, C.amber), box(0.35, 0.1, 0.9, 0.5, C.blue3), box(-0.5, 0.95, 0.7, 0.55, C.blue), box(0.45, 0.95, 0.7, 0.7, C.amber2), box(0, 1.8, 1.0, 0.55, C.blue2));
    return grp(rack, at(grp(at(rbox(1.0, 0.14, 0.9, 0.03, C.amber2), 0, 0.07, 0), at(rbox(0.8, 0.55, 0.7, 0.06, C.white), 0, 0.42, 0)), 1.6, 0, 1.1, 0, 0.3, 0));
  },
  'iot-integration': () => {
    const g = grp(
      at(cyl(0.9, 1.0, 0.45, C.white), 0, 0.23, 0), at(cyl(0.75, 0.75, 0.05, C.blue), 0, 0.47, 0), at(sph(0.1, C.green), 0.45, 0.5, 0.45),
      at(cyl(0.05, 0.05, 1.3, C.ink2), 0, 1.1, 0), at(sph(0.14, C.amber), 0, 1.8, 0),
    );
    [0.45, 0.75, 1.05].forEach(R => g.add(at(tor(R, 0.04, C.amber, Math.PI / 2), 0, 1.8, 0, 0, 0, Math.PI / 4)));
    g.add(at(grp(at(rbox(0.8, 0.5, 0.5, 0.1, C.ink), 0, 0, 0), at(rbox(0.5, 0.2, 0.05, 0.04, C.blue2), 0, 0.05, 0.26)), 1.6, 0.25, 0.6, 0, -0.5, 0));
    g.add(at(tube([[0.95, 0.12, 0.3], [1.2, 0.05, 0.5], [1.3, 0.1, 0.55]], 0.03, C.ink2), 0, 0, 0));
    return g;
  },
  'ai-agents': () => grp(
    at(grp(bubble(2.0, 1.3, C.blue), ...[-0.45, 0, 0.45].map(x => at(sph(0.13, C.white), x, 0, 0.2))), -0.2, 1.35, 0, 0, 0.3, 0),
    at(grp(bubble(1.2, 0.8, C.white), ...lines(2, 0.6, 0, 0.1, 0.2, 0.2, C.blue3)), 1.0, 0.55, 0.9, 0, 0.45, 0),
    at(extrude(starShape(0.42), 0.14, C.amber, 0.05), 1.15, 2.2, 0.1, 0, 0.3, 0.2),
    at(extrude(starShape(0.22), 0.1, C.amber2, 0.03), -1.35, 2.25, 0.3, 0, 0, -0.2),
  ),
  'business-intelligence': () => grp(
    at(rbox(2.9, 0.12, 1.5, 0.06, C.white), 0, 0.06, 0),
    ...[0.5, 0.85, 0.7, 1.35, 1.9].map((h, i) => at(rbox(0.36, h, 0.36, 0.08, i === 4 ? C.amber : i % 2 ? C.blue : C.blue3), -1.05 + i * 0.52, 0.12 + h / 2, -0.2)),
    at(grp(pie(0.7, 0.2, 0, Math.PI * 1.3, C.blue), pie(0.7, 0.2, Math.PI * 1.3, Math.PI * 0.45, C.amber), at(pie(0.72, 0.2, Math.PI * 1.75, Math.PI * 0.25, C.ink2), 0.05, 0.08, 0)), 1.45, 0.2, 1.15, 0, 0.3, 0),
  ),
  'custom-development': () => grp(
    at(grp(at(rbox(2.6, 1.8, 0.1, 0.1, C.white), 0, 0, 0), at(rbox(2.6, 0.26, 0.12, 0.08, C.ink2), 0, 0.77, 0), ...[0, 1, 2].map(k => at(sph(0.05, [C.red, C.amber, C.green][k]), -1.1 + k * 0.16, 0.77, 0.07))), 0, 1.0, -0.4, -0.08, 0, 0),
    at(extrude(chevron(0.5), 0.2, C.blue, 0.05), -0.75, 1.0, 0.1),
    at(rbox(0.14, 1.0, 0.2, 0.05, C.amber), 0, 1.0, 0.1, 0, 0, -0.35),
    at(extrude(chevron(0.5), 0.2, C.blue, 0.05), 0.75, 1.0, 0.1, 0, 0, Math.PI),
    at(grp(at(rbox(0.9, 0.9, 0.3, 0.12, C.blue2), 0, 0, 0), at(sph(0.2, C.blue2), 0.45, 0, 0), at(sph(0.2, C.blue2), 0, 0.45, 0)), 1.4, 0.3, 0.9, -Math.PI / 2, 0, 0.3),
  ),
  'cloud-hosting': () => grp(
    ...[0, 1, 2].map(i => at(grp(at(rbox(2.0, 0.42, 1.2, 0.08, C.ink), 0, 0, 0), at(rbox(0.9, 0.06, 0.02, 0.02, C.ink2), -0.3, 0, 0.61), at(sph(0.05, C.green), 0.7, 0, 0.61), at(sph(0.05, C.blue2), 0.82, 0, 0.61)), 0, 0.24 + i * 0.48, 0)),
    at(grp(at(sph(0.55, C.white), 0, 0, 0), at(sph(0.42, C.white), -0.6, -0.12, 0), at(sph(0.45, C.white), 0.6, -0.1, 0.05), at(sph(0.32, C.white), 0.15, -0.25, 0.3)), 0.1, 2.25, 0),
    at(tube([[0, 1.45, 0], [0, 1.85, 0]], 0.04, C.amber), 0, 0, 0),
  ),
};

export const pages = {
  about: () => grp(at(cyl(1.6, 1.7, 0.3, C.white), 0, 0.15, 0), at(cyl(1.3, 1.3, 0.04, C.blue3), 0, 0.31, 0), at(logo3d(), 0.05, 0.3, 0)),
  services: () => services.erpnext(),
  sectors: () => grp(
    at(rbox(2.6, 1.2, 1.4, 0.08, C.white), 0, 0.6, 0),
    ...[0, 1, 2].map(i => at(cyl(0.5, 0.5, 1.36, i === 1 ? C.amber : C.blue, undefined, 3), -0.86 + i * 0.86, 1.45, 0, Math.PI / 2, 0, Math.PI)),
    at(cyl(0.18, 0.2, 1.4, C.ink2), 1.0, 1.9, -0.4), at(sph(0.26, C.paper, { transparent: true, opacity: 0.8 }), 1.05, 2.8, -0.4),
    ...[0, 1, 2, 3].map(i => at(rbox(0.36, 0.36, 0.05, 0.04, C.blue3), -0.9 + i * 0.6, 0.65, 0.71)),
    at(rbox(0.5, 0.7, 0.05, 0.04, C.ink2), 0, 0.35, 0.71),
  ),
  how: () => grp(
    ...[0, 1, 2, 3].map(i => at(rbox(0.8, 0.4 + i * 0.4, 1.2, 0.1, [C.white, C.blue3, C.blue2, C.blue][i]), -1.2 + i * 0.8, (0.4 + i * 0.4) / 2, 0)),
    at(cyl(0.03, 0.03, 0.9, C.ink2), 1.2, 2.05, 0), at(extrude(polyShape([[0, 0], [0.55, -0.18], [0, -0.36]]), 0.04, C.amber, 0.02), 1.48, 2.3, 0),
  ),
  pricing: () => grp(
    at(grp(at(rbox(1.5, 2.2, 0.3, 0.16, C.ink), 0, 0, 0), at(rbox(1.2, 0.5, 0.05, 0.06, C.blue2), 0, 0.7, 0.16),
      ...Array.from({ length: 12 }, (_, k) => at(rbox(0.26, 0.22, 0.08, 0.06, k === 11 ? C.amber : C.white), -0.4 + (k % 3) * 0.4, 0.2 - ((k / 3) | 0) * 0.32, 0.17))), -0.3, 1.15, 0, -0.2, 0.3, 0),
    ...coins(6, 1.15, 0.55),
  ),
  integrations: () => {
    const g = grp(at(sph(0.55, C.blue), 0, 1.3, 0));
    [[-1.4, 0.5, 0.6, C.amber], [1.4, 0.6, 0.4, C.white], [0.2, 2.5, -0.3, C.blue3], [-0.2, 0.45, 1.5, C.ink2]].forEach(([x, y, z, c]) => {
      g.add(at(rbox(0.6, 0.6, 0.6, 0.14, c), x, y, z));
      g.add(tube([[0, 1.3, 0], [x * 0.5, (y + 1.3) / 2 + 0.15, z * 0.5], [x, y, z]], 0.04, C.blue2));
    });
    return g;
  },
  clients: () => grp(
    at(rbox(2.9, 0.1, 2.0, 0.05, C.white), 0, 0.05, 0),
    ...[[-0.9, 1.6, C.blue], [0, 2.3, C.ink], [0.9, 1.2, C.blue3]].map(([x, h, c]) => grp(at(rbox(0.75, h, 0.75, 0.08, c), x, 0.1 + h / 2, -0.2), ...Array.from({ length: Math.floor(h / 0.4) }, (_, k) => at(rbox(0.5, 0.12, 0.02, 0.03, c === C.ink ? C.amber2 : C.white), x, 0.45 + k * 0.4, 0.18)))),
    at(rbox(0.5, 0.5, 0.5, 0.12, C.amber), 1.2, 0.35, 0.75, 0, 0.4, 0),
  ),
  careers: () => grp(
    at(rbox(2.2, 1.5, 0.8, 0.16, C.blue), 0, 0.75, 0),
    at(rbox(2.22, 0.12, 0.82, 0.05, C.blue2), 0, 1.0, 0),
    at(tor(0.34, 0.08, C.ink2, Math.PI), 0, 1.5, 0),
    at(rbox(0.3, 0.3, 0.1, 0.05, C.amber), 0, 1.0, 0.42),
    at(extrude(starShape(0.35), 0.1, C.amber, 0.04), 1.4, 1.9, 0.3, 0, -0.3, 0.2),
  ),
  resources: () => grp(
    ...[[C.blue, 0.1], [C.white, -0.08], [C.amber, 0.14]].map(([c, r], i) => grp(at(rbox(2.0, 0.28, 1.4, 0.05, c), 0, 0.14 + i * 0.3, 0, 0, r, 0), at(rbox(1.9, 0.2, 1.32, 0.03, C.white), 0.04, 0.14 + i * 0.3, 0.02, 0, r, 0))),
    at(grp(at(rbox(1.3, 1.7, 0.05, 0.04, C.white), 0, 0, 0), ...lines(5, 0.8, 0, 0.5, 0.04, 0.2)), 0.2, 1.85, -0.2, -0.25, 0.3, 0.05),
  ),
  faq: () => grp(
    at(grp(bubble(1.9, 1.3, C.blue), at(tor(0.22, 0.07, C.white, Math.PI * 1.3), 0, 0.14, 0.2, 0, 0, -0.6), at(sph(0.07, C.white), 0, -0.3, 0.2)), -0.3, 1.5, 0, 0, 0.3, 0),
    at(grp(bubble(1.2, 0.8, C.white), ...[-0.25, 0, 0.25].map(x => at(sph(0.08, C.blue2), x, 0, 0.2))), 1.0, 0.5, 0.8, 0, 0.45, 0),
  ),
  contact: () => grp(
    at(grp(at(rbox(2.0, 1.3, 0.14, 0.08, C.white), 0, 0, 0), at(extrude(polyShape([[-1, 0.62], [1, 0.62], [0, -0.1]]), 0.04, C.blue3, 0.02), 0, 0.3, 0.08)), 0, 1.1, 0, -0.15, 0.3, 0),
    at(grp(bubble(1.0, 0.7, C.green), at(check(), 0, 0, 0.2)), 1.25, 0.5, 0.8, 0, 0.45, 0),
  ),
};

/* ---------------- studio: lights, environment, shadow catcher ---------------- */
export const studio = (renderer, scene, { shadowY = 0, shadowSize = 12, shadowOpacity = 0.16 } = {}) => {
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  const hemi = new THREE.HemisphereLight(0xffffff, 0xc9d6e3, 0.55);
  const key = new THREE.DirectionalLight(0xfff6ea, 2.4);
  key.position.set(3.5, 7, 4.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 8;
  key.shadow.camera.left = key.shadow.camera.bottom = -5;
  key.shadow.camera.right = key.shadow.camera.top = 5;
  key.shadow.bias = -0.0004;
  const rim = new THREE.DirectionalLight(0xcfe3ff, 0.7);
  rim.position.set(-5, 3, -4);
  scene.add(hemi, key, rim);
  const catcher = new THREE.Mesh(new THREE.PlaneGeometry(shadowSize, shadowSize), new THREE.ShadowMaterial({ opacity: shadowOpacity }));
  catcher.rotation.x = -Math.PI / 2; catcher.position.y = shadowY; catcher.receiveShadow = true;
  scene.add(catcher);
  return { key, catcher };
};

// Fit a group to a target size and sit it on y=0
export const fit = (g, size = 3.6) => {
  const box = new THREE.Box3().setFromObject(g);
  const s = size / Math.max(box.max.x - box.min.x, box.max.z - box.min.z, (box.max.y - box.min.y) * 1.1);
  g.scale.setScalar(s);
  const b2 = new THREE.Box3().setFromObject(g);
  g.position.x -= (b2.min.x + b2.max.x) / 2;
  g.position.z -= (b2.min.z + b2.max.z) / 2;
  g.position.y -= b2.min.y;
  return g;
};

// Aim a camera at the model's own centre, keeping the same viewing angle
export const frame = (cam, g, dir = [5.4, 4.3, 6.6], pad = 1.12) => {
  const box = new THREE.Box3().setFromObject(g);
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const d = new THREE.Vector3(...dir).normalize();
  const dist = sphere.radius / Math.sin(THREE.MathUtils.degToRad(cam.fov / 2)) * pad;
  cam.position.copy(sphere.center).addScaledVector(d, dist);
  cam.lookAt(sphere.center);
  cam.updateProjectionMatrix();
};

export { THREE };
