export const profile = {
  name: "A71n",
  title: "Jr. Research & Offensive Security",
  tagline:
    "I break AI systems and hack your webapps before a hacker gets you — ethically, of course.",
  location: "India",
  email: "ajinisadev@proton.me",
  website: "https://ajin.is-a.dev",
  linkedin: "https://linkedin.com/in/ajin-s-763b94226",
  github: "https://github.com/Alerrrt",
  medium: "https://medium.com/@ajinisadev",
  handle: "@a71n_cr4sh",
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period?: string;
  url?: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "SATARK AI",
    role: "Jr. Research",
    location: "India",
    period: "2025 — PRESENT",
    url: "https://dev.satark.live",
    points: [
      "Part of the team building India's first sovereign cybersecurity model — hired to break it before anyone else can.",
      "Jailbreaks, prompt injections, guardrail bypasses: if an AI can be talked into misbehaving, I find the words. 50+ companies secured along the way.",
    ],
  },
];

export const previousExperience: Experience[] = [
  {
    company: "REX CYBER SOLUTIONS",
    role: "Security Analyst",
    location: "India",
    points: [
      "Broke into fintech, healthcare, and edtech web apps — legally, on invitation, and always with a report at the end.",
    ],
  },
  {
    company: "CYBER LEAP",
    role: "Security Analyst",
    location: "India",
    points: [
      "25+ companies secured across web app engagements — recon, exploit, report, retest, repeat.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  url: string;
};

export const projects: Project[] = [
  {
    name: "Blind SSRF via Webhook Subscription URLs",
    description:
      "When a SaaS trusts your callback a little too much — hunting blind SSRF through webhook subscriptions, written up on Medium.",
    url: "https://medium.com/@ajinisadev/blind-ssrf-via-webhook-subscription-urls-when-a-saas-trusts-your-callback-too-much-987f62884693",
  },
  {
    name: "Neutron-ng",
    description:
      "A modern, extensible web vulnerability scanner built for speed and accuracy.",
    url: "https://github.com/Alerrrt/Neutron-ng",
  },
  {
    name: "One-for-All",
    description:
      "An all-in-one reconnaissance and security assessment toolkit.",
    url: "https://github.com/Alerrrt/One-for-All",
  },
];

export const education = {
  headline: "CPT — Certified Penetration Tester",
  subline: "plus the certs below, collected like achievement badges",
  sources:
    "The real curriculum: Elder Pliny's jailbreaks, 3am X threads, Medium write-ups, and other people's bug bounty reports.",
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url?: string;
};

// URLs point to each issuer's official site as a placeholder — swap in the
// exact credential/verification links (Credly, PDF, etc.) when available.
export const certifications: Certification[] = [
  {
    name: "DSCI Ransomware Rapid Responder",
    issuer: "Data Security Council of India",
    date: "Aug 2025",
    url: "https://www.dsci.in",
  },
  {
    name: "Fortinet Certified Fundamentals",
    issuer: "Fortinet (FCF)",
    date: "May 2024",
    url: "https://www.fortinet.com/training-certification",
  },
  {
    name: "Ethical Hacking Internship",
    issuer: "EyeDotNet",
    date: "June 2024",
  },
  {
    name: "Certified Penetration Testing",
    issuer: "Red Team Hacker Academy",
    date: "2023",
    url: "https://redteamacademy.com",
  },
  {
    name: "CEH v11: Fileless Malware",
    issuer: "Skillsoft",
    date: "2023",
    url: "https://www.skillsoft.com",
  },
  {
    name: "Cloud Security Architecture",
    issuer: "Skillsoft",
    date: "2023",
    url: "https://www.skillsoft.com",
  },
];

export const skillsDescription = "I make sure your AI doesn't help someone build a nuke in their garage. Days are spent jailbreaking models, red-teaming guardrails, and hunting vulnerabilities — and building the tooling to do it: scanners, recon kits, whatever the job needs.";

export const hosted = {
  event: "0xChai Break",
  org: "Web3 Kerala",
  detail: "A Web3 networking meetup in Palakkad — chai, community, and a room full of builders.",
  url: "https://x.com/Web3_kerala/status/1893277059469734290",
};