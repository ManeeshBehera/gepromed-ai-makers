"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { useT, useLang, loc, type DictKey, type L } from "@/lib/i18n";

const NAV: { href: string; key: DictKey }[] = [
  { href: "/trainings", key: "nav.trainings" },
];

const NAV_AFTER: { href: string; key: DictKey }[] = [
  { href: "/dashboard", key: "nav.dashboard" },
  { href: "/contact", key: "nav.contact" },
];

export const ABOUT_ITEMS: { href: string; label: L }[] = [
  { href: "/about/team", label: { fr: "L'équipe Gepromed", en: "Gepromed Team" } },
  { href: "/about/funders", label: { fr: "Nos financeurs", en: "Our funders" } },
  { href: "/about/membership", label: { fr: "Adhésion ou don", en: "Membership or donation" } },
  { href: "/about/quality", label: { fr: "Qualité", en: "Quality" } },
  { href: "/about/legal", label: { fr: "Mentions légales", en: "Legal notice" } },
  { href: "/about/privacy", label: { fr: "Confidentialité", en: "Privacy policy" } },
  { href: "/about/publications", label: { fr: "Publications clés", en: "Key Publications" } },
];

export function SiteHeader() {
  const pathname = usePathname();
  const t = useT();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return `rounded-full px-3.5 py-2 text-sm font-medium transition ${
      active ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:text-brand-700"
    }`;
  };

  const aboutActive = pathname === "/about" || pathname.startsWith("/about/");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {t(item.key)}
            </Link>
          ))}

          {/* About us dropdown */}
          <div className="group relative">
            <Link
              href="/about"
              className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                aboutActive ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:text-brand-700"
              }`}
            >
              {t("nav.about")}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-64 rounded-2xl border border-slate-100 bg-white p-2 shadow-soft">
                {ABOUT_ITEMS.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`block rounded-xl px-3 py-2 text-sm transition ${
                      pathname === it.href
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-soft hover:bg-slate-50 hover:text-brand-700"
                    }`}
                  >
                    {loc(it.label, lang)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_AFTER.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {t(item.key)}
            </Link>
          ))}

          <LangToggle />
          <Link href="/register" className="btn-primary ml-2">
            {t("nav.register")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink"
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            <Link href="/trainings" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-brand-50">
              {t("nav.trainings")}
            </Link>

            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {t("nav.about")}
            </p>
            <Link href="/about" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-brand-50">
              {lang === "fr" ? "Présentation" : "Overview"}
            </Link>
            {ABOUT_ITEMS.map((it) => (
              <Link key={it.href} href={it.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-brand-50">
                {loc(it.label, lang)}
              </Link>
            ))}

            {NAV_AFTER.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="mt-1 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-brand-50">
                {t(item.key)}
              </Link>
            ))}
            <Link href="/register" onClick={() => setOpen(false)} className="btn-primary mt-2">
              {t("nav.register")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 p-0.5 text-xs font-semibold">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            lang === l ? "bg-brand-600 text-white" : "text-ink-muted hover:text-ink"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
