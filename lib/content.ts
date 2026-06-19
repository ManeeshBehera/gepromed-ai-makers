import type { L } from "./i18n";

/* History — grounded in the real Gepromed homepage copy:
   work initiated 1993, 2020 expansion across specialties (Profs Bourcier,
   Ehlinger, Liverneaux, Proust, Cebula, Romain), 2022 GEPROVAS → Gepromed. */
export const HISTORY: { year: string; title: L; body: L }[] = [
  {
    year: "1993",
    title: { fr: "Les origines — GEPROVAS", en: "The origins — GEPROVAS" },
    body: {
      fr: "Le travail initié en 1993 autour de l'analyse des explants vasculaires pose les fondations d'une expertise unique en sécurité des dispositifs médicaux à Strasbourg.",
      en: "The work initiated in 1993 around vascular explant analysis lays the foundations of a unique expertise in medical-device safety in Strasbourg.",
    },
  },
  {
    year: "2018",
    title: { fr: "Montée en puissance de la formation", en: "Scaling up training" },
    body: {
      fr: "La formation des professionnels de santé s'industrialise : plus de 1 150 praticiens formés depuis 2018 sur des plateaux techniques dédiés.",
      en: "Training of healthcare professionals scales up: more than 1,150 practitioners trained since 2018 on dedicated technical platforms.",
    },
  },
  {
    year: "2020",
    title: { fr: "Élargissement aux spécialités", en: "Expansion across specialties" },
    body: {
      fr: "Des activités de formation, de R&D et d'analyse d'explants sont organisées avec les équipes d'ophtalmologie, d'orthopédie, de chirurgie de la main, de neurochirurgie, digestive, urologique et gynécologique (Prs Bourcier, Ehlinger, Liverneaux, Proust, Cebula, Romain).",
      en: "Training, R&D and explant-analysis activities are organized with the ophthalmology, orthopedics, hand surgery, neurosurgery, digestive, urological and gynecological teams (Profs Bourcier, Ehlinger, Liverneaux, Proust, Cebula, Romain).",
    },
  },
  {
    year: "2022",
    title: { fr: "GEPROVAS devient Gepromed", en: "GEPROVAS becomes Gepromed" },
    body: {
      fr: "Le nouveau nom Gepromed affirme un lien fort avec l'histoire, donne de la visibilité aux dispositifs médicaux et structure l'identité autour des quatre niveaux du cycle de l'implant.",
      en: "The new name Gepromed asserts a strong link with history, gives visibility to medical devices and structures the identity around the four levels of the implant cycle.",
    },
  },
  {
    year: "2026",
    title: { fr: "Cap sur l'Europe", en: "Heading for Europe" },
    body: {
      fr: "Soutenu par les collectivités locales et des fonds européens, Gepromed déploie son modèle de formation supervisée de Strasbourg vers toute l'Europe.",
      en: "Supported by local authorities and European funds, Gepromed extends its supervised-training model from Strasbourg across Europe.",
    },
  },
];

export const IMPLANT_CYCLE: { n: string; title: L; body: L; icon: string }[] = [
  {
    n: "01",
    icon: "🎓",
    title: { fr: "Formation", en: "Training" },
    body: {
      fr: "Apprentissage du geste sur simulateurs et modèles, encadré par des superviseurs experts.",
      en: "Learning the gesture on simulators and models, guided by expert supervisors.",
    },
  },
  {
    n: "02",
    icon: "🔬",
    title: { fr: "Recherche & développement", en: "Research & development" },
    body: {
      fr: "Évaluation des dispositifs et innovation, en lien avec les industriels et les sociétés savantes.",
      en: "Device evaluation and innovation, alongside industry and learned societies.",
    },
  },
  {
    n: "04",
    icon: "🧪",
    title: { fr: "Analyse d'explants", en: "Explant analysis" },
    body: {
      fr: "Analyse des dispositifs explantés pour comprendre les défaillances et améliorer les pratiques.",
      en: "Analysis of explanted devices to understand failures and improve practice.",
    },
  },
  {
    n: "03",
    icon: "🛡️",
    title: { fr: "Sécurité du patient", en: "Patient safety" },
    body: {
      fr: "Le retour d'expérience nourrit l'amélioration continue de la sécurité des soins.",
      en: "Feedback feeds the continuous improvement of care safety.",
    },
  },
];

