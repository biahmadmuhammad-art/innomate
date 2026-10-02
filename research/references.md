# Innomate: reference site review

Reviewed 2026-09-30. Brief: a LIGHT-themed B2B site for Innomate (Egyptian ERPNext + AI-agents implementation partner, Arabic RTL + English), built in HTML/CSS/JS first and then converted to Elementor. Two ideas are fixed: a creative mega menu, and grigoletti-style stacked service cards.

## Method, and how far to trust each line

- **Fetched:** every URL was pulled with curl (desktop Chrome UA). I extracted the title, headings, body text, script sources and colour tokens. WebFetch failed for tentwenty, origin and neue.world ("Command failed" or a domain-safety block), so curl replaced it.
- **Seen:** most sites were then opened in a real browser (the built-in browser pane at about 800x600, and 1366x820 for the mega menus). I scrolled them and took screenshots. Anything described as a layout or motion was **seen** unless it is marked *(inferred)*.
- **Libraries:** these come from the `<script src>` lists (GSAP, ScrollTrigger, Lenis and so on). They are facts about the page source.
- **Motion:** a screenshot sequence shows state changes (a card grows, rows stack, a counter changes), not frame-by-frame animation. Easing and timing are *(inferred)*.
- **Videos:** some hero videos rendered black in the pane (tentwenty). I describe what the HTML and the overlaid text show.
- **Stopped early:** I stopped browsing when asked to wrap up. **a-lign.studio's bottom menu was not visually verified.** Its entry is based on HTML only.

Legend: **Theme** means the dominant background of the page. "Mixed" means both dark and light full-width sections appear.

---

## 1. Owner's inspiration list (highest priority)

