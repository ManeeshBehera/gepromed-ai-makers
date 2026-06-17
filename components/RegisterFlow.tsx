"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { trainings, isUpcoming, spotsLeft, euro, formatDateRange } from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";
import { postRegistration } from "@/lib/api";
import type { Registration } from "@/lib/types";

export function RegisterFlow() {
  const { lang } = useLang();
  const t = useT();
  const params = useSearchParams();
  const preselect = params.get("session") || "";

  const bookable = useMemo(
    () => trainings.filter((x) => isUpcoming(x) && spotsLeft(x) > 0),
    [],
  );

  const [sessionSlug, setSessionSlug] = useState(
    bookable.some((x) => x.slug === preselect) ? preselect : "",
  );
  const [form, setForm] = useState({
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
  });
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="container-page max-w-2xl py-16">
        <div className="card p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-3xl">
            ✓
          </div>
          <h1 className="mt-4 text-3xl">{t("reg.successTitle")}</h1>
          <p className="mt-3 text-ink-soft">{t("reg.successBody")}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm">
            <span className="text-ink-muted">{t("reg.yourRef")}:</span>
            <span className="font-mono font-semibold text-brand-700">{done.id}</span>
          </div>

          <div className="mt-8 text-left">
            <h2 className="text-lg">{t("reg.nextSteps")}</h2>
            <ol className="mt-3 space-y-2 text-sm text-ink-soft">
              {[t("reg.step1"), t("reg.step2"), t("reg.step3")].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard" className="btn-primary">
              {t("reg.viewDashboard")}
            </Link>
            <button
              onClick={() => {
                setDone(null);
                setForm({
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
                });
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
    <>
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="container-page py-12">
          <h1 className="text-4xl">{t("reg.title")}</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">{t("reg.subtitle")}</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="container-page grid gap-8 py-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Session */}
          <fieldset className="card p-6">
            <legend className="px-2 text-sm font-semibold text-brand-700">
              {t("reg.session")}
            </legend>
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
          </fieldset>

          {/* Participant */}
          <fieldset className="card p-6">
            <legend className="px-2 text-sm font-semibold text-brand-700">
              {t("reg.participant")}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label={`${t("reg.firstName")} *`} value={form.firstName} onChange={(v) => update("firstName", v)} required />
              <Input label={`${t("reg.lastName")} *`} value={form.lastName} onChange={(v) => update("lastName", v)} required />
              <Input label={`${t("reg.email")} *`} type="email" value={form.email} onChange={(v) => update("email", v)} required />
              <Input label={t("reg.phone")} value={form.phone} onChange={(v) => update("phone", v)} />
              <Input label={t("reg.profession")} value={form.profession} onChange={(v) => update("profession", v)} />
              <Input label={t("reg.institution")} value={form.institution} onChange={(v) => update("institution", v)} />
              <Input label={t("reg.country")} value={form.country} onChange={(v) => update("country", v)} />
            </div>
          </fieldset>

          {/* Logistics */}
          <fieldset className="card p-6">
            <legend className="px-2 text-sm font-semibold text-brand-700">
              {t("reg.logistics")}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label={t("reg.dietary")} value={form.dietary} onChange={(v) => update("dietary", v)} />
              <Input label={t("reg.arrival")} value={form.arrival} onChange={(v) => update("arrival", v)} />
            </div>
            <div className="mt-4 space-y-2.5">
              <Check label={t("reg.accommodation")} checked={form.needsAccommodation} onChange={(v) => update("needsAccommodation", v)} />
              <Check label={t("reg.elearning")} checked={form.elearningAccess} onChange={(v) => update("elearningAccess", v)} />
            </div>
            <div className="mt-4">
              <label className="field-label">{t("reg.notes")}</label>
              <textarea
                className="field-input min-h-[90px]"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </fieldset>

          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
          )}
        </div>

        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 card p-6">
            <h2 className="text-lg">{t("reg.session")}</h2>
            {selected ? (
              <>
                <p className="mt-2 font-semibold text-ink">{loc(selected.title, lang)}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {formatDateRange(selected.startDate, selected.endDate, lang)} · {selected.city}
                </p>
                <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">{t("common.perParticipant").replace("/ ", "")}</dt>
                    <dd className="font-semibold text-ink">{euro(selected.priceEUR, lang)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">{t("detail.deposit").replace(" de", "")}</dt>
                    <dd className="font-semibold text-ink">{euro(selected.depositEUR, lang)}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p className="mt-2 text-sm text-ink-muted">{t("reg.chooseSession")}</p>
            )}
            <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
              {submitting ? t("reg.submitting") : t("reg.submit")}
            </button>
            <p className="mt-3 text-center text-xs text-ink-muted">{t("detail.noEngagement")}</p>
          </div>
        </aside>
      </form>
    </>
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
