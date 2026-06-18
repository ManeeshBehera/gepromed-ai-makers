"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TrainingCard } from "@/components/TrainingCard";
import { trainings, isUpcoming } from "@/lib/trainings";
import { useLang, useT } from "@/lib/i18n";
import {
  VersionSwitcher,
  HeroSplit,
  HeroImage,
  HeroBold,
  type HomeVersion,
} from "@/components/HomeHeroes";

const VKEY = "gepromed.homeVersion";

export default function HomePage() {
  const { lang } = useLang();
  const t = useT();
  const upcoming = trainings.filter((x) => isUpcoming(x)).slice(0, 3);

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
      {/* Design version switcher (demo) */}
      <VersionSwitcher v={v} setV={setV} />

      {/* Hero — swappable */}
      {v === 1 && <HeroSplit />}
      {v === 2 && <HeroImage />}
      {v === 3 && <HeroBold />}

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
