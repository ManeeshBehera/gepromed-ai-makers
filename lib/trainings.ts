import type { L, Lang } from "./i18n";

export type Specialty = "vascular" | "ophthalmology" | "simulation";
export type Level = "Initiation" | "Advanced" | "Expert";

export type TrainingSession = {
  slug: string;
  title: L;
  specialty: Specialty;
  level: Level;
  audience: "France" | "Europe";
  city: string;
  venue: L;
  startDate: string; // ISO
  endDate: string; // ISO
  durationDays: number;
  priceEUR: number;
  depositEUR: number;
  capacity: number;
  enrolled: number;
  qualiopi: boolean;
  summary: L;
  objectives: L[];
  program: { day: L; items: L[] }[];
  supervisors: { name: string; role: L }[];
  // proof / outcomes (shown for past sessions)
  satisfaction?: number; // %
  passRate?: number; // %
  photos?: number;
};

export const SPECIALTY_LABELS: Record<Specialty, L> = {
  vascular: { fr: "Chirurgie vasculaire", en: "Vascular surgery" },
  ophthalmology: { fr: "Ophtalmologie", en: "Ophthalmology" },
  simulation: { fr: "Simulation & innovation", en: "Simulation & innovation" },
};

export const LEVEL_LABELS: Record<Level, L> = {
  Initiation: { fr: "Initiation", en: "Foundation" },
  Advanced: { fr: "Avancé", en: "Advanced" },
  Expert: { fr: "Expert", en: "Expert" },
};

export const AUDIENCE_LABELS: Record<"France" | "Europe", L> = {
  France: { fr: "France", en: "France" },
  Europe: { fr: "Europe", en: "Europe" },
};

const strasbourgVenue: L = {
  fr: "Institut Gepromed — Plateau technique",
  en: "Gepromed Institute — Technical platform",
};