export const FAQ: { q: L; a: L }[] = [
  {
    q: { fr: "À qui s'adressent les formations Gepromed ?", en: "Who are Gepromed trainings for?" },
    a: {
      fr: "Aux internes, chefs de clinique, praticiens hospitaliers et chirurgiens séniors souhaitant acquérir ou perfectionner un geste en chirurgie vasculaire, endovasculaire ou ophtalmologique.",
      en: "Residents, fellows, hospital practitioners and senior surgeons who want to acquire or refine a gesture in vascular, endovascular or ophthalmic surgery.",
    },
  },
  {
    q: { fr: "Les formations sont-elles certifiées Qualiopi ?", en: "Are the trainings Qualiopi certified?" },
    a: {
      fr: "Oui. Gepromed est certifié Qualiopi. Pour chaque session, les indicateurs de satisfaction, les taux de réussite et les preuves de formation sont documentés et publiés.",
      en: "Yes. Gepromed is Qualiopi certified. For every session, satisfaction indicators, pass rates and training evidence are documented and published.",
    },
  },
  {
    q: { fr: "Comment fonctionne l'inscription ?", en: "How does registration work?" },
    a: {
      fr: "Vous envoyez une demande sans engagement : elle est enregistrée comme lead. La place est confirmée après versement de l'acompte puis signature du contrat de formation. Vous gardez la visibilité sur chaque étape.",
      en: "You submit a no-commitment request: it is saved as a lead. The seat is confirmed after the deposit is paid and the training contract is signed. You keep visibility at each step.",
    },
  },
  {
    q: { fr: "Un certificat est-il délivré ?", en: "Is a certificate issued?" },
    a: {
      fr: "Oui, un certificat de réalisation est délivré à l'issue de chaque formation validée, conformément aux exigences Qualiopi.",
      en: "Yes, a certificate of completion is issued at the end of every validated training, in line with Qualiopi requirements.",
    },
  },
  {
    q: { fr: "La logistique (repas, hébergement) est-elle prise en charge ?", en: "Is logistics (meals, accommodation) handled?" },
    a: {
      fr: "Les repas et le programme sont organisés par Gepromed. Vos contraintes alimentaires, votre arrivée et un éventuel besoin d'hébergement sont collectés au moment de l'inscription afin de tout préparer en amont.",
      en: "Meals and the program are organized by Gepromed. Your dietary constraints, arrival and any accommodation need are collected at registration so everything is prepared in advance.",
    },
  },
  {
    q: { fr: "Proposez-vous des sessions sur-mesure pour un établissement ?", en: "Do you offer tailor-made sessions for an institution?" },
    a: {
      fr: "Oui. Nous concevons des sessions dédiées pour les hôpitaux, cliniques et industriels, en français ou ouvertes à un public européen. Contactez-nous pour définir le projet pédagogique.",
      en: "Yes. We design dedicated sessions for hospitals, clinics and industry, in French or open to a European audience. Contact us to define the educational project.",
    },
  },
  {
    q: { fr: "Quelle est la politique d'annulation ?", en: "What is the cancellation policy?" },
    a: {
      fr: "Tant que l'acompte n'est pas versé, la demande reste un lead sans engagement. Les conditions d'annulation après confirmation sont précisées dans le contrat de formation.",
      en: "Until the deposit is paid, the request remains a no-commitment lead. Cancellation terms after confirmation are set out in the training contract.",
    },
  },
];

export const TESTIMONIALS: { quote: L; name: string; role: L }[] = [
  {
    quote: {
      fr: "Un format dense et concret : j'ai pratiqué des gestes que je n'aurais jamais osé tenter en bloc sans cette préparation.",
      en: "A dense, hands-on format: I practiced gestures I would never have dared attempt in the OR without this preparation.",
    },
    name: "Dr. Camille R.",
    role: { fr: "Chirurgien vasculaire, CHU", en: "Vascular surgeon, University Hospital" },
  },
  {
    quote: {
      fr: "L'encadrement par les superviseurs fait toute la différence. Le débriefing vidéo est redoutablement efficace.",
      en: "Guidance from the supervisors makes all the difference. The video debrief is remarkably effective.",
    },
    name: "Dr. Liam S.",
    role: { fr: "Fellow, ophtalmologie", en: "Fellow, ophthalmology" },
  },
  {
    quote: {
      fr: "Organisation impeccable, du programme aux repas. On se concentre uniquement sur l'apprentissage.",
      en: "Flawless organization, from the program to the meals. You focus only on learning.",
    },
    name: "Pr. M. Costa",
    role: { fr: "Superviseur réseau Gepromed", en: "Gepromed network supervisor" },
  },
];

export const PARTNERS: string[] = [
  "Université de Strasbourg",
  "Eurométropole de Strasbourg",
  "BioValley France",
  "HelpMeSee",
  "W.L. Gore & Associates",
  "Johnson & Johnson",
];
