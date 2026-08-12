"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { CommandShell, type NavTab } from "@/components/shell/CommandShell";
import { Kpi, SectionTitle, Badge } from "@/components/shell/dashboardUI";
import { META } from "@/lib/organicData";
import { PHASES, CADENCE_TARGETS, BASELINE, type Phase } from "@/lib/planData";

type PhaseId = Phase["id"];

const TABS: NavTab[] = PHASES.map((p) => ({ id: p.id, label: `${p.label} plan`, short: p.short }));

export default function AttackPlanPage() {
  const [tab, setTab] = useState<PhaseId>("30");
  const phase = PHASES.find((p) => p.id === tab) ?? PHASES[0];

  return (
    <CommandShell
      brandTitle="90-Day Attack Plan"
      brandSubtitle="Gepromed · Growth program"
      tabs={TABS}
      activeTab={tab}
      onTabChange={(id) => setTab(id as PhaseId)}
      missionLabel={META.mission}
      missionMeta={`Baseline ${META.updated} · rank #1 AI visibility`}
      statusLabel="Growth program · 3 phases"
      crossLinks={[
        { href: "/", label: "← GEO Command Center" },
        { href: "https://gepromed.com", label: "gepromed.com ↗", external: true },
      ]}
    >
      <CadenceBrief />
      <PhaseView phase={phase} />
    </CommandShell>
  );
}

function CadenceBrief() {
  return (
    <section className={styles.page} style={{ marginBottom: 4 }}>
      <div className={styles.pageHead}>
        <div>
          <h1>90-Day Attack Plan</h1>
          <p>
            The steady-state content and backlink cadence every phase below ramps toward, and the three checkpoints —
            30, 60 and 90 days — that track it against the real baseline already on the GEO Command Center.
          </p>
        </div>
      </div>
      <article className={`${styles.card} ${styles.tableWrap}`} data-search="cadence brief steady state targets">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Steady-state target</th>
              <th>What it is</th>
            </tr>
          </thead>
          <tbody>
            {CADENCE_TARGETS.map((c) => (
              <tr key={c.channel}>
                <td style={{ fontWeight: 650 }}>{c.channel}</td>
                <td>
                  <Badge tone="blue">{c.steadyState}</Badge>
                </td>
                <td className={styles.muted}>{c.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}

function PhaseView({ phase }: { phase: Phase }) {
  return (
    <section className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <h1>{phase.window}</h1>
          <p>{phase.headline}</p>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.grid4}`}>
        {phase.heroKpis.map((k) => (
          <Kpi key={k.label} label={k.label} value={k.value} sub={k.sub} tone={k.tone} delta={k.delta} />
        ))}
      </div>

      <SectionTitle title="1 · Objective" />
      <article className={`${styles.card} ${styles.cardPad}`}>
        <p style={{ color: "var(--ink-2)", fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{phase.objective}</p>
      </article>

      <SectionTitle title="2 · KPIs targeted" sub={`Baseline is Day 0 (${BASELINE.aiVisibility}% AI visibility, DR ${BASELINE.domainRating}, ${BASELINE.organicKeywords} organic keywords).`} />
      <article className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Baseline</th>
              <th>Target by end of phase</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {phase.kpiTable.map((row) => (
              <tr key={row.metric} data-search={`${row.metric} ${row.type}`.toLowerCase()}>
                <td>{row.metric}</td>
                <td className={styles.muted}>{row.baseline}</td>
                <td style={{ fontWeight: 650 }}>{row.target}</td>
                <td>
                  <Badge tone={row.type === "Outcome" ? "good" : "neutral"}>{row.type}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <SectionTitle title="3 · Action plan" sub="Highest-leverage first." />
      <article className={`${styles.card} ${styles.queue}`}>
        {phase.actions.map((a, i) => (
          <div className={styles.queueRow} key={a.title} data-search={`${a.title} ${a.detail}`.toLowerCase()}>
            <div className={styles.queueNo}>{i + 1}</div>
            <div>
              <strong>{a.title}</strong>
              <span>{a.detail}</span>
            </div>
            <Badge tone={a.priority === "P1" ? "blue" : "neutral"}>{a.priority}</Badge>
          </div>
        ))}
      </article>

      <SectionTitle title="4 · Content plan" sub="Channel, cadence, target and why it's on the list." />
      <article className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Cadence</th>
              <th>Target</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            {phase.content.map((row, i) => (
              <tr key={`${row.target}-${i}`} data-search={`${row.channel} ${row.target} ${row.rationale}`.toLowerCase()}>
                <td>
                  <Badge tone="neutral">{row.channel}</Badge>
                </td>
                <td className={styles.muted}>{row.cadence}</td>
                <td style={{ fontWeight: 600 }}>{row.target}</td>
                <td className={styles.muted}>{row.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
