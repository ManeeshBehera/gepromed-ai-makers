"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang, useT, loc } from "@/lib/i18n";
import {
  VersionSwitcher,
  HeroSplit,
  HeroImage,
  HeroBold,
  type HomeVersion,
} from "@/components/HomeHeroes";
import { TrainingsExplorer } from "@/components/TrainingsExplorer";
import { Accordion } from "@/components/ui/Accordion";
import { IMPLANT_CYCLE, FAQ, TESTIMONIALS, PARTNERS, HISTORY } from "@/lib/content";

const VKEY = "gepromed.homeVersion";

export default function HomePage() {
  const { lang } = useLang();
  const t = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const [v, setVState] = useState<HomeVersion>(1);
  useEffect(() => {
    const saved = Number(window.localStorage.getItem(VKEY));
    if (saved === 1 || saved === 2 || saved === 3) setVState(saved);
  }, []);
  const setV = (n: HomeVersion) => {
    setVState(n);
    window.localStorage.setItem(VKEY, String(n));
  };

  const specialties = [
    {
      t: tx("Chirurgie vasculaire", "Vascular surgery"),
      d: tx(
        "Abords périphériques, techniques endovasculaires, gestion des complications sur modèles perfusés.",
        "Peripheral access, endovascular techniques, complication management on perfused models.",
      ),
      i: "🩺",
    },
    {
      t: tx("Ophtalmologie", "Ophthalmology"),
      d: tx(
        "Phacoémulsification et gestes microchirurgicaux sur simulateurs et œil de synthèse.",
        "Phacoemulsification and microsurgical gestures on simulators and synthetic eyes.",
      ),
      i: "👁️",
    },
    {
      t: tx("Simulation & innovation", "Simulation & innovation"),
      d: tx(
        "Pédagogie par la simulation, débriefing vidéo et évaluation objective des compétences.",
        "Simulation-based pedagogy, video debriefing and objective skills assessment.",
      ),
      i: "🧪",
    },
  ];

  const why = [
    {
      i: "🏥",
      t: tx("Plateaux haute-fidélité", "High-fidelity platforms"),
      d: tx(
        "Salles hybrides, simulateurs et modèles perfusés au Centre d'Éducation eXplora à Strasbourg.",
        "Hybrid rooms, simulators and perfused models at the eXplora Education Center in Strasbourg.",
      ),
    },
    {
      i: "👥",
      t: tx("Réseau de superviseurs", "Supervisor network"),
      d: tx(
        "Un réseau européen de chirurgiens experts encadre chaque apprenant, geste après geste.",
        "A European network of expert surgeons guides every trainee, gesture after gesture.",
      ),
    },
    {
      i: "✅",
      t: tx("Certifié Qualiopi", "Qualiopi certified"),
      d: tx(
        "Indicateurs de satisfaction, taux de réussite et preuves publiés pour chaque session.",
        "Satisfaction indicators, pass rates and evidence published for every session.",
      ),
    },
    {
      i: "🔬",
      t: tx("Ancré dans la recherche", "Rooted in research"),
      d: tx(
        "30 ans d'analyse d'explants et plus de 20 études cliniques nourrissent la pédagogie.",
        "30 years of explant analysis and 20+ clinical studies feed the pedagogy.",
      ),
    },
  ];

  return (
    <>
      <VersionSwitcher v={v} setV={setV} />
      {v === 1 && <HeroSplit />}
      {v === 2 && <HeroImage />}
      {v === 3 && <HeroBold />}

      {/* Partners strip */}
      <section className="border-y border-slate-100 bg-white">
        <div className="container-page py-7">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {tx("Ils nous soutiennent", "They support us")}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PARTNERS.map((p) => (
              <span key={p} className="text-sm font-medium text-ink-soft/70">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Implant cycle */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="pill bg-brand-50 text-brand-700">
            {tx("Le cœur de Gepromed", "The heart of Gepromed")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl">
            {tx("Le cycle de l'implant", "The implant cycle")}
          </h2>
          <p className="mt-3 text-ink-muted">
            {tx(
              "Quatre niveaux qui structurent notre mission : de la formation du geste à la sécurité du patient.",
              "Four levels that structure our mission: from training the gesture to patient safety.",
            )}
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[...IMPLANT_CYCLE]
            .sort((a, b) => a.n.localeCompare(b.n))
            .map((c) => (
              <div
                key={c.n}
                className="group relative overflow-hidden rounded-2xl2 border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="absolute -right-2 -top-3 font-display text-6xl font-semibold text-brand-50">
                  {c.n}
                </span>
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                    {c.icon}
                  </div>
                  <h3 className="mt-4 text-lg">{loc(c.title, lang)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{loc(c.body, lang)}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Specialties */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl">{t("home.specialtiesTitle")}</h2>
            <p className="mt-3 text-ink-muted">{t("home.specialtiesSub")}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {specialties.map((s) => (
              <div key={s.t} className="card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl">
                  {s.i}
                </div>
                <h3 className="mt-4 text-lg">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured trainings — modern cards + in-page drawer */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl">{t("home.upcomingTitle")}</h2>
            <p className="mt-2 text-ink-muted">{t("home.upcomingSub")}</p>
          </div>
          <Link href="/trainings" className="btn-ghost hidden sm:inline-flex">
            {t("common.viewAll")}
          </Link>
        </div>
        <div className="mt-10">
          <TrainingsExplorer showFilters={false} limit={3} />
        </div>
      </section>

      {/* Why Gepromed */}
      <section className="bg-brand-900 py-20 text-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl text-white sm:text-4xl">
              {tx("Pourquoi se former chez Gepromed", "Why train with Gepromed")}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.t} className="rounded-2xl2 bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-3xl">{w.i}</div>
                <h3 className="mt-3 text-lg text-white">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-50/80">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History teaser */}
      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="pill bg-brand-50 text-brand-700">
              {tx("Depuis 1993", "Since 1993")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t("about.storyTitle")}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{t("about.story")}</p>
            <Link href="/about" className="btn-primary mt-6">
              {tx("Notre histoire complète", "Our full history")}
            </Link>
          </div>
          <ol className="relative space-y-6 border-l-2 border-brand-100 pl-6">
            {HISTORY.slice(0, 4).map((h) => (
              <li key={h.year} className="relative">
                <span className="absolute -left-[31px] grid h-5 w-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                  •
                </span>
                <p className="text-sm font-bold text-brand-700">{h.year}</p>
                <p className="font-medium text-ink">{loc(h.title, lang)}</p>
                <p className="mt-1 text-sm text-ink-soft">{loc(h.body, lang)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl">
              {tx("Ce qu'en disent les praticiens", "What practitioners say")}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((tm) => (
              <figure key={tm.name} className="card flex flex-col p-6">
                <div className="text-3xl leading-none text-brand-200">&ldquo;</div>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {loc(tm.quote, lang)}
                </blockquote>
                <figcaption className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-sm font-semibold text-ink">{tm.name}</p>
                  <p className="text-xs text-ink-muted">{loc(tm.role, lang)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page max-w-3xl py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl">FAQ</h2>
          <p className="mt-2 text-ink-muted">
            {tx(
              "Les réponses aux questions les plus fréquentes.",
              "Answers to the most common questions.",
            )}
          </p>
        </div>
        <div className="mt-10">
          <Accordion
            allowMultiple
            items={FAQ.map((f) => ({ title: loc(f.q, lang), content: loc(f.a, lang) }))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="rounded-2xl2 bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-14 text-center text-white sm:px-16">
          <h2 className="text-3xl text-white">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50/85">{t("home.ctaSub")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-accent">{t("home.ctaContact")}</Link>
            <Link href="/register" className="btn border border-white/30 text-white hover:bg-white/10">
              {t("home.ctaRegister")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