### grigoletti.ch/en/ (home)
- **Reachable:** yes. **Theme:** mixed, leaning light. Warm light grey/stone background (about #E4E2DC) alternating with near-black panels. Condensed all-caps display type.
- **Stack:** Framer (framerusercontent), Lenis smooth scroll.
- **Nav:** a small centred pill group (`SERVICES ▾ | PROJECTS | ABOUT ME`), a logo mark on the left, and a black "Contact" pill with an avatar on the right.
- **Hero:** a huge condensed uppercase headline ("FRAMER WEBSITES THAT MAKE YOUR BUSINESS IMPOSSIBLE TO IGNORE"), a two-button row ("Book a call" solid, "See projects" outline) and a small project-screenshot stack at the bottom right.
- **Services ("How I can help you"), seen:** a dark section. Each service is a full-width row with a big number (`01.`), a title ("Design"), an arrow icon, a paragraph, and a 3-item numbered sub-list (Customer Journey / Design Concept / Responsive Design). **As you scroll, each row's header sticks at the top, and the next row slides up underneath and stacks.** Screenshots show 01 Design, then 01+02 Development, then 01+02+03 SEO, with the headers stacked like tabs. This is a sticky stacking-rows effect.
- **Projects:** a light list. Each row has year and category in mono on the left, the client name in huge condensed caps, and an arrow icon on the right. **On hover the row fills black, a thumbnail pops in and a "Live website" pill appears** (seen on the /projects page).
- **Small to big, seen:** after the projects list, a **small black rectangle appears in the middle of the light page and grows as you scroll until it fills the viewport**. It becomes the dark "Hey, I'm Dario" About panel. This is the "cards stack small to big" feel the owner described.
- **Values list:** inside the dark panel, rows (Individual / Details / Fixed price / Feedback / Communication / Simple / Support). **The row at the viewport centre is bright white and the others are dimmed.** It is a scroll-driven highlight.
- **FAQ:** light, numbered `(01)…(08)` questions right-aligned, with a "+" toggle.
- **Verdict:** this is the core reference for the Innomate **services stack**, **values/why-us** and **FAQ**. Keep the warm-stone light background as the base. Use the dark panel only for one scale-up "moment" (the AI-agents or ETA section).

### grigoletti.ch/en/services (card style)
- **Reachable:** yes. **Theme:** dark page with **light stone cards**.
- **Seen:** 3 cards ("Framer Website", "Framer Development", "Framer Support"), 2 per row. Each card has a huge condensed title, one line of description, three small dots at the top right (a mini carousel indicator), a hairline "Timeline ····· 2-10 weeks" row and a "Learn more →" row. **Cards come in rotated or tilted and straighten on scroll** (the first viewport shows them angled). This is *(inferred)* as a scroll-linked rotate-to-0. After them come a "Disclaimer" block, an FAQ and a CTA.
- **Verdict:** this is the **card anatomy** for Innomate service cards: title, one-liner, "Timeline / Typical duration" meta row and "Learn more" row. For ERP use rows like "Typical go-live: 8–16 weeks" and "Modules: …".

### grigoletti.ch/en/projects (services/projects display)
- **Reachable:** yes. **Theme:** light stone.
- **Seen:** the same big-row list as the home page (12 rows), with the hover-to-black row, the inline thumbnail and the "Live website" pill.
- **Verdict:** use this for the **Sectors index** and **Case-study index** as a list with a hover preview. It is cheap in Elementor: a Loop Grid, CSS hover and an absolutely-positioned image.

### loop-agency.framer.website (team section; the team is on /studio)
- **Reachable:** yes. **Theme:** light (white). It has a persistent side **LIGHT / DARK / SYSTEM** theme switcher.
- **Stack:** a Framer template.
- **Home:** a stacked list of giant condensed grey project names that scroll past, with view toggles (List / Gallery / Loop / Spiral).
- **/studio "The Team", seen:** a white page, with the "THE TEAM" label pinned in the left column. **Portraits sit in a deliberately irregular 4-column grid** (row 1 in columns 2–3, row 2 in columns 1 and 3, and so on). Each has a light-grey backdrop and **thin crosshair guide lines over the photo**. Below each portrait: role in small mono caps ("FOUNDER & CREATIVE DIRECTOR"), the name in condensed caps, and text-only social links ("LI X IG"). The cursor is a small black square.
- The same page also has "In numbers", a services accordion, and an **awards ticker table** (award / category / ×count) scrolling vertically.
- **Verdict:** use the **About page team grid**: offset grid, mono role label, crosshair overlay (it fits an "engineering/precision" ERP brand). Build it in Elementor with a CSS grid and `grid-column` per item.

### a-lign.studio (bottom menu)
- **Reachable:** yes (HTTP 200). **Visually verified:** no. The browsing session ended before the screenshot.
- **From the HTML:** Webflow plus GSAP 3.15 (ScrollTrigger, SplitText, Flip, Draggable, InertiaPlugin, ScrambleText, CustomEase), Lenis, Barba.js page transitions, Swiper and hls.js. The nav markup has `home / work / process / pricing / about`, a `Menu` button and `Contact`. There is also a "Loading 0 %" preloader. The sections are a hero ("Web design and development studio. Strategy-first websites…"), "Featured work", a process in 3 phases (Strategy / Design / Build, each with a deliverables list) and pricing.
- **Bottom menu:** that the nav docks at the bottom of the viewport is taken from the owner's note, not from what I saw.
- **Verdict:** a **bottom-docked mobile nav bar** (Home / Services / Sectors / Contact, plus a "Menu" sheet) is a good fit for Arabic mobile users. The process layout (phase with deliverable chips) maps onto the ERPNext methodology.

### baunfire.com (side menu)
- **Reachable:** yes. **Theme:** mixed. The hero is dark (#1f1e1d) with giant vertical "BAUNFIRE" letters; the body is white.
- **Stack:** Gatsby/React.
- **Menu, seen:** a circular hamburger at the top right opens a **full-viewport overlay** with a **vertical rotated "MENU" label on the left edge**, huge bold links (Work / Services / About / Insights / Contact) and a contact column (email and phone in the accent orange #f84525, address, social icons). **The overlay's colours match the section behind it**: dark over the hero, white over the white body (seen).
- A vertical "SCROLL" indicator runs along the right edge.
- The rest of the page: "Featured Work" as 2-col cards with the title at the bottom right, "What we do" (Website / Creative / Strategy), "Latest Insights" and the footer.
- **Verdict:** the **mobile/secondary menu overlay** (vertical label, giant links, contact column) and the vertical side labels as a quiet brand detail. Build the white variant.

---

## 2. Reference sheet

### tentwenty.me / tentwenty.com
- **Reachable:** yes. `.me` redirects to `.com`. **Theme:** dark with white sections (html `bg-white`, but the hero and work sections are black).
- **Stack:** Next.js, Vimeo/mp4 video.
- **Hero, seen:** a pinned full-screen video (it rendered black in the pane). The line "creating **digital** growth for" has the word "digital" in a violet (#4a48f3) highlight box. **On scroll, the client name below swaps** (astrazeneca, then adgm, then others): a scroll-scrubbed text swap.
- **Transition, seen:** a **white curved (arched) panel wipes up** over the dark hero.
- **Services:** a numbered list 01–07 ("Website Design & Build" … "Artificial Intelligence – AI") with a hovering preview card (a website screenshot on a teal card).
- **Work:** full-bleed project panels with **giant marquee titles** ("uae pavilion expo 2025 . vip booking platform . the secret society").
- **Also present:** "who we are" (4 value headings), a CTA ("Book your [website | strategy | app | …] development assessment"), a "play showreel" marquee, and a footer with office/directions/careers.
- **Verdict:** the **CTA with a rotating service word** ("Book your [ERP readiness | ETA e-invoice | AI agent] assessment", 30-minute slot). The **arched section transition** also works in white-on-stone. Skip the dark video hero.

### origin.global
- **Reachable:** yes. **Theme:** mixed (body class `dark`; the dark hero gives way to white mid-sections).
- **Hero, seen:** a preloader (logo, then a white screen), then a dark hero with a glowing iridescent blob and a **distorted/sliced headline reveal** ("Exploring brains, redefining brands") plus a **rotating circular "play reel" badge**.
- **Services, seen:** a full-width image card slider "01 / 05" (Brand Lab … Brand Production) with "See all services".
- **Also present:** "Spotlighted clients" (logo wall and "Become a partner"), case-study cards with category chips, an **awards table** (Awwwards 2x HM, Clutch "#1 B2B Agency in KSA", …), and a footer that is itself a mega sitemap (5 solution columns × 6–10 links).
- **Verdict:** the **footer-as-sitemap** (every module or sector linked; good for SEO) and the **awards table** layout for certifications (ERPNext partner, ETA-integrated, ISO…). Build them light.

### hidokmeh.com
- **Reachable:** yes. **Theme:** a photo hero. There is a yellow (#F7C02F) preloader, then a full-bleed photograph.
- **Seen:** preloader ("Dokmeh — Creative matter"), a centred 3-line headline over a wheat-field photo, the logo mark, "Discover projects" and award laurels (CSS Design Awards, Awwwards) at the bottom left. The page appears to be **hero-only right now**; the scroll did not advance and the HTML contains only the hero.
- **Verdict:** only the **award-laurel badges in the hero corner**. Use them for "ERPNext Certified Partner / ETA-integrated" badges.

### neue.world
- **Reachable:** yes (WebFetch blocked, curl and the browser fine). **Theme:** **light** (off-white, black CTAs).
- **Stack:** Webflow, GSAP + ScrollTrigger, Swiper, a marquee.
- **Seen:** a **top announcement bar** ("Your website isn't built for AI discovery? Book a Call →"), then a clean nav with a black "Free Discovery Call" button. The hero is a left-aligned H1 plus 2 CTAs plus 3 **partner credentials** (Webflow Enterprise Partner / Contra / Awwwards).
- A marquee of project images, then "Deep-dive into our Full-Service Case Studies": white cards with a sector tag chip (Financial Services / Government / AI SaaS) and service chips.
- **"Why AI search matters now":** 3 cards (The Problem / The Risk / The Fix) with a 3D render.
- **Services:** 2×2 dark image cards numbered 01–04.
- **Pricing:** tabs (One-time / Retainers / AI Search) with rows showing price and duration.
- **Also present:** a scroll-dim headline reveal (grey words turn black) *(seen as a grey-then-black state)* and a floating chat bubble.
- **Verdict:** the best **light B2B** reference. Borrow the **announcement bar**, **partner-credential row under the hero**, **case cards with sector and module chips**, the **Problem / Risk / Fix triad** (use it for ETA e-invoicing), and **engagement tabs** (Implementation / Support retainer / AI agents).

### ubernatural.io
- **Reachable:** yes. **Theme:** dark.
- **Stack:** Framer, Spline 3D.
- **Seen:** nav links with a text-roll hover *(inferred from the doubled labels)*. A large wrapped "About" paragraph. **"Our Process" as a giant faded heading pinned behind step cards** ("( 01. – Step ) Briefing … #. 01" with huge numerals) that slide over it. Then "Our Works" (a giant heading plus a project grid), "Why Framer?" (5 reasons) and an FAQ.
- **Verdict:** the **pinned giant-word background with step cards sliding over it**. Use it for "How we work" (Discover, Fit-gap, Configure, Migrate, Train, Go-live) with a light-grey giant word "المنهجية / Method".

### makeitwow.io
- **Reachable:** yes (a React SPA with an empty HTML shell; the browser renders it). **Theme:** mixed. The hero is white, services are black, projects are white.
- **Seen:** a hero in extended bold caps ("WE ARE **FINTECH** DESIGN AGENCY", with the accent word in purple) and a lime circular ↓ button. A dark **services accordion** (Websites / Platforms / Mobile Apps / Strategy & Branding, with a "+" to expand). Alternating image/text **project rows** ("View project"). A headline with an **inline image pill between words** ("OUR EXPERIENCE [img] IN FINTECH"). A stats row (15+ years / 300 projects / 25M MAU). A **contact form with chip selectors** ("I'm interested in…") and **budget chips** ($2K…>$10K).
- **Verdict:** the **chip-based contact form** (Modules: Accounting / Inventory / HR & Payroll / Manufacturing / ETA e-invoice / AI agents; company size chips instead of budget) and the **inline image pill in headlines**. This is a vertical-specialist agency (fintech), which is the same positioning Innomate has for ERP.

### metikulous.design
- **Reachable:** yes. **Theme:** **light** (warm off-white/grey gradient) with one dark ethos section.
- **Stack:** Framer, heavy mp4 video.
- **Seen:** a video hero, then a centred statement with a **chapter counter "1/4 Welcome to Metikulous"**. The headline mixes a **sans with an italic serif** ("We shape brands & craft digital experiences that *connect & deliver.*"). A work carousel. Then "2/4" in a black section with a **thin circular ring** and a centred statement. Then "3/4 What we do": **3 outlined cards** ((01) Build Bold Brands…). Then "4/4 Our Services": **"The things we do *so you don't have to.*"** with an **accordion** (Strategy, opened to show a sub-service list on the right).
- **Verdict:** the **chapter counter (1/4 … 4/4)** as a light section-eyebrow system, the **sans + italic accent** headline pattern (in Arabic, use a calligraphic or display cut for the accent word), and the **services accordion with a sub-list**. It suits the service-page template.

### granitemena.com
- **Reachable:** yes. **Theme:** mixed, mostly dark. There is a light "Latest Updates" block.
- **Stack:** Webflow, Swiper.
- **Seen:** a light-trail video hero ("Shaping your present. Accelerating your future.") with the nav split across the top. A dark **case-study carousel** (image plus a title and "View full case"). **"Transformation Streams"** (Prototype & Validate / Build & Scale / Engage & Grow) with icons and a sticky image. A light **news carousel** with tag chips (Announcement / MENA / AI / Partnership). A giant "LEARN MORE" plus a lead form.
- **Warning:** the "Customer Voices" testimonials are **lorem ipsum placeholders** in production. Do not copy them.
- **Verdict:** the **three "streams"** as a way to frame Innomate's offer (Implement, Integrate/ETA, Automate with AI agents) and the **news cards with tag chips** for an Insights strip. It is an AI + MENA growth partner, so it is close in positioning.

### ram.sa
- **Reachable:** yes. **Theme:** mixed. The header and hero are black, "What We Do" and FAQ are white, work is dark, and the CTA is black.
- **Stack:** **WordPress (Salient theme + WPBakery)**, GSAP + ScrollTrigger, Flickity, `data-footer-reveal`.
- **Seen:** a dark photo hero with the H1 "We build the brands behind Saudi Arabia's transformation." and an intro. Stats (570+ projects / 120+ brands / 82+ annual reports / 27+). "Featured Projects". **"What We Do": a sticky left heading plus a 2×2 numbered grid** (01 Brand Strategy …). A dark work grid with **filter tabs**. "Selected clients". A **FAQ written for SEO** ("What does RAM do?", "Does RAM work with government entities…?"). A black **"What are you building next?"** CTA. A **reveal footer** (the footer slides out from under the content).
- **Verdict:** the **2×2 numbered grid with a sticky heading** (good for "Why Innomate"), the **SEO-FAQ phrasing** ("Is Innomate an official ERPNext partner in Egypt?", "Does ERPNext support ETA e-invoicing?") and the **footer reveal**. It also proves a GSAP scroll site on WordPress.

### pencil.sa
- **Reachable:** yes. **Theme:** a dark hero, then a light grey (#e2e2e2) body.
- **Stack:** **WordPress + Elementor** (Arolax theme, "Animation Addons for Elementor", GSAP + ScrollTrigger + **ScrollSmoother** + **SplitText**, Swiper, jquery-numerator).
- **Seen:** a dark 3D-ribbon hero with a huge "THE CREATIVE AGENCY." and a **yellow keyword marquee strip** (WEB · DESIGN · CREATIVITY · CONSULTING · STRATEGY · DEVELOPMENT). A light "01. Who we are" section with a **big counter "20 YEARS"** and a yellow circle "Explore us more" button. **"02. Services": a 2-column list of service links with ↗ arrows** separated by hairlines. Full-width image reveals. "03. Selected work" (Elm, SASREF, Saudi Press Agency…). "04. The Founder". A blog. "Get started now".
- **Verdict:** the most important **Elementor-feasibility proof**. Everything seen (marquee, SplitText reveals, counters, smooth scroll) is shipped through Elementor addons. Borrow the **keyword marquee strip** under the hero (ERPNext · Accounting · Inventory · HR · Manufacturing · ETA · AI Agents) and the **2-column hairline service list**. Build both light.

### merlin.studio
- **Reachable:** yes. **Theme:** dark (forest green and orange).
- **Stack:** SvelteKit, mp4.
- **Seen:** an illustrated wizard hero, a big orange uppercase statement, a showreel, and case studies with a **sticky left text column and scrolling right media**. Also a "Merlin crafts / talks / thinks / … / gets it done" verb list and a downloadable brand-assets zip in the menu.
- **Verdict:** the **case-study layout** (sticky left: client, challenge, "Explore case study"; right: scrolling screenshots). Skip the theme.

### ltsthink.com and ltsthink.com/ar/
- **Reachable:** yes. **Theme:** **dark by default, with a working light mode**. The toggle was verified on /ar/: a white page with a soft teal radial glow, near-black text and a teal accent word. (I switched it back to dark afterwards.)
- **Stack:** Next.js, AOS. The fonts are Space Grotesk, Plus Jakarta Sans and **IBM Plex Sans Arabic**. /ar/ has `dir="rtl"`.
- **Why it matters:** this is effectively a **direct competitor pattern**. It is a KSA agency that sells **ERP & CRM** (ZATCA) next to marketing.
- **Mega menu (seen at 1366px):** two dropdown panels.
  - **Services:** 3 columns (Brand & Creative / Marketing & Growth / Web & Apps) and "All services →".
  - **ERP & CRM:** 3 columns: **Build & Operate** (Contracting, Real Estate, Manufacturing, Logistics, Automotive), **Services & Retail** (Hajj & Umrah, Healthcare, Retail, Hospitality, Education, Professional Services) and **Systems & Modules** (Custom ERP, CRM, HR & Payroll, Finance & Accounting), plus "All ERP & CRM solutions →".
  - Both are rounded dark panels with small caps column labels.
- **Home, seen:** a pill eyebrow ("Integrated marketing & innovation"), an H1 with a gradient accent word, 2 CTAs, a rating chip (★ 4.9 · 100+ brands), a logo strip, "Why LtsThink" (3 cards) and a **"Proof, not promises" stats bento** (9+ yrs / 250+ / Hundreds / Millions+).
- **Services accordion (seen on /ar):** accordion items on one side and a **sticky preview card on the other** with a counter "07 / 01", an image, the title and "Learn more".
- **/erp-crm/ page (a direct template for Innomate's service page), seen:**
  - The hero has **ZATCA / GOSI / Arabic-English trust chips** and an **HTML-built ERP dashboard mock**: sidebar modules, KPI tiles (Revenue MTD SAR 4.2M +8.4%), a bar chart, a sales pipeline and a floating toast "ZATCA e-invoice · INV-2241 … cleared & reported · Auto-filed in 2.3s".
  - Then: a sector marquee, "Off-the-shelf limits scale" (4 benefit bullets and a project-cost card mock), and **sector cards** (7, each with 3 workflow bullets).
  - "Enterprise verticals": a 13-row numbered list with module keywords.
  - "Unified modules" (6).
  - **Deployment strategy: 6 steps** (Discover, Design, Build, Migrate, Train, Deploy).
  - A tech stack block, an FAQ ("Is your ERP ZATCA Phase-2 compliant?") and selected work.
- **Contact page (seen):** a hero, 2 columns (info cards / form with **Budget range + Timeline selects**), a map and an FAQ.
- **Verdict:** this is **the key structural reference**.
  - **Mega menu:** use the same 3-column "Sectors / Modules / Services" idea, but light and more creative (see the mapping below).
  - **ETA highlight:** replace ZATCA with the **ETA e-invoice / e-receipt toast** ("ETA e-invoice · INV-… accepted · submitted in 2.1s") on an HTML dashboard mock. Innomate's own build already heads this way.
  - **Sector page template:** hero, workflows, modules, steps, FAQ.
  - **RTL typography:** IBM Plex Sans Arabic.
  - **Differentiate** by being light-first and ERPNext-specific, and by showing AI agents.

### design.com.sa (Mohammed Alloush)
- **Reachable:** yes (Framer). **Theme:** **light** (a lilac-white gradient with purple-to-pink gradient type and confetti).
- **Seen:** a **UX-principle chip marquee** (Intuitive Flow / Clear Labels / …), the hero "Clean. Simple. Actionable. Design" with a WhatsApp and a primary CTA, an interactive toggle/profile card, a horizontal project carousel, "Why Design?" and a **final CTA: a floating form card over giant gradient words** ("Design Better Projects").
- **Verdict:** the **CTA pattern**: a form card floating over oversized background words ("ابدأ رحلتك مع ERPNext"). Add the **WhatsApp CTA next to the primary CTA**, which matters in Egypt.

### stealth.design
- **Reachable:** yes (a Vite SPA). **Theme:** dark.
- **Seen:** the hero "( FROM PIXELS TO PRODUCTS )" in parentheses with a mono subline ("…SHIP AI POWERED PRODUCTS"), a 3-column project thumbnail grid with scroll clip-reveals, and a **giant wordmark footer** ("stealth" across the full width).
- **Verdict:** the **giant wordmark footer**. Use "innomate" in brand ink on stone, cropped at the bottom.

### iamstudio.me
- **Reachable:** **no.** DNS returns NXDOMAIN (non-existent domain) and the browser navigation failed.
- **Not reviewed.** Web search turns up an "I.AM Studio" at iamstudio.io, but that may be a different studio, so I did not review it as a substitute.

### surinder.design
- **Reachable:** yes (Astro). **Theme:** a dark starry hero, then a **light warm-cream body** (#FBF9F4, text #1A1714, accent #B0552F).
- **Seen:**
  - A **floating pill nav** that detaches on scroll, with a green "Available" dot.
  - The hero has pricing toggles ($3,000 fixed · one week / $8,000/month) and an animated journey path with tooltip cards.
  - A **wireframe vs final "drag to compare" slider** with project tabs.
  - A rating chip (4.98/5 from 300+ founders), a testimonial wall with result headlines ("+21% mobile checkout conversion"), and a logo strip.
  - **"Who it's for" persona cards** with illustrations.
  - A **comparison table** (hire vs this) with the recommended column highlighted and a CTA.
  - A **persistent floating "Ask anything about Surinder" AI input bar** at the bottom of the viewport.
- **Verdict:** the best **AI-agents showcase** idea: a docked "Ask Innomate's agent…" bar or demo chat. Also borrow the **result-led testimonials**, the **"hire in-house vs Innomate" comparison table** for Why Us, and the **before/after compare slider** ("Excel chaos" against the "ERPNext dashboard").

### 800website.ae
- **Reachable:** yes. **Theme:** mixed (a dark hero, white work section, black/purple services).
- **Stack:** **WordPress + Elementor Pro** (Hello theme), UiCore Animate, PowerPack, Swiper, WooCommerce.
- **Seen:** a **planet-horizon glow** hero (purple arc), a "Trusted by 100+ Brands" logo row on dark, "Our Recent Web Design & …" case cards, services over a photo in a purple rounded panel, and "Why choose us" with a "Verified" badge.
- **Verdict:** a second **Elementor Pro proof**. The **horizon-arc glow** could become a light "sunrise" arc behind the Innomate hero (a CSS radial gradient; no video needed).

### pmmd.net and pmmd.net/overview
- **Reachable:** yes (Astro/October CMS). **Theme:** a dark intro, then a **white** body, with dark principle sections.
- **Seen:**
  - An **intro with a giant percentage counter** (16%, then 100%) and captions that change ("We work with design and IT", "…with clients of any size").
  - Pill nav buttons (Who we are / Projects / Contact) and a **floating orange circular "Request project" button**.
  - Contact opens as a **frosted-glass (backdrop-blur) modal**.
  - A giant cropped word "beliefs".
  - Overview: giant type masked with images ("We love Design and…"), **expertise rows** (01/02/03 with a rotated colour block holding a phone mock and a right-aligned list of sub-services), and **tech-logo marquees in two rows running in opposite directions** (node, django, python, laravel, react, java, php…).
  - **Principles as a pinned horizontal scroll** ("We dive deep / Look ahead / We act proactively / We listen attentively / We strive for perfection") with an **SVG wave line and icons travelling along it**.
- **Verdict:** use the **two-row opposite-direction logo marquee** for **Integrations** (ETA, banks, Paymob/Fawry, WhatsApp, Shopify/WooCommerce, Power BI, OpenAI/Claude). Use the **SVG path drawn on scroll** for the **How-we-work** process line. Also consider the floating circular CTA.

### mina-massoud.com
- **Reachable:** yes. **Theme:** dark.
- **Stack:** WebGL/three, GSAP, Lenis.
- **Seen:** a WebGL shader preloader ("Tap to enter · audio on"), petals, a samurai/Japanese theme and a counter "003". The page stayed dark with the scroll locked behind the gate. The HTML adds sections: manifesto, about, "By the numbers", "Kitsune — how I work", journey, book.
- **Verdict:** **nothing to borrow directly.** The entry gate and theme don't fit B2B. The one idea is **"By the numbers" with a witty sub-caption per stat**.

### immersive-g.com (Immersive Garden)
- **Reachable:** yes. **Theme:** light grey preloader (#e8e8e8), then WebGL. The rest of the page did not render in the pane within about 25 s.
- **Seen:** the preloader tagline "innovative digital experiences studio" **fading in word by word**.
- **From the HTML:** a fullscreen project reel (Louis Vuitton VIA, Cartier, Masar Destination (KSA), Omega, Orano…) with a one-sentence description and a type label (Web Experience / Corporate / E-Shop). Stack: Nuxt, Lenis, WebGL.
- **Verdict:** only the **word-by-word tagline reveal** (SplitText, stagger). The WebGL reel is out of scope for Elementor.

### synchronized.studio
- **Reachable:** yes (Nuxt, GSAP). **Theme:** dark.
- **Seen:** a **0→100 counting preloader** ("We Are … 92"), a **top ticker marquee** ("synchronized archive" repeating), display serif type, and **services as a centred stack of lines with italic words mixed in**, inside a **rotating circular text ring** ("HOW WE CAN HELP"). The HTML lists "Selected cases 1–8", each with a numbered title and description.
- **Verdict:** the **circular rotating text badge** (a CSS-animated SVG textPath) as a small "Book a demo" sticker. Use sparingly.

### nectarestudio.com
- **Reachable:** yes. **Theme:** saturated magenta with a canvas pixel/dither grid (not light).
- **Seen:** a single-screen layout with a **client list on the left**. **Hovering a client name swaps the whole background to that case** (photo plus a paragraph on the right). The case copy is ERP-relevant: Arkoslight "integrating PIM, ERP, and CRM, along with automated lead generation"; Vondom "ERP-driven catalog data with CRM-enabled lead automation".
- **Verdict:** use the **hover-list-swaps-background** interaction for **Sectors** or **Case studies** (light version: a stone background with the image cross-fading in a rounded frame). Borrow the case-copy formula too: client and scale, then the system connected to real operations, then the business outcome.

### isadoradigitalagency.com
- **Reachable:** yes (a custom WP theme). **Theme:** dark purple gradient.
- **Seen:** a serif hero "Digital Evolution for Business" with a 3D object and client logos floating in the hero, a showreel card, an **award laurels row** on lilac, 3 capability links, staggered 2-column case studies, **counting stats** (seen mid-count at "142+" of 230+; $95B; 92% retention; 62% conversion lift), a bordered logo grid, and "Insights and stories" cards.
- **Verdict:** **stats that count up** (Elementor Counter widget) framed as **business outcomes** ("92% partner retention"). For Innomate: go-lives, users onboarded, ETA invoices submitted, hours automated by agents.

### lemma.studio
- **Reachable:** yes (Webflow, Lenis). **Theme:** dark grey.
- **Seen:** a single screen of pixelated/glitch video with mono type ("LE:MMA STUDIO — A strategy-led studio…").
- **Verdict:** **nothing to borrow** apart from possibly a subtle pixel-dissolve on image hover. Skip it.

---

## 3. Awwwards case pages

| Page | Reachable | What the page says | Borrow |
|---|---|---|---|
| awwwards.com/sites/oxigen | yes | Honorable Mention, Aug 24 2026, by **Saltnhue**. "Saudi Arabia's own symbols — palm and desert — rebuilt in **voxels** for an **AI advisory firm in Riyadh**." Elements: **Pixelated Footer**, **Interactive Voxels** (mouse). Palette #152227. Tags: Startups, Business & Corporate, Technology, 3D, Animation, WebGL, Three.js. Site: oxigen.sa (not opened). | The idea for Innomate's AI section: **local symbols rendered in "AI material"**. For example, a pixel or voxel treatment of an Egyptian motif (a mashrabiya pattern) that assembles on hover. A CSS-grid pixel version is Elementor-feasible; true voxels are not. |
| awwwards.com/sites/dubai-always | yes | Honorable Mention, Oct 11 2024, by SorryGuysDigital, for Dubai DET. A game-based tourism site. Elements: Game Content, How to Play (FAQ), Navigation between locations, Congratulations modal. Colour #ff6e00. Tags: Colorful, Fullscreen, Illustration, Sound. | Low relevance. At most, a **"How it works" FAQ written as steps** and a **success modal** after form submit. |
| awwwards.com/sites/saudi-research-and-media-group | yes | Honorable Mention, Dec 2 2024, by Parabolae/Charbel. **Built with Webflow + Laravel.** Elements: **Full-screen menu**, Home background video, **Team modal**, News page. Palette #101010 / #ffffff. Tags: Clean, Scrolling, Microinteractions. | A **team modal** (click a portrait to open a bio overlay) for the About page. The clean black/white corporate tone is a good benchmark for a Gulf corporate audience. |
| awwwards.com/sites/wooden-bakery-saudi-arabia | yes | Nominee, Jun 14 2016, by Maze. "6th anniversary". Tags: Food & Drink, Big Background Images, Clean, Scrolling. | Dated (2016) and low relevance. Nothing specific to borrow. |

---

## 4. Proposed mapping for Innomate

Rules applied: light first (stone #F2F0EB-ish plus white, with one dark "moment"). Every item is buildable with Elementor containers and widgets plus light GSAP/ScrollTrigger (and Lenis optional). Mirror everything for RTL with logical CSS properties (`inset-inline-start`, `margin-inline`), and flip the direction of the horizontal marquee and scroll in Arabic.

### Home

| Innomate section | Source | What we take | Adaptation |
|---|---|---|---|
| **Announcement bar** (optional) | neue.world | Thin top bar with one offer and a link | "ETA e-receipt phase deadline? Check your readiness →" |
| **Hero** | neue.world hero, ltsthink /erp-crm hero, 800website (arc) | Left-aligned H1 (right-aligned in RTL), 2 CTAs, a credential row under the hero, and an **HTML dashboard mock** with a floating ETA toast | Light stone background with a soft radial "sunrise" arc (CSS only). The mock is built in HTML so it can be translated and edited in Elementor (an HTML widget). Add a WhatsApp secondary CTA (design.com.sa). Headline words reveal with SplitText (pencil.sa proves this works in Elementor). |
| **Trust logos** | origin.global "Spotlighted clients", 800website "Trusted by 100+", pencil.sa keyword strip | Logo row plus a **keyword marquee strip** | One slow grayscale logo marquee. Under the hero, a thin accent strip: "ERPNext · Accounting · Inventory · HR & Payroll · Manufacturing · ETA · AI Agents". |
| **Stats** | isadora (counting outcome stats), ltsthink "Proof, not promises" bento, ram.sa | Count-up numbers with outcome labels | 4 tiles in a bento. The Elementor Counter widget fires on viewport entry. Use outcomes (go-lives, ETA docs submitted, hours automated), not vanity numbers. |
| **Services stacked cards** (fixed) | **grigoletti.ch** home (sticky stacking rows, and the small→big card) plus grigoletti /services (card anatomy) | Sticky headers that stack (`position: sticky; top: calc(var(--i) * 64px)`) and a scale-up from a small card | Each card holds a number, title, one-liner, a 3-item sub-list (modules), a "Typical go-live · 8–16 weeks" meta row and "Learn more". Each card is `position: sticky` with an increasing top offset. GSAP `scale: .9→1` and `borderRadius` as each card arrives (small→big). Light cards on stone; the last card can grow to a full-bleed dark panel that leads into the AI section. |
| **How we work** | pmmd.net/overview (SVG path drawn on scroll), ubernatural (pinned giant word with step cards), ltsthink (6-step deployment), a-lign (phase + deliverable chips) | Pinned section with a line that draws and step cards | 6 ERPNext phases (Discover, Fit-gap, Configure, Migrate, Train, Go-live & Hypercare). An SVG path with `stroke-dashoffset` scrubbed by ScrollTrigger. Each step has deliverable chips. Vertical on mobile. |
| **AI agents showcase** | surinder.design (docked "Ask anything" AI bar), neue.world (Problem/Risk/Fix cards), awwwards Oxigen (local symbol in "AI material") | A live-feeling agent input plus scripted answers | A dark "moment" panel (reached through the grigoletti scale-up). A chat mock where typed prompts ("Create a sales order for…", "Which invoices failed ETA today?") produce scripted agent replies with ERPNext doc chips. Optionally a pixel-grid mashrabiya that assembles on hover. |
| **ETA highlight** | ltsthink /erp-crm (ZATCA toast on a dashboard), neue.world (Problem/Risk/Fix) | A compliance toast plus a 3-card explainer | Toast: "ETA e-invoice · INV-2241 · accepted · 2.1s". The 3 cards are the Obligation (e-invoice / e-receipt), the Risk (penalties, rejected docs) and the Fix (Innomate connector + monitoring). Light panel with an accent border. |
| **Sectors** | grigoletti /projects (hover row fills and a thumbnail appears), nectarestudio (hover a list item and the background swaps), ltsthink (sector cards with 3 workflow bullets) | A big-row list with a hover preview | Rows: sector name in a large display face, the key modules in mono on the start side, an arrow on the end side. On hover the row fills ink colour and a sector photo or dashboard crop appears (on desktop; tap-through on mobile). |
| **Integrations** | pmmd.net/overview (two logo rows running in opposite directions) | Two marquees, one reversed | ETA, CBE banks, Paymob, Fawry, Valu, WhatsApp Business, Shopify, WooCommerce, Power BI, Google Workspace, OpenAI/Claude. CSS `@keyframes` marquee with `animation-direction: reverse` on row 2. Pause on hover. |
| **Why us** | ram.sa (sticky heading + 2×2 numbered grid), grigoletti (values list with the centre row highlighted), surinder (comparison table) | Numbered reasons plus a comparison | Sticky heading on the start side, 4 numbered reasons on the end side. Below that, a table: "In-house dev / Generic vendor / Innomate" with the Innomate column highlighted. |
| **Testimonials** | surinder.design (result-led testimonials with a rating chip) | A result headline per quote | "Month-end close from 12 → 3 days" as a bold line, then the quote, the person and the company logo. **Do not use placeholder text** (granitemena shipped lorem). |
| **FAQ** | grigoletti (numbered "(01)" questions), ram.sa (SEO-phrased questions) | Numbered accordion with SEO wording | The Elementor Accordion widget plus FAQPage schema. Questions like "Is ERPNext compliant with ETA e-invoicing?" and "How long does an ERPNext implementation take in Egypt?" |
| **CTA** | design.com.sa (form card over giant words), tentwenty (rotating service word + 30-min slot), ram.sa ("What are you building next?") | Oversized background words, a floating form, a rotating word | "Book your free [ERP readiness / ETA compliance / AI-agent] assessment, 30 minutes." A short form card (name, company, phone/WhatsApp) over the giant light words "ابدأ / Start". |
| **Footer** | origin.global (sitemap footer), stealth.design (giant wordmark), ram.sa (footer reveal) | Full sitemap columns and a cropped wordmark | Columns: Services / Sectors / Modules / Company / Contact, plus a giant "innomate" wordmark cropped at the bottom edge. Optional reveal (`position: sticky; bottom: 0` under `main`). |

### Mega menu (fixed)

| Part | Source | Adaptation |
|---|---|---|
| Structure | **ltsthink** ERP & CRM mega menu (3 labelled columns: Build & Operate / Services & Retail / Systems & Modules, plus an "All …" footer link) | Three columns: **Solutions** (ERPNext implementation, ETA e-invoice/e-receipt, AI agents, Integrations, Support), **Sectors** (Manufacturing, Distribution, Retail, Contracting, Healthcare, Services…) and **Modules** (Accounting, Inventory, HR & Payroll, CRM…). |
| Creative layer | grigoletti /projects (hover preview) and nectarestudio (hover swaps the visual) | A **fourth "preview" column** that changes on link hover: a small dashboard crop or ETA toast, and a one-line promise. On a light panel this carries the "creative" part without going dark. |
| Mobile / secondary | baunfire (full overlay, vertical "MENU" label, giant links, contact column) and a-lign (bottom menu, HTML only) | Bottom-docked bar (Home · Services · Sectors · WhatsApp · Menu). "Menu" opens a light full-screen sheet with giant links and a contact column. |
| Elementor note | pencil.sa and 800website run Elementor Pro | Build it with the Elementor Pro Mega Menu widget (or a Nav Menu plus a custom container dropdown). The preview column swaps on hover with about 20 lines of JS. |

### Service page template
Sources: ltsthink /erp-crm (hero with compliance chips and the dashboard mock, then benefits, modules and a 6-step process, then FAQ and work), metikulous (chapter counter "1/5" plus a services accordion with a sub-list), grigoletti /services (card meta rows), neue.world (engagement tabs).
Structure:
1. Hero with trust chips.
2. A "What you get" accordion (the modules as a sub-list).
3. The stacked cards for sub-services.
4. The process line.
5. Engagement tabs (Implementation / Support retainer / Add-on agents).
6. Related case study.
7. FAQ.
8. CTA.

Use chapter counters as eyebrows.

### Sector page template
Sources: ltsthink /erp-crm sector cards (3 workflow bullets each), the 13-row vertical list, nectarestudio (case copy formula), neue.world (Problem/Risk/Fix).
Structure:
1. Hero ("ERPNext for Manufacturing in Egypt").
2. Pain / Risk / Fix triad.
3. Workflows covered (bullet cards).
4. Modules used (chips).
5. ETA angle for the sector.
6. Sector case study.
7. Sector FAQ.
8. CTA.

### About page
Sources: loop-agency /studio (offset team grid, crosshair overlay, mono roles, text socials), awwwards SRMG (team modal), pmmd /overview (principles as a pinned horizontal scroll with an SVG wave), origin.global (awards/certifications table), metikulous (ethos statement in one dark panel).
Adaptation: mission statement, principles (horizontal on desktop, vertical in RTL mobile), a team grid with a bio modal, a certifications table (ERPNext partner, ETA-integrated…), then a CTA.

### Case study
Sources: merlin.studio (sticky left text column, scrolling right media), neue.world (sector and module chips on case cards), nectarestudio (copy formula), surinder (before/after compare slider), isadora (outcome stats).
Structure:
1. Hero: client, sector chip, 3 outcome stats.
2. Sticky context/challenge column alongside scrolling screenshots.
3. "Before / After" drag slider (spreadsheet against the ERPNext dashboard).
4. Modules and integrations chips.
5. Quote.
6. Next case.

### Contact
Sources: makeitwow (chip-select form: "I'm interested in…" plus budget chips), ltsthink contact (info cards, then the form with Budget + Timeline, then map and FAQ), pmmd (floating "Request project" circle and a glass modal), design.com.sa (WhatsApp beside the primary CTA).
Adaptation: chips for modules of interest and company size (1–20 / 20–100 / 100–500 / 500+); a timeline select; WhatsApp and phone cards; a Cairo office map; a short FAQ. The floating circular "Book a demo" button appears on every page.

---

## 5. Elementor feasibility notes (from what the sites actually ship)
- **pencil.sa:** WordPress + Elementor with "Animation Addons for Elementor", GSAP, ScrollTrigger, ScrollSmoother and SplitText in production. That covers text reveals, smooth scroll and pinning.
- **800website.ae:** Elementor Pro + UiCore Animate + PowerPack in production.
- **ram.sa:** WordPress (Salient/WPBakery) + GSAP ScrollTrigger + footer reveal.
- **Avoid:**
  - full WebGL scenes (immersive-g, mina-massoud, origin blob, nectar dither grid);
  - Framer-only interactions that need re-implementation (the grigoletti stack must be rebuilt with CSS sticky + GSAP; that is easy).
