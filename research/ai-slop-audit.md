# Innomate prototype: AI-slop audit

Date: 30 September 2026. This is a report only; no site files were changed.

**Scope.** Every visible string in `src/content/{ar,en}/{copy,site,services,sectors}.mjs`, every template in `src/templates/*.mjs`, and every stylesheet in `site/assets/css/*.css`. I checked the rendered pages with Playwright screenshots at 1440px: Arabic home, English home, `services/eta-e-invoice.html`, `en/sectors/paints.html`, `en/pricing.html` and `en/about.html`.

**Heads-up: the home page changed during the audit.** `home.mjs` and both `copy.mjs` files were edited between 20:06 and 20:11. The edits added the `align` quote section, a pinned `statsSec` counter and an image-led `sectorsSec`, and removed the old `problem` block from the page. This audit covers the new source.

- **Verified against:** every `find` string in `research/ai-slop-copy-fixes.json` was checked against the files as they stood at 20:23, after those edits.
- **If the files change again:** re-run the check before applying anything.
- **Unused keys:** `homeCopy.problem`, `problemTurn` and `problemEyebrow` are no longer rendered, so I left them out of the fix list.

---

## 1. What "AI slop" looks like: a sourced summary

### 1a. Visual and design tells

Most design critics give the same cause. A model with no brief falls back on the statistical average of 2019–2024 Tailwind and Dribbble work. Adam Wathan's August 2025 post apologising for `bg-indigo-500` is the usual shorthand for this ([DEV: Blame Tailwind's indigo-500](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p), [DEV: The purple gradient problem](https://dev.to/james_anderson_h/the-purple-gradient-problem-why-ai-ui-all-looks-alike-and-how-to-fix-it-3j65)). The specific patterns these sources name:

| Tell | Named by |
|---|---|
| Purple or blue gradients; radial glow or halo behind the hero | [Impeccable slop catalogue](https://impeccable.style/slop/), [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide), [SmoothUI (E. Calvo, Jun 2026)](https://smoothui.dev/blog/ai-design-slop) |
| Glassmorphism: blur cards and glow borders used as decoration | Impeccable, SmoothUI |
| Icon in a rounded square above every card heading | Impeccable ("icon tile stacked above heading"), SmoothUI ("icon + heading + two text lines") |
| Identical card grids: three or six equal cards | Impeccable, [TeneX Studio (Jul 2026)](https://tenex.studio/en/blog/ai-slop-ui-8-signes/), SmoothUI, 925 Studios; taste-skill §9.C; redesign-skill ("the most generic AI layout") |
| An eyebrow label above every section heading | TeneX, [Vibemole](https://vibemole.com/resources/avoid-vibecoded-app-design); taste-skill §4.7 ("the #1 violated rule", max one per three sections) |
| A small pill badge above the headline | Impeccable, Vibemole |
| Pulsing green "live" status dot | Impeccable; taste-skill §9.F ("zero decorative status dots") |
| Fake dashboards, metrics, testimonials and logos | Vibemole, TeneX ("fabricated numbers and names"); taste-skill §4.8 ("div-based fake screenshots … the #1 LLM-design tell") |
| Hero metrics: big number, small label | Impeccable; frontend-design skill ("the template answer") |
| Decorative numbering (01 / 02 / 03) on content that is not a sequence | TeneX; frontend-design skill; taste-skill §9.F (also bans `01 / 4` pagination) |
| Auto-scrolling marquee | Impeccable |
| Generic fade-in on every element; bounce on every hover | 925 Studios, SmoothUI; frontend-design skill ("extra animation contributes to the feeling that the design is AI-generated") |
| Gradient text; oversized italic serif headline | Impeccable, TeneX |
| Inter or system font; the same 16px radius on everything | 925 Studios |
| Stock "diverse team at a laptop" photos; abstract 3D blobs | 925 Studios; redesign-skill |
| Scroll cues ("scroll to explore", mouse icon) | taste-skill §9.F |
| Filled progress bars used as comparison visuals | taste-skill §9.F |
| A left headline with a small paragraph floating on the right (split header) | taste-skill §4.7 |
| Middle-dot (`·`) separators everywhere | taste-skill §9.F |
| One filled button plus one ghost button every time; pill badges | redesign-skill |
| The same CTA intent under several labels | taste-skill §4.5 |
| Em dashes in UI copy | Impeccable, TeneX; taste-skill §9.G (a total ban) |

I found no source that lists "sparkles icon" or "emoji icons" as a tell. taste-skill bans emoji and lists the rocket and shield as clichéd metaphors; the sparkles-as-"AI" point below is my own judgement. None of the sources treats a bento grid as a tell on its own. The complaint is bento used by default, or bento tiles with nothing but text in them (taste-skill §4.7).

### 1b. Copy tells (English)

- **[Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).** Lists:
  - negative parallelisms ("not X but Y", "not just X but also Y", "Y rather than X")
  - the rule of three
  - em dashes used to "punch up" clauses
  - title case, overuse of bold, promotional language ("vibrant, groundbreaking, renowned")
  - vague attributions
  - superficial "-ing" analysis
  - an AI-vocabulary list: *additionally, align with, crucial, delve, enhance, fostering, garner, highlight, intricate, landscape, meticulous, pivotal, showcase, tapestry, testament, underscore, valuable, vibrant*.
- **[Poynter (M. Crowley, 28 Sep 2026)](https://www.poynter.org/reporting-editing/2026/ai-changing-human-writing-editors-em-dash/).** Editors name em dashes "every other sentence", negative parallelism, waffly phrasing and too many lists. They also warn that stripping every dash does not make prose good. What matters is rhythm.
- **Local skills.** avoid-ai-writing (C. Bronsdon, v3.25.0), stop-slop and humanizer, which is built on the Wikipedia page. They add:
  - an em-dash target of zero, and one per 1,000 words at most
  - "It's not X, it's Y", including the split-sentence and tail-negation forms (", not a report")
  - buzzwords: *seamless, robust, leverage, cutting-edge, game-changer* (tier 1); *elevate, streamline, empower, unleash* (flag in clusters)
  - "Whether you're…"; "In today's…"
  - intensifiers: *actually, really, genuinely, truly*; "real" used as an adjective to inflate
  - aphorism formulas ("A good X is one that…")
  - narrated candor ("honestly", "to be upfront")
  - staccato drumrolls ("Better X. Better Y. Better Z.")
  - false "from X to Y" ranges; mirrored contrast pairs.

### 1c. Copy tells in Arabic

The sources here are thinner, and I say so where I rely on my own judgement.

- **[Buzzinga: 6 signs, from Reddit users (16 Dec 2025)](https://buzzinga.ai/%D8%B9%D9%84%D8%A7%D9%85%D8%A7%D8%AA-%D8%AA%D9%83%D8%B4%D9%81-%D8%A7%D9%84%D9%86%D8%B5%D9%88%D8%B5-%D8%A7%D9%84%D9%85%D9%83%D8%AA%D9%88%D8%A8%D8%A9-%D8%A8%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7/).**
  - the long dash (called the "ChatGPT dash")
  - «وبصدق؟» and «بدون حشو» used as fake-candid openers
  - chains of short dramatic sentences
  - the contrast frame «ليس كذا، بل كذا»
  - heavy signposting (أولاً / ثانياً / في المقابل).
- **[TextPulse: Arabic humanizer (Aug 2026)](https://textpulse.ai/blog/ai-humanizer-for-arabic).**
  - calque openers that translate English throat-clearing
  - formulaic transitions
  - stacked verbal nouns (مصادر)
  - near-identical sentence lengths
  - conclusions that restate the introduction.
- **[Arabic Wikipedia: ترقيم](https://ar.wikipedia.org/wiki/%D8%AA%D8%B1%D9%82%D9%8A%D9%85).** In Arabic, a single dash marks dialogue, and a *pair* of dashes can frame a parenthetical (الجملة الاعتراضية). So a dash pair is legitimate Arabic. The tell is the English-style single "reveal" dash (X — Y), and density. I replaced dash pairs with parentheses, which is equally correct and doesn't look machine-made.
- **Research.** [Al-Shaibani & Ahmed, "The Arabic AI Fingerprint" (arXiv 2505.23276, 2025)](https://arxiv.org/abs/2505.23276) shows that LLM Arabic is stylometrically detectable; the abstract does not list the features. [Slator on translationese](https://slator.com/translationese-remains-challenge-for-large-language-models-study-finds/) reports that LLMs still produce over-literal translations.
- **Not independently sourced.** I could not find an authoritative source listing specific Arabic marketing buzzwords (رحلة، حلول مبتكرة، متكاملة، الارتقاء، تمكين، بكل سهولة، بشكل سلس). I treated them as practitioner knowledge. The site barely uses them; the one hit is «سلسة» in the job post. The Arabic problems on this site are something else:
  - **Em-dash density:** 48 em dashes in 39 visible strings.
  - **Contrast frames:** «، لا …» and «بدل …» tails; «لسنا … نحن …».
  - **Calques of English slogans:** «يتكلم لغة صناعتك»، «شريكك في التحول الرقمي»، «في المنتصف نظامك»، «دعم لا يختفي»، «قدرات».
  - **The filler intensifiers «فعلاً» / «حقيقية»:** 8 and 5 uses.
  - **Register mixing:** dialect headlines («وخلّيه يشتغل»، «يستاهل أحسن») on otherwise MSA pages.
  - **Repeated «نحن»:** not an issue. It appears once in visible copy.

### 1d. What already works

Keep these, and don't "fix" them into something else.

- **Palette:** brand blue sampled from the logo plus one amber accent. There is no indigo or purple gradient and no gradient text.
- **Typography:** Readex Pro and IBM Plex Sans Arabic, not Inter.
- **Layout:** sentence-case headings, start-aligned sections, no emoji.
- **Real proof:** real client logos, a real address and phone number, and an ETA comparison table with an official source link and a review date.
- **Specific examples:** the agent demos use real Egyptian-dialect questions. Keep the dialect inside quoted user speech; it's the most human part of the site.
- **English copy:** already nearly free of em dashes (one, in a mock title). The English problems are contrast tails, slogan headlines and "actually/real".

---

## 2. Copy fixes

**How to read the tables.** Every row is also an entry in `research/ai-slop-copy-fixes.json`. The table columns and the JSON fields match: "File · key" is `file` and `key`, "Current (exact substring)" is `find`, "Proposed" is `replace`, and "Why" is `category` plus `reason`.

**What stays the same.** Every rewrite keeps the original meaning and facts. Titles and H1s keep their keywords (ERPNext, ERP, الفاتورة الإلكترونية, e-invoice).

**Totals.** 152 fixes.

- **Arabic:** 89.
  - 39 remove all 48 visible em dashes. Some of these also fix a contrast, a triad or a calque in the same edit.
  - 22 are contrast frames: «، لا …» tails, «بدل …», «لسنا … نحن …», and mirrored pairs.
  - 13 are slogans, aphorisms, cute or rhetorical headlines.
  - 7 are intensifiers.
  - The rest cover register, unverified claims, the CTA label, the scroll cue, a meaning bug and one icon.
  - The categories overlap, so these counts add up to more than 89.
- **English:** 61. Of these, 23 are contrast or "not X but Y" frames, 13 slogans or aphorisms, 10 intensifiers and 5 job-post buzzwords. One is the single em dash.
- **Templates:** 2. The attribution em dash in `blocks.mjs` and `pages.mjs` shows in both languages, on every testimonial.

After a simulated apply of all 152 fixes, no visible string and no template line contains an em dash; only source-code comments do.

**Dashes I left alone:**

- En dashes in ranges (4–12, 2–4 أسابيع). They are correct typography.
- The en-dash separator in `<title>` tags (`… مصر – نظام ERP …`). This is optional: switching it to `|` would remove the last dash-like separator, but search engines don't care either way.

### Arabic

| # | File · key | Current (exact substring) | Proposed | Why |
|---|---|---|---|---|
| 1 | `content/ar/copy.mjs`<br>`t.brandLabel` | brandLabel: 'Innomate — الصفحة الرئيسية' | brandLabel: 'Innomate: الصفحة الرئيسية' | **em dash.** Em dash in the logo link's aria-label (screen readers read it). A colon does the same job. |
| 2 | `content/ar/copy.mjs`<br>`t.cta` | cta: 'احجز استشارة مجانية', | cta: 'احجز جلسة تحليل مجانية', | **CTA consistency.** One intent, three labels (استشارة مجانية / جلسة تحليل مجانية / احجز الجلسة). Use the hero label everywhere. Check the nav button width after the change. |
| 3 | `content/ar/copy.mjs`<br>`t.megaFeature.chip` | chip: 'الأكثر طلباً' | chip: 'دليل عملي' | **unverified claim.** An unsourced popularity claim, shown next to a sparkles icon. Name the thing instead. |
| 4 | `content/ar/copy.mjs`<br>`t.megaFeature.title` | title: 'هل شركتك جاهزة للفاتورة والإيصال الإلكتروني؟' | title: 'دليل ربط الفاتورة والإيصال الإلكتروني' | **rhetorical question.** Rhetorical-question heading. Say what the card links to. |
| 5 | `content/ar/copy.mjs`<br>`t.faq.title` | faq: { title: 'أسئلة تسمعها كثيراً' | faq: { title: 'أسئلة نسمعها كثيراً' | **meaning.** «تسمعها» (you hear) should be «نسمعها» (we hear), which is also what the English says. |
| 6 | `content/ar/copy.mjs`<br>`t.faq.askTitle` | askTitle: 'سؤالك مش هنا؟' | askTitle: 'لم تجد سؤالك؟' | **register.** Optional. Dialect sits next to an MSA headline in the same block. Pick one register; dialect is fine if it's used across all WhatsApp microcopy. |
| 7 | `content/ar/copy.mjs`<br>`t.ctaBand.lead` | lead: 'نرسم معك دورة عملك الحالية ونقول لك بصراحة ما الذي يحتاج نظاماً، وما الذي لا يحتاج.' | lead: 'نرسم معك دورة عملك الحالية ونحدد ما يحتاج نظاماً وما يمكن أن يبقى كما هو.' | **contrast + narrated candor.** «بصراحة» announces honesty (narrated candor), and «ما يحتاج / ما لا يحتاج» is a mirrored pair. Same promise, said plainly. |
| 8 | `content/ar/copy.mjs`<br>`t.homeCopy.lead` | يعملون داخله — بتدريب عربي ودعم على مدار الساعة. | يعملون داخله. التدريب بالعربية والدعم على مدار الساعة. | **em dash.** Em dash in the hero lead. Split into two sentences. |
| 9 | `content/ar/copy.mjs`<br>`t.homeCopy.svcTitle` | svcTitle: 'ست قدرات، على نظام واحد' | svcTitle: 'ست خدمات تعمل على نظام واحد' | **slogan headline.** «قدرات» is a calque of 'capabilities', and the 'X، على Y' shape is a slogan. Plain noun. |
| 10 | `content/ar/copy.mjs`<br>`t.homeCopy.aiTitle` | aiTitle: 'اسأل نظامك بالعامية.&lt;br&gt;وخلّيه يشتغل.' | aiTitle: 'وكلاء ذكاء اصطناعي داخل نظامك&lt;br&gt;تسألهم بالعامية' | **slogan headline + register.** A two-beat punchline in dialect, in an H2 on an MSA page. State what it is. No tags in the H2, because data-split breaks words apart. |
| 11 | `content/ar/copy.mjs`<br>`t.homeCopy.agents[2].a` | PO-0312&lt;/span&gt; — بند واحد | PO-0312&lt;/span&gt;. بند واحد | **em dash.** Em dash in the demo answer. |
| 12 | `content/ar/copy.mjs`<br>`t.homeCopy.jTitle` | jTitle: 'من الرسمة على الورق إلى نظام يعمل' | jTitle: 'خمس مراحل من التحليل حتى التشغيل' | **slogan headline.** 'From X to Y' journey slogan. Say what the section contains. |
| 13 | `content/ar/copy.mjs`<br>`t.homeCopy.jSub` | كل مرحلة تنتهي بشيء يعمل، لا بتقرير. | كل مرحلة تنتهي بجزء يعمل في شركتك. | **not X but Y.** Tail negation «، لا بتقرير». This exact idea appears 4 times on the site (jSub, why[2], how.lead, faqs[1]). |
| 14 | `content/ar/copy.mjs`<br>`t.homeCopy.jSteps[2].d` | والأرصدة الافتتاحية — مع مراجعة عينات قبل الاعتماد. | والأرصدة الافتتاحية، ونراجع معك عينات قبل الاعتماد. | **em dash.** Em dash. |
| 15 | `content/ar/copy.mjs`<br>`t.homeCopy.jSteps[3].d` | وندرّب كل دور على ما يفعله فعلاً. | وندرّب كل دور على مهامه اليومية. | **intensifier.** «فعلاً» as filler (8 uses across the site). |
| 16 | `content/ar/copy.mjs`<br>`t.homeCopy.secTitle` | secTitle: 'نظام يتكلم لغة صناعتك' | secTitle: 'نظام ERP مُعدّ لقطاعك' | **cliché/calque.** Calque of 'speaks your industry's language', a stock marketing idiom. Plain statement, and it keeps the ERP keyword. |
| 17 | `content/ar/copy.mjs`<br>`t.homeCopy.secLead` | نبدأ من مصطلحات قطاعك، لا من قالب عام. | نبدأ من مصطلحات قطاعك ودورة العمل فيه. | **not X but Y.** Tail negation «، لا من قالب عام». |
| 18 | `content/ar/copy.mjs`<br>`t.homeCopy.intTitle` | intTitle: 'في المنتصف نظامك. وحوله كل ما يتعامل معه.' | intTitle: 'ربط نظامك بالضرائب والبنوك وأجهزة البصمة وواتساب' | **slogan headline.** A clipped two-fragment slogan (calque word order). Name the integrations. |
| 19 | `content/ar/copy.mjs`<br>`t.homeCopy.intLead` | والآلات في المصنع. بيانات تدخل وحدها بدل أن يعيد أحد كتابتها. | والآلات في المصنع. البيانات تدخل النظام دون أن يعيد أحد كتابتها. | **contrast.** Optional. «بدل» contrast; this also reads a little smoother. |
| 20 | `content/ar/copy.mjs`<br>`t.homeCopy.whyTitle` | whyTitle: 'لسنا مزوّد برنامج. نحن الفريق الذي يبقى بعد الإطلاق.' | whyTitle: 'نطبّق النظام ونبقى معك بعد الإطلاق' | **not X but Y.** The classic 'We're not X. We're Y.' plus «نحن». State Y. |
| 21 | `content/ar/copy.mjs`<br>`t.homeCopy.why[2][2]` | بجزء يعمل فعلاً في شركتك. | بجزء يعمل في شركتك. | **intensifier.** «فعلاً» as filler. |
| 22 | `content/ar/copy.mjs`<br>`t.homeCopy.why[3][1]` | 'دعم لا يختفي' | 'دعم فني متواصل' | **cute negation headline.** A cute negation headline ('support that doesn't disappear'). |
| 23 | `content/ar/copy.mjs`<br>`t.homeCopy.why[4][2]` | 'قدرات المؤسسات الكبيرة — وكلاء &lt;bdi lang="en"&gt;AI&lt;/bdi&gt;، حساسات المصانع، لوحات &lt;bdi lang="en"&gt;Power BI&lt;/bdi&gt; — بميزانية الشركات المتوسطة.' | 'وكلاء &lt;bdi lang="en"&gt;AI&lt;/bdi&gt; وحساسات المصانع ولوحات &lt;bdi lang="en"&gt;Power BI&lt;/bdi&gt;، وهي أدوات الشركات الكبيرة، بميزانية شركة متوسطة.' | **em dash.** Two em dashes wrapped around a list. Lead with the list. |
| 24 | `content/ar/copy.mjs`<br>`t.homeCopy.align.lines` | lines: ['فريقك يستاهل أحسن.', 'أرقام أدق.', 'متابعة أوضح.', 'قرارات أسرع.', 'من غير ما تكبّر', 'الفريق عشان توصل لده.'], | lines: ['خمسة ملفات Excel لا تتفق', 'على رقم، وبرنامج حسابات', 'لا يعرف ما في المخزن.', 'نجمعها في نظام واحد', 'يعمل عليه فريقك الحالي', 'دون تعيينات جديدة.'], | **triad + staccato + cliché.** «يستاهل أحسن» is a stock line ('deserves better'). Then comes a staccato triad of comparatives (أدق/أوضح/أسرع) in dialect. Replaced with the concrete pain from the old problem text, keeping the 'no extra hires' point. The splits only feed the justify animation, so re-check the line lengths. |
| 25 | `content/ar/copy.mjs`<br>`t.homeCopy.align.caption` | caption: 'نظام واحد لكل الشركة، لأن خمس ملفات Excel عمرها ما هتتفق على رقم.' | caption: 'نظام واحد للحسابات والمخازن والمرتبات والفاتورة الإلكترونية.' | **register.** Once the lines are rewritten, the caption would repeat them. It's also dialect under an MSA page. Use it to name the modules instead (keeps the keyword). |
| 26 | `content/ar/copy.mjs`<br>`t.homeCopy.sectorsHint` | sectorsHint: 'مرّر أو اختر قطاعاً' | sectorsHint: 'اختر قطاعاً' | **scroll cue.** Scroll cues are a documented template tell. Keep the instruction without the scroll part. |
| 27 | `content/ar/copy.mjs`<br>`t.svc.featLead` | ومجرَّباً مع فريقك — لا قائمة مزايا نظرية. | ومجرَّباً مع فريقك. | **em dash + not X but Y.** Em dash plus a tail negation. The positive half already makes the point. |
| 28 | `content/ar/copy.mjs`<br>`t.eta.source` | eta.gov.eg&lt;/a&gt; — آخر مراجعة ${d}. | eta.gov.eg&lt;/a&gt;. آخر مراجعة: ${d}. | **em dash.** Em dash. |
| 29 | `content/ar/copy.mjs`<br>`t.hub.allTitle` | allTitle: 'اختر ما يناسبك' | allTitle: 'الخدمات العشر' | **vague headline.** Generic CTA-as-heading. Name the list. |
| 30 | `content/ar/copy.mjs`<br>`t.pricing.flag` | flag: 'الأكثر اختياراً' | flag: 'الأنسب لشركة تجارية' | **unverified claim.** 'Most chosen' is unsourced. Keep it only if sales data backs it; otherwise describe who the package fits. |
| 31 | `content/ar/copy.mjs`<br>`t.pricing.faq[0][1]` | لكن التطبيق — التحليل والإعداد ونقل البيانات والتدريب — والاستضافة والدعم لها تكلفة، وهي ما نسعّره. | لكن التطبيق (التحليل والإعداد ونقل البيانات والتدريب) والاستضافة والدعم لها تكلفة، وهذا ما نسعّره. | **em dash.** Two em dashes used as a parenthesis. Use real parentheses, as pricing.lead already does. |
| 32 | `content/ar/copy.mjs`<br>`t.how.lead` | كل مرحلة تنتهي بشيء يعمل فعلاً في شركتك، | كل مرحلة تنتهي بجزء يعمل في شركتك، | **intensifier.** «فعلاً» as filler. |
| 33 | `content/ar/copy.mjs`<br>`t.how.needTitle` | needTitle: 'تطبيق ناجح يحتاج طرفين' | needTitle: 'ثلاثة أشياء نحتاجها منكم' | **aphorism headline.** Aphorism ('success takes two'). Say what follows: three requirements. |
| 34 | `content/ar/copy.mjs`<br>`t.how.needs[1][2]` | والأرصدة — ونساعدكم في ترتيبها. | والأرصدة، ونساعدكم في ترتيبها. | **em dash.** Em dash. |
| 35 | `content/ar/copy.mjs`<br>`t.about.beliefTitle` | beliefTitle: 'النظام الجيد هو الذي يستخدمه الفريق فعلاً' | beliefTitle: 'أربعة مبادئ نعمل بها' | **aphorism headline.** 'A good X is one that...' is an aphorism, plus «فعلاً». Plain label for the 4 values below. |
| 36 | `content/ar/copy.mjs`<br>`t.about.values[2][2]` | 'التطبيق بداية العلاقة، والدعم والتحسين هو معظمها.' | 'بعد الإطلاق نستمر في الدعم والتحسينات الشهرية.' | **aphorism.** A quotable symmetrical line. State the practice. |
| 37 | `content/ar/copy.mjs`<br>`t.about.values[3][0]` | ['sparkles', 'نضيف ما يوفّر وقتاً' | ['clock', 'نضيف ما يوفّر وقتاً' | **icon cliché.** The sparkles icon is the stock 'AI' glyph. This value is about saving time, so use the clock icon. |
| 38 | `content/ar/copy.mjs`<br>`t.about.values[3][2]` | 'الذكاء الاصطناعي وIoT حين يوفّران ساعات حقيقية، لا للاستعراض.' | 'نضيف الذكاء الاصطناعي وIoT حين يوفّران ساعات عمل على فريقك.' | **not X but Y.** Tail negation «، لا للاستعراض» plus the 'real' intensifier. |
| 39 | `content/ar/copy.mjs`<br>`t.clientsPage.lead` | 10 قطاعات — من مصانع الأغذية والأدوية إلى الجامعات والمقاولات. | 10 قطاعات، منها مصانع أغذية وأدوية وجامعات وشركات مقاولات. | **em dash + false range.** Em dash plus a 'from X to Y' false range. Just list them. |
| 40 | `content/ar/copy.mjs`<br>`t.clientsPage.casesTitle` | casesTitle: 'كيف طبّقنا — بالتفصيل' | casesTitle: 'تفاصيل التطبيق عند عملائنا' | **em dash.** Em dash in an H2. |
| 41 | `content/ar/copy.mjs`<br>`t.clientsPage.caseTodo` | وبموافقته — المشكلة، الحل، رقم واحد للنتيجة. | وبموافقته: المشكلة، والحل، ورقم واحد للنتيجة. | **em dash.** Em dash. This design note is visible on the page. |
| 42 | `content/ar/copy.mjs`<br>`t.careers.lead` | lead: 'نبني أنظمة تعمل عليها مصانع وشركات حقيقية كل يوم. إن كنت تحب أن ترى أثر عملك، انضم إلينا.' | lead: 'نطبّق ERPNext لمصانع وشركات تعمل عليه كل يوم، من مكتبنا في العاشر من رمضان.' | **cliché + intensifier.** «حقيقية» as an intensifier, plus the 'If you love X, join us' template. |
| 43 | `content/ar/copy.mjs`<br>`t.resources.articles[5][2]` | 'مم تتكون التكلفة فعلاً، وما الذي يرفعها أو يخفضها.' | 'مم تتكون التكلفة، وما الذي يرفعها أو يخفضها.' | **intensifier.** «فعلاً» as filler. |
| 44 | `content/ar/copy.mjs`<br>`t.resources.articles[7][2]` | 'أربع مهام حقيقية توفر ساعات أسبوعياً، وحدود كل منها.' | 'أربع مهام توفر ساعات كل أسبوع، وحدود كل منها.' | **intensifier.** «حقيقية» as an intensifier. |
| 45 | `content/ar/copy.mjs`<br>`t.mock.erp.title` | title: 'لوحة التحكم — المبيعات' | title: 'لوحة التحكم · المبيعات' | **em dash.** Em dash. Every other mock title uses «·». |
| 46 | `content/ar/copy.mjs`<br>`t.mock.iot.alert` | أعلى من الحد — فُتح طلب صيانة | أعلى من الحد. فُتح طلب صيانة | **em dash.** Em dash. |
| 47 | `content/ar/site.mjs`<br>`company.tagline` | tagline: 'شريكك في التحول الرقمي — ERPNext والذكاء الاصطناعي للسوق المصري' | tagline: 'شريك تطبيق ERPNext والذكاء الاصطناعي للشركات في مصر' | **em dash + calque.** Em dash plus «شريكك في التحول الرقمي» (a calque of 'your digital transformation partner', the stock line of this category). Keeps ERPNext. |
| 48 | `content/ar/site.mjs`<br>`testimonials[2].quote` | حوّلت عملياتنا — أتمتة كاملة | حوّلت عملياتنا: أتمتة كاملة | **em dash (client quote).** Punctuation only. This is a published client quote, so change the wording only with the client's OK. It is also generic («حوّلت عملياتنا»، «يستحق كل قرش»): ask for one number. |
| 49 | `content/ar/site.mjs`<br>`faqs[3].a` | تدريب عملي لكل فريق على الدورة التي يعمل عليها فعلاً — المحاسبة، المبيعات، المخازن، الموارد البشرية — باللغة العربية، مع أدلة | ندرّب كل فريق عملياً على الدورة التي يعمل عليها (المحاسبة، المبيعات، المخازن، الموارد البشرية) باللغة العربية، ونسلّمه أدلة | **em dash.** Two em dashes plus «فعلاً». Use parentheses and an active verb. |
| 50 | `content/ar/site.mjs`<br>`faqs[6].a` | a: 'نعم بالكامل. ERPNext | a: 'نعم. ERPNext | **intensifier.** «بالكامل» adds nothing to the answer. |
| 51 | `content/ar/site.mjs`<br>`nav.company[5].desc` | desc: 'إجابات قبل أن تسأل' | desc: 'التكلفة والمدة والدعم' | **cute microcopy.** A cute line. Say what the FAQ covers. |
| 52 | `content/ar/site.mjs`<br>`jobs[0].summary` | تدير دورة البيع كاملة لنظام ERP — من البحث عن العملاء حتى إغلاق الصفقة — كشريك استشاري | تدير دورة بيع نظام ERP كاملة، من البحث عن العملاء حتى إغلاق الصفقة، كمستشار | **em dash.** Two em dashes plus «شريك استشاري» (partner jargon). |
| 53 | `content/ar/site.mjs`<br>`jobs[0].responsibilities[4][1]` | لبداية سلسة للعميل | حتى يبدأ التطبيق عند العميل في موعده | **buzzword.** «سلسة» is the Arabic 'seamless'. |
| 54 | `content/ar/services.mjs`<br>`groups[1].title` | title: 'فاتورة وإيصال إلكتروني بدون صداع' | title: 'الفاتورة والإيصال الإلكتروني من داخل النظام' | **slogan headline.** 'Without the headache' is a stock slogan. The plain version keeps the الفاتورة الإلكترونية keyword. |
| 55 | `content/ar/services.mjs`<br>`groups[4].title` | title: 'ذكاء اصطناعي يشتغل داخل نظامك' | title: 'ذكاء اصطناعي يعمل داخل نظامك' | **register.** Dialect verb in an MSA heading. |
| 56 | `content/ar/services.mjs`<br>`groups[4].lead` | وينفّذون مهام حقيقية بصلاحيات محددة، ولوحات Power BI تعرض للإدارة ما يحدث الآن لا الشهر الماضي. | وينفّذون مهام يومية بصلاحيات محددة، ولوحات Power BI تعرض للإدارة أرقام اليوم. | **not X but Y.** Tail negation «لا الشهر الماضي» plus 'real' as an intensifier. |
| 57 | `content/ar/services.mjs`<br>`groups[5].title` | title: 'مقاس شركتك، على سحابة آمنة' | title: 'تخصيص النظام واستضافته' | **slogan headline.** A paired slogan ('built to fit, hosted safely'). Name the two services. |
| 58 | `content/ar/services.mjs`<br>`services[0].lead` | نحوّل دورة عملك — من عرض السعر حتى التحصيل — إلى نظام ERP واحد يعمل بالعربية، متوافق مع الضرائب المصرية، ويعرف فيه | نحوّل دورة عملك، من عرض السعر حتى التحصيل، إلى نظام ERP واحد بالعربية ومتوافق مع الضرائب المصرية، يعرف فيه | **em dash + triad.** Two em dashes plus an adjective triad. Commas, and two qualities instead of three. |
| 59 | `content/ar/services.mjs`<br>`services[0].faq[0][1]` | ERPNext يسجل العملية نفسها — طلب الشراء، الاستلام، أمر التشغيل، الفاتورة — وتُنشأ | ERPNext يسجل العملية نفسها (طلب الشراء، الاستلام، أمر التشغيل، الفاتورة) وتُنشأ | **em dash.** Two em dashes used as a parenthesis. |
| 60 | `content/ar/services.mjs`<br>`services[1].lead` | إلى نفس المستند — بدون بوابة يدوية ولا ملفات وسيطة. | إلى نفس المستند، دون إدخال يدوي على البوابة أو ملفات وسيطة. | **em dash.** Em dash. Also clarifies «بوابة يدوية»: the portal isn't manual, the data entry is. |
| 61 | `content/ar/services.mjs`<br>`services[1].features[5][2]` | والأكواد قبل الإرسال، وليس بعده. | والأكواد قبل الإرسال. | **not X but Y.** Tail negation «وليس بعده». 'Before' already says it. |
| 62 | `content/ar/services.mjs`<br>`services[2].lead` | في مكان واحد — والمرتب يُحسب | في مكان واحد، والمرتب يُحسب | **em dash.** Em dash. |
| 63 | `content/ar/services.mjs`<br>`services[2].definition` | يدير دورة الموظف كاملة — التعيين والحضور والإجازات وحساب الأجر والاستقطاعات — ويُنشئ | يدير دورة الموظف كاملة (التعيين والحضور والإجازات وحساب الأجر والاستقطاعات) ويُنشئ | **em dash.** Two em dashes. This definition box is the snippet search engines and AI answers quote, so it should be clean. |
| 64 | `content/ar/services.mjs`<br>`services[3].lead` | مسير الرواتب مباشرة — بدل التصدير والطباعة والمراجعة اليدوية. | مسير الرواتب مباشرة، دون تصدير أو طباعة أو مراجعة يدوية. | **em dash + contrast.** Em dash plus a «بدل» contrast. |
| 65 | `content/ar/services.mjs`<br>`services[4].lead` | اعرف كم لديك، وأين هو، ومتى ينتهي — لكل صنف في كل مخزن. | اعرف رصيد كل صنف في كل مخزن، ومكانه، وتاريخ انتهاء صلاحيته. | **em dash.** Em dash after a triad. Name the object first. |
| 66 | `content/ar/services.mjs`<br>`services[4].definition` | يسجل كل حركة للصنف — استلام، تحويل، صرف، جرد — برقم | يسجل كل حركة للصنف (استلام، تحويل، صرف، جرد) برقم | **em dash.** Two em dashes. Definition box. |
| 67 | `content/ar/services.mjs`<br>`services[4].outcomes[2]` | 'شراء قبل النفاد لا بعده' | 'أمر الشراء يصدر قبل نفاد الصنف' | **not X but Y.** The mirrored 'before, not after' pair. |
| 68 | `content/ar/services.mjs`<br>`services[5].lead` | عدّادات خطوط الإنتاج، استهلاك الطاقة، حرارة غرف التبريد — قراءات تصل إلى ERPNext لحظياً، | قراءات عدّادات الإنتاج واستهلاك الطاقة وحرارة غرف التبريد تصل إلى ERPNext لحظياً، | **em dash.** A fragment list, then an em dash reveal. One sentence. |
| 69 | `content/ar/services.mjs`<br>`services[5].pains[1][1]` | 'الآلة تتوقف ثم تبدأ الصيانة، بدل أن تنبّه قبلها.' | 'الآلة تتوقف أولاً، وبعدها تبدأ الصيانة.' | **contrast.** «بدل» contrast. The pain lands harder stated flat. |
| 70 | `content/ar/services.mjs`<br>`services[5].features[3][2]` | حسب ساعات التشغيل الفعلية لا التقويم. | حسب ساعات تشغيل كل آلة. | **not X but Y.** Tail negation «لا التقويم». |
| 71 | `content/ar/services.mjs`<br>`services[5].outcomes[1]` | 'صيانة قبل العطل لا بعده' | 'الصيانة تبدأ قبل العطل' | **not X but Y.** Mirrored 'before, not after', the same shape as services[4].outcomes[2]. |
| 72 | `content/ar/services.mjs`<br>`services[6].lead` | وابعته للمحصلين» — والوكيل يقرأ من ERPNext وينفذ، بنفس صلاحياتك، | وابعته للمحصلين». الوكيل يقرأ من ERPNext وينفذ بنفس صلاحياتك، | **em dash.** Em dash. |
| 73 | `content/ar/services.mjs`<br>`services[6].definition` | داخل الأنظمة لإنجازه — لا يكتفي بالإجابة مثل روبوت المحادثة. | داخل الأنظمة لإنجازه، بينما يكتفي روبوت المحادثة بالإجابة. | **em dash + not X but Y.** Em dash plus negation. The contrast matters in a definition, so keep it as a plain 'while'. |
| 74 | `content/ar/services.mjs`<br>`services[6].outcomes[0]` | 'إجابات في ثوانٍ بدل تقارير في ساعات' | 'إجابة في ثوانٍ عن سؤال كان يحتاج ساعات من التقارير' | **symmetrical pair.** A mirrored 'X in seconds instead of Y in hours' pair. |
| 75 | `content/ar/services.mjs`<br>`services[7].lead` | بدلاً من تقرير Excel يُجمع كل أسبوع، لوحة تتحدث وحدها من ERPNext: | لوحة تتحدث وحدها من ERPNext وتغنيك عن تقرير Excel الأسبوعي: | **contrast opener.** Opens on what it isn't («بدلاً من»). Lead with the thing. |
| 76 | `content/ar/services.mjs`<br>`services[7].steps[0][1]` | 'نبدأ من القرارات التي تريد اتخاذها، لا من البيانات المتاحة.' | 'نبدأ من القرارات التي تريد اتخاذها، ثم نحدد البيانات التي تحتاجها.' | **not X but Y.** Tail negation «، لا من». |
| 77 | `content/ar/services.mjs`<br>`services[7].outcomes[1]` | 'مؤشرات لحظية بدل تقارير متأخرة' | 'مؤشرات تتحدث لحظياً' | **contrast.** A mirrored pair. |
| 78 | `content/ar/services.mjs`<br>`services[8].lead` | على إطار Frappe — بطريقة تبقى | على إطار Frappe، بطريقة تبقى | **em dash.** Em dash. |
| 79 | `content/ar/services.mjs`<br>`services[8].outcomes[0]` | 'النظام يتبع طريقة عملك لا العكس' | 'النظام مبني على طريقة عملك' | **not X but Y.** 'Not the other way round' negation. |
| 80 | `content/ar/sectors.mjs`<br>`sectors[0].lead` | ومن استلمها — فإن حدث استدعاء | ومن استلمها. وإن حدث استدعاء | **em dash.** Em dash. |
| 81 | `content/ar/sectors.mjs`<br>`sectors[0].faq[0][1]` | 'كل حركة — استلام خامة، أمر إنتاج، تحويل، فاتورة بيع — تُسجل | 'كل حركة (استلام خامة، أمر إنتاج، تحويل، فاتورة بيع) تُسجل | **em dash.** Two em dashes used as a parenthesis. |
| 82 | `content/ar/sectors.mjs`<br>`sectors[1].lead` | 'صناعة لا تقبل «تقريباً»: كل تشغيلة بتاريخها ونتيجة فحصها، وكل عبوة تخرج معروف إلى أي موزع ذهبت. نظام مبني للمصنع والمخزن والتوزيع، لا للصيدلية.' | 'كل تشغيلة بتاريخها ونتيجة فحصها، وكل عبوة تخرج معروف إلى أي موزع ذهبت. نظام لمصانع الأدوية ومخازنها وشبكات توزيعها.' | **cute opener + not X but Y.** The «صناعة لا تقبل تقريباً» opener is a quotable line, and it ends with «، لا للصيدلية». The 'not a pharmacy system' point already has its own FAQ. |
| 83 | `content/ar/sectors.mjs`<br>`sectors[2].pains[2][1]` | إلا بعد التسليم — إن قورنت. | إلا بعد التسليم، هذا إن قورنت أصلاً. | **em dash.** Em dash as a dramatic aside. |
| 84 | `content/ar/sectors.mjs`<br>`sectors[4].modules[1][1]` | 'قص، خياطة، تشطيب، كي، تعبئة — بكميات كل مرحلة' | 'قص، خياطة، تشطيب، كي، تعبئة، مع الكمية في كل مرحلة' | **em dash.** Em dash. |
| 85 | `content/ar/sectors.mjs`<br>`sectors[5].lead` | في بيته — طلب واحد يتابعه الجميع. | في بيته: طلب واحد يتابعه الجميع. | **em dash.** Em dash. |
| 86 | `content/ar/sectors.mjs`<br>`sectors[7].lead` | يُعد القوائم المالية — لمدرسة واحدة | يُعد القوائم المالية، لمدرسة واحدة | **em dash.** Em dash. |
| 87 | `content/ar/sectors.mjs`<br>`sectors[8].lead` | والتمريض — في نظام واحد. | والتمريض، كلها في نظام واحد. | **em dash.** Em dash. |
| 88 | `content/ar/sectors.mjs`<br>`sectors[9].lead` | البيع أو التصدير — مع عمالة موسمية | البيع أو التصدير، مع عمالة موسمية | **em dash.** Em dash. |
| 89 | `content/ar/sectors.mjs`<br>`sectors[10].lead` | 'تقارير الاستدامة تبدأ من أرقام حقيقية: كيلووات كل خط إنتاج، لترات المياه، الوقود، والنفايات — تُجمع من النظام والعدادات لا من الاستبيانات.' | 'تقارير الاستدامة من أرقام مقاسة: كيلووات كل خط إنتاج، ولترات المياه، والوقود، والنفايات، تُجمع من النظام والعدادات مباشرة.' | **em dash + not X but Y.** Em dash, tail negation «لا من الاستبيانات», and «حقيقية». «مقاسة» carries the same meaning. |

### English

| # | File · key | Current (exact substring) | Proposed | Why |
|---|---|---|---|---|
| 92 | `content/en/copy.mjs`<br>`t.cta` | cta: 'Book a free consultation', | cta: 'Book a free discovery session', | **CTA consistency.** One intent, three labels ('free consultation' / 'free discovery session' / 'Book the session'). Pick one. |
| 93 | `content/en/copy.mjs`<br>`t.megaFeature.chip` | chip: 'Most requested' | chip: 'Practical guide' | **unverified claim.** Unsourced popularity claim, shown with a sparkles icon. |
| 94 | `content/en/copy.mjs`<br>`t.megaFeature.title` | title: 'Is your company ready for e-invoicing and e-receipts?' | title: 'E-invoice and e-receipt setup guide' | **rhetorical question.** Rhetorical-question heading. |
| 95 | `content/en/copy.mjs`<br>`t.ctaBand.lead` | lead: 'We map your current process with you and tell you honestly what needs a system and what doesn’t.' | lead: 'We map your current process with you and mark which parts need a system and which can stay as they are.' | **narrated candor + mirrored pair.** 'Honestly' announces candor, and 'what needs / what doesn't' is a mirrored pair. |
| 96 | `content/en/copy.mjs`<br>`t.homeCopy.svcTitle` | svcTitle: 'Six capabilities, one system' | svcTitle: 'Six services on one system' | **slogan headline.** 'X, one Y' slogan shape; 'capabilities' is vague. |
| 97 | `content/en/copy.mjs`<br>`t.homeCopy.aiTitle` | aiTitle: 'Ask your system in plain words.&lt;br&gt;Then let it do the work.' | aiTitle: 'AI agents inside your ERP&lt;br&gt;that you ask in plain words' | **slogan headline.** A two-beat punchline ('Do X. Then let it Y.'). Say what it is. |
| 98 | `content/en/copy.mjs`<br>`t.homeCopy.jTitle` | jTitle: 'From a sketch on paper to a live system' | jTitle: 'Five phases from analysis to go-live' | **slogan headline.** 'From X to Y' journey slogan. |
| 99 | `content/en/copy.mjs`<br>`t.homeCopy.jSub` | Every phase ends with something that works, not a report. | Every phase ends with a working part of your system. | **not X but Y.** Tail negation ', not a report'. The idea repeats 4 times across the site. |
| 100 | `content/en/copy.mjs`<br>`t.homeCopy.jSteps[3].d` | and we train every role on what it actually does. | and we train every role on its daily tasks. | **intensifier.** 'actually' as filler. |
| 101 | `content/en/copy.mjs`<br>`t.homeCopy.secTitle` | secTitle: 'A system that speaks your industry’s language' | secTitle: 'ERP set up for your industry' | **cliché.** The 'speaks your language' idiom. Plain, with the keyword. |
| 102 | `content/en/copy.mjs`<br>`t.homeCopy.secLead` | We start from your industry’s vocabulary, not a generic template. | We start from your industry’s terms and the way it runs. | **not X but Y.** Tail negation ', not a generic template'. |
| 103 | `content/en/copy.mjs`<br>`t.homeCopy.intTitle` | intTitle: 'Your system in the middle. Everything it deals with around it.' | intTitle: 'ERPNext connected to the tax authority, banks, devices and WhatsApp' | **slogan headline.** Two clipped fragments. Name the integrations (also better for search). |
| 104 | `content/en/copy.mjs`<br>`t.homeCopy.intLead` | Data comes in by itself instead of being typed again. | Data arrives without anyone typing it again. | **contrast.** Optional. 'instead of' contrast. |
| 105 | `content/en/copy.mjs`<br>`t.homeCopy.whyTitle` | whyTitle: 'We’re not a software vendor. We’re the team that stays after go-live.' | whyTitle: 'We implement the system and stay on after go-live' | **not X but Y.** The textbook 'We're not X. We're Y.' |
| 106 | `content/en/copy.mjs`<br>`t.homeCopy.why[0][2]` | and how factories in the industrial cities actually run. | and how factories in the industrial cities run. | **intensifier.** 'actually' as filler. |
| 107 | `content/en/copy.mjs`<br>`t.homeCopy.why[1][2]` | and your data stays entirely yours. | and your data stays yours. | **intensifier.** 'entirely' as filler. |
| 108 | `content/en/copy.mjs`<br>`t.homeCopy.why[3][1]` | 'Support that doesn’t disappear' | 'Ongoing technical support' | **cute negation headline.** Cute negation headline. |
| 109 | `content/en/copy.mjs`<br>`t.homeCopy.align.lines` | lines: ['Your team deserves better.', 'Better numbers.', 'Better follow-up.', 'Better decisions.', 'Without hiring a bigger', 'team to get there.'], | lines: ['Five Excel files that never', 'agree on a number, and', 'accounting software that', 'can’t see the warehouse.', 'We put it all in one system', 'your current team can run.'], | **triad + staccato + cliché.** 'Deserves better' is a stock line, followed by a 'Better X. Better Y. Better Z.' staccato triad. Replaced with the concrete pain, keeping the 'no bigger team' point. Re-check the justify layout. |
| 110 | `content/en/copy.mjs`<br>`t.homeCopy.align.caption` | caption: 'One system for the whole company. Because five spreadsheets never agree.' | caption: 'One system for accounting, inventory, payroll and e-invoicing.' | **fragment punchline.** 'Because X.' fragment punchline, and it would duplicate the new lines. |
| 111 | `content/en/copy.mjs`<br>`t.homeCopy.sectorsHint` | sectorsHint: 'Scroll or pick an industry' | sectorsHint: 'Pick an industry' | **scroll cue.** Scroll cue. |
| 112 | `content/en/copy.mjs`<br>`t.svc.featLead` | Everything here is delivered configured on your data and tested with your team. Not a theoretical feature list. | Everything here is delivered configured on your data and tested with your team. | **not X but Y.** A 'Not a …' fragment after the claim. |
| 113 | `content/en/copy.mjs`<br>`t.hub.allTitle` | allTitle: 'Pick what fits' | allTitle: 'All ten services' | **vague headline.** Generic heading. |
| 114 | `content/en/copy.mjs`<br>`t.integ.lead` | Data flows in by itself instead of being re-typed. | Data flows in without anyone re-typing it. | **contrast.** Optional. 'instead of' contrast. |
| 115 | `content/en/copy.mjs`<br>`t.pricing.flag` | flag: 'Most chosen' | flag: 'Best fit for trading companies' | **unverified claim.** Unsourced claim. Keep 'Most chosen' only if it's true. |
| 116 | `content/en/copy.mjs`<br>`t.how.lead` | Every phase ends with something that actually works in your company, | Every phase ends with a working part of your system, | **intensifier.** 'actually' as filler. |
| 117 | `content/en/copy.mjs`<br>`t.how.needTitle` | needTitle: 'A successful implementation takes two sides' | needTitle: 'Three things we need from you' | **aphorism headline.** Aphorism. |
| 118 | `content/en/copy.mjs`<br>`t.about.beliefTitle` | beliefTitle: 'A good system is one the team actually uses' | beliefTitle: 'Four rules we work by' | **aphorism headline.** Aphorism plus 'actually'. |
| 119 | `content/en/copy.mjs`<br>`t.about.values[2][2]` | 'Implementation starts the relationship; support and improvement are most of it.' | 'After go-live we keep supporting the system and improving it every month.' | **aphorism.** A quotable symmetrical line. |
| 120 | `content/en/copy.mjs`<br>`t.about.values[3][0]` | ['sparkles', 'We add what saves time' | ['clock', 'We add what saves time' | **icon cliché.** Sparkles is the stock 'AI' glyph. |
| 121 | `content/en/copy.mjs`<br>`t.about.values[3][2]` | 'AI and IoT when they save real hours, not for show.' | 'We add AI and IoT where they save your team hours.' | **not X but Y.** Tail negation ', not for show' plus 'real'. |
| 122 | `content/en/copy.mjs`<br>`t.careers.lead` | lead: 'We build systems that real factories and companies run on every day. If you like seeing the impact of your work, join us.' | lead: 'We implement ERPNext for factories and companies that run on it every day, from our office in 10th of Ramadan City.' | **cliché + intensifier.** 'real' as an intensifier plus the 'If you like X, join us' template. |
| 123 | `content/en/copy.mjs`<br>`t.resources.articles[5][2]` | 'What the cost is really made of, and what pushes it up or down.' | 'What the cost is made of, and what pushes it up or down.' | **intensifier.** 'really' as filler. |
| 124 | `content/en/copy.mjs`<br>`t.resources.articles[7][2]` | 'Four real tasks that save hours every week, and the limits of each.' | 'Four tasks that save hours every week, and the limits of each.' | **intensifier.** 'real' as filler. |
| 125 | `content/en/copy.mjs`<br>`t.mock.erp.title` | title: 'Dashboard — Sales' | title: 'Dashboard · Sales' | **em dash.** The only em dash in visible English copy. |
| 126 | `content/en/site.mjs`<br>`company.tagline` | tagline: 'Your digital transformation partner: ERPNext and AI for the Egyptian market' | tagline: 'ERPNext implementation and AI for companies in Egypt' | **cliché.** 'Your digital transformation partner' is the category's stock line. |
| 127 | `content/en/site.mjs`<br>`faqs[3].a` | in the process it actually runs | in the process it runs | **intensifier.** 'actually' as filler. |
| 128 | `content/en/site.mjs`<br>`faqs[6].a` | a: 'Completely. ERPNext | a: 'Yes. ERPNext | **intensifier.** 'Completely.' is an emphatic one-word opener. |
| 129 | `content/en/site.mjs`<br>`nav.company[5].desc` | desc: 'Answers before you ask' | desc: 'Cost, timing and support' | **cute microcopy.** Cute line; say what's there. |
| 130 | `content/en/site.mjs`<br>`jobs[0].requirements[0][1]` | '2–3 years of proven B2B sales experience in software, SaaS or ERP, specifically in the Egyptian market.' | '2–3 years of B2B sales in software, SaaS or ERP in the Egyptian market.' | **buzzword.** 'proven' and 'specifically' are filler. |
| 131 | `content/en/site.mjs`<br>`jobs[0].requirements[1][0]` | ['Business acumen', | ['Business knowledge', | **buzzword.** 'acumen' is job-ad boilerplate. |
| 132 | `content/en/site.mjs`<br>`jobs[0].requirements[1][1]` | and the ability to turn complex needs into clear software solutions. | and the ability to turn a client’s needs into a clear system scope. | **buzzword.** 'complex needs … clear solutions' is boilerplate. |
| 133 | `content/en/site.mjs`<br>`jobs[0].responsibilities[2][1]` | then deliver customised demonstrations of our ERP solutions. | then run ERPNext demos set up for their case. | **buzzword.** 'deliver customised demonstrations of our solutions' is boilerplate. |
| 134 | `content/en/site.mjs`<br>`jobs[0].responsibilities[4][1]` | for a smooth client onboarding. | so the client’s implementation starts on time. | **buzzword.** 'smooth onboarding' is the 'seamless' family. |
| 135 | `content/en/services.mjs`<br>`groups[1].title` | title: 'E-invoicing without the headache' | title: 'E-invoices and e-receipts sent from ERPNext' | **slogan headline.** 'Without the headache' is a stock slogan. The replacement keeps the keywords. |
| 136 | `content/en/services.mjs`<br>`groups[4].lead` | AI agents read your data and do real tasks within set permissions, and Power BI dashboards show management what is happening now, not last month. | AI agents read your data and do routine tasks within set permissions, and Power BI dashboards show management today’s numbers. | **not X but Y.** Tail negation ', not last month' plus 'real'. |
| 137 | `content/en/services.mjs`<br>`groups[5].title` | title: 'Built to fit, hosted safely' | title: 'Customization and managed hosting' | **slogan headline.** A mirrored slogan pair. |
| 138 | `content/en/services.mjs`<br>`services[0].steps[0][1]` | map how work really flows: | map how work flows today: | **intensifier.** 'really' as filler. |
| 139 | `content/en/services.mjs`<br>`services[1].features[5][2]` | validated before submission, not after. | validated before submission. | **not X but Y.** 'Before, not after' tail. |
| 140 | `content/en/services.mjs`<br>`services[3].outcomes[1]` | 'Exceptions resolved daily, not at month-end' | 'Exceptions resolved the same day' | **not X but Y.** Optional. Tail negation. The contrast carries some information, so keep it if you prefer. |
| 141 | `content/en/services.mjs`<br>`services[4].outcomes[2]` | 'Buy before you run out, not after' | 'Purchase orders raised before stock runs out' | **not X but Y.** Mirrored 'before, not after'. |
| 142 | `content/en/services.mjs`<br>`services[5].pains[1][1]` | 'The machine stops, then maintenance starts, instead of an alert beforehand.' | 'The machine stops first, and only then does maintenance start.' | **contrast.** 'instead of' contrast. |
| 143 | `content/en/services.mjs`<br>`services[5].features[3][2]` | 'Maintenance scheduled by actual running hours, not the calendar.' | 'Maintenance scheduled by each machine’s running hours.' | **not X but Y.** Tail negation. |
| 144 | `content/en/services.mjs`<br>`services[5].outcomes[1]` | 'Maintenance before the breakdown, not after' | 'Maintenance starts before a breakdown' | **not X but Y.** Mirrored 'before, not after' (the same shape appears 3 times on the site). |
| 145 | `content/en/services.mjs`<br>`services[6].definition` | , rather than just answering like a chatbot. | , where a chatbot only answers. | **not X but Y.** 'rather than just' contrast in a definition. A plain comparison keeps the distinction. |
| 146 | `content/en/services.mjs`<br>`services[6].outcomes[0]` | 'Answers in seconds instead of reports in hours' | 'Answers in seconds to questions that used to take hours of reports' | **symmetrical pair.** Mirrored pair. |
| 147 | `content/en/services.mjs`<br>`services[7].lead` | lead: 'Instead of a spreadsheet assembled every week, a dashboard that updates itself from ERPNext: | lead: 'A dashboard that updates itself from ERPNext and replaces the weekly spreadsheet: | **contrast opener.** Opens on what it isn't. |
| 148 | `content/en/services.mjs`<br>`services[7].steps[0][1]` | 'We start from the decisions you want to make, not from the data you happen to have.' | 'We start from the decisions you want to make, then find the data they need.' | **not X but Y.** Tail negation. |
| 149 | `content/en/services.mjs`<br>`services[7].outcomes[1]` | 'Live indicators instead of late reports' | 'Indicators updated live' | **contrast.** Mirrored pair. |
| 150 | `content/en/services.mjs`<br>`services[8].outcomes[0]` | 'The system follows your process, not the other way round' | 'The system is built around your process' | **not X but Y.** 'Not the other way round.' |
| 151 | `content/en/sectors.mjs`<br>`sectors[1].lead` | lead: 'An industry with no room for “roughly”: every batch with its date and test result, and every pack traced to the distributor it went to. Built for the factory, warehouse and distribution, not the pharmacy.' | lead: 'Every batch with its date and test result, and every pack traced to the distributor it went to. Built for pharma factories, warehouses and distribution networks.' | **cute opener + not X but Y.** Quotable opener plus ', not the pharmacy'. The FAQ covers the pharmacy point. |
| 152 | `content/en/sectors.mjs`<br>`sectors[10].lead` | lead: 'Sustainability reports start with real numbers: kilowatts per production line, litres of water, fuel and waste, collected from the system and meters, not from surveys.' | lead: 'Sustainability reports built on measured numbers: kilowatts per production line, litres of water, fuel and waste, read from the system and the meters.' | **not X but Y.** ', not from surveys' tail plus 'real'. 'Measured' carries the meaning. |

### Templates (both languages)

| # | File · key | Current (exact substring) | Proposed | Why |
|---|---|---|---|---|
| 90 | `templates/blocks.mjs`<br>`testimonialsBlock figcaption` | ${t.role} — &lt;bdi lang="en"&gt;${t.company}&lt;/bdi&gt;&lt;/small&gt; | ${t.role}${L.t.svc.quoteSep}&lt;bdi lang="en"&gt;${t.company}&lt;/bdi&gt;&lt;/small&gt; | **em dash (template).** A hard-coded em dash in every testimonial attribution, in both languages. Reuse the locale separator («، » / ', '). |
| 91 | `templates/pages.mjs`<br>`servicePage inline-quote` | &lt;strong&gt;${t.name}&lt;/strong&gt; — ${t.role}${v.quoteSep} | &lt;strong&gt;${t.name}&lt;/strong&gt;${v.quoteSep}${t.role}${v.quoteSep} | **em dash (template).** A hard-coded em dash in the quote attribution on service pages, in both languages. |

### Reviewed and deliberately kept

These strings match a pattern but are not slop. They are not in the JSON.

- **Agent demo questions in Egyptian dialect** (`homeCopy.agents[].q`, `mock.ai.q`). This is quoted user speech; it's specific and human.
- **Search-intent questions as headings.** «كم تكلفة تطبيق نظام ERPNext في مصر؟» (the pricing H1), «ما الفرق بين الفاتورة الإلكترونية والإيصال الإلكتروني؟», "Is ERPNext really free?" (an FAQ question, and "really" is the searcher's own word). These answer real queries.
- **Contrasts that carry a concrete fact.**
  - «رقم واحد صحيح بدل خمسة ملفات Excel» / "One correct number instead of five spreadsheets that disagree" (`groups[0].lead`)
  - «بدلاً من المطابقة اليدوية» / "instead of ticking by hand" (the bank integration)
  - "Backups that have actually been restored": here "actually" marks a real gap between "backed up" and "restore-tested".
- **The new stats notes** («مدة كافية لنعرف أغلب الطرق التي يتعثر بها الإطلاق» and the rest). They're specific and have a voice. The layout around them is the problem (see design fix 6).
- **Client testimonials.** They're published quotes, so I only changed punctuation (#48). They are still generic («الفريق محترف جداً»، "Worth every pound"). Ask each client for one number: hours saved, days to close the month, rejected invoices before and after.
- **Pain statements with «لا»** («برنامج حسابات لا يعرف ماذا في المخزن»). These describe a problem; they aren't contrast frames.

---

## 3. Design fixes, ranked

Ranked by how strongly each pattern reads as a template: the tell's strength times how visible it is on the site. Cost: **S** = delete or adjust CSS/markup, under an hour. **M** = a few hours of template and JS work. **L** = needs new assets or content from Innomate.

| # | Pattern on this site | Where | Do this instead | Cost |
|---|---|---|---|---|
| 1 | **Div-built fake product screens with fake KPIs, floating glass toasts, pulsing "live" dots and macOS window dots.** The hero shows an ERP "dashboard" with `+12.4%`, `−3.1%` and `1,240,000`. Three `.hero-float` toasts with `backdrop-filter: blur(10px)` float over it with parallax. Every mock has `.mock-dots` traffic lights and an `.m-live` dot with `livePulse`. | `templates/mocks.mjs` (10 mocks); `home.mjs` hero `.hero-screen`, `.hf-eta/.hf-zk/.hf-ai`; `sections.css` 51–64; `mocks.css` 17–19; `base.css` `.dot` | (a) Delete the three toasts, the window dots and the pulsing dots **[S]**. (b) Replace the hero dashboard with a real ERPNext screenshot (Arabic RTL desk, sample company, cropped to one screen), or with a real photo of a client's floor in 10th of Ramadan plus one screenshot **[L, about half a day on an ERPNext demo site]**. (c) Keep the ETA invoice mock: it shows the actual flow (validate → sign → submit → accepted). Drop the `%` deltas from the others, or label them «مثال» / "Sample". | S → L |
| 2 | **Eyebrow + big H2 + grey lead on every section, often as a split header.** About 10 eyebrows on the home page (plus the pill kicker), and one on every inner-page section. The eyebrow carries the logo-pill glyph as a bullet. `.sec-head--split` puts the headline on one side and a small grey paragraph on the other. | `base.css` `.eyebrow` 86–95, `.sec-head--split` 74–81; `blocks.mjs` `secHead()`, `faqBlock()`; `home.mjs` (8 direct uses) | Make `eyebrow` opt-in in `secHead()` and keep it on at most one section in three (hero kicker, ETA «الامتثال الضريبي», FAQ). Drop the split variant: put the lead under the H2 at `max-inline-size: 62ch`, or drop the lead when the H2 already says it (the H2 rewrites above make most leads redundant). | S |
| 3 | **An icon in a rounded square at the top of every card.** `.icon-tile` (52px, radius 16, `brand-50`) appears in `svc-card` (10 on the services hub, 3 related on every service/sector page), `sector-card` (13), `feat` (6 per service page), `integ-card` (10), about values (4) and "what we need" (3). The same device again as `.hf-ico`, `.sl-card-ico`, `.stack-link-ico`. | `base.css` 170–174; `blocks.mjs` `relatedServices`; `pages.mjs` hubs, features, values, needs | Remove the tile from content cards. Where an icon helps (mega menu, integration list), use it inline at 20px in the text colour, with no background. The services hub reads better as a 2-column list of name + one line + arrow. | S |
| 4 | **Identical card grids and identical page skeletons.** All 10 service pages share one skeleton: hero + mock → definition → 3 red-topped pain cards (01/02/03) → 6-card feature bento → 4 step cards → before/after table → cost cue → FAQ → 3 related cards → CTA. All 13 sector pages share another. The pains appear **twice** on each service page: once as cards, and again as the first column of the before/after table. | `pages.mjs` `servicePage`, `sectorPage`; `sections.css` `.pain-grid` 437–446, `.feat-bento`, `.steps`; `base.css` `.grid-3` | (a) Delete the pain cards and keep the before/after table, which already pairs each pain with its outcome **[S]**. (b) Give each page one signature block that only it has. The ETA page already does this (comparison table + rejection reasons). Ideas: a device/model list for ZKTeco, a sample BOM for electrical panels, a colour-formula record for paints, a backup/restore log for hosting **[M–L]**. (c) Break `.feat-bento` into a plain 2-column list where features are short. | S → L |
| 5 | **Decorative numbering on things that aren't sequences.** `.pain-no` 01–03; `.stack-no` "02/06"; sector list `.sl-no/.sx-no` 01–13; the new stats counter "01 / 04". | `pages.mjs` pains; `blocks.mjs` `stackCards`; `home.mjs` sectors and stats | Keep numbers only where order matters: journey steps, how-we-work phases and service steps. Remove the rest. | S |
| 6 | **Hero-metrics stats with meaningless bars, count-up and a pinned rolling counter.** `statsBand()` draws progress bars with hard-coded widths `[82, 64, 74, 100]%` that measure nothing (still used on About). The new home `statsSec` pins the viewport to roll one giant number through 50+ / 7+ / 20+ / 24/7 with "01 / 04" and dot pills. | `blocks.mjs` 36–46 (`.stat-bar`); `home.mjs` `statsSec`; `sections.css` `.stat-bar`; `home.js` | One static row of four figures, each with its note (the notes are good). No bars, no count-up, no pin. If the numbers need emphasis, put them in the hero proof line, which already says «+50 شركة في 10 قطاعات». | S |
| 7 | **Template hero.** A pill kicker with a green dot. A "scramble" word (`data-scramble`) whose mid-animation frame showed gibberish («احلكفشحو») in the screenshot. A grey third line. Primary + ghost CTAs where the ghost has a ▶ play icon but links to `#journey`, not a video. A client-logo avatar stack with "+50" inside the hero. A mouse-shaped scroll cue. Parallax gradient pills. | `home.mjs` `hero`; `home.js` scramble and parallax; `sections.css` 19–73 | Static headline; if the word must rotate, crossfade whole words with no random glyphs. Remove the ▶ icon (or make it a real 60–90 second walkthrough video). Move the logo proof into the logo section right below. Delete `.hero-scroll`. Drop the dot from the kicker. Keep one brand-pill element at most. | S |
| 8 | **Glow blobs and a grid behind every hero.** `.hero-grid-bg` has two radial blobs (blue and amber) over a 56px grid with a radial mask. `.phero::before` repeats it on every inner page. More radial glows sit on `.feat--lead`, `.why-card--ink` and the mega menu, and the CTA card is a gradient with animated pills. | `sections.css` 7–15, 401–416, 460; `layout.css` 147 | A flat `--paper` background. Show brand colour as solid blocks (the dark stack cards already do this well). If texture is wanted, one subtle grain on the hero only. | S |
| 9 | **Everything animates.** 48 `data-reveal` elements and 9 per-word `data-split` headings on the home page alone. 26 `@keyframes`. Two infinite orbit spins with travelling packets. An auto-scrolling logo marquee. Four pinned scroll sections (journey, align quote, stats, sectors). Plus `ctaPill`, `bob`, `hubIn`, `livePulse`, `ring` and `pulse`. | `main.js` / `home.js`; `sections.css`, `mocks.css` | Keep two signature motions that explain something: the AI agent typing demo and the ETA flow ticking through its states (the journey scroll is a defensible third). Remove per-word heading reveals and reveal whole sections once. Unpin stats and sectors. Make the logo marquee a static grid. Check `prefers-reduced-motion` turns everything else off. | M |
| 10 | **Orbit diagram for integrations.** An ERPNext core with dashed rings, spinning icon nodes and amber "packets". It's the generic hub-and-spoke picture any SaaS page could use. | `home.mjs` `integrationsSec` `.orbit*`; `sections.css` 313–340 | A table or list of the actual systems with their real marks (ETA, ZKTeco, WhatsApp, Power BI, WooCommerce/Shopify, banks), each with what flows in which direction ("invoice out, status back"). | M |
| 11 | **Chips and pills on everything.** B2B/B2C, week labels, "why" chips, an integration group chip on every card, «مصانع» on 6 of 13 sector rows, «قريباً» on **all 8** resource cards, «الأكثر طلباً» with ✨, «نوظف الآن», case tags. | `base.css` `.chip*`; `home.mjs`; `pages.mjs` resources, integrations, clients; `layout.mjs` 74, 131 | Keep chips only for real filters and states. Don't publish eight "coming soon" articles: ship the one or two that are written, or hide the page. Drop the per-row «مصانع» tag; the sectors hub already splits factories from services. | S |
| 12 | **Placeholder people and cases shown as if real.** Six team cards reading «اسم عضو الفريق» with the logo glyph on pastel gradients. Three case-study cards containing only a design note. Visible `.todo-note` stripes on the pricing, about and clients pages. | `pages.mjs` `aboutPage`, `clientsPage`, `pricingPage`; `sections.css` `.member-ph`, `.todo-note` | Hide these blocks in the production build until real content exists (one flag). One real team photo beats six placeholders. | S (hide) / L (photos, cases) |
| 13 | **3D clay illustrations for sectors** (new: `assets/img/sectors/*.webp`, rendered from `models3d.js`). Glossy clay-style objects, like a paint tin and roller, are a stock 2025–26 template look, close to the "abstract 3D" imagery 925 Studios lists. | `home.mjs` `sectorsSec`; `scripts/render-sectors.mjs` | Real photos from client factories: food lines, a panel shop, a paint mixer. Most clients are 10th of Ramadan factories, so a one-day shoot covers most sectors. Until then, a plain sector name list with no picture is better than stock 3D. | L |
| 14 | **The testimonial card grid.** Three equal cards with a big quote icon; the first is a "lead" card. | `blocks.mjs` `testimonialsBlock` | One or two quotes of at most 3 lines, each with a specific result and the person's real photo or company logo, placed next to the service it proves. | S (layout) / L (quotes) |
| 15 | **Sparkles icon as the "AI" signifier.** Used in the mega-menu chip, the warehouse mock's suggestion line, the About values (fixed in the JSON) and the LLM orbit node. | `layout.mjs` 74; `mocks.mjs` 92; `icons.mjs` | Use a concrete glyph: a document for the guide chip, a cart or reorder icon for the stock suggestion. | S |
| 16 | **Middle dots and duplicate CTA pairs.** `·` separates the kicker, mock titles and source lines. Every inner hero has primary + WhatsApp ghost buttons, the closing CTA band repeats primary + WhatsApp, and the nav has a third primary with a different label. | `copy.mjs` strings; `blocks.mjs` `pageHero`, `ctaBand` | One label for the booking intent (in the JSON). Keep WhatsApp, which matters to Egyptian B2B buyers, as a secondary text link with the number rather than a second big button. Ration `·` to one per line, in metadata only. | S |
| 17 | **The brand-pill motif used as wallpaper.** The logo's three pills appear as hero shapes, the eyebrow bullet, mega-menu backdrop pills, CTA pills, 404 pills, hub-visual columns, team placeholders, the footer's giant wordmark and the align-section bars. | `sections.css`, `layout.css`, `pages.mjs` `hubVisual`, `home.mjs` `bars()` | Keep the motif in the logo, the footer wordmark and one hero element. Everywhere else it has turned into pattern. | S |

**Order of work.** The cheap wins are #1a, 2, 3, 5, 6, 7, 8, 11, 12 (hide), 15 and 16. Together they remove most of the template signal in about a day. The expensive, high-value items all need real material from Innomate: screenshots (#1b), photos (#13, #12) and client numbers (#14). Ask for them now so they are ready when the design work reaches them.

---

## 4. Applying the copy fixes

`research/ai-slop-copy-fixes.json` is an array of `{file, find, replace, lang, reason, key, category, occurrences}`.

- **`file`:** relative to the project root.
- **`occurrences`:** the verified count of `find` in that file at 20:23 on 30 Sep 2026. All 152 are `1`.
- **`lang`:** `ar`, `en`, or `both` (the two template fixes).
- **Order:** apply in array order. No two entries overlap.

A minimal applier that refuses to touch anything that has drifted:

```js
// node apply-slop-fixes.mjs   (run from the project root)
import { readFileSync, writeFileSync } from 'node:fs';
const fixes = JSON.parse(readFileSync('research/ai-slop-copy-fixes.json', 'utf8'));
const files = {};
for (const f of fixes) {
  const src = (files[f.file] ??= readFileSync(f.file, 'utf8'));
  const n = src.split(f.find).length - 1;
  if (n !== 1) { console.error(`skip (${n}x): ${f.file} ${f.key}`); continue; }
  files[f.file] = src.replace(f.find, () => f.replace);
}
for (const [p, t] of Object.entries(files)) writeFileSync(p, t);
```

**After applying:**

- Rebuild (`npm run build`) and re-check the two things a text swap can't verify:
  - **(a)** the `align.lines` justification: each array item is one line of the animated quote.
  - **(b)** nav width with the longer CTA label «احجز جلسة تحليل مجانية» / "Book a free discovery session".
- Entries marked **Optional** in the Why column are judgement calls you can skip.
- Entry #48, the client quote, changes punctuation only.

---

## Sources

**Web**

- Wikipedia, [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- Poynter, [AI learned how to write from humans. Now humans are trying not to sound like AI](https://www.poynter.org/reporting-editing/2026/ai-changing-human-writing-editors-em-dash/) (28 Sep 2026)
- Impeccable, [The missing design vocabulary for agents: slop](https://impeccable.style/slop/)
- TeneX Studio, [AI slop: 8 signs a website was generated by AI](https://tenex.studio/en/blog/ai-slop-ui-8-signes/) (14 Jul 2026)
- 925 Studios, [AI slop web design guide](https://www.925studios.co/blog/ai-slop-web-design-guide)
- SmoothUI, [AI design slop](https://smoothui.dev/blog/ai-design-slop) (24 Jun 2026)
- DEV, [Why every AI-built website looks the same (Blame Tailwind's indigo-500)](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p)
- DEV, [The purple gradient problem](https://dev.to/james_anderson_h/the-purple-gradient-problem-why-ai-ui-all-looks-alike-and-how-to-fix-it-3j65)
- Vibemole, [How to avoid building apps that look vibe coded](https://vibemole.com/resources/avoid-vibecoded-app-design)
- Buzzinga, [٦ علامات تفضح نصوص الذكاء الاصطناعي حسب مستخدمي ريديت](https://buzzinga.ai/%D8%B9%D9%84%D8%A7%D9%85%D8%A7%D8%AA-%D8%AA%D9%83%D8%B4%D9%81-%D8%A7%D9%84%D9%86%D8%B5%D9%88%D8%B5-%D8%A7%D9%84%D9%85%D9%83%D8%AA%D9%88%D8%A8%D8%A9-%D8%A8%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7/) (16 Dec 2025)
- TextPulse, [Arabic AI humanizer](https://textpulse.ai/blog/ai-humanizer-for-arabic) (Aug 2026)
- Arabic Wikipedia, [ترقيم](https://ar.wikipedia.org/wiki/%D8%AA%D8%B1%D9%82%D9%8A%D9%85)
- Al-Shaibani & Ahmed, [The Arabic AI Fingerprint](https://arxiv.org/abs/2505.23276) (2025)
- Slator, [Translationese remains a challenge for LLMs](https://slator.com/translationese-remains-challenge-for-large-language-models-study-finds/)

**Local skills**

- `avoid-ai-writing` v3.25.0 (Conor Bronsdon)
- `humanizer` (based on the Wikipedia guide)
- `stop-slop` (phrases.md, structures.md)
- `taste-skill` §4.5–4.9 and §9
- `redesign-skill`
- `frontend-design`

The skills live under `C:\Users\Ahmad\Desktop\NewTool\.claude\skills\` and `…\AppData\Roaming\Claude\local-agent-mode-sessions\…`. No folder named `stop-slop`, `taste-skill` or `avoid-ai-writing` exists under `skills-plugin`; only `humanizer` is there.
