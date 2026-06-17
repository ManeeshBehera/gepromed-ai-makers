"use client";

import Link from "next/link";
import {
  type TrainingSession,
  SPECIALTY_LABELS,
  LEVEL_LABELS,
  AUDIENCE_LABELS,
  formatDateRange,
  spotsLeft,
  euro,
  isUpcoming,
} from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";

export function TrainingDetailView({ t }: { t: TrainingSession }) {
  const { lang } = useLang();
  const tr = useT();
  const upcoming = isUpcoming(t);
  const left = spotsLeft(t);
  const full = left === 0;

  return (
    <>
      <section className="bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <div className="container-page py-14">
          <Link href="/trainings" className="text-sm text-brand-50/80 hover:text-white">
            {tr("detail.back")}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
              {loc(SPECIALTY_LABELS[t.specialty], lang)}
            </span>
            <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
              {tr("detail.level")} {loc(LEVEL_LABELS[t.level], lang)}
            </span>
            <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
              {tr("detail.audience")}: {loc(AUDIENCE_LABELS[t.audience], lang)}
            </span>
            {t.qualiopi && <span className="pill bg-accent text-ink">✓ Qualiopi</span>}
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl text-white">{loc(t.title, lang)}</h1>
          <p className="mt-3 text-brand-50/90">
            {formatDateRange(t.startDate, t.endDate, lang)} · {t.durationDays}{" "}
            {tr("detail.days")} · {loc(t.venue, lang)}, {t.city}
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl">{tr("detail.intro")}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{loc(t.summary, lang)}</p>

          <h2 className="mt-10 text-2xl">{tr("detail.objectives")}</h2>
          <ul className="mt-4 space-y-2">
            {t.objectives.map((o) => (
              <li key={o.en} className="flex gap-3 text-ink-soft">
                <span className="mt-1 text-brand-500">✓</span>
                <span>{loc(o, lang)}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl">{tr("detail.program")}</h2>
          <div className="mt-4 space-y-4">
            {t.program.map((d) => (
              <div key={d.day.en} className="card p-5">
                <h3 className="text-base font-semibold text-brand-700">
                  {loc(d.day, lang)}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                  {d.items.map((it) => (
                    <li key={it.en} className="flex gap-2">
                      <span className="text-ink-muted">•</span> {loc(it, lang)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl">{tr("detail.supervisors")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.supervisors.map((s) => (
              <div key={s.name} className="card flex items-center gap-3 p-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 font-semibold text-brand-700">
                  {s.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-ink-muted">{loc(s.role, lang)}</p>
                </div>
              </div>
            ))}
          </div>

          {!upcoming && t.satisfaction && (
            <>
              <h2 className="mt-10 text-2xl">{tr("detail.results")}</h2>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <Stat label={tr("detail.satisfaction")} value={`${t.satisfaction}%`} />
                {t.passRate != null && (
                  <Stat label={tr("detail.passRate")} value={`${t.passRate}%`} />
                )}
                {t.photos != null && (
                  <Stat label={tr("detail.photos")} value={`${t.photos}`} />
                )}
              </div>
            </>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 card p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-semibold text-ink">
                {euro(t.priceEUR, lang)}
              </span>
              <span className="text-sm text-ink-muted">{tr("common.perParticipant")}</span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {tr("detail.deposit")} {euro(t.depositEUR, lang)} {tr("detail.toBook")}
            </p>

            <dl className="mt-5 space-y-2.5 text-sm">
              <Row k={tr("detail.dates")} v={formatDateRange(t.startDate, t.endDate, lang)} />
              <Row k={tr("detail.duration")} v={`${t.durationDays} ${tr("detail.days")}`} />
              <Row k={tr("detail.place")} v={t.city} />
              <Row
                k={tr("detail.availability")}
                v={
                  !upcoming
                    ? tr("common.past")
                    : full
                      ? tr("common.full")
                      : `${left} ${tr("common.spotsLeft")}`
                }
              />
            </dl>

            {upcoming ? (
              full ? (
                <button disabled className="btn-primary mt-6 w-full">
                  {tr("detail.full")}
                </button>
              ) : (
                <Link href={`/register?session=${t.slug}`} className="btn-primary mt-6 w-full">
                  {tr("detail.registerThis")}
                </Link>
              )
            ) : (
              <Link href="/trainings" className="btn-ghost mt-6 w-full">
                {tr("detail.seeUpcoming")}
              </Link>
            )}

            <p className="mt-4 text-center text-xs text-ink-muted">
              {tr("detail.noEngagement")}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-muted">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4 text-center">
      <p className="text-2xl font-semibold text-brand-700">{value}</p>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  );
}
