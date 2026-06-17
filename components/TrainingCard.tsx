"use client";

import Link from "next/link";
import {
  type TrainingSession,
  SPECIALTY_LABELS,
  LEVEL_LABELS,
  formatDateRange,
  spotsLeft,
  euro,
  isUpcoming,
} from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";

const SPECIALTY_ACCENT: Record<string, string> = {
  vascular: "bg-brand-50 text-brand-700",
  ophthalmology: "bg-sky-50 text-sky-700",
  simulation: "bg-violet-50 text-violet-700",
};

export function TrainingCard({ t }: { t: TrainingSession }) {
  const { lang } = useLang();
  const tr = useT();
  const upcoming = isUpcoming(t);
  const left = spotsLeft(t);
  const full = left === 0;

  return (
    <article className="card flex flex-col overflow-hidden transition hover:shadow-soft">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-5 py-3">
        <span className={`pill ${SPECIALTY_ACCENT[t.specialty]}`}>
          {loc(SPECIALTY_LABELS[t.specialty], lang)}
        </span>
        <span className="pill bg-slate-100 text-ink-soft">
          {loc(LEVEL_LABELS[t.level], lang)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug">{loc(t.title, lang)}</h3>
        <p className="mt-1 text-sm text-ink-muted">
          {formatDateRange(t.startDate, t.endDate, lang)} · {t.city}
        </p>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {loc(t.summary, lang)}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-semibold text-ink">
            {euro(t.priceEUR, lang)}
          </span>
          {upcoming ? (
            full ? (
              <span className="pill bg-rose-50 text-rose-600">{tr("common.full")}</span>
            ) : (
              <span className="pill bg-emerald-50 text-emerald-700">
                {left} {tr("common.spotsLeft")}
              </span>
            )
          ) : (
            <span className="pill bg-slate-100 text-ink-muted">
              {tr("common.past")}
            </span>
          )}
        </div>

        {!upcoming && t.satisfaction && (
          <div className="mt-4 flex gap-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-ink-soft">
            <span><strong className="text-ink">{t.satisfaction}%</strong> {tr("detail.satisfaction").toLowerCase()}</span>
            {t.passRate != null && (
              <span><strong className="text-ink">{t.passRate}%</strong> {tr("detail.passRate").toLowerCase()}</span>
            )}
            {t.photos != null && (
              <span><strong className="text-ink">{t.photos}</strong> {tr("detail.photos").toLowerCase()}</span>
            )}
          </div>
        )}

        <div className="mt-5 flex gap-2">
          <Link href={`/trainings/${t.slug}`} className="btn-ghost flex-1">
            {tr("common.details")}
          </Link>
          {upcoming && !full && (
            <Link
              href={`/register?session=${t.slug}`}
              className="btn-primary flex-1"
            >
              {tr("common.register")}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
