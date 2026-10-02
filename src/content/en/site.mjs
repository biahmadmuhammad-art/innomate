// Global site data, English. Contact facts are shared with the Arabic file.
// Testimonials are translations of the Arabic quotes published on
// innomate-tech.com — confirm the wording with each client before launch.
import { company as arCompany, clients as arClients } from '../ar/site.mjs';

export const company = {
  ...arCompany,
  address: '103, NH 26, 10th of Ramadan City, Sharqia, Egypt',
  addressShort: '10th of Ramadan City, Sharqia',
  hours: 'Sun–Thu, 9 am–5 pm · Support 24/7',
  tagline: 'ERPNext implementation and AI for companies in Egypt',
};

export const stats = [
  { value: 50, suffix: '+', label: 'companies run on our systems' },
  { value: 7, suffix: '+', label: 'years of ERPNext experience' },
  { value: 20, suffix: '+', label: 'ready-made integrations' },
  { value: 24, suffix: '/7', label: 'technical support' },
];

export const clients = arClients;

export const testimonials = [
  { quote: 'Innomate completely changed how we run our warehouses and sales. The team is highly professional, and the rollout was faster than we expected.', name: 'Eng. Ahmed El-Saeed', role: 'Operations Manager', company: 'Electro Metal', service: 'warehouse-management' },
  { quote: 'The ETA e-invoice integration saves us hours every day. Support is responsive and understands what we need the first time.', name: 'Rana Mahmoud', role: 'Finance Director', company: 'Trend Pharm', service: 'eta-e-invoice' },
  { quote: 'The AI agents changed our operations: HR reports and stock alerts are fully automated now. Worth every pound.', name: 'Khaled Abdallah', role: 'CEO', company: 'Naturetex', service: 'ai-agents' },
];

export const integrations = [
  { key: 'eta', name: 'Egyptian Tax Authority (ETA)', en: 'ETA e-Invoice & e-Receipt', icon: 'eta', group: 'Government', desc: 'Sign and submit e-invoices and e-receipts, then read each document’s status back inside ERPNext.', link: 'services/eta-e-invoice.html' },
  { key: 'zk', name: 'ZKTeco devices', en: 'ZKTeco biometric', icon: 'zk', group: 'Devices', desc: 'Fingerprint punches flow into attendance and payroll without exports.', link: 'services/zkteco-attendance.html' },
  { key: 'whatsapp', name: 'WhatsApp Business', en: 'WhatsApp Business', icon: 'whatsapp', group: 'Messaging', desc: 'Send invoices, statements and alerts to customers and staff.', link: 'integrations.html#whatsapp' },
  { key: 'powerbi', name: 'Power BI', en: 'Microsoft Power BI', icon: 'bi', group: 'Analytics', desc: 'Live KPI dashboards on ERP data, no manual exports.', link: 'services/business-intelligence.html' },
  { key: 'ai', name: 'AI models', en: 'LLM / AI agents', icon: 'ai', group: 'AI', desc: 'Agents that read from the system and act within set permissions.', link: 'services/ai-agents.html' },
  { key: 'iot', name: 'Sensors and production lines', en: 'IoT / PLC / sensors', icon: 'iot', group: 'Devices', desc: 'Machine, energy and temperature readings reach work orders and maintenance.', link: 'services/iot-integration.html' },
  { key: 'payments', name: 'Payment gateways', en: 'Payment gateways', icon: 'card', group: 'Finance', desc: 'Payment links and online collection posted straight to the customer invoice.', link: 'integrations.html#payments' },
  { key: 'banks', name: 'Bank reconciliation', en: 'Bank reconciliation', icon: 'bank', group: 'Finance', desc: 'Import bank statements and match them to entries instead of ticking by hand.', link: 'integrations.html#banks' },
  { key: 'ecommerce', name: 'Online stores', en: 'WooCommerce / Shopify', icon: 'link', group: 'Sales', desc: 'Orders, stock and prices stay in sync between the store and ERPNext.', link: 'integrations.html#ecommerce' },
  { key: 'email', name: 'Email and calendar', en: 'Email & calendar', icon: 'mail', group: 'Messaging', desc: 'Customer and supplier emails saved on each record.', link: 'integrations.html#email' },
];