export const trainings: TrainingSession[] = [
  {
    slug: "abord-vasculaire-peripherique-2026-09",
    title: {
      fr: "Abord vasculaire périphérique — module avancé",
      en: "Peripheral vascular access — advanced module",
    },
    specialty: "vascular",
    level: "Advanced",
    audience: "Europe",
    city: "Strasbourg",
    venue: strasbourgVenue,
    startDate: "2026-09-22",
    endDate: "2026-09-24",
    durationDays: 3,
    priceEUR: 2400,
    depositEUR: 600,
    capacity: 16,
    enrolled: 11,
    qualiopi: true,
    summary: {
      fr: "Trois jours de pratique intensive sur modèles anatomiques et simulateurs haute-fidélité pour maîtriser les abords vasculaires périphériques complexes.",
      en: "Three days of intensive practice on anatomical models and high-fidelity simulators to master complex peripheral vascular access.",
    },
    objectives: [
      {
        fr: "Sécuriser l'abord fémoral, huméral et poplité",
        en: "Secure femoral, brachial and popliteal access",
      },
      {
        fr: "Gérer les complications hémorragiques en simulation",
        en: "Manage haemorrhagic complications in simulation",
      },
      {
        fr: "Intégrer l'imagerie per-opératoire à la décision chirurgicale",
        en: "Integrate intra-operative imaging into surgical decisions",
      },
    ],
    program: [
      {
        day: { fr: "Jour 1 — Fondamentaux", en: "Day 1 — Fundamentals" },
        items: [
          {
            fr: "Anatomie appliquée et repérage échographique",
            en: "Applied anatomy and ultrasound landmarks",
          },
          { fr: "Atelier ponction guidée", en: "Guided puncture workshop" },
          { fr: "Débriefing vidéo individualisé", en: "Individual video debrief" },
        ],
      },
      {
        day: { fr: "Jour 2 — Pratique avancée", en: "Day 2 — Advanced practice" },
        items: [
          {
            fr: "Abords complexes sur modèle perfusé",
            en: "Complex access on perfused model",
          },
          {
            fr: "Gestion de crise hémorragique",
            en: "Haemorrhagic crisis management",
          },
          {
            fr: "Simulation en binôme superviseur / apprenant",
            en: "Supervisor / trainee paired simulation",
          },
        ],
      },
      {
        day: { fr: "Jour 3 — Évaluation", en: "Day 3 — Assessment" },
        items: [
          { fr: "Cas intégratifs", en: "Integrative cases" },
          { fr: "Évaluation certifiante", en: "Certifying assessment" },
          {
            fr: "Plan de progression personnalisé",
            en: "Personalized progression plan",
          },
        ],
      },
    ],
    supervisors: [
      {
        name: "Dr. A. Lefèvre",
        role: { fr: "Chirurgien vasculaire, CHU", en: "Vascular surgeon, University Hospital" },
      },
      {
        name: "Pr. M. Costa",
        role: {
          fr: "Superviseur réseau Gepromed (Europe)",
          en: "Gepromed network supervisor (Europe)",
        },
      },
    ],
  },
  {
    slug: "phaco-initiation-2026-11",
    title: {
      fr: "Phacoémulsification — initiation supervisée",
      en: "Phacoemulsification — supervised foundation",
    },
    specialty: "ophthalmology",
    level: "Initiation",
    audience: "France",
    city: "Lyon",
    venue: {
      fr: "Centre de simulation ophtalmologique",
      en: "Ophthalmology simulation center",
    },
    startDate: "2026-11-12",
    endDate: "2026-11-13",
    durationDays: 2,
    priceEUR: 1750,
    depositEUR: 450,
    capacity: 12,
    enrolled: 12,
    qualiopi: true,
    summary: {
      fr: "Parcours d'initiation à la phacoémulsification sur simulateur et œil de synthèse, encadré par des superviseurs experts.",
      en: "A foundation pathway in phacoemulsification on simulator and synthetic eye, led by expert supervisors.",
    },
    objectives: [
      {
        fr: "Maîtriser les étapes clés de la phaco",
        en: "Master the key steps of phaco",
      },
      {
        fr: "Développer la coordination bi-manuelle",
        en: "Develop bi-manual coordination",
      },
      {
        fr: "Reconnaître et prévenir les complications précoces",
        en: "Recognize and prevent early complications",
      },
    ],
    program: [
      {
        day: { fr: "Jour 1", en: "Day 1" },
        items: [
          {
            fr: "Théorie condensée et réglages machine",
            en: "Condensed theory and machine settings",
          },
          { fr: "Capsulorhexis sur simulateur", en: "Capsulorhexis on simulator" },
          { fr: "Hydrodissection guidée", en: "Guided hydrodissection" },
        ],
      },
      {
        day: { fr: "Jour 2", en: "Day 2" },
        items: [
          { fr: "Émulsification du noyau", en: "Nucleus emulsification" },
          { fr: "Gestion des complications", en: "Complication management" },
          { fr: "Évaluation et certificat", en: "Assessment and certificate" },
        ],
      },
    ],
    supervisors: [
      {
        name: "Dr. S. Benali",
        role: {
          fr: "Ophtalmologue, praticien hospitalier",
          en: "Ophthalmologist, hospital practitioner",
        },
      },
    ],
  },
  {
    slug: "endovasculaire-aortique-2027-02",
    title: {
      fr: "Techniques endovasculaires aortiques",
      en: "Aortic endovascular techniques",
    },
    specialty: "vascular",
    level: "Expert",
    audience: "Europe",
    city: "Strasbourg",
    venue: { fr: "Institut Gepromed — Salle hybride", en: "Gepromed Institute — Hybrid room" },
    startDate: "2027-02-04",
    endDate: "2027-02-06",
    durationDays: 3,
    priceEUR: 2950,
    depositEUR: 750,
    capacity: 14,
    enrolled: 5,
    qualiopi: true,
    summary: {
      fr: "Programme expert dédié aux endoprothèses aortiques, du planning 3D à la simulation per-procédurale.",
      en: "An expert program dedicated to aortic stent-grafts, from 3D planning to intra-procedural simulation.",
    },
    objectives: [
      {
        fr: "Planifier une EVAR à partir de l'imagerie 3D",
        en: "Plan an EVAR from 3D imaging",
      },
      {
        fr: "Déployer une endoprothèse en simulation",
        en: "Deploy a stent-graft in simulation",
      },
      {
        fr: "Anticiper les endofuites et leur prise en charge",
        en: "Anticipate endoleaks and their management",
      },
    ],
    program: [
      {
        day: { fr: "Jour 1", en: "Day 1" },
        items: [
          { fr: "Planning 3D", en: "3D planning" },
          { fr: "Sizing et choix du matériel", en: "Sizing and device selection" },
        ],
      },
      {
        day: { fr: "Jour 2", en: "Day 2" },
        items: [
          { fr: "Simulation de déploiement", en: "Deployment simulation" },
          { fr: "Gestion des endofuites", en: "Endoleak management" },
        ],
      },
      {
        day: { fr: "Jour 3", en: "Day 3" },
        items: [
          { fr: "Cas complexes", en: "Complex cases" },
          { fr: "Évaluation certifiante", en: "Certifying assessment" },
        ],
      },
    ],
    supervisors: [
      {
        name: "Pr. M. Costa",
        role: {
          fr: "Superviseur réseau Gepromed (Europe)",
          en: "Gepromed network supervisor (Europe)",
        },
      },
      {
        name: "Dr. K. Moreau",
        role: {
          fr: "Chirurgien vasculaire endovasculaire",
          en: "Endovascular vascular surgeon",
        },
      },
    ],
  },
  // ---- Past sessions (with proof / outcomes) ----
  {
    slug: "abord-vasculaire-peripherique-2026-03",
    title: {
      fr: "Abord vasculaire périphérique — module avancé",
      en: "Peripheral vascular access — advanced module",
    },
    specialty: "vascular",
    level: "Advanced",
    audience: "Europe",
    city: "Strasbourg",
    venue: strasbourgVenue,
    startDate: "2026-03-18",
    endDate: "2026-03-20",
    durationDays: 3,
    priceEUR: 2400,
    depositEUR: 600,
    capacity: 16,
    enrolled: 16,
    qualiopi: true,
    summary: {
      fr: "Session complète encadrée par le réseau de superviseurs vasculaires Gepromed.",
      en: "A full session led by the Gepromed vascular supervisors network.",
    },
    objectives: [
      {
        fr: "Sécuriser les abords vasculaires complexes",
        en: "Secure complex vascular access",
      },
      {
        fr: "Gérer les complications en simulation",
        en: "Manage complications in simulation",
      },
    ],
    program: [
      {
        day: { fr: "Jour 1", en: "Day 1" },
        items: [
          { fr: "Fondamentaux", en: "Fundamentals" },
          { fr: "Atelier ponction", en: "Puncture workshop" },
        ],
      },
      {
        day: { fr: "Jour 2", en: "Day 2" },
        items: [{ fr: "Pratique avancée", en: "Advanced practice" }],
      },
      {
        day: { fr: "Jour 3", en: "Day 3" },
        items: [{ fr: "Évaluation certifiante", en: "Certifying assessment" }],
      },
    ],
    supervisors: [
      {
        name: "Dr. A. Lefèvre",
        role: { fr: "Chirurgien vasculaire, CHU", en: "Vascular surgeon, University Hospital" },
      },
    ],
    satisfaction: 97,
    passRate: 100,
    photos: 42,
  },
  {
    slug: "phaco-initiation-2026-01",
    title: {
      fr: "Phacoémulsification — initiation supervisée",
      en: "Phacoemulsification — supervised foundation",
    },
    specialty: "ophthalmology",
    level: "Initiation",
    audience: "France",
    city: "Lyon",
    venue: {
      fr: "Centre de simulation ophtalmologique",
      en: "Ophthalmology simulation center",
    },
    startDate: "2026-01-29",
    endDate: "2026-01-30",
    durationDays: 2,
    priceEUR: 1750,
    depositEUR: 450,
    capacity: 12,
    enrolled: 12,
    qualiopi: true,
    summary: {
      fr: "Première session 2026 d'initiation à la phaco.",
      en: "First 2026 phaco foundation session.",
    },
    objectives: [
      { fr: "Maîtriser les étapes clés", en: "Master the key steps" },
      { fr: "Coordination bi-manuelle", en: "Bi-manual coordination" },
    ],
    program: [
      {
        day: { fr: "Jour 1", en: "Day 1" },
        items: [
          { fr: "Capsulorhexis", en: "Capsulorhexis" },
          { fr: "Hydrodissection", en: "Hydrodissection" },
        ],
      },
      {
        day: { fr: "Jour 2", en: "Day 2" },
        items: [
          { fr: "Émulsification", en: "Emulsification" },
          { fr: "Évaluation", en: "Assessment" },
        ],
      },
    ],
    supervisors: [
      {
        name: "Dr. S. Benali",
        role: {
          fr: "Ophtalmologue, praticien hospitalier",
          en: "Ophthalmologist, hospital practitioner",
        },
      },
    ],
    satisfaction: 94,
    passRate: 92,
    photos: 28,
  },
];

export function isUpcoming(t: TrainingSession, now = new Date()): boolean {
  return new Date(t.startDate) >= now;
}

export function getTraining(slug: string): TrainingSession | undefined {
  return trainings.find((t) => t.slug === slug);
}

export function spotsLeft(t: TrainingSession): number {
  return Math.max(0, t.capacity - t.enrolled);
}

export function formatDateRange(start: string, end: string, lang: Lang): string {
  const locale = lang === "fr" ? "fr-FR" : "en-GB";
  const s = new Date(start);
  const e = new Date(end);
  const fmt = (d: Date) =>
    d.toLocaleDateString(locale, { day: "numeric", month: "long" });
  const year = e.getFullYear();
  if (s.getMonth() === e.getMonth() && s.getDate() === e.getDate()) {
    return `${fmt(s)} ${year}`;
  }
  return `${s.toLocaleDateString(locale, { day: "numeric", month: "long" })} – ${fmt(e)} ${year}`;
}

export function euro(n: number, lang: Lang): string {
  return n.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}
