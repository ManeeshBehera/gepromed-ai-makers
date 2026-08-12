"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./organic.module.css";
import {
  META,
  LEADERBOARD,
  LEADERBOARD_NOTE,
  TOPICS,
  MODELS,
  WEEKLY_TREND,
  DAILY_SPARKLINE,
  CITATIONS,
  CITATIONS_TOTAL_DOMAINS,
  SENTIMENT,
  PROMPTS_ACTIVE,
  AI_ANSWERS_ANALYZED,
  PROMPT_INSIGHT,
  AHREFS_READY,
  GSC_READY,
  ORGANIC_PULL_LIST,
  AHREFS_SNAPSHOT,
  AHREFS_TREND,
  AHREFS_TOP_PAGES,
  AHREFS_COMPETITORS,
  AHREFS_COMPETITORS_NOTE,
  GSC_SUMMARY,
  GSC_DAILY,
  GSC_TOP_QUERIES,
  GSC_TOP_PAGES,
  GSC_COUNTRIES,
  GSC_DEVICES,
  ORGANIC_INSIGHT,
} from "@/lib/organicData";

type TabId = "overview" | "visibility" | "citations" | "competitors" | "organic";
const TABS: { id: TabId; label: string; short: string }[] = [
  { id: "overview", label: "Overview", short: "OV" },
  { id: "visibility", label: "AI Visibility", short: "AI" },
  { id: "citations", label: "Citations", short: "CI" },
  { id: "competitors", label: "Competitors", short: "CO" },
  { id: "organic", label: "Organic & Search", short: "OR" },
];

const num = (n: number) => n.toLocaleString("en-US");
const pct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

