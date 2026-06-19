"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { useLang } from "@/lib/i18n";

export default function TeamPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  // Names sourced from the gepromed.com homepage copy (specialty leads).
  const committee = ["Pr. Bourcier", "Pr. Ehlinger", "Pr. Liverneaux", "Pr. Proust", "Pr. Cebula", "Pr. Romain"];

  const poles = [
    tx("Chirurgie vasculaire", "Vascular surgery"),
    tx("Ophtalmologie", "Ophthalmology"),
    tx("Orthopédie", "Orthopedics"),
    tx("Chirurgie de la main", "Hand surgery"),
    tx("Neurochirurgie", "Neurosurgery"),
    tx("Chirurgie digestive", "Digestive surgery"),
    tx("Urologie", "Urology"),
    tx("Gynécologie", "Gynecology"),
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "L'équipe Gepromed", en: "Gepromed Team" }}
      intro={{
        fr: "Gepromed s'appuie sur une équipe permanente et un comité scientifique pluridisciplinaire qui réunit des praticiens hospitalo-universitaires de référence.",
        en: "Gepromed relies on a permanent team and a multidisciplinary scientific committee bringing together leading hospital-university practitioners.",
      }}
    >
      <Prose>
        <p>
          {tx(
            "Depuis ses origines en 1993, Gepromed fédère chirurgiens, ingénieurs et chercheurs autour d'un objectif commun : la sécurité du patient à travers la maîtrise des dispositifs médicaux et la formation par la pratique.",
            "Since its origins in 1993, Gepromed has brought together surgeons, engineers and researchers around a common goal: patient safety through medical-device mastery and hands-on training.",
          )}
        </p>
      </Prose>

      <h2 className="mt-10 text-2xl">{tx("Comité scientifique", "Scientific committee")}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {committee.map((name) => (
          <div key={name} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 font-semibold text-brand-700">
              {name.split(" ").slice(-1)[0][0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="text-xs text-ink-muted">{tx("Membre du comité scientifique", "Scientific committee member")}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl">{tx("Pôles d'expertise", "Areas of expertise")}</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {poles.map((p) => (
          <span key={p} className="pill bg-slate-100 text-ink-soft">{p}</span>
        ))}
      </div>

      <p className="mt-10 rounded-xl bg-brand-50/60 px-4 py-3 text-sm text-ink-soft">
        {tx(
          "Les profils détaillés de l'équipe opérationnelle (direction, coordination des formations, qualité, recherche) sont présentés sur la page officielle de l'équipe.",
          "Detailed profiles of the operational team (management, training coordination, quality, research) are presented on the official team page.",
        )}
      </p>
    </DocPage>
  );
}
