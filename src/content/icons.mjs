// Innomate line icon set — 24×24, 1.6 stroke, round caps.
// Drawn for this site (no icon font). Each value is the inner SVG markup.
// build.mjs turns them into an inline <symbol> sprite and also writes
// standalone .svg files to site/assets/img/icons/ for Elementor uploads.

export const icons = {
  /* ---------- services ---------- */
  erp: `<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="3.75"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="3.75"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>`,
  ai: `<path d="M12 3.5l1.6 4.2a3 3 0 0 0 1.7 1.7L19.5 11l-4.2 1.6a3 3 0 0 0-1.7 1.7L12 18.5l-1.6-4.2a3 3 0 0 0-1.7-1.7L4.5 11l4.2-1.6a3 3 0 0 0 1.7-1.7z"/><path d="M19 17.5v3M17.5 19h3"/>`,
  eta: `<path d="M6 3h12v18l-2.5-1.6L13 21l-2.5-1.6L8 21l-2-1.3z"/><path d="M9 8h6M9 11.5h4"/><path d="M9.5 15.2l1.6 1.5 3.4-3.4"/>`,
  zk: `<path d="M8.5 5.2A7.5 7.5 0 0 1 19.5 12v1.5"/><path d="M4.5 9.5A7.5 7.5 0 0 1 6 7"/><path d="M4.5 13v-1a7.5 7.5 0 0 1 .2-1.6"/><path d="M8 19.5A11 11 0 0 1 7.5 12a4.5 4.5 0 0 1 9 0v1.5"/><path d="M12 12v2a8 8 0 0 0 1.8 5.2"/><path d="M16.5 17a12 12 0 0 1-.6 3"/>`,
  hr: `<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2a4.3 4.3 0 0 1 4.5 4.3"/>`,
  warehouse: `<path d="M3 9.5L12 4l9 5.5V20H3z"/><rect x="7" y="13" width="4.5" height="4" rx=".8"/><rect x="12.5" y="13" width="4.5" height="4" rx=".8"/><rect x="9.8" y="9" width="4.5" height="4" rx=".8"/>`,
  iot: `<rect x="8" y="8" width="8" height="8" rx="2"/><path d="M10.5 8V5M13.5 8V5M10.5 19v-3M13.5 19v-3M8 10.5H5M8 13.5H5M19 10.5h-3M19 13.5h-3"/><circle cx="12" cy="12" r="1.2"/>`,
  custom: `<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5"/><path d="M13.5 4.5l-3 15"/>`,
  cloud: `<path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 17.9 9.1 4.7 4.7 0 0 1 17.5 18.5z"/><path d="M12 11.5v5M9.8 13.7L12 11.5l2.2 2.2"/>`,
  bi: `<path d="M3.5 20.5h17"/><rect x="5" y="12" width="3" height="6" rx="1.5"/><rect x="10.5" y="7" width="3" height="11" rx="1.5"/><rect x="16" y="3.5" width="3" height="14.5" rx="1.5"/>`,

  /* ---------- sectors ---------- */
  agri: `<path d="M12 21V9"/><path d="M12 9c0-3 1.8-5 4.5-5.5.3 3-1.6 5.3-4.5 5.5zM12 9C12 6 10.2 4 7.5 3.5 7.2 6.5 9.1 8.8 12 9z"/><path d="M12 15c0-2.6 1.8-4.4 4.5-4.8.2 2.7-1.6 4.6-4.5 4.8zM12 15c0-2.6-1.8-4.4-4.5-4.8-.2 2.7 1.6 4.6 4.5 4.8z"/>`,
  health: `<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/><path d="M6.5 12.5h3l1.3-2.5 2 4.5 1.3-2h3.4"/>`,
  education: `<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.3c0 1.5 2.5 3.2 5.5 3.2s5.5-1.7 5.5-3.2v-4.3"/><path d="M21.5 9.5v5"/>`,
  electrical: `<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M12.8 6.5l-3.3 5.3h5l-3.3 5.7"/>`,
  pharma: `<rect x="3.6" y="8.6" width="16.8" height="6.8" rx="3.4" transform="rotate(-45 12 12)"/><path d="M9.6 9.6l4.8 4.8"/>`,
  furniture: `<path d="M5 11V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5V11"/><path d="M3.5 17.5V13a2 2 0 0 1 4 0v1.5h9V13a2 2 0 0 1 4 0v4.5z"/><path d="M5.5 17.5V20M18.5 17.5V20"/>`,
  apparel: `<path d="M9 3.5L4 6l1.5 4.5 2.5-1V20.5h8V9.5l2.5 1L20 6l-5-2.5a3 3 0 0 1-6 0z"/>`,
  food: `<path d="M4.5 11h15a7.5 7.5 0 0 1-15 0z"/><path d="M3 11h18"/><path d="M9 7.5c0-1 .8-1.5.8-2.5M12.5 7.5c0-1 .8-1.5.8-2.5"/><path d="M8 20.5h8"/>`,
  paints: `<rect x="4" y="3.5" width="14" height="6" rx="2"/><path d="M18 6.5h1.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H12v3"/><rect x="10.5" y="14.5" width="3" height="6" rx="1.2"/>`,
  sustain: `<path d="M5 19c0-8 5-13 15-14-.5 10-6 14.5-13 14"/><path d="M5 19l7-7"/>`,
  nonprofit: `<path d="M12 11.5s-4-2.3-4-5.2A2.2 2.2 0 0 1 12 5a2.2 2.2 0 0 1 4 1.3c0 2.9-4 5.2-4 5.2z"/><path d="M3 15.5l3.5-1.8a3 3 0 0 1 2.4-.1l3.6 1.4a1.4 1.4 0 0 1-1 2.6l-2.5-.6"/><path d="M3 20l4.8-1.5 6.2 1.3 6.2-4.2a1.3 1.3 0 0 0-1.6-2L15 15"/>`,
  professionals: `<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12.5h18M11 12.5v1.5h2v-1.5"/>`,

  /* ---------- ui ---------- */
  arrow: `<path d="M19 12H5M11 6l-6 6 6 6"/>`,
  chevron: `<path d="M6 9.5l6 6 6-6"/>`,
  check: `<path d="M5 12.5l4.5 4.5L19 7.5"/>`,
  plus: `<path d="M12 5v14M5 12h14"/>`,
  close: `<path d="M6 6l12 12M18 6L6 18"/>`,
  menu: `<path d="M4 8h16M4 16h10"/>`,
  phone: `<path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>`,
  mail: `<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7.5l8 5.5 8-5.5"/>`,
  whatsapp: `<path d="M4 20l1.3-3.9A8.2 8.2 0 1 1 8 18.8z"/><path d="M9.2 8.6c.2-.4.6-.5 1-.4l.5 1.4-.6.8a5.4 5.4 0 0 0 2.9 2.9l.8-.6 1.4.5c.1.4 0 .8-.4 1-1 .7-2.4.5-4-.7a7.6 7.6 0 0 1-2.2-2.7c-.4-.9-.3-1.7.6-2.2z"/>`,
  pin: `<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>`,
  clock: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
  shield: `<path d="M12 3.5l7 2.8v5.2c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6.3z"/><path d="M9 12l2.2 2.2L15.5 10"/>`,
  spark: `<path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5"/>`,
  play: `<path d="M8 5.5v13l10.5-6.5z"/>`,
  globe: `<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5S14.4 18.1 12 20.5M12 3.5C9.6 5.9 8.5 8.8 8.5 12s1.1 6.1 3.5 8.5"/>`,
  calendar: `<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>`,
  users: `<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M15.5 4.9a3.2 3.2 0 0 1 0 6.2M17.5 14a5.5 5.5 0 0 1 3 5.5"/>`,
  layers: `<path d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path d="M3.5 12.5L12 17l8.5-4.5"/><path d="M3.5 16.5L12 21l8.5-4.5"/>`,
  bolt: `<path d="M13 3L5.5 13.5H12L11 21l7.5-10.5H12z"/>`,
  target: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>`,
  headset: `<path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="3.5" y="13.5" width="4" height="6" rx="1.8"/><rect x="16.5" y="13.5" width="4" height="6" rx="1.8"/><path d="M18.5 19.5c0 1-1.5 1.5-4 1.5"/>`,
  map: `<path d="M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>`,
  doc: `<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6"/>`,
  link: `<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>`,
  bank: `<path d="M3.5 9.5L12 4.5l8.5 5z"/><path d="M5.5 10v7M10 10v7M14 10v7M18.5 10v7M3.5 20h17"/>`,
  card: `<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h3"/>`,
  linkedin: `<rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><path d="M8 10.5v6M8 7.5v.1M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.5-2.6s2.5 1 2.5 2.6v3.5"/>`,
  facebook: `<path d="M14 21v-7.5h2.6l.4-3H14V8.8c0-.9.3-1.5 1.6-1.5H17V4.6a20 20 0 0 0-2.3-.1c-2.3 0-3.7 1.4-3.7 3.9v2.1H8.5v3H11V21"/>`,
  quote: `<path d="M10 7.5C6.5 8.5 5 11 5 14.5V17h4.5v-4.5H7.3c.1-1.8 1-3.1 2.7-3.7zM19 7.5c-3.5 1-5 3.5-5 7V17h4.5v-4.5h-2.2c.1-1.8 1-3.1 2.7-3.7z"/>`,
  star: `<path d="M12 4l2.4 5 5.3.6-3.9 3.6 1.1 5.3L12 15.8l-4.9 2.7 1.1-5.3-3.9-3.6 5.3-.6z"/>`,
  sparkles: `<path d="M9.5 4.5l1.2 3.3a2 2 0 0 0 1.2 1.2l3.3 1.2-3.3 1.2a2 2 0 0 0-1.2 1.2L9.5 16l-1.2-3.4a2 2 0 0 0-1.2-1.2L3.8 10.2 7.1 9a2 2 0 0 0 1.2-1.2z"/><path d="M17.5 13.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>`,
  refresh: `<path d="M19.5 12a7.5 7.5 0 0 1-13.4 4.6M4.5 12a7.5 7.5 0 0 1 13.4-4.6"/><path d="M18 3.5v4h-4M6 20.5v-4h4"/>`,
  sheet: `<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M3.5 9h17M3.5 14.5h17M9.5 3.5v17"/>`,
  alert: `<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.2v.1"/>`,
  briefcase: `<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/>`,
  book: `<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>`,
  compass: `<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>`,
};

// icons that point in the reading direction and must mirror in RTL
export const directional = new Set(['arrow']);
