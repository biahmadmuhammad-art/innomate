// Product illustrations — light "screens" built from HTML + inline SVG so
// text uses the site fonts and animation can be triggered by visibility
// (.is-in on the .mock root). In Elementor each is an HTML widget.
// All data in these screens is illustrative sample data.
// buildMocks() reads its words from L.t.mock, so call it after setLocale().
import { L } from '../content/locale.mjs';

const win = (title, body, cls = '', badge = '') => `
<div class="mock ${cls}" aria-hidden="true">
  <div class="mock-bar"><span class="mock-title">${title}</span>${badge}</div>
  <div class="mock-body">${body}</div>
</div>`;

const bars = (vals, cls = '') => `<div class="m-bars ${cls}">${vals.map((v, i) => `<i style="--h:${v}%;--i:${i}"></i>`).join('')}</div>`;
const live = (txt) => `<span class="m-live">${txt}</span>`;
const check = '<svg class="ico" aria-hidden="true"><use href="#i-check"/></svg>';

export const buildMocks = () => {
  const m = L.t.mock;
  return {
  erp: win(m.erp.title, `
    <div class="m-erp">
      <div class="m-side"><i class="on"></i><i></i><i></i><i></i><i></i></div>
      <div class="m-main">
        <div class="m-kpis">
          <div class="m-kpi"><small>${m.erp.k1}</small><b class="num" data-count="1240000" data-format="egp">1,240,000</b></div>
          <div class="m-kpi"><small>${m.erp.k2}</small><b class="num" data-count="86500" data-format="egp">86,500</b></div>
          <div class="m-kpi"><small>${m.erp.k3}</small><b class="num" data-count="38">38</b></div>
        </div>
        <div class="m-chart">
          <div class="m-chart-head"><span>${m.erp.chart}</span><span class="num">EGP k</span></div>
          ${bars([42, 58, 50, 71, 64, 83, 76, 96])}
        </div>
        <table class="m-table">
          <tr><td class="num">INV-0421</td><td>Naturetex</td><td class="num">125,000</td><td><span class="m-badge ok">${m.erp.ok}</span></td></tr>
          <tr><td class="num">INV-0420</td><td>PowerLine</td><td class="num">210,000</td><td><span class="m-badge ok">${m.erp.ok}</span></td></tr>
          <tr><td class="num">INV-0419</td><td>Trend Pharm</td><td class="num">64,200</td><td><span class="m-badge wait">${m.erp.wait}</span></td></tr>
        </table>
      </div>
    </div>`, 'mock--erp'),

  eta: win(m.eta.title, `
    <div class="m-eta">
      <div class="m-inv">
        <div class="m-inv-row"><span>${m.eta.client}</span><b>Naturetex</b></div>
        <div class="m-inv-row"><span>${m.eta.tax}</span><b class="num">5xx-xxx-431</b></div>
        <div class="m-inv-row"><span>${m.eta.code}</span><b class="num">EG-4918…-0021</b></div>
        <div class="m-inv-row total"><span>${m.eta.total}</span><b class="num">125,000.00</b></div>
      </div>
      <ol class="m-flow">
        ${m.eta.flow.map((f, i) => `<li style="--i:${i}"><span class="m-flow-dot"></span>${f}</li>`).join('\n        ')}
      </ol>
      <div class="m-stamp"><span>${m.eta.stamp}</span><small class="num">UUID 7F3A…C21E</small></div>
      <svg class="m-qr" viewBox="0 0 21 21" aria-hidden="true">${qr()}</svg>
    </div>`, 'mock--eta', live(m.eta.live)),

  hr: win(m.hr.title, `
    <div class="m-hr">
      <div class="m-emp"><span class="m-av">${m.hr.initials}</span><div><b>${m.hr.name}</b><small>${m.hr.meta}</small></div><span class="m-badge ok">${m.hr.badge}</span></div>
      <ul class="m-slip">
        <li style="--i:0"><span>${m.hr.rows[0]}</span><b class="num">12,000</b></li>
        <li style="--i:1"><span>${m.hr.rows[1]}</span><b class="num">+1,800</b></li>
        <li style="--i:2"><span>${m.hr.rows[2]}</span><b class="num">+540</b></li>
        <li style="--i:3" class="minus"><span>${m.hr.rows[3]}</span><b class="num">−1,320</b></li>
        <li style="--i:4" class="minus"><span>${m.hr.rows[4]}</span><b class="num">−690</b></li>
        <li style="--i:5" class="net"><span>${m.hr.rows[5]}</span><b class="num" data-count="12330">12,330</b></li>
      </ul>
    </div>`, 'mock--hr'),

  zk: win(m.zk.title, `
    <div class="m-zk">
      <div class="m-device">
        <svg viewBox="0 0 80 110"><rect x="4" y="4" width="72" height="102" rx="12" fill="#11253a"/><rect x="14" y="14" width="52" height="34" rx="5" fill="#1f6aa8"/><text x="40" y="36" text-anchor="middle" fill="#d7e8f6" font-size="11" font-family="IBM Plex Mono">08:02</text><circle cx="40" cy="78" r="17" fill="#243a52"/><g fill="none" stroke="#66a8dc" stroke-width="1.6" stroke-linecap="round"><path d="M33 72a9 9 0 0 1 14 0"/><path d="M31 79a9 9 0 0 1 18 0"/><path d="M34 86a6 6 0 0 1 12 0"/><path d="M40 76v12"/></g><rect class="m-scan" x="22" y="60" width="36" height="2" rx="1" fill="#f3a93a"/></svg>
      </div>
      <ul class="m-log">
        <li style="--i:0"><span class="num">08:02</span><b>${m.zk.names[0]}</b><span class="m-badge ok">${m.zk.in}</span></li>
        <li style="--i:1"><span class="num">08:04</span><b>${m.zk.names[1]}</b><span class="m-badge ok">${m.zk.in}</span></li>
        <li style="--i:2"><span class="num">08:21</span><b>${m.zk.names[2]}</b><span class="m-badge wait">${m.zk.late}</span></li>
        <li style="--i:3"><span class="num">08:23</span><b>${m.zk.names[3]}</b><span class="m-badge ok">${m.zk.in}</span></li>
      </ul>
      <div class="m-sync"><span class="pills"><i></i><i></i><i></i></span>${m.zk.sync}</div>
    </div>`, 'mock--zk'),

  warehouse: win(m.wh.title, `
    <div class="m-wh">
      <div class="m-shelf">${Array.from({ length: 15 }, (_, i) => `<i class="${[4, 7, 11].includes(i) ? 'hot' : i === 9 ? 'low' : ''}" style="--i:${i}"></i>`).join('')}</div>
      <div class="m-item">
        <div class="m-item-head"><b>${m.wh.item}</b><span class="m-badge wait">${m.wh.badge}</span></div>
        <div class="m-item-meta"><span class="chip">${m.wh.batch} <span class="num">B-2291</span></span><span class="chip chip--amber">${m.wh.expiry} <span class="num">03/2027</span></span><span class="chip">${m.wh.shelf} <span class="num">C-14</span></span></div>
        <div class="m-level"><span class="m-level-fill"></span><span class="m-level-line"></span></div>
        <div class="m-level-legend"><span>${m.wh.stock} <b class="num">142</b></span><span>${m.wh.reorder} <b class="num">150</b></span></div>
        <div class="m-suggest"><svg class="ico" aria-hidden="true"><use href="#i-refresh"/></svg>${m.wh.suggest}</div>
      </div>
    </div>`, 'mock--wh'),

  iot: win(m.iot.title, `
    <div class="m-iot">
      <svg class="m-line" viewBox="0 0 320 90" aria-hidden="true">
        <rect x="6" y="52" width="308" height="10" rx="5" fill="#dde5ee"/>
        <g class="m-belt">${Array.from({ length: 9 }, (_, i) => `<rect x="${14 + i * 36}" y="38" width="20" height="14" rx="4" fill="#a9cdec"/>`).join('')}</g>
        <rect x="40" y="10" width="54" height="30" rx="8" fill="#11253a"/><rect x="220" y="10" width="54" height="30" rx="8" fill="#11253a"/>
        <circle class="m-node" cx="67" cy="25" r="5" fill="#1f9d6b"/><circle class="m-node" cx="247" cy="25" r="5" fill="#f3a93a" style="animation-delay:.6s"/>
      </svg>
      <div class="m-sensors">
        <div><small>${m.iot.counter}</small><b class="num" data-tick="pcs">1,284</b><em>${m.iot.pcs}</em></div>
        <div><small>${m.iot.temp}</small><b class="num" data-tick="temp">71.4</b><em>°C</em></div>
        <div><small>${m.iot.energy}</small><b class="num" data-tick="kwh">38.2</b><em>kWh</em></div>
      </div>
      <div class="m-alert"><span class="m-badge wait">${m.iot.alertTag}</span>${m.iot.alert}</div>
    </div>`, 'mock--iot', live(m.iot.live)),

  ai: win(m.ai.title, `
    <div class="m-ai">
      <div class="m-msg me" style="--i:0">${m.ai.q}</div>
      <div class="m-typing" style="--i:1"><span class="pills"><i></i><i></i><i></i></span> ${m.ai.typing}</div>
      <div class="m-msg bot" style="--i:2">${m.ai.a}
        <span class="m-src">${m.ai.src}</span>
      </div>
      <div class="m-action" style="--i:3">
        <div><b>${m.ai.act}</b><small>${m.ai.actSub}</small></div>
        <span class="m-approve">${m.ai.approve}</span>
      </div>
    </div>`, 'mock--ai', live(m.ai.live)),

  bi: win(m.bi.title, `
    <div class="m-bi">
      <div class="m-donut"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.9" fill="none" stroke="#edf5fc" stroke-width="6"/><circle class="m-seg a" cx="21" cy="21" r="15.9" fill="none" stroke="#2b7bbd" stroke-width="6" stroke-dasharray="54 46" stroke-dashoffset="25"/><circle class="m-seg b" cx="21" cy="21" r="15.9" fill="none" stroke="#66a8dc" stroke-width="6" stroke-dasharray="28 72" stroke-dashoffset="71"/><circle class="m-seg c" cx="21" cy="21" r="15.9" fill="none" stroke="#f3a93a" stroke-width="6" stroke-dasharray="18 82" stroke-dashoffset="43"/></svg><span><b class="num">54%</b><small>${m.bi.donut}</small></span></div>
      <ul class="m-legend"><li><i style="background:#2b7bbd"></i>${m.bi.legend[0]}</li><li><i style="background:#66a8dc"></i>${m.bi.legend[1]}</li><li><i style="background:#f3a93a"></i>${m.bi.legend[2]}</li></ul>
      <svg class="m-spark" viewBox="0 0 200 60" preserveAspectRatio="none"><path class="m-spark-area" d="M0 50 L25 44 L50 46 L75 34 L100 38 L125 26 L150 28 L175 16 L200 12 L200 60 L0 60Z" fill="#edf5fc"/><path class="m-spark-line" d="M0 50 L25 44 L50 46 L75 34 L100 38 L125 26 L150 28 L175 16 L200 12" fill="none" stroke="#2b7bbd" stroke-width="2.2" stroke-linejoin="round"/></svg>
      <div class="m-bi-kpis"><div><small>${m.bi.margin}</small><b class="num">23.8%</b></div><div><small>${m.bi.turns}</small><b class="num">6.1x</b></div><div><small>${m.bi.dso}</small><b class="num">41</b><em>${m.bi.days}</em></div></div>
    </div>`, 'mock--bi'),

  custom: win('approval_rules.py', `
    <div class="m-code" dir="ltr">
      <pre><code><span class="c-k">def</span> <span class="c-f">on_submit</span>(doc):
    <span class="c-c"># purchase orders above limit need CFO</span>
    <span class="c-k">if</span> doc.grand_total &gt; <span class="c-n">250_000</span>:
        request_approval(doc, role=<span class="c-s">"CFO"</span>)
    notify_whatsapp(doc.owner, <span class="c-s">"${m.code.sent}"</span>)</code></pre>
      <div class="m-flowline" dir="${L.dir}">${m.code.flow.map((n, i) => `<span class="m-node-b${i === 2 ? ' hot' : i === 3 ? ' ok' : ''}" style="--i:${i}">${n}</span>`).join('<i></i>')}</div>
    </div>`, 'mock--code'),

  cloud: win(m.cloud.title, `
    <div class="m-cloud">
      <div class="m-up"><small>${m.cloud.uptime}</small><div class="m-up-bars">${Array.from({ length: 30 }, (_, i) => `<i class="${i === 17 ? 'warn' : ''}" style="--i:${i}"></i>`).join('')}</div></div>
      <ul class="m-checks">
        ${m.cloud.checks.map((c, i) => `<li style="--i:${i}">${check}${c}</li>`).join('\n        ')}
      </ul>
      <div class="m-gauges"><div><small>${m.cloud.cpu}</small><span class="m-gauge" style="--v:34"></span></div><div><small>${m.cloud.mem}</small><span class="m-gauge" style="--v:52"></span></div><div><small>${m.cloud.disk}</small><span class="m-gauge" style="--v:41"></span></div></div>
    </div>`, 'mock--cloud', live(m.cloud.live)),
  };
};

// A deterministic, decorative QR-like pattern (not a real code)
function qr() {
  let out = '';
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const finder = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" rx="1.2" fill="#0a1a2b"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" rx=".8" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx=".5" fill="#0a1a2b"/>`;
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    if (!inFinder && rnd() > 0.52) out += `<rect x="${x}" y="${y}" width="1" height="1" fill="#0a1a2b"/>`;
  }
  return out + finder(0, 0) + finder(14, 0) + finder(0, 14);
}
