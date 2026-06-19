"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchRegistrations,
  patchRegistration,
  deleteRegistration,
} from "@/lib/api";
import {
  type Registration,
  type LeadStatus,
  STATUS_FLOW,
  STATUS_LABELS,
  STATUS_TONE,
} from "@/lib/types";
import { getTraining, euro } from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";

type Tab = LeadStatus | "all";
const TAB_ORDER: Tab[] = [
  "all",
  "lead",
  "deposit_paid",
  "contract_signed",
  "confirmed",
  "cancelled",
];

export default function DashboardPage() {
  const { lang } = useLang();
  const t = useT();
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchRegistrations());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const leads = items.filter((r) => r.status === "lead").length;
    const confirmed = items.filter((r) => r.status === "confirmed").length;
    const deposits = items
      .filter((r) => r.status !== "cancelled")
      .reduce((sum, r) => sum + (getTraining(r.sessionSlug)?.depositEUR ?? 0), 0);
    return { total: items.length, leads, confirmed, deposits };
  }, [items]);

  const counts = useMemo(() => {
    const c: Record<Tab, number> = {
      all: items.length,
      lead: 0,
      deposit_paid: 0,
      contract_signed: 0,
      confirmed: 0,
      cancelled: 0,
    };
    for (const r of items) c[r.status] += 1;
    return c;
  }, [items]);

  const visibleTabs = TAB_ORDER.filter(
    (tb) => tb !== "cancelled" || counts.cancelled > 0,
  );

  const filtered = useMemo(
    () => (tab === "all" ? items : items.filter((r) => r.status === tab)),
    [items, tab],
  );

  async function advance(r: Registration) {
    const idx = STATUS_FLOW.indexOf(r.status);
    if (idx < 0 || idx >= STATUS_FLOW.length - 1) return;
    const next = STATUS_FLOW[idx + 1];
    await patchRegistration(r.id, { status: next });
    load();
  }

  async function followUp(id: string, note: string) {
    if (!note.trim()) return;
    await patchRegistration(id, { followUp: note.trim() });
    load();
  }

  async function remove(id: string) {
    await deleteRegistration(id);
    load();
  }

  return (
    <>
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="container-page py-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl">{t("dash.title")}</h1>
              <p className="mt-3 max-w-2xl text-ink-muted">{t("dash.subtitle")}</p>
            </div>
            <button onClick={load} className="btn-ghost">
              ↻ {t("dash.refresh")}
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi label={t("dash.total")} value={`${stats.total}`} />
            <Kpi label={t("dash.leads")} value={`${stats.leads}`} tone="text-amber-600" />
            <Kpi label={t("dash.confirmed")} value={`${stats.confirmed}`} tone="text-emerald-600" />
            <Kpi label={t("dash.revenue")} value={euro(stats.deposits, lang)} tone="text-brand-700" />
          </div>
        </div>
      </section>

      {/* Stage tabs */}
      <div className="sticky top-16 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="container-page flex gap-1 overflow-x-auto py-3">
          {visibleTabs.map((tb) => {
            const active = tab === tb;
            const label =
              tb === "all"
                ? lang === "fr"
                  ? "Toutes"
                  : "All"
                : loc(STATUS_LABELS[tb], lang);
            return (
              <button
                key={tb}
                onClick={() => setTab(tb)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand-600 text-white"
                    : "text-ink-muted hover:bg-slate-100 hover:text-ink"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 text-xs font-semibold ${
                    active ? "bg-white/25 text-white" : "bg-slate-100 text-ink-soft"
                  }`}
                >
                  {counts[tb]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="container-page py-10">
        <p className="mb-4 text-xs text-ink-muted">{t("dash.demoNote")}</p>

        {loading ? (
          <p className="py-16 text-center text-ink-muted">{t("common.loading")}</p>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-ink-muted">{t("dash.empty")}</p>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-ink-muted">
            {lang === "fr"
              ? "Aucune demande à ce stade."
              : "No requests at this stage."}
          </p>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <LeadRow
                key={r.id}
                r={r}
                lang={lang}
                t={t}
                onAdvance={() => advance(r)}
                onFollowUp={(note) => followUp(r.id, note)}
                onRemove={() => remove(r.id)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Kpi({ label, value, tone = "text-ink" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="card p-5">
      <p className={`text-2xl font-semibold ${tone}`}>{value}</p>
      <p className="mt-1 text-xs text-ink-muted">{label}</p>
    </div>
  );
}

function LeadRow({
  r,
  lang,
  t,
  onAdvance,
  onFollowUp,
  onRemove,
}: {
  r: Registration;
  lang: "fr" | "en";
  t: ReturnType<typeof useT>;
  onAdvance: () => void;
  onFollowUp: (note: string) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const session = getTraining(r.sessionSlug);
  const canAdvance =
    STATUS_FLOW.indexOf(r.status) >= 0 &&
    STATUS_FLOW.indexOf(r.status) < STATUS_FLOW.length - 1;

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-[200px]">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-ink">
              {r.firstName} {r.lastName}
            </h3>
            <span className={`pill ${STATUS_TONE[r.status]}`}>
              {loc(STATUS_LABELS[r.status], lang)}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-ink-muted">
            {r.profession || "—"}
            {r.institution ? ` · ${r.institution}` : ""}
            {r.country ? ` · ${r.country}` : ""}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            {r.email} {r.phone ? `· ${r.phone}` : ""}
          </p>
        </div>

        <div className="min-w-[180px] text-sm">
          <p className="font-medium text-ink">
            {session ? loc(session.title, lang) : r.sessionTitle}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">
            {r.dietary && `🍽 ${r.dietary} · `}
            {r.needsAccommodation ? "🏨 " : ""}
            {r.elearningAccess ? "💻 e-learning" : ""}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-ink-muted">{r.id}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {canAdvance && (
            <button onClick={onAdvance} className="btn-primary !py-1.5 !text-xs">
              {t("dash.advance")} →
            </button>
          )}
          <button onClick={() => setOpen((v) => !v)} className="btn-ghost !py-1.5 !text-xs">
            {t("dash.addFollowUp")}
          </button>
          <button
            onClick={onRemove}
            className="rounded-full px-2 py-1.5 text-xs text-rose-500 hover:bg-rose-50"
            aria-label="Delete"
          >
            ✕
          </button>
        </div>
      </div>

      {(r.notes || r.followUps.length > 0 || open) && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          {r.notes && (
            <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-ink-soft">
              “{r.notes}”
            </p>
          )}
          {r.followUps.length > 0 && (
            <ul className="space-y-1.5 text-sm text-ink-soft">
              {r.followUps.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-ink-muted">
                    {new Date(f.at).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB")}
                  </span>
                  {f.note}
                </li>
              ))}
            </ul>
          )}
          {open && (
            <div className="mt-3 flex gap-2">
              <input
                className="field-input"
                placeholder={t("dash.followUpPlaceholder")}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onFollowUp(note);
                    setNote("");
                    setOpen(false);
                  }
                }}
              />
              <button
                onClick={() => {
                  onFollowUp(note);
                  setNote("");
                  setOpen(false);
                }}
                className="btn-primary !py-2 !text-xs"
              >
                {t("dash.save")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
