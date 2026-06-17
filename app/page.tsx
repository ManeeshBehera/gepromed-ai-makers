"use client";

import Link from "next/link";
import { TrainingCard } from "@/components/TrainingCard";
import { trainings, isUpcoming } from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";

export default function HomePage() {
  const { lang } = useLang();
  const t = useT();
  const upcoming = trainings.filter((x) => isUpcoming(x)).slice(0, 3);
  const next = upcoming[0];

  const stats: [string, string][] = [
    ["+1150", lang === "fr" ? "praticiens formés depuis 2018" : "practitioners trained since 2018"],
    ["96%", t("home.statSat")],
    ["40+", t("home.statSup")],
  ];

  const specialties = [
    {
      t: lang === "fr" ? "Chirurgie vasculaire" : "Vascular surgery",
      d:
        lang === "fr"
          ? "Abords périphériques, techniques endovasculaires, gestion des complications sur modèles perfusés."
          : "Peripheral access, endovascular techniques, complication management on perfused models.",
      i: "🩺",
    },
    {
      t: lang === "fr" ? "Ophtalmologie" : "Ophthalmology",
      d:
        lang === "fr"
          ? "Phacoémulsification et gestes microchirurgicaux sur simulateurs et œil de synthèse."
          : "Phacoemulsification and microsurgical gestures on simulators and synthetic eyes.",
      i: "👁️",
    },
    {
      t: lang === "fr" ? "Simulation & innovation" : "Simulation & innovation",
      d:
        lang === "fr"
          ? "Pédagogie par la simulation, débriefing vidéo et évaluation objective des compétences."
          : "Simulation-based pedagogy, video debriefing and objective skills assessment.",
      i: "🧪",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(60%_60%_at_80%_0%,white,transparent)]" />
        <div className="container-page relative grid gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
              {t("home.eyebrow")}
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
              {t("home.title")}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-50/90">
              {t("home.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/trainings" className="btn-accent">
                {t("home.ctaTrainings")}
              </Link>
              <Link
                href="/about"
                className="btn border border-white/30 text-white hover:bg-white/10"
              >
                {t("home.ctaMission")}
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-semibold text-white">{n}</dt>
                  <dd className="text-xs text-brand-50/80">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden md:block">
            {next && (
              <div className="absolute right-0 top-1/2 w-full max-w-md -translate-y-1/2 rounded-2xl2 bg-white/95 p-6 text-ink shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {t("home.nextSession")}
                </p>
                <h3 className="mt-2 text-xl">{loc(next.title, lang)}</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {next.city} · {next.durationDays} {t("detail.days")}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {next.objectives.slice(0, 3).map((o) => (
                    <li key={o.en} className="flex gap-2">
                      <span className="text-brand-500">✓</span> {loc(o, lang)}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/register?session=${next.slug}`}
                  className="btn-primary mt-5 w-full"
                >
                  {t("home.book")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-sm font-medium text-ink-muted">
          <span className="pill bg-white text-brand-700 shadow-sm">✓ {t("home.trustQualiopi")}</span>
          <span>{t("home.trust1")}</span>
          <span>{t("home.trust2")}</span>
          <span>{t("home.trust3")}</span>
        </div>
      </section>

      {/* Specialties */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl">{t("home.specialtiesTitle")}</h2>
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
      </section>

      {/* Upcoming */}
      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl">{t("home.upcomingTitle")}</h2>
              <p className="mt-2 text-ink-muted">{t("home.upcomingSub")}</p>
            </div>
            <Link href="/trainings" className="btn-ghost hidden sm:inline-flex">
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {upcoming.map((x) => (
              <TrainingCard key={x.slug} t={x} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-2xl2 bg-brand-900 px-8 py-14 text-center text-white sm:px-16">
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
