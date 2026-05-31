// ─── Site Config ─────────────────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "XYZ Labs",
  tagline: "Software That Eliminates Operational Bottlenecks.",
  description:
    "We design and build internal software, automation systems, and business workflows that help teams move faster and operate with less manual effort.",
  email: "hello@xyzlabs.io", // [PLACEHOLDER - CONTACT EMAIL]
  linkedIn: "#", // [PLACEHOLDER - LINKEDIN URL]
  github: "#", // [PLACEHOLDER - GITHUB URL]
  calendlyUrl: "#", // [PLACEHOLDER - BOOKING LINK]
};

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

// ─── Services / Outcomes ─────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: "receivables",
    title: "Receivables & Collections",
    description:
      "Reduce outstanding balances and improve cash flow through structured tracking, automated follow-ups, and recovery performance dashboards.",
    icon: "receivables",
  },
  {
    id: "inventory",
    title: "Inventory & Dispatch",
    description:
      "Real-time visibility into stock levels, order status, and delivery workflows across your entire operation — updated automatically.",
    icon: "inventory",
  },
  {
    id: "operations",
    title: "Internal Operations",
    description:
      "Custom dashboards, admin panels, and internal tooling that fits precisely how your team works — not how off-the-shelf software expects you to work.",
    icon: "operations",
  },
  {
    id: "automation",
    title: "Workflow Automation",
    description:
      "Replace manual, repetitive processes with systems that run on their own — reliably, around the clock, without adding headcount.",
    icon: "automation",
  },
  {
    id: "reporting",
    title: "Executive Reporting",
    description:
      "Consolidated reporting that gives leadership clear visibility without analysts spending days pulling data from disconnected systems.",
    icon: "reporting",
  },
  {
    id: "support",
    title: "Customer Support Systems",
    description:
      "Structured systems for handling inquiries, routing requests, and tracking resolution across your team — at any scale.",
    icon: "support",
  },
];

// ─── Process Steps ───────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We spend 60 minutes learning your operations, team, and goals — before suggesting anything.",
  },
  {
    number: "02",
    title: "Architecture",
    description:
      "We design the complete technical solution in writing before a single line of code is written.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Short, visible sprints with weekly demos and async updates. You always know what's been built.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "We own the entire go-live process — QA, staging, production, and handover documentation.",
  },
  {
    number: "05",
    title: "Improve",
    description:
      "Ongoing support, refinement, and expansion available as your business needs evolve.",
  },
];

// ─── Metrics ─────────────────────────────────────────────────────────────────
export const METRICS = [
  {
    value: 100,
    suffix: "+",
    label: "Projects Delivered",
    isPlaceholder: true,
  },
  {
    value: 40,
    suffix: "%",
    label: "Avg. Efficiency Gains",
    isPlaceholder: true,
  },
  {
    value: 95,
    suffix: "%",
    label: "Client Retention",
    isPlaceholder: true,
  },
  {
    value: null,
    display: "24/7",
    label: "Automation Coverage",
    isPlaceholder: true,
  },
];

// ─── Featured Work ────────────────────────────────────────────────────────────
export const FEATURED_WORK = [
  {
    tag: "FINANCIAL SERVICES",
    title: "Document Review System for a Lending Platform",
    problem:
      "A lending platform was spending 40+ hours per week on manual document review, creating bottlenecks in their approval process.",
    solution:
      "We built a system that reads, classifies, and routes loan documents automatically — flagging only exceptions for human review.",
    outcome:
      "The team now handles 4× the volume with the same headcount. Review time dropped by 78%.",
    metrics: [
      { value: "78%", label: "Review Time Reduced" },
      { value: "3 Wks", label: "Kickoff to Production" },
    ],
    isPlaceholder: true,
  },
  {
    tag: "HEALTHCARE OPERATIONS",
    title: "Patient Intake System for a Regional Clinic Group",
    problem:
      "A fragmented paper and email intake process across 6 clinic locations was causing errors and losing patients to faster competitors.",
    solution:
      "We built a structured digital intake system that standardised the process across all locations with automated routing.",
    outcome:
      "Intake time reduced from 25 minutes to 7. Error rates dropped 91%. Staff freed from manual data entry.",
    metrics: [
      { value: "91%", label: "Error Rate Reduced" },
      { value: "$240K", label: "Annual Savings" },
    ],
    isPlaceholder: true,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote:
      "[PLACEHOLDER — TESTIMONIAL: Client quote about fast delivery, quality engineering, and measurable business impact. 3–4 sentences in their own voice.]",
    name: "[PLACEHOLDER — CLIENT NAME]",
    title: "Co-Founder & CEO",
    company: "[PLACEHOLDER — COMPANY NAME]",
    initials: "CL",
    isPlaceholder: true,
  },
  {
    quote:
      "[PLACEHOLDER — TESTIMONIAL: Client quote about operational improvement, time saved, and the team's professionalism. 3–4 sentences.]",
    name: "[PLACEHOLDER — CLIENT NAME]",
    title: "Head of Operations",
    company: "[PLACEHOLDER — COMPANY NAME]",
    initials: "HO",
    isPlaceholder: true,
  },
  {
    quote:
      "[PLACEHOLDER — TESTIMONIAL: Client quote about process automation results, ROI, and confidence in the team's technical depth. 3–4 sentences.]",
    name: "[PLACEHOLDER — CLIENT NAME]",
    title: "Director of Finance",
    company: "[PLACEHOLDER — COMPANY NAME]",
    initials: "DF",
    isPlaceholder: true,
  },
];
