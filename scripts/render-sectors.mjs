// Renders still images of the 3D models (models3d.js) — the fallback under the
// live canvas and the picture Elementor will use.
// node scripts/render-sectors.mjs [kind] [name]   kind: sectors | services | pages
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const KINDS = {
  sectors: ['food', 'pharma', 'electrical', 'paints', 'apparel', 'furniture', 'contracting', 'education', 'health', 'agri', 'sustainability', 'nonprofit', 'professionals'],
  services: ['erpnext', 'eta-e-invoice', 'hr-payroll', 'zkteco-attendance', 'warehouse-management', 'iot-integration', 'ai-agents', 'business-intelligence', 'custom-development', 'cloud-hosting'],
  pages: ['about', 'services', 'sectors', 'how', 'pricing', 'integrations', 'clients', 'careers', 'resources', 'faq', 'contact'],
};
const [, , kindArg, only] = process.argv;
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1000, height: 1000 } });
p.on('pageerror', e => console.error('ERR', e.message));
for (const kind of kindArg ? [kindArg] : Object.keys(KINDS)) {
  mkdirSync(`site/assets/img/${kind}`, { recursive: true });
  for (const n of KINDS[kind].filter(x => !only || x === only)) {
    await p.goto(`http://localhost:4321/__lab/sector.html?k=${kind}&s=${n}`);
    await p.waitForSelector('body[data-ready]', { timeout: 60000 });
    await p.screenshot({ path: `site/assets/img/${kind}/${n}.png`, omitBackground: true });
    console.log('rendered', kind, n);
  }
}
await b.close();
