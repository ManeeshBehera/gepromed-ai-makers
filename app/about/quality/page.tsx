"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { Accordion } from "@/components/ui/Accordion";
import { useLang } from "@/lib/i18n";

export default function QualityPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const indicators: [string, string][] = [
    ["96%", tx("satisfaction moyenne", "average satisfaction")],
    ["+1150", tx("praticiens formés depuis 2018", "practitioners trained since 2018")],
    ["100%", tx("formations certifiantes", "certifying trainings")],
  ];

  const faq = [
    {
      title: tx("Qu'est-ce que la certification Qualiopi ?", "What is Qualiopi certification?"),
      content: tx(
        "Qualiopi atteste de la qualité du processus mis en œuvre par les prestataires d'actions de formation. Elle repose sur un référentiel national unique.",
        "Qualiopi attests to the quality of the process implemented by training providers. It is based on a single national framework.",
      ),
    },
    {
      title: tx("Comment sont suivis les indicateurs ?", "How are indicators tracked?"),
      content: tx(
        "Pour chaque session, nous collectons la satisfaction, les taux de réussite et les preuves de formation, revus par la responsable qualité avant publication.",
        "For each session we collect satisfaction, pass rates and training evidence, reviewed by the quality manager before publication.",
      ),
    },
    {
      title: tx("Vos formations sont-elles accessibles ?", "Are your trainings accessible?"),
      content: tx(
        "Nous étudions chaque situation de handicap afin d'adapter l'accueil et les conditions de formation. Contactez notre référent handicap.",
        "We review each disability situation to adapt reception and training conditions. Contact our accessibility officer.",
      ),
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Qualité", en: "Quality" }}
      intro={{
        fr: "Gepromed est certifié Qualiopi. La qualité et l'amélioration continue sont au cœur de notre démarche de formation.",
        en: "Gepromed is Qualiopi certified. Quality and continuous improvement are at the heart of our training approach.",
      }}
    >
      <div className="grid grid-cols-3 gap-4">
        {indicators.map(([n, l]) => (
          <div key={l} className="card p-5 text-center">
            <p className="text-3xl font-semibold text-brand-700">{n}</p>
            <p className="mt-1 text-xs text-ink-muted">{l}</p>
          </div>
        ))}
      </div>

      <Prose>
        <p className="mt-8">
          {tx(
            "Notre démarche qualité couvre la conception des programmes, l'encadrement par des superviseurs experts, l'évaluation des compétences et le suivi post-formation. Les indicateurs sont publiés pour chaque session.",
            "Our quality approach covers program design, supervision by expert mentors, skills assessment and post-training follow-up. Indicators are published for every session.",
          )}
        </p>
      </Prose>

      <h2 className="mt-10 text-2xl">{tx("Questions fréquentes", "Frequent questions")}</h2>
      <div className="mt-5">
        <Accordion allowMultiple items={faq} />
      </div>
    </DocPage>
  );
}
