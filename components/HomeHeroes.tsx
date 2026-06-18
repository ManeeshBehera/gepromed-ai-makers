"use client";

import Link from "next/link";
import { trainings, isUpcoming } from "@/lib/trainings";
import { useLang, useT, loc, type Lang } from "@/lib/i18n";

export type HomeVersion = 1 | 2 | 3;

export const VERSION_NAMES: Record<HomeVersion, { fr: string; en: string }> = {
  1: { fr: "Dégradé", en: "Gradient" },
  2: { fr: "Image", en: "Image" },
  3: { fr: "Typographique", en: "Typographic" },
};

function useHomeData() {
  const { lang } = useLang();
  const t = useT();
  const upcoming = trainings.filter((x) => isUpcoming(x));
  const next = upcoming[0];
  const stats: [string, string][] = [
    [
      "+1150",
      lang === "fr" ? "praticiens formés depuis 2018" : "practitioners trained since 2018",
    ],
    ["96%", t("home.statSat")],
    ["40+", t("home.statSup")],
  ];
  return { lang, t, next, stats };
}

/* ------------------------------------------------------------------ */
/* Switcher                                                            */
/* ------------------------------------------------------------------ */

export function VersionSwitcher({
  v,
  setV,
}: {
  v: HomeVersion;
  setV: (v: HomeVersion) => void;
}) {
  const { lang } = useLang();
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="container-page flex flex-wrap items-center gap-3 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {lang === "fr" ? "Aperçu design" : "Design preview"}
        </span>
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          {([1, 2, 3] as HomeVersion[]).map((n) => (
            <button
              key={n}
              onClick={() => setV(n)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                v === n
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              V{n} · {loc(VERSION_NAMES[n], lang)}
            </button>
          ))}
        </div>
        <span className="text-xs text-ink-muted">
          {lang === "fr"
            ? "Même contenu et mêmes couleurs de marque — trois mises en page."
            : "Same content and brand colors — three layouts."}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* V1 — Split gradient                                                 */
/* ------------------------------------------------------------------ */

export function HeroSplit() {
  const { lang, t, next, stats } = useHomeData();
  return (
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
            <Link href="/about" className="btn border border-white/30 text-white hover:bg-white/10">
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
              <Link href={`/register?session=${next.slug}`} className="btn-primary mt-5 w-full">
                {t("home.book")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* V2 — Full-bleed image                                               */
/* ------------------------------------------------------------------ */

export function HeroImage() {
  const { t, stats } = useHomeData();
  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      {/* image layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=70')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-800/55" />
      <div className="container-page relative py-28 md:py-36">
        <div className="max-w-2xl">
          <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/25 backdrop-blur">
            {t("home.eyebrow")}
          </span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white drop-shadow sm:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            {t("home.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/trainings" className="btn-accent">
              {t("home.ctaTrainings")}
            </Link>
            <Link href="/register" className="btn border border-white/40 text-white hover:bg-white/10">
              {t("home.ctaRegister")}
            </Link>
          </div>
        </div>
      </div>
      {/* stats bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="container-page grid grid-cols-3 divide-x divide-white/10 py-6 text-center">
          {stats.map(([n, l]) => (
            <div key={l} className="px-2">
              <p className="text-2xl font-semibold text-white sm:text-3xl">{n}</p>
              <p className="mt-1 text-xs text-white/75">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* V3 — Bold typographic (light)                                       */
/* ------------------------------------------------------------------ */

export function HeroBold() {
  const { lang, t, next, stats } = useHomeData();
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-24 -top-24 -z-0 h-96 w-96 rounded-full bg-brand-50 blur-3xl" />
      <div className="absolute -left-32 top-40 -z-0 h-80 w-80 rounded-full bg-accent-soft/50 blur-3xl" />
      <div className="container-page relative py-20 md:py-28">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {t("home.eyebrow")}
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl">
          {t("home.title")}
        </h1>
        <div className="mt-6 h-1.5 w-28 rounded-full bg-accent" />
        <div className="mt-8 grid gap-8 md:grid-cols-3 md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:col-span-2">
            {t("home.subtitle")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/trainings" className="btn-primary">
              {t("home.ctaTrainings")}
            </Link>
            <Link href="/about" className="btn-ghost">
              {t("home.ctaMission")}
            </Link>
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-slate-100 sm:grid-cols-3">
          {stats.map(([n, l]) => (
            <div key={l} className="bg-white p-6">
              <dt className="text-4xl font-semibold text-brand-700">{n}</dt>
              <dd className="mt-1 text-sm text-ink-muted">{l}</dd>
            </div>
          ))}
        </dl>
        {next && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-4">
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-brand-700">{t("home.nextSession")}:</span>{" "}
              {loc(next.title, lang)} — {next.city}
            </p>
            <Link href={`/register?session=${next.slug}`} className="btn-primary !py-2 !text-xs">
              {t("home.book")}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
