// Global site data. Facts here come from the live innomate-tech.com
// (contact details, client list, testimonials, stats, FAQ). Anything marked
// PLACEHOLDER must be confirmed by Innomate before launch.

export const company = {
  name: 'Innomate',
  nameAr: 'إنوميت',
  url: 'https://innomate-tech.com',
  email: 'info@innomate-tech.com',
  phone: '+20 101 027 2760',
  phoneHref: '+201010272760',
  whatsapp: 'https://wa.me/201010272760',
  address: '103، NH 26، مدينة العاشر من رمضان، الشرقية، مصر',
  addressShort: 'العاشر من رمضان، الشرقية',
  hours: 'الأحد – الخميس، ٩ ص – ٥ م · الدعم الفني 24/7',
  tagline: 'شريك تطبيق ERPNext والذكاء الاصطناعي للشركات في مصر',
  linkedin: 'https://www.linkedin.com/company/innomate-tech', // PLACEHOLDER: confirm handle
  facebook: 'https://www.facebook.com/innomate.tech',        // PLACEHOLDER: confirm handle
};

// Stats as published on the current site (their own claims).
export const stats = [
  { value: 50, suffix: '+', label: 'شركة تعمل على أنظمتنا' },
  { value: 7, suffix: '+', label: 'سنوات خبرة في ERPNext' },
  { value: 20, suffix: '+', label: 'تكاملاً جاهزاً' },
  { value: 24, suffix: '/7', label: 'دعم فني متواصل' },
];

export const clients = [
  { name: 'ISIS Company', logo: 'isis.png', sector: 'food' },
  { name: 'SeaFood Factory', logo: 'seafood-factory.png', sector: 'food' },
  { name: 'Butchers Burger', logo: 'butchersburger-logo.png', sector: 'food' },
  { name: 'Naturetex', logo: 'naturetex_logo.png', sector: 'apparel' },
  { name: 'PowerLine', logo: 'powerline.png', sector: 'electrical' },
  { name: 'Electro Metal', logo: 'electrometal.png', sector: 'electrical' },
  { name: 'Heliopolis University', logo: 'hu-logo-100.png', sector: 'education' },
  { name: 'Creative Closets', logo: 'creative-closets.png', sector: 'furniture' },
  { name: 'Cairo Closets', logo: 'cairo_closets_black.png', sector: 'furniture' },
  { name: 'Trend Pharm', logo: 'trendpharm-logo-preview.png', sector: 'pharma' },
  { name: 'Atos Pharma', logo: 'atos.png', sector: 'pharma' },
  { name: 'Roaya', logo: 'roaya-logo.png', sector: 'contracting' },
  { name: 'Newmix', logo: 'newmix-logo.png', sector: 'paints' },
  { name: 'Enroot', logo: 'img_1301.png', sector: 'sustainability' },
  { name: 'Libra', logo: 'libra.png', sector: 'agri' },
  { name: 'Lotus', logo: 'lotus.png', sector: 'agri' },
];

// From the current site. Names/roles as published there.
export const testimonials = [
  { quote: 'Innomate غيّرت طريقة إدارتنا للمستودعات والمبيعات بالكامل. الفريق محترف جداً والتطبيق كان أسرع مما توقعنا.', name: 'م. أحمد السعيد', role: 'مدير العمليات', company: 'Electro Metal', service: 'warehouse' },
  { quote: 'تكامل ETA والفاتورة الإلكترونية وفّر علينا ساعات يومياً. الدعم الفني متجاوب وبيفهم احتياجاتنا من أول مرة.', name: 'رنا محمود', role: 'المديرة المالية', company: 'Trend Pharm', service: 'eta-e-invoice' },
  { quote: 'وكلاء الذكاء الاصطناعي حوّلت عملياتنا: أتمتة كاملة لتقارير الموارد البشرية وتنبيهات المخزون. استثمار يستحق كل قرش.', name: 'خالد عبد الله', role: 'الرئيس التنفيذي', company: 'Naturetex', service: 'ai-agents' },
];

