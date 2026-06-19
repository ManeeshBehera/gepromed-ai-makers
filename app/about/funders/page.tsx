"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { useLang } from "@/lib/i18n";

export default function FundersPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const groups = [
    {
      t: tx("Institutions publiques", "Public institutions"),
      items: ["Eurométropole de Strasbourg", "Collectivité européenne d'Alsace", "Région Grand Est"],
    },
    {
      t: tx("Financements européens", "European funding"),
      items: ["FEDER", tx("Programmes européens de recherche", "European research programs")],
    },
    {
      t: tx("Partenaires académiques", "Academic partners"),
      items: ["Université de Strasbourg", tx("Fondation Université de Strasbourg", "University of Strasbourg Foundation"), "BioValley France"],
    },
    {
      t: tx("Partenaires industriels", "Industrial partners"),
      items: ["W.L. Gore & Associates", "Johnson & Johnson", "HelpMeSee"],
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Nos financeurs", en: "Our funders" }}
      intro={{
        fr: "Le développement de Gepromed est rendu possible par le soutien des collectivités locales, de fonds européens et de partenaires industriels du monde de la santé.",
        en: "Gepromed's development is made possible by the support of local authorities, European funds and industrial partners from the healthcare world.",
      }}
    >
      <Prose>
        <p>
          {tx(
            "Les collectivités locales ont affirmé leur volonté de soutenir ce développement. Des fonds européens sont également mobilisés. Divers partenaires industriels participent notamment par le financement d'équipements et la participation aux activités.",
            "Local authorities have affirmed their willingness to support this development. European funds are also mobilized. Various industrial partners contribute notably through equipment financing and participation in activities.",
          )}
        </p>
      </Prose>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.t} className="card p-6">
            <h2 className="text-lg">{g.t}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              {g.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