export const faqs = [
  { q: 'What is ERPNext, and does it suit a small company?', a: 'ERPNext is an open-source enterprise resource planning (ERP) system that keeps accounting, sales, purchasing, inventory, HR and manufacturing in one database. There is no per-user licence fee, so it works for small and mid-sized companies. We start with the modules you need and add others as you grow.' },
  { q: 'How long does implementation take?', a: 'A standard implementation takes 4 to 12 weeks, depending on the number of branches, modules and how much data has to move. We work in phases, and every phase ends with something running in your company, not with a report.' },
  { q: 'Do you integrate with Egypt’s e-invoice and e-receipt systems?', a: 'Yes, it is one of our core specialisms. We connect ERPNext to the Egyptian Tax Authority’s e-invoice and e-receipt systems: item coding, digital signature, submission, and each document’s status returned inside the system.' },
  { q: 'Do you train our staff?', a: 'Yes. Each team is trained hands-on in the process it runs (accounting, sales, warehouse, HR), in Arabic or English, with illustrated guides the team keeps after go-live.' },
  { q: 'What support do we get after go-live?', a: 'Ongoing support by phone, WhatsApp and email, plus monthly maintenance plans covering updates, backups and improvements. Anything that stops work gets round-the-clock priority.' },
  { q: 'Which industries do you work with?', a: 'Food manufacturing, pharmaceuticals, apparel and textiles, electrical panels, furniture, paints, contracting, education, agriculture and livestock, healthcare, non-profits and professional firms.' },
  { q: 'Do we own our data?', a: 'Yes. ERPNext is open source, so nothing locks you in: the database is yours, hosted on your servers or on a cloud we manage for you with daily backups.' },
  { q: 'How much does an ERP system cost?', a: 'ERPNext has no per-user licence fee. The cost is the implementation (analysis, setup, data migration, training), plus hosting and support, and it depends on the modules and integrations you need. We send a detailed quote after a free discovery session.' },
];

export const nav = {
  company: [
    { href: 'about.html', label: 'About us', desc: 'Our story, team and what we believe', icon: 'users' },
    { href: 'how-we-work.html', label: 'How we work', desc: 'From mapping your process to a live system', icon: 'compass' },
    { href: 'clients.html', label: 'Clients', desc: 'Companies on our systems across 10 sectors', icon: 'star' },
    { href: 'careers.html', label: 'Careers', desc: 'Join the team', icon: 'briefcase', badge: 'Hiring' },
    { href: 'resources.html', label: 'Resources', desc: 'ERP and e-invoice guides', icon: 'book' },
    { href: 'faq.html', label: 'FAQ', desc: 'Cost, timing and support', icon: 'doc' },
  ],
};

// From the English job post on innomate-tech.com/jobs/innomate/b2b-sales-specialist
export const jobs = [
  {
    slug: 'b2b-sales-specialist',
    title: 'B2B Sales Specialist',
    titleEn: 'B2B Sales Specialist',
    location: '10th of Ramadan City (hybrid)',
    dept: 'Management',
    type: 'Full-time',
    summary: 'Manage the full sales cycle for our ERP software, from prospecting to closing, as a consultative partner who understands finance, HR, inventory and manufacturing workflows.',
    responsibilities: [
      ['Pipeline generation', 'Run targeted outbound prospecting campaigns to engage decision-makers (C-suite, IT directors, operations managers) across Egyptian enterprises and SMEs.'],
      ['Outreach and automation', 'Use lead generation and sales automation platforms such as Apollo.io and LinkedIn Sales Navigator to build accurate prospect lists and run multi-touch outreach sequences.'],
      ['Consultative demonstrations', 'Hold discovery meetings to diagnose client bottlenecks, then run ERPNext demos set up for their case.'],
      ['Commercial proposals', 'Prepare technical and financial proposals, scope documents and cost estimates aligned with each prospect’s operations.'],
      ['Deal closure', 'Negotiate contract terms, close deals to meet quarterly revenue targets, and coordinate with the implementation team so the client’s implementation starts on time.'],
    ],
    requirements: [
      ['Experience', '2–3 years of B2B sales in software, SaaS or ERP in the Egyptian market.'],
      ['Business knowledge', 'A solid grasp of core operations (finance, HR, supply chain, CRM) and the ability to turn a client’s needs into a clear system scope.'],
      ['Tools', 'Hands-on pipeline management in a modern CRM (e.g. Odoo, Salesforce, HubSpot) and outbound work in prospecting tools (LinkedIn Sales Navigator, Apollo.io).'],
      ['Communication', 'Native Arabic and professional English, with strong presentation, negotiation and relationship-building skills.'],
      ['Work discipline', 'High daily activity, a complex pipeline kept in order, and quotas hit consistently across in-office and remote days.'],
    ],
  },
];
