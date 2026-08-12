"use client";

/* Shared presentational pieces for both dashboard pages (GEO Command Center
 * and the 90-Day Attack Plan). Pulled out of app/page.tsx so a second page
 * doesn't have to reimplement KPI cards, sparklines, section headers, etc.
 * Both pages import styles from the same app/page.module.css design system.
 */

import type { CSSProperties } from "react";
import styles from "@/app/page.module.css";

export const num = (n: number) => n.toLocaleString("en-US");
export const pct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

export function Sparkline({ values, tone }: { values: number[]; tone?: "teal" | "green" | "orange" }) {
  const nums = values.filter((v) => Number.isFinite(v));
  if (nums.length < 2) return null;
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = max - min || 1;
  const W = 100;
  const H = 34;
  const pts = nums.map((v, i) => [(i / (nums.length - 1)) * W, H - 3 - ((v - min) / range) * (H - 8)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
  const toneClass =
    tone === "teal" ? styles.kpiChartTeal : tone === "green" ? styles.kpiChartGreen : tone === "orange" ? styles.kpiChartOrange : "";
  return (
    <div className={`${styles.kpiChart} ${toneClass}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path className={styles.area} d={`${line} L${W} ${H} L0 ${H} Z`} />
        <path className={styles.line} d={line} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

export function Kpi({
  label,
  value,
  sub,
  tone = "good",
  delta = "Live",
  series,
  sparkTone,
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "good" | "warn" | "bad";
  delta?: string;
  series?: number[];
  sparkTone?: "teal" | "green" | "orange";
}) {
  const deltaClass = tone === "good" ? styles.deltaGood : tone === "warn" ? styles.deltaWarn : styles.deltaBad;
  return (
    <article className={`${styles.card} ${styles.kpi}`} data-search={`${label} ${value} ${sub}`.toLowerCase()}>
      <div className={styles.kpiLabel}>{label}</div>
      <div className={styles.kpiValue}>{value}</div>
      {series ? <Sparkline values={series} tone={sparkTone} /> : null}
      <div className={styles.kpiFoot}>
        <span className={`${styles.delta} ${deltaClass}`}>{delta}</span>
        <div className={styles.kpiSub}>{sub}</div>
      </div>
    </article>
  );
}

export function CardTitle({ title, sub, badge }: { title: string; sub?: string; badge?: string }) {
  return (
    <div className={styles.cardHead}>
      <div>
        <h3>{title}</h3>
        {sub ? <p>{sub}</p> : null}
      </div>
      {badge ? <span className={`${styles.badge} ${styles.badgeNeutral}`}>{badge}</span> : null}
    </div>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className={styles.sectionTitle}>
      <div>
        <h2>{title}</h2>
        {sub ? <p>{sub}</p> : null}
      </div>
    </div>
  );
}

export function Badge({ tone, children }: { tone: "good" | "warn" | "bad" | "neutral" | "blue"; children: React.ReactNode }) {
  const toneClass =
    tone === "good" ? styles.badgeGood : tone === "warn" ? styles.badgeWarn : tone === "bad" ? styles.badgeBad : tone === "blue" ? styles.badgeBlue : styles.badgeNeutral;
  return <span className={`${styles.badge} ${toneClass}`}>{children}</span>;
}

export function Bar({ pct: width, color }: { pct: number; color?: string }) {
  const style: CSSProperties = { width: `${Math.max(2, Math.min(100, width))}%` };
  if (color) style.background = color;
  return (
    <div className={styles.barTrack}>
      <i style={style} />
    </div>
  );
}
