"use client";

import { useMemo, useState } from "react";
import {
  trainings,
  isUpcoming,
  spotsLeft,
  euro,
  formatDateRange,
  SPECIALTY_LABELS,
  SPECIALTY_IMAGE,
  LEVEL_LABELS,
  AUDIENCE_LABELS,
  type Specialty,
  type TrainingSession,
} from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";
import { Sheet } from "@/components/ui/Sheet";
import { RegisterPanel } from "@/components/RegisterPanel";

type TimeFilter = "upcoming" | "past";

export function TrainingsExplorer({
  showFilters = true,
  limit,
  initialTime = "upcoming",
}: {
  showFilters?: boolean;
  limit?: number;
  initialTime?: TimeFilter;
}) {
  const { lang } = useLang();
  const t = useT();
  const [time, setTime] = useState<TimeFilter>(initialTime);
  const [specialty, setSpecialty] = useState<Specialty | "all">("all");
  const [detail, setDetail] = useState<TrainingSession | null>(null);
  const [registerSlug, setRegisterSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = trainings
      .filter((x) => (time === "upcoming" ? isUpcoming(x) : !isUpcoming(x)))
      .filter((x) => (specialty === "all" ? true : x.specialty === specialty))
      .sort(
        (a, b) =>
          (time === "upcoming" ? 1 : -1) *
          (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
      );
    if (limit) list = list.slice(0, limit);
    return list;
  }, [time, specialty, limit]);

  const specialties = Array.from(new Set(trainings.map((x) => x.specialty))) as Specialty[];

  return (
    <>
      {showFilters && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            {(["upcoming", "past"] as TimeFilter[]).map((v) => (
              <button
                key={v}
                onClick={() => setTime(v)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  time === v ? "bg-white text-brand-700 shadow-sm" : "text-ink-muted hover:text-ink"
                }`}
              >
                {v === "upcoming" ? t("trainings.upcoming") : t("trainings.pastTab")}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip active={specialty === "all"} onClick={() => setSpecialty("all")}>
              {t("trainings.all")}
            </Chip>
            {specialties.map((s) => (
              <Chip key={s} active={specialty === s} onClick={() => setSpecialty(s)}>
                {loc(SPECIALTY_LABELS[s], lang)}
              </Chip>
            ))}
          </div>
        </div>
      )}

      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-10" : ""}`}>
        {filtered.map((x) => (
          <TrainingCardModern key={x.slug} t={x} onOpen={() => setDetail(x)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-ink-muted">{t("trainings.empty")}</p>
      )}

      {/* Detail side drawer */}
      <Sheet
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? loc(detail.title, lang) : ""}
        maxWidth="max-w-2xl"
      >
        {detail && (
          <DetailPanel
            t={detail}
            onRegister={() => {
              setRegisterSlug(detail.slug);
            }}
          />
        )}
      </Sheet>

      {/* Register modal */}
      <Sheet
        open={!!registerSlug}
        onClose={() => setRegisterSlug(null)}
        position="center"
        title={t("reg.title")}
        maxWidth="max-w-2xl"
      >
        {registerSlug && <RegisterPanel initialSlug={registerSlug} embedded />}
      </Sheet>
    </>
  );
}

function TrainingCardModern({ t, onOpen }: { t: TrainingSession; onOpen: () => void }) {
  const { lang } = useLang();
  const tr = useT();
  const upcoming = isUpcoming(t);
  const left = spotsLeft(t);
  const full = left === 0;
  const pct = Math.round((t.enrolled / t.capacity) * 100);

  return (
    <button
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-2xl2 border border-slate-100 bg-white text-left shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${SPECIALTY_IMAGE[t.specialty]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="pill bg-white/90 text-brand-700 backdrop-blur">
            {loc(SPECIALTY_LABELS[t.specialty], lang)}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className="pill bg-ink/50 text-white backdrop-blur">
            {loc(LEVEL_LABELS[t.level], lang)}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
          <span className="text-sm font-medium drop-shadow">
            {formatDateRange(t.startDate, t.endDate, lang)}
          </span>
          <span className="text-xs opacity-90 drop-shadow">{t.city}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug text-ink">{loc(t.title, lang)}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {loc(t.summary, lang)}
        </p>

        {upcoming ? (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className={full ? "font-medium text-rose-600" : "font-medium text-emerald-700"}>
                {full ? tr("common.full") : `${left} ${tr("common.spotsLeft")}`}
              </span>
              <span className="text-ink-muted">
                {t.enrolled}/{t.capacity}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${full ? "bg-rose-400" : "bg-brand-500"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ) : (
          t.satisfaction && (
            <div className="mt-4 flex gap-4 rounded-xl bg-slate-50 px-4 py-2.5 text-xs text-ink-soft">
              <span><strong className="text-ink">{t.satisfaction}%</strong> {tr("detail.satisfaction").toLowerCase()}</span>
              {t.passRate != null && <span><strong className="text-ink">{t.passRate}%</strong> {tr("detail.passRate").toLowerCase()}</span>}
            </div>
          )
        )}

        <div className="mt-5 flex items-center justify-between">
          <span className="text-base font-semibold text-ink">{euro(t.priceEUR, lang)}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition group-hover:gap-2.5">
            {tr("common.details")}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailPanel({ t, onRegister }: { t: TrainingSession; onRegister: () => void }) {
  const { lang } = useLang();
  const tr = useT();
  const upcoming = isUpcoming(t);
  const left = spotsLeft(t);
  const full = left === 0;

  return (
    <div>
      <div
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('${SPECIALTY_IMAGE[t.specialty]}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/10" />
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex flex-wrap gap-2">
            <span className="pill bg-white/90 text-brand-700">{loc(SPECIALTY_LABELS[t.specialty], lang)}</span>
            <span className="pill bg-ink/50 backdrop-blur">{loc(LEVEL_LABELS[t.level], lang)}</span>
            <span className="pill bg-ink/50 backdrop-blur">{tr("detail.audience")}: {loc(AUDIENCE_LABELS[t.audience], lang)}</span>
            {t.qualiopi && <span className="pill bg-accent text-ink">✓ Qualiopi</span>}
          </div>
          <p className="mt-2 text-sm">
            {formatDateRange(t.startDate, t.endDate, lang)} · {t.durationDays} {tr("detail.days")} · {loc(t.venue, lang)}, {t.city}
          </p>
        </div>
      </div>

      <div className="p-6">
        <p className="leading-relaxed text-ink-soft">{loc(t.summary, lang)}</p>

        <h4 className="mt-6 font-display text-lg">{tr("detail.objectives")}</h4>
        <ul className="mt-3 space-y-2">
          {t.objectives.map((o) => (
            <li key={o.en} className="flex gap-2.5 text-sm text-ink-soft">
              <span className="mt-0.5 text-brand-500">✓</span> {loc(o, lang)}
            </li>
          ))}
        </ul>

        <h4 className="mt-6 font-display text-lg">{tr("detail.program")}</h4>
        <div className="mt-3 space-y-3">
          {t.program.map((d) => (
            <div key={d.day.en} className="rounded-xl border border-slate-100 p-4">
              <p className="text-sm font-semibold text-brand-700">{loc(d.day, lang)}</p>
              <ul className="mt-1.5 space-y-1 text-sm text-ink-soft">
                {d.items.map((it) => (
                  <li key={it.en}>• {loc(it, lang)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h4 className="mt-6 font-display text-lg">{tr("detail.supervisors")}</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {t.supervisors.map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 font-semibold text-brand-700">
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
            <h4 className="mt-6 font-display text-lg">{tr("detail.results")}</h4>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <MiniStat label={tr("detail.satisfaction")} value={`${t.satisfaction}%`} />
              {t.passRate != null && <MiniStat label={tr("detail.passRate")} value={`${t.passRate}%`} />}
              {t.photos != null && <MiniStat label={tr("detail.photos")} value={`${t.photos}`} />}
            </div>
          </>
        )}
      </div>

      {/* sticky footer CTA */}
      {upcoming && (
        <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-lg font-semibold text-ink">{euro(t.priceEUR, lang)}</p>
            <p className="text-xs text-ink-muted">
              {tr("detail.deposit")} {euro(t.depositEUR, lang)}
            </p>
          </div>
          <button onClick={onRegister} disabled={full} className="btn-primary">
            {full ? tr("detail.full") : tr("detail.registerThis")}
          </button>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 text-center">
      <p className="text-xl font-semibold text-brand-700">{value}</p>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? "border-brand-400 bg-brand-50 text-brand-700"
          : "border-slate-200 text-ink-muted hover:border-brand-300 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
