"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {t("footer.tagline")}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="pill bg-brand-50 text-brand-700">
              ✓ {t("footer.qualiopi")}
            </span>
            <span className="pill bg-slate-100 text-ink-soft">
              {t("footer.network")}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">
            {t("footer.navigation")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link className="hover:text-brand-700" href="/trainings">{t("nav.trainings")}</Link></li>
            <li><Link className="hover:text-brand-700" href="/register">{t("nav.register")}</Link></li>
            <li><Link className="hover:text-brand-700" href="/about">{t("nav.about")}</Link></li>
            <li><Link className="hover:text-brand-700" href="/dashboard">{t("nav.dashboard")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">{t("footer.contact")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>Centre d&apos;Éducation — Bâtiment eXplora</li>
            <li>2 rue Marie Hamm, 67000 Strasbourg</li>
            <li>formation@gepromed.com</li>
          </ul>
          <div className="mt-4 flex gap-3 text-xs font-medium text-brand-700">
            <a href="https://www.linkedin.com/company/gepromed/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            <a href="https://twitter.com/gepromed" target="_blank" rel="noreferrer" className="hover:underline">X</a>
            <a href="https://www.instagram.com/Gepromed/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {t("footer.rights")}</p>
          <p>{t("footer.legal")}</p>
        </div>
      </div>
    </footer>
  );
}
