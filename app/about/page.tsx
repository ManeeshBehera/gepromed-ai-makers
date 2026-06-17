"use client";

import Link from "next/link";
import { useLang, useT } from "@/lib/i18n";

export default function AboutPage() {
  const { lang } = useLang();
  const t = useT();

  const values =
    lang === "fr"
      ? [
          ["Sécurité du patient", "Au cœur de chaque formation et de chaque dispositif."],
          ["Rigueur scientifique", "Validation humaine et preuves pour chaque résultat."],
          ["Pratique supervisée", "Apprendre le geste auprès de superviseurs experts."],
          ["Ouverture européenne", "De Strasbourg vers toute l'Europe."],
        ]
      : [
          ["Patient safety", "At the heart of every training and every device."],
          ["Scientific rigor", "Human validation and evidence for every result."],
          ["Supervised practice", "Learn the gesture alongside expert supervisors."],
          ["European reach", "From Strasbourg to the whole of Europe."],
        ];

  const kpis: [string, string][] =
    lang === "fr"
      ? [
          ["+1150", "praticiens formés depuis 2018"],
          ["+150", "explants vasculaires reçus en 2023"],
          ["+20", "études de recherche clinique"],
        ]
      : [
          ["+1150", "practitioners trained since 2018"],
          ["+150", "vascular explants received in 2023"],
          ["+20", "clinical research studies"],
        ];

  return (
    <>
      <section className="bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-page py-16">
          <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
            Gepromed · Strasbourg
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl">
            {t("about.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-50/90">
            {t("about.lead")}
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl">{t("about.storyTitle")}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{t("about.story")}</p>

            <h2 className="mt-10 text-2xl">{t("about.qualiopiTitle")}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{t("about.qualiopi")}</p>

            <h2 className="mt-10 text-2xl">{t("about.valuesTitle")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {values.map(([title, desc]) => (
                <div key={title} className="card p-5">
                  <h3 className="text-base font-semibold text-brand-700">{title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="sticky top-24 space-y-4">
              {kpis.map(([n, l]) => (
                <div key={l} className="card p-5">
                  <p className="text-3xl font-semibold text-brand-700">{n}</p>
                  <p className="mt-1 text-sm text-ink-muted">{l}</p>
                </div>
              ))}
              <Link href="/trainings" className="btn-primary w-full">
                {t("home.ctaTrainings")}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
