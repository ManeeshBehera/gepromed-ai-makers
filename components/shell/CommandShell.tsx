"use client";

/* Shared app shell for both dashboard pages: sidebar nav, topbar with search,
 * theme toggle, and the in-page [data-search] filter behavior. Extracted so
 * GEO Command Center (/) and the 90-Day Attack Plan (/90-day-attack-plan)
 * look and behave identically without duplicating this ~150-line wrapper.
 */

import { useEffect, useRef, useState } from "react";
import styles from "@/app/page.module.css";

export type NavTab = { id: string; label: string; short: string };
export type CrossLink = { href: string; label: string; external?: boolean };

const THEME_KEY = "gepromed-geo-theme";

export function CommandShell({
  brandTitle,
  brandSubtitle,
  tabs,
  activeTab,
  onTabChange,
  missionLabel,
  missionMeta,
  statusLabel,
  crossLinks,
  children,
}: {
  brandTitle: string;
  brandSubtitle: string;
  tabs: NavTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  missionLabel: string;
  missionMeta: string;
  statusLabel: string;
  crossLinks: CrossLink[];
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Same in-page filter pattern as the reference hub: every [data-search]
  // card in the active tab gets hidden unless it matches the query.
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const q = query.trim().toLowerCase();
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-search]"));
    let shown = 0;
    nodes.forEach((el) => {
      if (el.parentElement?.closest("[data-search]")) return;
      const hit = !q || (el.getAttribute("data-search") || "").includes(q);
      el.hidden = !hit;
      if (hit) shown++;
    });
    const empty = root.querySelector<HTMLElement>("[data-noresults]");
    if (empty) empty.hidden = !(q && nodes.length > 0 && shown === 0);
  }, [activeTab, query, children]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={styles.wrap} data-theme={theme}>
      <div className={styles.app}>
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>G</div>
            <div>
              <strong>{brandTitle}</strong>
              <span>{brandSubtitle}</span>
            </div>
          </div>
          <div className={styles.navTitle}>Workspace</div>
          <nav className={styles.nav} aria-label="Workspace sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`${styles.navBtn} ${activeTab === t.id ? styles.navBtnOn : ""}`}
                onClick={() => {
                  onTabChange(t.id);
                  setSidebarOpen(false);
                }}
                aria-current={activeTab === t.id ? "page" : undefined}
              >
                <span className={styles.navIcon}>{t.short}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
          <div className={styles.sidebarFoot}>
            <div className={styles.missionCard}>
              <div className={styles.eyebrow}>Mission window</div>
              <strong>{missionLabel}</strong>
              <span>{missionMeta}</span>
            </div>
            <button className={styles.themeButton} onClick={toggleTheme}>
              Switch theme
            </button>
            {crossLinks.map((link) => (
              <a
                key={link.href}
                className={styles.legacyLink}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </aside>

        <main className={styles.main}>
          <header className={styles.topbar}>
            <button className={styles.mobileMenu} onClick={() => setSidebarOpen((v) => !v)} aria-label="Open navigation">
              Menu
            </button>
            <label className={styles.search}>
              <input
                type="search"
                aria-label="Search the current workspace"
                placeholder="Search the current workspace..."
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className={styles.topSpacer} />
            <div className={styles.status}>
              <i className={styles.statusDot} />
              <span>{statusLabel}</span>
            </div>
            <button className={styles.topAction} aria-label="Switch theme" onClick={toggleTheme} title="Switch theme">
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </header>

          <div className={styles.content} ref={contentRef}>
            {children}
            <div className={`${styles.card} ${styles.empty}`} data-noresults hidden>
              Nothing on this page matches &ldquo;{query}&rdquo;.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
