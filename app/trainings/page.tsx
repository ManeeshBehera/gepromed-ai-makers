"use client";

import { useMemo, useState } from "react";
import { TrainingCard } from "@/components/TrainingCard";
import {
  trainings,
  isUpcoming,
  SPECIALTY_LABELS,
  type Specialty,
} from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";

type TimeFilter = "upcoming" | "past";

export default function TrainingsPage() {
  const { lang } = useLang();
  const t = useT();
  const [time, setTime] = useState<TimeFilter>("upcoming");
  const [specialty, setSpecialty] = useState<Specialty | "all">("all");

  const filtered = useMemo(() => {
    return trainings
      .filter((x) => (time === "upcoming" ? isUpcoming(x) : !isUpcoming(x)))
      .filter((x) => (specialty === "all" ? true : x.specialty === specialty))
      .sort(
        (a, b) =>
          (time === "upcoming" ? 1 : -1) *
          (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
      );
  }, [time, specialty]);

  const specialties = Array.from(
    new Set(trainings.map((x) => x.specialty)),
  ) as Specialty[];

  return (
    <>
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="container-page py-14">
          <h1 className="text-4xl">{t("trainings.title")}</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">{t("trainings.subtitle")}</p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            {(["upcoming", "past"] as TimeFilter[]).map((v) => (
              <button
                key={v}
                onClick={() => setTime(v)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  time === v
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {v === "upcoming" ? t("trainings.upcoming") : t("trainings.pastTab")}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterChip active={specialty === "all"} onClick={() => setSpecialty("all")}>
              {t("trainings.all")}
            </FilterChip>
            {specialties.map((s) => (
              <FilterChip
                key={s}
                active={specialty === s}
                onClick={() => setSpecialty(s)}
              >
                {loc(SPECIALTY_LABELS[s], lang)}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((x) => (
            <TrainingCard key={x.slug} t={x} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-ink-muted">{t("trainings.empty")}</p>
        )}
      </section>
    </>
  );
}

function FilterChip({
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
