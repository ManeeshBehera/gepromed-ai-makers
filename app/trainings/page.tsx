"use client";

import { TrainingsExplorer } from "@/components/TrainingsExplorer";
import { Accordion } from "@/components/ui/Accordion";
import { useLang, useT, loc } from "@/lib/i18n";
import { FAQ } from "@/lib/content";

export default function TrainingsPage() {
  const { lang } = useLang();
  const t = useT();

  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page py-14">
          <span className="pill bg-brand-100 text-brand-700">{t("home.eyebrow")}</span>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">{t("trainings.title")}</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">{t("trainings.subtitle")}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <TrainingsExplorer />
      </section>

      {/* SEO / content-heavy FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl">FAQ</h2>
          <p className="mt-2 text-ink-muted">
            {lang === "fr"
              ? "Tout ce qu'il faut savoir avant de réserver une formation."
              : "Everything you need to know before booking a training."}
          </p>
          <div className="mt-8">
            <Accordion
              allowMultiple
              items={FAQ.map((f) => ({
                title: loc(f.q, lang),
                content: loc(f.a, lang),
              }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
