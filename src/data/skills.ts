export type TechCategory = { category: string; items: string[] };

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  type: "fulltime" | "freelance" | "contract";
  description: string;
  highlights: string[];
};

export type EducationEntry = {
  degree: string;
  school: string;
  year: string;
  note: string;
};

export const techStack: TechCategory[] = [
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "CSS Modules",
      "HTML5",
      "SVG animation",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Prisma ORM",
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      "Git",
      "GitHub Actions",
      "Docker",
      "Vercel",
      "AWS (S3, EC2, Lambda)",
      "Figma",
      "Linear",
    ],
  },
  {
    category: "UI/UX",
    items: [
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Accessibility (WCAG 2.1)",
      "Responsive Design",
      "Motion Design",
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Full Stack Developer",
    company: "Atelier Noir",
    period: "2022 — Present",
    type: "fulltime",
    description:
      "Lead engineering on bespoke digital experiences for galleries, fashion houses, and independent artists. Bridge design and engineering through a shared system of reusable, motion-driven components.",
    highlights: [
      "Architected the agency's component library used across 14 production sites",
      "Cut average page weight by 42% by replacing legacy carousels with native CSS transitions",
      "Mentored four junior engineers through structured pairing and design reviews",
      "Owned the migration from Pages Router to Next.js App Router across all client projects",
    ],
  },
  {
    role: "UI/UX Developer",
    company: "Lumen Labs",
    period: "2020 — 2022",
    type: "fulltime",
    description:
      "Shipped the marketing site, onboarding, and in-product editorial surfaces for a Series-B SaaS company. Worked at the seam between Figma and React, holding the line on motion and typography.",
    highlights: [
      "Designed and built the public marketing site, contributing to a 3.1× lift in trial signups",
      "Established the company's first accessibility baseline (WCAG 2.1 AA)",
      "Authored the internal motion guidelines now used across product and marketing",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Independent",
    period: "2019 — 2020",
    type: "freelance",
    description:
      "Worked directly with painters, photographers, and small studios on portfolio sites, online shops, and exhibition microsites. Quiet design, hand-tuned typography, no template work.",
    highlights: [
      "Delivered 11 portfolio and exhibition sites end to end",
      "Built a lightweight headless CMS pipeline reused across most engagements",
      "Maintained a 100% on-time launch record across freelance projects",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Studio Halfmoon",
    period: "2018 — 2019",
    type: "fulltime",
    description:
      "First role out of university. Cut my teeth on a busy boutique studio: WordPress builds, Shopify themes, and the occasional bespoke React side project.",
    highlights: [
      "Shipped 9 production sites in the first year",
      "Took ownership of the studio's internal deploy scripts and previews",
      "Introduced TypeScript on the first React project the studio took on",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    degree: "BSc Computer Science",
    school: "University of Edinburgh",
    year: "2014 — 2018",
    note: "First-class honours. Dissertation on procedural texture synthesis for stylised rendering.",
  },
  {
    degree: "Certified UX Design Professional",
    school: "Interaction Design Foundation",
    year: "2021",
    note: "Specialisation in design systems, accessibility, and motion design fundamentals.",
  },
];