export const integrations = [
  { key: 'eta', name: 'مصلحة الضرائب ETA', en: 'ETA e-Invoice & e-Receipt', icon: 'eta', group: 'حكومي', desc: 'إرسال الفواتير والإيصالات الإلكترونية وتوقيعها واستلام حالتها داخل النظام.', link: 'services/eta-e-invoice.html' },
  { key: 'zk', name: 'أجهزة ZKTeco', en: 'ZKTeco biometric', icon: 'zk', group: 'أجهزة', desc: 'سحب حركات البصمة تلقائياً إلى الحضور والانصراف والمرتبات.', link: 'services/zkteco-attendance.html' },
  { key: 'whatsapp', name: 'واتساب للأعمال', en: 'WhatsApp Business', icon: 'whatsapp', group: 'تواصل', desc: 'إرسال الفواتير وكشوف الحساب والتنبيهات للعملاء والموظفين.', link: 'integrations.html#whatsapp' },
  { key: 'powerbi', name: 'Power BI', en: 'Microsoft Power BI', icon: 'bi', group: 'تحليلات', desc: 'لوحات مؤشرات مباشرة من بيانات النظام دون تصدير يدوي.', link: 'services/business-intelligence.html' },
  { key: 'ai', name: 'نماذج الذكاء الاصطناعي', en: 'LLM / AI agents', icon: 'ai', group: 'ذكاء اصطناعي', desc: 'وكلاء يقرؤون من النظام وينفّذون مهام بصلاحيات محددة.', link: 'services/ai-agents.html' },
  { key: 'iot', name: 'حساسات وخطوط إنتاج', en: 'IoT / PLC / sensors', icon: 'iot', group: 'أجهزة', desc: 'قراءات الآلات والطاقة والحرارة تصل إلى أوامر التشغيل والصيانة.', link: 'services/iot-integration.html' },
  { key: 'payments', name: 'بوابات الدفع', en: 'Payment gateways', icon: 'card', group: 'مالي', desc: 'روابط دفع وتحصيل إلكتروني تُسجَّل تلقائياً على فاتورة العميل.', link: 'integrations.html#payments' },
  { key: 'banks', name: 'الربط البنكي', en: 'Bank reconciliation', icon: 'bank', group: 'مالي', desc: 'استيراد كشوف الحساب ومطابقتها مع القيود بدلاً من المطابقة اليدوية.', link: 'integrations.html#banks' },
  { key: 'ecommerce', name: 'المتاجر الإلكترونية', en: 'WooCommerce / Shopify', icon: 'link', group: 'مبيعات', desc: 'مزامنة الطلبات والمخزون والأسعار بين المتجر والنظام.', link: 'integrations.html#ecommerce' },
  { key: 'email', name: 'البريد والتقويم', en: 'Email & calendar', icon: 'mail', group: 'تواصل', desc: 'مراسلات العملاء والموردين محفوظة على سجل كل عميل.', link: 'integrations.html#email' },
];

// Home + FAQ page. First six are from the current site, rewritten for clarity.
export const faqs = [
  { q: 'ما هو ERPNext؟ وهل هو مناسب لشركة صغيرة؟', a: 'ERPNext نظام تخطيط موارد مؤسسات (ERP) مفتوح المصدر يجمع الحسابات والمبيعات والمشتريات والمخازن والموارد البشرية والتصنيع في قاعدة بيانات واحدة. لأنه بلا رسوم ترخيص لكل مستخدم، يناسب الشركات الصغيرة والمتوسطة، ونبدأ معك بالوحدات التي تحتاجها فقط ثم نضيف غيرها مع نمو شركتك.' },
  { q: 'كم يستغرق تطبيق النظام؟', a: 'التطبيق الأساسي يستغرق عادةً من 4 إلى 12 أسبوعاً حسب عدد الفروع والوحدات وحجم البيانات المطلوب نقلها. نعمل على مراحل، وكل مرحلة تنتهي بجزء يعمل فعلياً في شركتك وليس بتقرير.' },
  { q: 'هل تربطون النظام بمنظومة الفاتورة الإلكترونية والإيصال الإلكتروني؟', a: 'نعم، وهو من تخصصاتنا الأساسية. نربط ERPNext بمنظومتي الفاتورة الإلكترونية والإيصال الإلكتروني التابعتين لمصلحة الضرائب المصرية: تكويد الأصناف، التوقيع الإلكتروني، الإرسال، واستلام حالة كل مستند داخل النظام.' },
  { q: 'هل تقدمون تدريباً للموظفين؟', a: 'نعم. ندرّب كل فريق عملياً على الدورة التي يعمل عليها (المحاسبة، المبيعات، المخازن، الموارد البشرية) باللغة العربية، ونسلّمه أدلة مصورة يرجع لها الفريق بعد الإطلاق.' },
  { q: 'ما نوع الدعم بعد الإطلاق؟', a: 'دعم فني متواصل عبر الهاتف والواتساب والبريد، وباقات صيانة شهرية تشمل التحديثات والنسخ الاحتياطي والتحسينات. الأعطال التي توقف العمل لها أولوية على مدار الساعة.' },
  { q: 'ما القطاعات التي تعملون معها؟', a: 'الصناعات الغذائية، الأدوية، الملابس والنسيج، اللوحات الكهربائية، الأثاث، الدهانات، المقاولات، التعليم، الزراعة والإنتاج الحيواني، الرعاية الصحية، الجمعيات الأهلية، والمكاتب المهنية.' },
  { q: 'هل بياناتنا ملك لنا؟', a: 'نعم. ERPNext مفتوح المصدر، فلا يوجد ما يحبسك عندنا: قاعدة البيانات ملكك، ويمكن استضافتها على خوادمك أو على سحابة نديرها لك مع نسخ احتياطي يومي.' },
  { q: 'كم تكلفة نظام ERP؟', a: 'لا توجد رسوم ترخيص لكل مستخدم في ERPNext. التكلفة تتكون من التطبيق (التحليل والإعداد ونقل البيانات والتدريب) والاستضافة والدعم، وتختلف حسب عدد الوحدات والتكاملات. نرسل لك عرض سعر مفصلاً بعد جلسة تحليل مجانية.' },
];

