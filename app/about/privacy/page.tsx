"use client";

import { DocPage } from "@/components/DocPage";
import { Accordion } from "@/components/ui/Accordion";
import { useLang } from "@/lib/i18n";

export default function PrivacyPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const sections = [
    {
      title: tx("Responsable du traitement", "Data controller"),
      content: tx(
        "Gepromed, association dont le siège est à Strasbourg, est responsable des traitements de données personnelles collectées via ce site.",
        "Gepromed, an association headquartered in Strasbourg, is responsible for the personal data processed via this site.",
      ),
    },
    {
      title: tx("Données collectées", "Data collected"),
      content: tx(
        "Lors d'une inscription, nous collectons les informations nécessaires au suivi de la demande : identité, coordonnées, profession, établissement et besoins logistiques.",
        "When registering, we collect the information needed to process the request: identity, contact details, profession, institution and logistical needs.",
      ),
    },
    {
      title: tx("Finalités", "Purposes"),
      content: tx(
        "Les données servent uniquement à la gestion des inscriptions, au suivi pédagogique et aux obligations légales liées à la formation (Qualiopi).",
        "Data is used only to manage registrations, for educational follow-up and for legal obligations related to training (Qualiopi).",
      ),
    },
    {
      title: tx("Vos droits", "Your rights"),
      content: tx(
        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Pour l'exercer, écrivez à formation@gepromed.com.",
        "Under the GDPR, you have the right to access, rectify, erase and object. To exercise it, write to formation@gepromed.com.",
      ),
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Politique de confidentialité", en: "Privacy policy" }}
      intro={{
        fr: "Nous traitons vos données personnelles dans le respect du RGPD et avec validation humaine.",
        en: "We process your personal data in compliance with the GDPR and with human validation.",
      }}
    >
      <Accordion allowMultiple items={sections} />
    </DocPage>
  );
}
