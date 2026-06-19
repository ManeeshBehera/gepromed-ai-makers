"use client";

import Link from "next/link";
import { useState } from "react";
import {
  trainings,
  isUpcoming,
  spotsLeft,
  euro,
  formatDateRange,
} from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";
import { postRegistration } from "@/lib/api";
import type { Registration } from "@/lib/types";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profession: "",
  institution: "",
  country: "",
  dietary: "",
  arrival: "",
  needsAccommodation: false,
  elearningAccess: true,
  notes: "",
};

export function RegisterPanel({
  initialSlug = "",
  embedded = false,
}: {
  initialSlug?: string;
  embedded?: boolean;
}) {
  const { lang } = useLang();
  const t = useT();

  const bookable = trainings.filter((x) => isUpcoming(x) && spotsLeft(x) > 0);
  const [sessionSlug, setSessionSlug] = useState(
    bookable.some((x) => x.slug === initialSlug) ? initialSlug : "",
  );
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Registration | null>(null);

  const selected = trainings.find((x) => x.slug === sessionSlug);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!sessionSlug || !selected) {
      setError(t("reg.chooseSession"));
      return;
    }
    setSubmitting(true);
    try {
      const reg = await postRegistration({
        sessionSlug,
        sessionTitle: loc(selected.title, "fr"),
        ...form,
      });
      setDone(reg);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className={embedded ? "p-6" : "container-page max-w-2xl py-16"}>
        <div className={embedded ? "text-center" : "card p-8 text-center"}>
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-3xl">
            ✓
          </div>
          <h2 className="mt-4 text-2xl">{t("reg.successTitle")}</h2>
          <p className="mt-3 text-ink-soft">{t("reg.successBody")}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm">
            <span className="text-ink-muted">{t("reg.yourRef")}:</span>
            <span className="font-mono font-semibold text-brand-700">{done.id}</span>
          </div>
          <ol className="mx-auto mt-8 max-w-sm space-y-2 text-left text-sm text-ink-soft">
            {[t("reg.step1"), t("reg.step2"), t("reg.step3")].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard" className="btn-primary">
              {t("reg.viewDashboard")}
            </Link>
            <button
              onClick={() => {
                setDone(null);
                setForm(EMPTY);
              }}
              className="btn-ghost"
            >
              {t("reg.newRequest")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={embedded ? "space-y-6 p-6" : "space-y-6"}>
      <div>
        <label className="field-label">{t("reg.chooseSession")} *</label>
        <select
          className="field-input"
          value={sessionSlug}
          onChange={(e) => setSessionSlug(e.target.value)}
          required
        >
          <option value="">{t("reg.selectPlaceholder")}</option>
          {bookable.map((x) => (
            <option key={x.slug} value={x.slug}>
              {loc(x.title, lang)} — {formatDateRange(x.startDate, x.endDate, lang)}
            </option>
          ))}
        </select>
        {selected && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-50/60 px-4 py-2.5 text-sm">
            <span className="text-ink-soft">{selected.city}</span>
            <span className="font-semibold text-brand-700">
              {euro(selected.priceEUR, lang)} · {t("detail.deposit")}{" "}
              {euro(selected.depositEUR, lang)}
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-brand-700">{t("reg.participant")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={`${t("reg.firstName")} *`} value={form.firstName} onChange={(v) => update("firstName", v)} required />
          <Input label={`${t("reg.lastName")} *`} value={form.lastName} onChange={(v) => update("lastName", v)} required />
          <Input label={`${t("reg.email")} *`} type="email" value={form.email} onChange={(v) => update("email", v)} required />
          <Input label={t("reg.phone")} value={form.phone} onChange={(v) => update("phone", v)} />
          <Input label={t("reg.profession")} value={form.profession} onChange={(v) => update("profession", v)} />
          <Input label={t("reg.institution")} value={form.institution} onChange={(v) => update("institution", v)} />
          <Input label={t("reg.country")} value={form.country} onChange={(v) => update("country", v)} />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-brand-700">{t("reg.logistics")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t("reg.dietary")} value={form.dietary} onChange={(v) => update("dietary", v)} />
          <Input label={t("reg.arrival")} value={form.arrival} onChange={(v) => update("arrival", v)} />
        </div>
        <div className="mt-3 space-y-2.5">
          <Check label={t("reg.accommodation")} checked={form.needsAccommodation} onChange={(v) => update("needsAccommodation", v)} />
          <Check label={t("reg.elearning")} checked={form.elearningAccess} onChange={(v) => update("elearningAccess", v)} />
        </div>
        <div className="mt-3">
          <label className="field-label">{t("reg.notes")}</label>
          <textarea className="field-input min-h-[80px]" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? t("reg.submitting") : t("reg.submit")}
      </button>
      <p className="text-center text-xs text-ink-muted">{t("detail.noEngagement")}</p>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        className="field-input"
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-soft">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