function Sparkline({ values, tone }: { values: number[]; tone?: "teal" | "green" | "orange" }) {
  const nums = values.filter((v) => Number.isFinite(v));
  if (nums.length < 2) return null;
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = max - min || 1;
  const W = 100;
  const H = 34;
  const pts = nums.map((v, i) => [(i / (nums.length - 1)) * W, H - 3 - ((v - min) / range) * (H - 8)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
  const last = pts[pts.length - 1];
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

function Kpi({
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
    <article
      className={`${styles.card} ${styles.kpi}`}
      data-search={`${label} ${value} ${sub}`.toLowerCase()}
    >
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

function CardTitle({ title, sub, badge }: { title: string; sub?: string; badge?: string }) {
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

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className={styles.sectionTitle}>
      <div>
        <h2>{title}</h2>
        {sub ? <p>{sub}</p> : null}
      </div>
    </div>
  );
}

export default function OrganicReportingPage() {
  const [tab, setTab] = useState<TabId>("overview");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("gepromed-geo-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("gepromed-geo-theme", theme);
  }, [theme]);

  // Same in-page filter pattern as the reference hub: every [data-search] card
  // in the active tab gets hidden unless it matches the query.
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
  }, [tab, query]);

  const leaderboardMax = useMemo(() => Math.max(...LEADERBOARD.map((r) => r.visibility)), []);
  const topicMax = useMemo(() => Math.max(...TOPICS.map((t) => t.visibility)), []);
  const modelMax = useMemo(() => Math.max(...MODELS.map((m) => m.visibility)), []);
  const gapTopic = TOPICS.find((t) => t.visibility === 0);

  return (
    <div className={styles.wrap} data-theme={theme}>
      <div className={styles.app}>
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>G</div>
            <div>
              <strong>GEO Command</strong>
              <span>Gepromed · Organic reporting</span>
            </div>
          </div>
          <div className={styles.navTitle}>Workspace</div>
          <nav className={styles.nav} aria-label="Workspace sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`${styles.navBtn} ${tab === t.id ? styles.navBtnOn : ""}`}
                onClick={() => {
                  setTab(t.id);
                  setSidebarOpen(false);
                }}
                aria-current={tab === t.id ? "page" : undefined}
              >
                <span className={styles.navIcon}>{t.short}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
          <div className={styles.sidebarFoot}>
            <div className={styles.missionCard}>
              <div className={styles.eyebrow}>Mission window</div>
              <strong>{META.mission}</strong>
              <span>
                {META.market} · updated {META.updated}
              </span>
            </div>
            <button className={styles.themeButton} onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
              Switch theme
            </button>
            <a className={styles.legacyLink} href="/dashboard">
              Organizer space →
            </a>
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
              <span>Profound · {META.updated}</span>
            </div>
            <button className={styles.topAction} aria-label="Switch theme" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} title="Switch theme">
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </header>

          <div className={styles.content} ref={contentRef}>
            {tab === "overview" && <Overview leaderboardMax={leaderboardMax} gapTopic={gapTopic} />}
            {tab === "visibility" && <Visibility modelMax={modelMax} topicMax={topicMax} />}
            {tab === "citations" && <Citations />}
            {tab === "competitors" && <Competitors leaderboardMax={leaderboardMax} />}
            {tab === "organic" && <Organic />}
            <div className={`${styles.card} ${styles.empty}`} data-noresults hidden>
              Nothing on this page matches &ldquo;{query}&rdquo;.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Overview({
  leaderboardMax,
  gapTopic,
}: {
  leaderboardMax: number;
  gapTopic: (typeof TOPICS)[number] | undefined;
}) {
  const gepromed = LEADERBOARD[0];
  const runnerUp = LEADERBOARD[1];
  return (
    <section className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <h1>Mission overview</h1>
          <p>
            Gepromed&apos;s standing across AI answers (ChatGPT, Perplexity, Google AI Overviews) for the &ldquo;Formation
            médicale et chirurgicale&rdquo; category — rank, trend, and where the lead is thinnest.
          </p>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.grid4}`}>
        <Kpi
          label="AI voice · Formation chirurgicale"
          value={pct(gepromed.visibility)}
          sub={`Rank #1 of 10 tracked · avg position ${gepromed.avgPosition.toFixed(2)}`}
          tone="good"
          delta="Leading"
          series={DAILY_SPARKLINE}
          sparkTone="teal"
        />
        <Kpi
          label="Lead over #2 (HelpMeSee)"
          value={`+${(gepromed.visibility - runnerUp.visibility).toFixed(1)}pt`}
          sub={`${runnerUp.name}: ${pct(runnerUp.visibility)} visibility`}
          tone="good"
          delta="Ahead"
        />
        <Kpi
          label="Visibility gap"
          value={gapTopic ? "1 topic" : "0 topics"}
          sub={gapTopic ? gapTopic.name : "No zero-visibility topics"}
          tone="bad"
          delta="Fix"
        />
        <Kpi
          label="AI answers analyzed"
          value={num(AI_ANSWERS_ANALYZED)}
          sub="Last 30 days · 35 active prompts across 7 topics"
          tone="good"
          delta="Tracked"
        />
      </div>

      <SectionTitle title="North star" sub="Defend the #1 spot and close the one topic with zero visibility." />
      <article className={`${styles.card} ${styles.hero}`}>
        <div className={styles.heroMain}>
          <span className={styles.heroKicker}>AI visibility · leading</span>
          <h2>Gepromed is the #1 cited and #1 visible source in its category — the gap to close is DPC financing.</h2>
          <div className={styles.heroCopy}>
            Visibility climbed from {pct(WEEKLY_TREND[0].value)} (21 June) to {pct(WEEKLY_TREND[WEEKLY_TREND.length - 1].value)} (9
            August) across the tracked window. The one topic where Gepromed has no visible answer at all —
            &ldquo;DPC et financement de la formation chirurgicale&rdquo; — is the highest-leverage content gap.
          </div>
          <div className={styles.heroFlow}>
            {WEEKLY_TREND.map((c) => (
              <div className={styles.flowStep} key={c.label}>
                <span>{c.label}</span>
                <strong>{pct(c.value)}</strong>
                <div className={styles.flowBar}>
                  <i style={{ width: `${Math.min(100, (c.value / 50) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroSide}>
          <div className={styles.eyebrow}>Category rank</div>
          <div
            className={styles.scoreRing}
            style={{ background: `conic-gradient(var(--green) 0 ${(1 / LEADERBOARD.length) * 100}%, var(--surface-3) 0)` }}
          >
            <div>
              <strong>#1</strong>
              <span>of {LEADERBOARD.length} tracked</span>
            </div>
          </div>
          <div className={styles.legendList}>
            <div className={styles.legendRow}>
              <i className={styles.legendDot} style={{ background: "var(--blue)" }} />
              <span>Visibility score</span>
              <strong>{pct(gepromed.visibility)}</strong>
            </div>
            <div className={styles.legendRow}>
              <i className={styles.legendDot} style={{ background: "var(--teal)" }} />
              <span>Share of voice</span>
              <strong>{pct(gepromed.shareOfVoice)}</strong>
            </div>
            <div className={styles.legendRow}>
              <i className={styles.legendDot} style={{ background: "var(--green)" }} />
              <span>Positive sentiment</span>
              <strong>{pct(SENTIMENT.positive)}</strong>
            </div>
          </div>
        </div>
      </article>

      <SectionTitle title="Beachheads · topics" sub="Visibility per tracked topic — bigger bar is a stronger presence." />
      <div className={`${styles.grid} ${styles.grid2}`}>
        {TOPICS.map((t) => (
          <article className={`${styles.card} ${styles.cardPad}`} key={t.id} data-search={`${t.name}`.toLowerCase()}>
            <CardTitle
              title={t.name}
              sub={t.avgPosition != null ? `Avg. position ${t.avgPosition.toFixed(2)}` : "No tracked mention yet"}
              badge={t.visibility === 0 ? "Gap" : `${t.visibility.toFixed(0)}%`}
            />
            <div className={styles.barTrack} style={{ marginTop: 6 }}>
              <i style={{ width: `${Math.max(2, (t.visibility / leaderboardMax > 1 ? 100 : (t.visibility / 80) * 100))}%`, background: t.visibility === 0 ? "var(--red)" : undefined }} />
            </div>
            <p className={styles.footnote}>
              {t.visibility === 0
                ? "No AI answer currently mentions Gepromed for this topic — build a dedicated DPC/funding page."
                : `Share of voice ${pct(t.shareOfVoice)} within the topic.`}
            </p>
          </article>
        ))}
      </div>

      <SectionTitle title="Two different search games" sub="AI answers vs. classic Google organic — see the Organic & Search tab for the full breakdown." />
      <article className={`${styles.card} ${styles.cardPad}`}>
        <p style={{ color: "var(--ink-2)", fontSize: "13px", lineHeight: 1.6 }}>{ORGANIC_INSIGHT}</p>
      </article>
    </section>
  );
}

function Visibility({ modelMax, topicMax }: { modelMax: number; topicMax: number }) {
  return (
    <section className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <h1>AI visibility</h1>
          <p>Where the visibility comes from — by model, by topic — and the full category leaderboard behind the #1 rank.</p>
        </div>
        <div className={styles.pageActions}>
          <span className={styles.control}>{PROMPTS_ACTIVE} active prompts</span>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.grid3}`}>
        <Kpi
          label="Google AI Overviews"
          value={pct(MODELS[0].visibility)}
          sub={`Avg. position ${MODELS[0].avgPosition.toFixed(2)}`}
          tone="good"
          delta="Strongest"
        />
        <Kpi
          label="Perplexity"
          value={pct(MODELS[1].visibility)}
          sub={`Avg. position ${MODELS[1].avgPosition.toFixed(2)}`}
          tone="good"
          delta="Solid"
        />
        <Kpi
          label="ChatGPT"
          value={pct(MODELS[2].visibility)}
          sub={`Avg. position ${MODELS[2].avgPosition.toFixed(2)}`}
          tone="warn"
          delta="Weakest engine"
        />
      </div>

      <SectionTitle title="Visibility by model" sub="Longer bar is a stronger presence in that engine's answers." />
      <article className={`${styles.card} ${styles.cardPad}`}>
        <div className={styles.barList}>
          {MODELS.map((m) => (
            <div className={styles.barRow} key={m.name}>
              <label>{m.name}</label>
              <span className={styles.barTrack}>
                <i style={{ width: `${(m.visibility / modelMax) * 100}%` }} />
              </span>
              <b>{pct(m.visibility)}</b>
            </div>
          ))}
        </div>
        <p className={styles.footnote}>ChatGPT trails Google AI Overviews by {(MODELS[0].visibility - MODELS[2].visibility).toFixed(1)} points — the cheapest place to invest next.</p>
      </article>

      <SectionTitle title="Visibility by topic" sub="Same 30-day window, split across the 7 tracked topics." />
      <article className={`${styles.card} ${styles.cardPad}`}>
        <div className={styles.barList}>
          {TOPICS.map((t) => (
            <div className={styles.barRow} key={t.id}>
              <label title={t.name}>{t.name}</label>
              <span className={styles.barTrack}>
                <i style={{ width: `${Math.max(2, (t.visibility / topicMax) * 100)}%`, background: t.visibility === 0 ? "var(--red)" : undefined }} />
              </span>
              <b>{pct(t.visibility, 0)}</b>
            </div>
          ))}
        </div>
      </article>

      <SectionTitle title="Category leaderboard" sub="All tracked assets, ranked by visibility score (scope: all)." />
      <article className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Asset</th>
              <th className={styles.num}>Visibility</th>
              <th className={styles.num}>Share of voice</th>
              <th className={styles.num}>Avg. position</th>
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD.map((r) => (
              <tr key={r.name} data-search={r.name.toLowerCase()}>
                <td className={styles.muted}>{r.rank}</td>
                <td>
                  {r.name}
                  {r.owned ? <span className={`${styles.badge} ${styles.badgeGood}`} style={{ marginLeft: 8 }}>Gepromed</span> : null}
                </td>
                <td className={styles.num}>{pct(r.visibility)}</td>
                <td className={styles.num}>{pct(r.shareOfVoice)}</td>
                <td className={styles.num}>{r.avgPosition.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <div className={styles.noteBox}>
        <strong>Data note:</strong> {LEADERBOARD_NOTE}
      </div>

      <SectionTitle title="Sentiment" sub="Share of AI answers mentioning Gepromed that read positive vs. negative." />
      <div className={`${styles.grid} ${styles.grid2}`}>
        <article className={`${styles.card} ${styles.cardPad}`}>
          {CardTitle({ title: "Overall sentiment", sub: "Last 30 days" })}
          <div className={styles.kpiValue} style={{ fontSize: 40 }}>
            {pct(SENTIMENT.positive)}
          </div>
          <p style={{ color: "var(--ink-2)" }}>positive · {pct(SENTIMENT.negative)} negative</p>
          <div className={styles.barTrack} style={{ marginTop: 12 }}>
            <i style={{ width: `${SENTIMENT.positive}%`, background: "var(--green)" }} />
          </div>
        </article>
        <article className={`${styles.card} ${styles.cardPad}`}>
          {CardTitle({ title: "Prompt design", sub: `${PROMPTS_ACTIVE} active prompts` })}
          <p style={{ color: "var(--ink-2)", fontSize: "13px" }}>{PROMPT_INSIGHT}</p>
        </article>
      </div>
    </section>
  );
}

function Citations() {
  const owned = CITATIONS.find((c) => c.category === "owned");
  return (
    <section className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <h1>Citations & sources</h1>
          <p>Which domains AI engines actually cite when answering questions in this category.</p>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.grid4}`}>
        <Kpi label="gepromed.com rank" value={`#${owned?.rank ?? "-"}`} sub="Most-cited domain in the category" tone="good" delta="Owned" />
        <Kpi label="Citation share" value={pct(owned?.share ?? 0)} sub={`${num(owned?.count ?? 0)} citations in window`} tone="good" delta="Live" />
        <Kpi label="Domains cited" value={num(CITATIONS_TOTAL_DOMAINS)} sub="Across the whole category watch" tone="good" delta="Mapped" />
        <Kpi label="Competitor citations" value={`${CITATIONS.find((c) => c.category === "competition")?.count ?? 0}`} sub="ircad.fr · tracked head-to-head rival" tone="warn" delta="Watch" />
      </div>

      <SectionTitle title="Most-cited domains" sub="Ranked by citation share across ChatGPT, Perplexity and Google AI Overviews." />
      <article className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Domain</th>
              <th>Category</th>
              <th className={styles.num}>Citations</th>
              <th className={styles.num}>Share</th>
            </tr>
          </thead>
          <tbody>
            {CITATIONS.map((c) => (
              <tr key={c.domain} data-search={`${c.domain} ${c.category}`}>
                <td className={styles.muted}>{c.rank}</td>
                <td className={c.category === "owned" ? undefined : styles.mono}>{c.domain}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      c.category === "owned" ? styles.badgeGood : c.category === "competition" ? styles.badgeBad : styles.badgeNeutral
                    }`}
                  >
                    {c.category.replace(/_/g, " ")}
                  </span>
                </td>
                <td className={styles.num}>{num(c.count)}</td>
                <td className={styles.num}>{pct(c.share, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <p className={styles.footnote}>
        college-vasculaire.com (rank 4, 93 citations) and agencedpc.fr (rank 5, 69 citations) out-cite most named competitors — both are
        candidate link/partnership targets once the Ahrefs backlink pull lands.
      </p>
    </section>
  );
}

function Competitors({ leaderboardMax }: { leaderboardMax: number }) {
  const rivals = LEADERBOARD.filter((r) => !r.owned);
  return (
    <section className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <h1>Competitor watch</h1>
          <p>
            The 9 tracked rivals in Gepromed&apos;s AI-visibility category. The Ahrefs pull covered gepromed.com itself, not
            these rivals&apos; domains — their Domain Rating would need its own site-explorer-domain-rating call per domain.
          </p>
        </div>
      </div>

      <div className={`${styles.grid} ${styles.grid4}`}>
        <Kpi label="Competitors tracked" value={`${rivals.length}`} sub="Priority competitive set" tone="good" delta="Tracked" />
        <Kpi label="Nearest rival" value={rivals[0].name} sub={`${pct(rivals[0].visibility)} visibility`} tone="warn" delta="Watch" />
        <Kpi label="Named head-to-head" value="IRCAD" sub="Only rival benchmarked in every topic's prompts" tone="warn" delta="Priority" />
        <Kpi label="Rivals' DR / traffic" value="Not pulled" sub="helpmesee.org, escrs.org, ircad.fr et al. — separate Ahrefs calls" tone="bad" delta="To do" />
      </div>

      <SectionTitle title="Competitive set" sub="Visibility, share of voice and average position from Profound." />
      <div className={`${styles.grid} ${styles.grid2}`}>
        {rivals.map((r) => (
          <article className={`${styles.card} ${styles.cardPad}`} key={r.name} data-search={r.name.toLowerCase()}>
            <CardTitle title={r.name} sub={`Rank #${r.rank} in category`} badge={pct(r.visibility)} />
            <div style={{ display: "flex", gap: 18, margin: "14px 0" }}>
              <div>
                <div className={styles.eyebrow}>Share of voice</div>
                <strong>{pct(r.shareOfVoice)}</strong>
              </div>
              <div>
                <div className={styles.eyebrow}>Avg. position</div>
                <strong>{r.avgPosition.toFixed(2)}</strong>
              </div>
              <div>
                <div className={styles.eyebrow}>Domain Rating</div>
                <strong className={styles.muted}>—</strong>
              </div>
            </div>
            <div className={styles.barTrack}>
              <i style={{ width: `${(r.visibility / leaderboardMax) * 100}%` }} />
            </div>
          </article>
        ))}
      </div>
      <div className={styles.noteBox}>
        <strong>Data note:</strong> {LEADERBOARD_NOTE}
      </div>
    </section>
  );
}

function Organic() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const text = ORGANIC_PULL_LIST.map((p, i) => `${i + 1}. ${p.label} — ${p.detail}`).join("\n");
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (!AHREFS_READY || !GSC_READY) {
    return (
      <section className={styles.page}>
        <div className={styles.pageHead}>
          <div>
            <h1>Organic & search</h1>
            <p>Ahrefs and Google Search Console data for gepromed.com. Nothing loaded yet — this is the exact pull list.</p>
          </div>
          <div className={styles.pageActions}>
            <button className={styles.control} onClick={copy}>
              {copied ? "Copied" : "Copy pull list"}
            </button>
          </div>
        </div>
        <article className={`${styles.card} ${styles.cardPad}`}>
          <CardTitle title="Ahrefs / GSC — not loaded" sub="No API credits were available when this was built" badge={`${ORGANIC_PULL_LIST.length} items`} />
          <div className={styles.pullList}>
            {ORGANIC_PULL_LIST.map((p, i) => (
              <div className={styles.pullRow} key={p.label}>
                <b>{i + 1}</b>
                <div>
                  <b>{p.label}</b>
                  <p>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    );
  }

  const trendMax = Math.max(...AHREFS_TREND.map((t) => t.traffic));
  const gscMax = Math.max(...GSC_DAILY.map((d) => d.impressions));

  return (
    <section className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <h1>Organic & search</h1>
          <p>Ahrefs (*.gepromed.com/*) and Google Search Console (gepromed.com property) — pulled 12 Aug 2026.</p>
        </div>
      </div>

      <div className={styles.noteBox}>
        <strong>Reality check:</strong> {ORGANIC_INSIGHT}
      </div>

      <SectionTitle title="Ahrefs snapshot" sub="Domain-level health, all-time." />
      <div className={`${styles.grid} ${styles.grid4}`}>
        <Kpi label="Domain Rating" value={`${AHREFS_SNAPSHOT.domainRating}`} sub={`Health score ${AHREFS_SNAPSHOT.healthScore}/100`} tone="warn" delta="Thin" />
        <Kpi label="Referring domains" value={num(AHREFS_SNAPSHOT.referringDomains)} sub="109 of these point at the homepage alone" tone="good" delta="Concentrated" />
        <Kpi label="Organic keywords" value={`${AHREFS_SNAPSHOT.organicKeywords}`} sub={`${AHREFS_SNAPSHOT.trackedKeywordsFR} FR · ${AHREFS_SNAPSHOT.trackedKeywordsUS} US tracked`} tone="bad" delta="Near zero" />
        <Kpi label="Est. organic traffic" value={`${AHREFS_SNAPSHOT.organicTrafficMonthly}/mo`} sub="Ahrefs' own monthly estimate, all locations" tone="bad" delta="Near zero" />
      </div>

      <SectionTitle title="Organic keywords & traffic — 6 months" sub="Every ranking keyword, any position, summed daily." />
      <article className={`${styles.card} ${styles.cardPad}`}>
        <div className={styles.barList}>
          {AHREFS_TREND.map((t) => (
            <div className={styles.barRow} key={t.date}>
              <label>{t.date}</label>
              <span className={styles.barTrack}>
                <i style={{ width: `${Math.max(3, (t.traffic / trendMax) * 100)}%`, background: "var(--orange)" }} />
              </span>
              <b>{t.keywords} kw</b>
            </div>
          ))}
        </div>
        <p className={styles.footnote}>Peaked at 4 keywords / ~11 monthly visits in March, currently 2 keywords / ~2 visits.</p>
      </article>

      <SectionTitle title="Top pages by referring domains" sub="Only the homepage carries any external links." />
      <article className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Page</th>
              <th className={styles.num}>UR</th>
              <th className={styles.num}>Referring domains</th>
              <th className={styles.num}>Keywords</th>
            </tr>
          </thead>
          <tbody>
            {AHREFS_TOP_PAGES.map((p) => (
              <tr key={p.url}>
                <td className={styles.mono}>{p.url}</td>
                <td className={styles.num}>{p.ur}</td>
                <td className={styles.num}>{p.referringDomains || <span className={styles.muted}>0</span>}</td>
                <td className={styles.num}>{p.keywords}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <SectionTitle title="Organic competitors (Ahrefs)" sub="Algorithmic match by keyword overlap." />
      <article className={`${styles.card} ${styles.tableWrap}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Domain</th>
              <th className={styles.num}>DR</th>
              <th className={styles.num}>Common keywords</th>
            </tr>
          </thead>
          <tbody>
            {AHREFS_COMPETITORS.map((c) => (
              <tr key={c.domain}>
                <td className={styles.mono}>{c.domain}</td>
                <td className={styles.num}>{c.dr}</td>
                <td className={styles.num}>{c.commonKeywords}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <div className={styles.noteBox}>
        <strong>Data note:</strong> {AHREFS_COMPETITORS_NOTE}
      </div>

      <SectionTitle title="Google Search Console" sub={GSC_SUMMARY.windowLabel} />
      <div className={`${styles.grid} ${styles.grid4}`}>
        <Kpi label="Clicks" value={num(GSC_SUMMARY.clicks)} sub={`${num(GSC_SUMMARY.impressions)} impressions`} tone="good" delta="Real" series={GSC_DAILY.map((d) => d.clicks)} sparkTone="green" />
        <Kpi label="CTR" value={pct(GSC_SUMMARY.ctr)} sub="Organic click-through rate" tone="warn" delta="Live" />
        <Kpi label="Avg. position" value={GSC_SUMMARY.avgPosition.toFixed(2)} sub="Impression-weighted, lower is better" tone="warn" delta="Live" />
        <Kpi label="Branded share" value={pct(GSC_SUMMARY.brandedShareOfDisclosed)} sub={`${num(GSC_SUMMARY.brandedClicks)} of disclosed clicks are on "gepromed"`} tone="bad" delta="Navigational" />
      </div>

      <SectionTitle title="Daily clicks & impressions" sub="Sampled from the 41-day export." />
      <article className={`${styles.card} ${styles.cardPad}`}>
        <div className={styles.barList}>
          {GSC_DAILY.map((d) => (
            <div className={styles.barRow} key={d.date}>
              <label>{d.date}</label>
              <span className={styles.barTrack}>
                <i style={{ width: `${Math.max(3, (d.impressions / gscMax) * 100)}%` }} />
              </span>
              <b>{d.clicks} clicks</b>
            </div>
          ))}
        </div>
      </article>

      <div className={`${styles.grid} ${styles.grid2} ${styles.alignStart}`}>
        <article className={`${styles.card} ${styles.tableWrap}`}>
          {CardTitle({ title: "Top queries", sub: "By clicks — the rest of the export is 0-click long-tail" })}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Query</th>
                <th className={styles.num}>Clicks</th>
                <th className={styles.num}>Impr.</th>
                <th className={styles.num}>Pos.</th>
              </tr>
            </thead>
            <tbody>
              {GSC_TOP_QUERIES.map((q) => (
                <tr key={q.query}>
                  <td>{q.query}</td>
                  <td className={styles.num}>{q.clicks}</td>
                  <td className={styles.num}>{num(q.impressions)}</td>
                  <td className={styles.num}>{q.position.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className={`${styles.card} ${styles.tableWrap}`}>
          {CardTitle({ title: "Top pages", sub: "By real search clicks (GSC, not Ahrefs)" })}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Page</th>
                <th className={styles.num}>Clicks</th>
                <th className={styles.num}>Impr.</th>
              </tr>
            </thead>
            <tbody>
              {GSC_TOP_PAGES.map((p) => (
                <tr key={p.url}>
                  <td className={styles.mono}>{p.url}</td>
                  <td className={styles.num}>{p.clicks}</td>
                  <td className={styles.num}>{num(p.impressions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>

      <SectionTitle title="Countries & devices" sub="Where real search traffic comes from." />
      <div className={`${styles.grid} ${styles.grid2} ${styles.alignStart}`}>
        <article className={`${styles.card} ${styles.cardPad}`}>
          {CardTitle({ title: "Top countries" })}
          <div className={styles.barList}>
            {GSC_COUNTRIES.map((c) => (
              <div className={styles.barRow} key={c.country}>
                <label>{c.country}</label>
                <span className={styles.barTrack}>
                  <i style={{ width: `${Math.max(3, (c.clicks / GSC_COUNTRIES[0].clicks) * 100)}%` }} />
                </span>
                <b>{c.clicks}</b>
              </div>
            ))}
          </div>
        </article>
        <article className={`${styles.card} ${styles.cardPad}`}>
          {CardTitle({ title: "By device" })}
          <div className={styles.barList}>
            {GSC_DEVICES.map((d) => (
              <div className={styles.barRow} key={d.device}>
                <label>{d.device}</label>
                <span className={styles.barTrack}>
                  <i style={{ width: `${Math.max(3, (d.clicks / GSC_DEVICES[0].clicks) * 100)}%`, background: "var(--teal)" }} />
                </span>
                <b>{d.clicks}</b>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
