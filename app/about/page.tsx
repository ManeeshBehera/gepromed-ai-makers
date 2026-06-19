"use client";

import Link from "next/link";
import { useLang, useT, loc } from "@/lib/i18n";
import { Accordion } from "@/components/ui/Accordion";
import { HISTORY, IMPLANT_CYCLE, PARTNERS } from "@/lib/content";

export default function AboutPage() {
  const { lang } = useLang();
  const t = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const values = [
    [tx("Sécurité du patient", "Patient safety"), tx("Au cœur de chaque formation et de chaque dispositif.", "At the heart of every training and every device.")],
    [tx("Rigueur scientifique", "Scientific rigor"), tx("Validation humaine et preuves pour chaque résultat.", "Human validation and evidence for every result.")],
    [tx("Pratique supervisée", "Supervised practice"), tx("Apprendre le geste auprès de superviseurs experts.", "Learn the gesture alongside expert supervisors.")],
    [tx("Ouverture européenne", "European reach"), tx("De Strasbourg vers toute l'Europe.", "From Strasbourg to the whole of Europe.")],
  ];

  const kpis: [string, string][] = [
    ["+1150", tx("praticiens formés depuis 2018", "practitioners trained since 2018")],
    ["+150", tx("explants vasculaires reçus en 2023", "vascular explants received in 2023")],
    ["+20", tx("études de recherche clinique", "clinical research studies")],
  ];

  const moreSections = [
    {
      title: tx("Où nous trouver", "Where to find us"),
      content: tx(
        "Bureaux : Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg. Centre d'Éducation : Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg.",
        "Offices: Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg. Education Center: Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg.",
      ),
    },
    {
      title: tx("Gouvernance & financement", "Governance & funding"),
      content: tx(
        "Gepromed est soutenu par les collectivités locales, des fonds européens et des partenaires industriels du monde de la santé qui participent au financement d'équipements et aux activités.",
        "Gepromed is supported by local authorities, European funds and industrial partners from the healthcare world who help finance equipment and activities.",
      ),
    },
    {
      title: tx("Recherche & publications", "Research & publications"),
      content: tx(
        "Plus de 20 études cliniques et un programme continu d'analyse d'explants alimentent nos publications et la sécurité des dispositifs médicaux.",
        "More than 20 clinical studies and an ongoing explant-analysis program feed our publications and medical-device safety.",
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(50%_50%_at_85%_0%,white,transparent)]" />
        <div className="container-page relative py-20">
          <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">Gepromed · Strasbourg</span>
          <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl">{t("about.title")}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-50/90">{t("about.lead")}</p>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-6">
            {kpis.map(([n, l]) => (
              <div key={l}>
                <p className="text-3xl font-semibold text-white">{n}</p>
                <p className="text-xs text-brand-50/80">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + timeline */}
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{t("about.storyTitle")}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{t("about.story")}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {tx(
                "Le nom Gepromed, adopté en 2022, affirme un lien fort avec cette histoire tout en donnant de la visibilité aux dispositifs médicaux et à la recherche d'amélioration continue de la sécurité des soins.",
                "The name Gepromed, adopted in 2022, asserts a strong link with this history while giving visibility to medical devices and the pursuit of continuous improvement in care safety.",
              )}
            </p>
          </div>
          <ol className="relative space-y-7 border-l-2 border-brand-100 pl-7">
            {HISTORY.map((h) => (
              <li key={h.year} className="relative">
                <span className="absolute -left-[37px] grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                  {h.year.slice(2)}
                </span>
                <p className="text-sm font-bold text-brand-700">{h.year}</p>
                <p className="font-medium text-ink">{loc(h.title, lang)}</p>
                <p className="mt-1 text-sm text-ink-soft">{loc(h.body, lang)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Implant cycle */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <h2 className="text-3xl">{tx("Le cycle de l'implant", "The implant cycle")}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[...IMPLANT_CYCLE].sort((a, b) => a.n.localeCompare(b.n)).map((c) => (
              <div key={c.n} className="card p-6">
                <span className="text-sm font-semibold tracking-wider text-brand-600">{c.n}</span>
                <div className="mt-3 h-px w-10 bg-brand-200" />
                <h3 className="mt-4 text-lg">{loc(c.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{loc(c.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values + quality */}
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{t("about.valuesTitle")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {values.map(([title, desc]) => (
                <div key={title} className="card p-5">
                  <h3 className="text-base font-semibold text-brand-700">{title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl">{t("about.qualiopiTitle")}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{t("about.qualiopi")}</p>
            <div className="mt-6">
              <Accordion allowMultiple items={moreSections} />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-slate-50 py-16">
        <div className="container-page text-center">
          <h2 className="text-2xl">{tx("Partenaires & financeurs", "Partners & funders")}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {PARTNERS.map((p) => (
              <span key={p} className="text-sm font-medium text-ink-soft/70">{p}</span>
            ))}
          </div>
          <Link href="/trainings" className="btn-primary mt-10">{t("home.ctaTrainings")}</Link>
        </div>
      </section>
    </>
  );
}
