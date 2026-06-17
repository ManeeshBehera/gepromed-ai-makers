"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "fr" | "en";

export type L = { fr: string; en: string };

export function loc(value: L, lang: Lang): string {
  return value[lang];
}

const KEY = "gepromed.lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LanguageContext = createContext<Ctx>({
  lang: "fr",
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem(KEY) as Lang | null;
    if (saved === "fr" || saved === "en") setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(KEY, l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "fr" ? "en" : "fr"),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

// UI string dictionary. `t(key)` returns the string in the active language.
const DICT = {
  "nav.trainings": { fr: "Formations", en: "Trainings" },
  "nav.about": { fr: "À propos", en: "About" },
  "nav.dashboard": { fr: "Espace organisateur", en: "Organizer space" },
  "nav.contact": { fr: "Contact", en: "Contact" },
  "nav.register": { fr: "S'inscrire", en: "Register" },

  "common.details": { fr: "Détails", en: "Details" },
  "common.register": { fr: "S'inscrire", en: "Register" },
  "common.viewAll": { fr: "Tout voir", en: "View all" },
  "common.spotsLeft": { fr: "place(s) restante(s)", en: "spot(s) left" },
  "common.full": { fr: "Complet", en: "Full" },
  "common.past": { fr: "Session passée", en: "Past session" },
  "common.perParticipant": { fr: "/ participant", en: "/ participant" },
  "common.loading": { fr: "Chargement…", en: "Loading…" },

  "footer.tagline": {
    fr: "Plateforme de référence pour la formation chirurgicale en chirurgie vasculaire et ophtalmologie. Formations pratiques, supervisées et certifiées, en France et en Europe.",
    en: "The reference platform for hands-on surgical training in vascular surgery and ophthalmology. Practical, supervised and certified programs, in France and across Europe.",
  },
  "footer.qualiopi": { fr: "Certifié Qualiopi", en: "Qualiopi certified" },
  "footer.network": {
    fr: "Réseau européen de superviseurs",
    en: "European network of supervisors",
  },
  "footer.navigation": { fr: "Navigation", en: "Navigation" },
  "footer.contact": { fr: "Contact", en: "Contact" },
  "footer.legal": {
    fr: "Mentions légales · Politique RGPD · Indicateurs Qualiopi",
    en: "Legal notice · GDPR policy · Qualiopi indicators",
  },
  "footer.rights": {
    fr: "Gepromed. Démo — refonte & rebranding.",
    en: "Gepromed. Demo — redesign & rebranding.",
  },

  "home.eyebrow": {
    fr: "Chirurgie vasculaire · Ophtalmologie · Simulation",
    en: "Vascular surgery · Ophthalmology · Simulation",
  },
  "home.title": {
    fr: "Former les chirurgiens de demain, geste après geste.",
    en: "Training tomorrow's surgeons, one gesture at a time.",
  },
  "home.subtitle": {
    fr: "Gepromed est la plateforme de référence pour la formation chirurgicale pratique et supervisée — en France et bientôt dans toute l'Europe.",
    en: "Gepromed is the reference platform for hands-on, supervised surgical training — in France and soon across Europe.",
  },
  "home.ctaTrainings": { fr: "Voir les formations", en: "Browse trainings" },
  "home.ctaMission": { fr: "Notre mission", en: "Our mission" },
  "home.statTrained": { fr: "praticiens formés", en: "practitioners trained" },
  "home.statSat": { fr: "satisfaction moyenne", en: "average satisfaction" },
  "home.statSup": { fr: "superviseurs experts", en: "expert supervisors" },
  "home.nextSession": { fr: "Prochaine session", en: "Next session" },
  "home.book": { fr: "Réserver ma place", en: "Book my seat" },
  "home.trustQualiopi": { fr: "Certifié Qualiopi", en: "Qualiopi certified" },
  "home.trust1": {
    fr: "Plateaux techniques haute-fidélité",
    en: "High-fidelity technical platforms",
  },
  "home.trust2": {
    fr: "Encadrement par superviseurs experts",
    en: "Guidance by expert supervisors",
  },
  "home.trust3": { fr: "Certificats reconnus", en: "Recognized certificates" },
  "home.specialtiesTitle": {
    fr: "Trois domaines d'excellence",
    en: "Three areas of excellence",
  },
  "home.specialtiesSub": {
    fr: "Des parcours conçus avec des sociétés savantes et des praticiens hospitaliers, du geste fondamental à l'expertise.",
    en: "Programs designed with learned societies and hospital practitioners, from fundamental gestures to expertise.",
  },
  "home.upcomingTitle": { fr: "Prochaines formations", en: "Upcoming trainings" },
  "home.upcomingSub": {
    fr: "Réservez votre place — les sessions sont à effectifs limités.",
    en: "Book your seat — sessions have limited capacity.",
  },
  "home.ctaTitle": {
    fr: "Une demande de formation pour votre équipe ?",
    en: "A training request for your team?",
  },
  "home.ctaSub": {
    fr: "Nous construisons des sessions sur-mesure pour les hôpitaux, cliniques et industriels. Parlons de votre projet pédagogique.",
    en: "We build tailor-made sessions for hospitals, clinics and industry. Let's talk about your educational project.",
  },
  "home.ctaContact": { fr: "Nous contacter", en: "Contact us" },
  "home.ctaRegister": {
    fr: "S'inscrire à une session",
    en: "Register for a session",
  },

  "trainings.title": { fr: "Catalogue des formations", en: "Training catalogue" },
  "trainings.subtitle": {
    fr: "Des formations pratiques et certifiées, encadrées par notre réseau de superviseurs experts. Filtrez par spécialité et distinguez les sessions à venir des sessions passées.",
    en: "Practical, certified trainings led by our network of expert supervisors. Filter by specialty and tell upcoming sessions apart from past ones.",
  },
  "trainings.upcoming": { fr: "À venir", en: "Upcoming" },
  "trainings.pastTab": { fr: "Passées", en: "Past" },
  "trainings.all": { fr: "Toutes", en: "All" },
  "trainings.empty": {
    fr: "Aucune formation ne correspond à ces filtres pour le moment.",
    en: "No training matches these filters for now.",
  },

  "detail.back": { fr: "← Toutes les formations", en: "← All trainings" },
  "detail.audience": { fr: "Public", en: "Audience" },
  "detail.level": { fr: "Niveau", en: "Level" },
  "detail.intro": { fr: "Présentation", en: "Overview" },
  "detail.objectives": { fr: "Objectifs pédagogiques", en: "Learning objectives" },
  "detail.program": { fr: "Programme", en: "Program" },
  "detail.supervisors": { fr: "Encadrement", en: "Supervisors" },
  "detail.results": { fr: "Résultats de la session", en: "Session results" },
  "detail.satisfaction": { fr: "Satisfaction", en: "Satisfaction" },
  "detail.passRate": { fr: "Réussite", en: "Pass rate" },
  "detail.photos": { fr: "Photos", en: "Photos" },
  "detail.deposit": { fr: "Acompte de", en: "Deposit of" },
  "detail.toBook": { fr: "pour réserver.", en: "to book." },
  "detail.dates": { fr: "Dates", en: "Dates" },
  "detail.duration": { fr: "Durée", en: "Duration" },
  "detail.days": { fr: "jours", en: "days" },
  "detail.place": { fr: "Lieu", en: "Location" },
  "detail.availability": { fr: "Disponibilité", en: "Availability" },
  "detail.registerThis": {
    fr: "S'inscrire à cette session",
    en: "Register for this session",
  },
  "detail.full": { fr: "Session complète", en: "Session full" },
  "detail.seeUpcoming": {
    fr: "Voir les sessions à venir",
    en: "See upcoming sessions",
  },
  "detail.noEngagement": {
    fr: "Inscription sans engagement — confirmée après acompte et contrat.",
    en: "No-commitment registration — confirmed after deposit and contract.",
  },

  // Registration flow
  "reg.title": { fr: "Inscription à une formation", en: "Training registration" },
  "reg.subtitle": {
    fr: "Réservez votre place sans engagement. Votre demande est enregistrée comme lead ; la place est confirmée après acompte et signature du contrat.",
    en: "Reserve your seat with no commitment. Your request is saved as a lead; the seat is confirmed after deposit and contract signature.",
  },
  "reg.session": { fr: "Session", en: "Session" },
  "reg.chooseSession": { fr: "Choisir une session", en: "Choose a session" },
  "reg.participant": { fr: "Vos informations", en: "Your details" },
  "reg.firstName": { fr: "Prénom", en: "First name" },
  "reg.lastName": { fr: "Nom", en: "Last name" },
  "reg.email": { fr: "E-mail", en: "Email" },
  "reg.phone": { fr: "Téléphone", en: "Phone" },
  "reg.profession": { fr: "Profession", en: "Profession" },
  "reg.institution": { fr: "Établissement", en: "Institution" },
  "reg.country": { fr: "Pays", en: "Country" },
  "reg.logistics": { fr: "Logistique & accès", en: "Logistics & access" },
  "reg.dietary": {
    fr: "Régime / restrictions alimentaires",
    en: "Dietary needs / restrictions",
  },
  "reg.arrival": { fr: "Arrivée prévue", en: "Planned arrival" },
  "reg.accommodation": {
    fr: "J'ai besoin d'un hébergement",
    en: "I need accommodation",
  },
  "reg.elearning": {
    fr: "Activer l'accès e-learning préparatoire",
    en: "Enable preparatory e-learning access",
  },
  "reg.notes": { fr: "Note pour l'organisateur", en: "Note for the organizer" },
  "reg.submit": { fr: "Envoyer ma demande", en: "Submit my request" },
  "reg.submitting": { fr: "Envoi…", en: "Submitting…" },
  "reg.required": { fr: "Champ requis", en: "Required field" },
  "reg.successTitle": { fr: "Demande enregistrée !", en: "Request saved!" },
  "reg.successBody": {
    fr: "Nous avons bien reçu votre demande. Notre équipe vous recontacte pour finaliser l'acompte et le contrat.",
    en: "We have received your request. Our team will contact you to finalize the deposit and contract.",
  },
  "reg.yourRef": { fr: "Votre référence", en: "Your reference" },
  "reg.nextSteps": { fr: "Prochaines étapes", en: "Next steps" },
  "reg.step1": {
    fr: "Confirmation de votre demande par e-mail.",
    en: "Confirmation of your request by email.",
  },
  "reg.step2": {
    fr: "Versement de l'acompte pour réserver la place.",
    en: "Deposit payment to reserve the seat.",
  },
  "reg.step3": {
    fr: "Signature du contrat de formation.",
    en: "Training contract signature.",
  },
  "reg.viewDashboard": {
    fr: "Voir dans l'espace organisateur",
    en: "View in the organizer space",
  },
  "reg.newRequest": { fr: "Nouvelle demande", en: "New request" },
  "reg.selectPlaceholder": {
    fr: "— Sélectionner —",
    en: "— Select —",
  },

  // Dashboard
  "dash.title": { fr: "Espace organisateur", en: "Organizer space" },
  "dash.subtitle": {
    fr: "Suivi des inscriptions et des leads avant paiement. Visibilité complète sur le pipeline : lead → acompte → contrat → confirmé.",
    en: "Tracking of registrations and pre-payment leads. Full pipeline visibility: lead → deposit → contract → confirmed.",
  },
  "dash.total": { fr: "Demandes", en: "Requests" },
  "dash.leads": { fr: "Leads à suivre", en: "Leads to follow up" },
  "dash.confirmed": { fr: "Confirmés", en: "Confirmed" },
  "dash.revenue": { fr: "Acomptes potentiels", en: "Potential deposits" },
  "dash.participant": { fr: "Participant", en: "Participant" },
  "dash.sessionCol": { fr: "Session", en: "Session" },
  "dash.statusCol": { fr: "Statut", en: "Status" },
  "dash.logisticsCol": { fr: "Logistique", en: "Logistics" },
  "dash.actions": { fr: "Suivi", en: "Follow-up" },
  "dash.empty": {
    fr: "Aucune inscription pour le moment. Remplissez le formulaire d'inscription pour voir le pipeline se remplir.",
    en: "No registrations yet. Fill in the registration form to see the pipeline populate.",
  },
  "dash.addFollowUp": { fr: "Ajouter un suivi", en: "Add follow-up" },
  "dash.followUpPlaceholder": {
    fr: "Note de suivi (appel, e-mail, relance…)",
    en: "Follow-up note (call, email, reminder…)",
  },
  "dash.save": { fr: "Enregistrer", en: "Save" },
  "dash.advance": { fr: "Étape suivante", en: "Next stage" },
  "dash.refresh": { fr: "Actualiser", en: "Refresh" },
  "dash.demoNote": {
    fr: "Données partagées et persistées côté serveur (démo).",
    en: "Shared, server-persisted data (demo).",
  },

  // About
  "about.title": { fr: "Notre mission", en: "Our mission" },
  "about.lead": {
    fr: "Devenir la plateforme de référence en France puis en Europe pour la formation chirurgicale en chirurgie vasculaire, ophtalmologie et autres spécialités.",
    en: "To become the reference platform in France and then Europe for surgical training in vascular surgery, ophthalmology and other specialties.",
  },
  "about.storyTitle": { fr: "De GEPROVAS à Gepromed", en: "From GEPROVAS to Gepromed" },
  "about.story": {
    fr: "Né de l'expertise vasculaire de Strasbourg, Gepromed est devenu un hub de la sécurité des dispositifs médicaux et de la formation chirurgicale. Notre approche conjugue plateaux techniques haute-fidélité, encadrement par un réseau de superviseurs experts et exigence scientifique.",
    en: "Born from Strasbourg's vascular expertise, Gepromed has grown into a hub for medical-device safety and surgical training. Our approach combines high-fidelity technical platforms, guidance from a network of expert supervisors, and scientific rigor.",
  },
  "about.qualiopiTitle": { fr: "Qualité & Qualiopi", en: "Quality & Qualiopi" },
  "about.qualiopi": {
    fr: "Nos formations sont certifiées Qualiopi. Les indicateurs de satisfaction, taux de réussite et preuves de formation sont publiés pour chaque session.",
    en: "Our trainings are Qualiopi certified. Satisfaction indicators, pass rates and training evidence are published for every session.",
  },
  "about.valuesTitle": { fr: "Nos valeurs", en: "Our values" },

  // Contact
  "contact.title": { fr: "Contact", en: "Contact" },
  "contact.subtitle": {
    fr: "Une question sur une formation, une demande sur-mesure ou un partenariat ? Écrivez-nous.",
    en: "A question about a training, a tailor-made request or a partnership? Get in touch.",
  },
  "contact.name": { fr: "Nom complet", en: "Full name" },
  "contact.email": { fr: "E-mail", en: "Email" },
  "contact.subject": { fr: "Sujet", en: "Subject" },
  "contact.message": { fr: "Message", en: "Message" },
  "contact.send": { fr: "Envoyer", en: "Send" },
  "contact.sent": {
    fr: "Merci ! Votre message a bien été envoyé.",
    en: "Thank you! Your message has been sent.",
  },
  "contact.address": { fr: "Adresse", en: "Address" },
} as const;

export type DictKey = keyof typeof DICT;

export function useT() {
  const { lang } = useLang();
  return useCallback((key: DictKey) => DICT[key][lang], [lang]);
}