export const nav = {
  company: [
    { href: 'about.html', label: 'من نحن', desc: 'القصة، الفريق، وما نؤمن به', icon: 'users' },
    { href: 'how-we-work.html', label: 'منهجية التطبيق', desc: 'من رسم دورة العمل إلى نظام يعمل', icon: 'compass' },
    { href: 'clients.html', label: 'عملاؤنا', desc: 'شركات تعمل على أنظمتنا في 10 قطاعات', icon: 'star' },
    { href: 'careers.html', label: 'الوظائف', desc: 'انضم إلى الفريق', icon: 'briefcase', badge: 'نوظف الآن' },
    { href: 'resources.html', label: 'المعرفة', desc: 'أدلة ERP والفاتورة الإلكترونية', icon: 'book' },
    { href: 'faq.html', label: 'الأسئلة الشائعة', desc: 'التكلفة والمدة والدعم', icon: 'doc' },
  ],
};

export const jobs = [
  {
    slug: 'b2b-sales-specialist',
    title: 'أخصائي مبيعات B2B',
    titleEn: 'B2B Sales Specialist',
    location: 'العاشر من رمضان (هجين)',
    dept: 'الإدارة',
    type: 'دوام كامل',
    summary: 'تدير دورة بيع نظام ERP كاملة، من البحث عن العملاء حتى إغلاق الصفقة، كمستشار يفهم عمليات المالية والموارد البشرية والمخازن والتصنيع.',
    responsibilities: [
      ['توليد الفرص', 'حملات تواصل موجهة لصنّاع القرار (الإدارة العليا، مديرو تقنية المعلومات والعمليات) في الشركات المصرية الكبيرة والمتوسطة.'],
      ['التواصل والأتمتة', 'استخدام أدوات مثل Apollo.io وLinkedIn Sales Navigator لبناء قوائم دقيقة وتنفيذ تسلسلات تواصل متعددة المراحل.'],
      ['العروض الاستشارية', 'اجتماعات اكتشاف لتشخيص نقاط الاختناق، ثم عروض توضيحية مخصصة للنظام.'],
      ['العروض التجارية', 'إعداد العروض الفنية والمالية ووثائق النطاق وتقديرات التكلفة.'],
      ['إغلاق الصفقات', 'التفاوض وإغلاق الصفقات لتحقيق المستهدف الربع سنوي، والتنسيق مع فريق التطبيق حتى يبدأ التطبيق عند العميل في موعده.'],
    ],
    requirements: [
      ['الخبرة', 'من 2 إلى 3 سنوات في مبيعات B2B للبرمجيات أو SaaS أو ERP في السوق المصري.'],
      ['فهم الأعمال', 'فهم جيد للمالية والموارد البشرية وسلاسل الإمداد وإدارة العملاء، وتحويل الاحتياج إلى حل واضح.'],
      ['الأدوات', 'خبرة عملية في إدارة الفرص على CRM (مثل Odoo أو Salesforce أو HubSpot) وأدوات البحث عن العملاء.'],
      ['التواصل', 'عربية أم وإنجليزية مهنية، مع مهارات عرض وتفاوض قوية.'],
      ['الانضباط', 'نشاط يومي مرتفع، وإدارة فرص متعددة، وتحقيق المستهدف في نظام عمل هجين.'],
    ],
  },
];
