# Innomate — website prototype (HTML/CSS/JS → Elementor later)

Arabic (RTL, site root) and English (LTR, `/en/`), light theme — 37 pages per language, 74 in total, generated from one set of templates.

## Run it

```
npm install            # playwright + gsap (gsap is vendored into site/assets/vendor)
npm run build          # writes every page into site/
npm run serve          # http://localhost:4321
```

`site/` is plain static HTML — it also opens from the file system.

## Where things live

| Path | What |
|---|---|
| `src/content/ar/` · `src/content/en/` | one folder per language, same files and keys in both: |
| ┗ `site.mjs` | company facts, clients, testimonials, integrations, FAQ, jobs |
| ┗ `services.mjs` | the 10 service pages + the 6 home "stacked cards" groups |
| ┗ `sectors.mjs` | the 13 sector pages |
| ┗ `copy.mjs` | every interface string, page copy, page titles/descriptions, mock-screen text |
| `src/content/locale.mjs` | `setLocale('ar' | 'en')` — the templates read everything from `L` |
| `src/content/icons.mjs` | the custom line-icon set (also exported to `site/assets/img/icons/*.svg`) |
| `src/templates/layout.mjs` | head/SEO/JSON-LD, header, **mega menus**, mobile menu, dock, footer |
| `src/templates/mocks.mjs` | the 10 product illustrations (HTML), PNG exports in `site/assets/img/mocks/` |
| `src/templates/home.mjs` | home sections |
| `src/templates/pages.mjs` | service / sector / hub / company page templates |
| `site/assets/css/tokens.css` | design tokens → Elementor Global Colors & Fonts |
| `site/assets/js/main.js` | header island, menus, reveals, **stacked cards**, **fanned cards** (`data-fan`), pinned horizontal journeys (`data-journey`), client-words tabs (`data-testi`), filters, estimator, form |
| `site/assets/js/home.js` | hero intro + word roll, parallax, a-lign quote, pinned counter, AI demo, pinned industries (ends with `ST.sort()` because main.js creates the journey pin first) |
| `site/assets/js/live3d.js` | live 3D illustrations: any `data-model3d="kind:name"` element (comma list = swapping stage) |
| `docs/innomate-section-sources.xlsx` | which section came from which reference site, keywords, page map, placeholders |
| `research/` | competitor + reference-site research |

## Two languages

- Arabic pages at the root, English under `/en/`, same file names. Every page links to its twin (language switch in the header and mobile menu) and declares `hreflang` for both; `sitemap.xml` lists both with alternates.
- To change copy, edit the same key in `ar/*.mjs` and `en/*.mjs`. Templates hold no words.
- Direction-dependent CSS uses logical properties plus `--dx` (−1 in Arabic, +1 in English) for hover nudges.
- Checks: `node scripts/check-all.mjs` (errors + overflow at 390/1440 on all pages), `python scripts/seo-audit.py`, `python scripts/scan-lang.py` (no Arabic left in English pages).

## Motion, 3D and the one-screen rule

- **Motion model:** Lenis smooths the scroll and GSAP's ticker drives it; every scroll-linked effect (stacked cards, fanned cards, pinned counter, pinned industries, journey, a-lign quote) is a ScrollTrigger on that same timeline. Easing tokens are expo-out (`--ease-out`), 260/520/1100ms.
- **Header:** folds into a dark capsule on the way down (`.is-compact`), unfolds on the way up, on hover or on "Menu". Mega panels open as a circle from their button; the current page is highlighted inside them.
- **Cards:** `fan()` in `blocks.mjs` makes the grigoletti.ch/en/services row (stacked and tilted, spread by scroll). `.hcard` (and value/service/sector/integration/why cards) fill from the bottom on hover. CTA cards light an arc from the bottom edge on hover.
- **3D:** `site/assets/js/models3d.js` is the shared kit (materials, studio light, the logo, 13 industry, 10 service and 11 page models). `orbit3d.js` renders the live integrations scene; `live3d.js` animates every other model (idle sway, float, pointer tilt, spin-swap in the industries section) over its still WebP. `node scripts/render-sectors.mjs [sectors|services|pages] [name]` renders the stills into `assets/img/<kind>/` (needs `npm run serve`; convert PNG→WebP after). three.js is vendored under `assets/vendor/three/`; `page()` adds the import map and `live3d.js` to any page that has a model.
- **One screen per section:** `node scripts/heights.mjs <width | WxH>` lists any section taller than the viewport. Checked at 1440x900, 1366x768, 1280x720, 1536x730 and 390x812, in both languages. Short desktop screens get their own rules (`max-height: 820px`); on phones, card grids become swipe rows.
- **AI-slop pass:** `research/ai-slop-audit.md`; copy fixes applied with `node scripts/apply-slop-fixes.mjs`. Placeholders (team, case studies, design notes) only render with `DRAFTS=1 npm run build`.

## Design system (short)

- **Colours**: brand blues sampled from the logo (`#388ccc`, `#66a8dc`), ink `#0a1a2b` for text and dark surfaces, paper `#f4f7fa` background, **amber `#f3a93a` as the one action colour** (every competitor is blue; amber is ours).
- **Type**: Readex Pro (display, rounded like the logo pills) · IBM Plex Sans Arabic / IBM Plex Sans (body, per language) · IBM Plex Mono (numbers, codes, data).
- **Motif**: the logo's three pills — eyebrow marker, hero backdrop, mega-menu reveal, loaders, chart bars, CTA background, 404.
- **Radius**: pill buttons, 28/40px cards.

## Converting to Elementor

1. Site Settings → Global Colors / Fonts from `tokens.css` (names match).
2. Theme Builder: Header (with the three mega panels as Elementor *Mega Menu* / Loop templates), Footer, Single-page templates for **Service** and **Sector** (the content fields in `services.mjs` / `sectors.mjs` become ACF/JetEngine fields).
3. Sections map to Containers. Mocks are HTML widgets (or the PNGs).
4. Languages: WPML or Polylang, Arabic default. Each `ar/`+`en/` content pair becomes the two translations of one post. Add `assets/css/*.css` to the child theme and enqueue `gsap`, `ScrollTrigger`, `main.js`, `home.js`.
5. Stacked cards = sticky containers (`position: sticky; top: calc(header + i×16px)`) + the small scale script in `main.js`.
6. JSON-LD per template (Service + FAQPage + BreadcrumbList) via Rank Math or a snippet.

## Not real yet (placeholders)

See the **Placeholders** sheet in `docs/innomate-section-sources.xlsx`. In short: team names/photos, case studies, package prices,
social handles, a native-speaker read of the English copy, the contact form backend, ETA timeline dates (verify on eta.gov.eg), and all mock-screen data
(sample numbers, not client data).
