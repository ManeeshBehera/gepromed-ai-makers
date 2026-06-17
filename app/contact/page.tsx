"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

export default function ContactPage() {
  const t = useT();
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="container-page py-12">
          <h1 className="text-4xl">{t("contact.title")}</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="card space-y-4 p-6 lg:col-span-2"
        >
          {sent && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {t("contact.sent")}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label">{t("contact.name")}</label>
              <input className="field-input" required />
            </div>
            <div>
              <label className="field-label">{t("contact.email")}</label>
              <input className="field-input" type="email" required />
            </div>
          </div>
          <div>
            <label className="field-label">{t("contact.subject")}</label>
            <input className="field-input" />
          </div>
          <div>
            <label className="field-label">{t("contact.message")}</label>
            <textarea className="field-input min-h-[140px]" required />
          </div>
          <button type="submit" className="btn-primary">
            {t("contact.send")}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="card p-6">
            <h2 className="text-lg">{t("contact.address")}</h2>
            <div className="mt-3 space-y-3 text-sm text-ink-soft">
              <p>
                <strong className="text-ink">Bureaux</strong>
                <br />
                Bâtiment d&apos;Anesthésiologie
                <br />
                1 place de l&apos;Hôpital
                <br />
                67085 Strasbourg, France
              </p>
              <p>
                <strong className="text-ink">Centre d&apos;Éducation</strong>
                <br />
                Bâtiment eXplora
                <br />
                2 rue Marie Hamm
                <br />
                67000 Strasbourg, France
              </p>
            </div>
          </div>
          <div className="card p-6 text-sm text-ink-soft">
            <p>formation@gepromed.com</p>
            <div className="mt-3 flex gap-3 text-xs font-medium text-brand-700">
              <a href="https://www.linkedin.com/company/gepromed/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <a href="https://twitter.com/gepromed" target="_blank" rel="noreferrer" className="hover:underline">X</a>
              <a href="https://www.instagram.com/Gepromed/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
