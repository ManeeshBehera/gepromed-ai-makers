/* Gepromed — 90-Day Attack Plan — data layer.
 *
 * Baselines below are the real Day-0 numbers already on the Growth Command
 * Center (see lib/organicData.ts) — this file doesn't invent metrics, it
 * targets the ones already tracked. Cadence targets (off-page/on-page blogs,
 * Reddit mentions, manual/automated backlinks) are the brief as given;
 * content-plan topics are tied to real gaps already surfaced in the data:
 * the one zero-visibility Profound topic (DPC financing), and the GSC
 * queries that rank with real impressions but convert at or near zero
 * clicks (esvb, explants, MSICS/phaco, vitrectomie).
 */

export type Baseline = {
  aiVisibility: number; // % — Profound, LEADERBOARD[0].visibility
  chatgptVisibility: number; // % — MODELS[2].visibility
  dpcVisibility: number; // % — TOPICS "dpc" row
  domainRating: number;
  referringDomains: number;
  organicKeywords: number;
  brandedShare: number; // % of disclosed GSC clicks
};

export const BASELINE: Baseline = {
  aiVisibility: 42.9,
  chatgptVisibility: 26.0,
  dpcVisibility: 0,
  domainRating: 15,
  referringDomains: 221,
  organicKeywords: 2,
  brandedShare: 95.7,
};

export type CadenceTarget = {
  channel: string;
  steadyState: string; // the brief, verbatim
  detail: string;
};

// The brief, as given — the steady-state cadence every phase ramps toward.
export const CADENCE_TARGETS: CadenceTarget[] = [
  { channel: "Off-page blogs", steadyState: "~5 / week", detail: "Guest posts and syndicated articles placed on external sites" },
  { channel: "On-page blogs", steadyState: "~2–3 / week", detail: "Published on gepromed.com, targeting top-priority keywords" },
  { channel: "Reddit mentions", steadyState: ">5 / month", detail: "Organic community mentions — a real lever for AI-engine citations" },
  { channel: "Manual backlinks", steadyState: ">10 / month", detail: "DR 20+ only, via manual outreach and posting" },
  { channel: "Automated backlinks", steadyState: ">20 / month", detail: "Directories, registries and aggregators on relevant sites" },
];

export type KpiRow = {
  metric: string;
  baseline: string;
  target: string;
  type: "Activity" | "Outcome";
};

export type ActionItem = {
  title: string;
  detail: string;
  priority: "P1" | "P2";
};

export type ContentRow = {
  channel: string;
  cadence: string;
  target: string;
  rationale: string;
};

export type Phase = {
  id: "30" | "60" | "90";
  label: string;
  short: string;
  window: string;
  headline: string;
  objective: string;
  heroKpis: { label: string; value: string; sub: string; tone: "good" | "warn" | "bad"; delta: string }[];
  kpiTable: KpiRow[];
  actions: ActionItem[];
  content: ContentRow[];
};

export const PHASES: Phase[] = [
  {
    id: "30",
    label: "30-Day",
    short: "D30",
    window: "Day 1–30 · Foundation",
    headline: "Stand up the production pipeline and ship the single highest-leverage fix.",
    objective:
      "Build the editorial calendar, backlink prospect list and Reddit presence at a ramping cadence (not full speed yet — the pipeline has to exist before it can run at 5 off-page posts a week). In parallel, ship the one fix the dashboard already flags as highest-leverage: a dedicated DPC-financing page, since \"DPC et financement de la formation chirurgicale\" is the only topic where Gepromed has zero tracked AI visibility. Close two more on-page gaps where Gepromed already ranks with real impressions but converts at or near zero clicks (esvb, explants).",
    heroKpis: [
      { label: "On-page blogs shipped", value: "6–8", sub: "1–2/week ramp, weeks 1–4", tone: "good", delta: "Ramp" },
      { label: "Off-page blogs placed", value: "10–12", sub: "2–3/week ramp, 3 seed partners", tone: "good", delta: "Ramp" },
      { label: "DPC visibility", value: "0% → 1st mention", sub: "Pillar page ships week 1", tone: "bad", delta: "P1" },
      { label: "AI visibility held", value: "≥42.9%", sub: "Defend #1 while shipping changes", tone: "good", delta: "Defend" },
    ],
    kpiTable: [
      { metric: "Off-page blogs", baseline: "0", target: "10–12 cumulative", type: "Activity" },
      { metric: "On-page blogs", baseline: "0", target: "6–8 cumulative", type: "Activity" },
      { metric: "Reddit mentions", baseline: "0", target: "3+ cumulative", type: "Activity" },
      { metric: "Manual backlinks (DR20+)", baseline: "0", target: "5+ cumulative", type: "Activity" },
      { metric: "Automated backlinks", baseline: "0", target: "10+ cumulative", type: "Activity" },
      { metric: "AI visibility (Profound)", baseline: "42.9%", target: "Hold ≥42.9%, rank #1", type: "Outcome" },
      { metric: "DPC financing topic visibility", baseline: "0%", target: "First tracked mention", type: "Outcome" },
      { metric: "Organic keywords (Ahrefs)", baseline: "2", target: "5+", type: "Outcome" },
      { metric: "Domain Rating", baseline: "15", target: "15–16 (early signal only)", type: "Outcome" },
    ],
    actions: [
      { title: "Publish the DPC-financing pillar page", detail: "Target \"financement DPC formation chirurgicale\" — the only 0%-visibility topic on the dashboard. Pitch agencedpc.fr as a syndication/partnership target once live.", priority: "P1" },
      { title: "Build the backlink prospect list", detail: "40+ DR20+ medical, education and association domains — French medical societies, CHU pages, Qualiopi directories.", priority: "P1" },
      { title: "Stand up the off-page syndication pipeline", detail: "Lock 3 seed publications/partners for a steady weekly off-page slot, starting with the domains already citing Gepromed's category: college-vasculaire.com, agencedpc.fr, escrs.org.", priority: "P1" },
      { title: "Create the Reddit presence", detail: "Verified account, warm-up participation in r/medicine, r/surgery, r/ophthalmology and r/medecine before any promotional posting.", priority: "P1" },
      { title: "Ship the two clearest on-page fixes", detail: "\"esvb\" (189 impressions, position 4.41, 2 clicks) and \"analyse d'explants vasculaires\" (103 combined impressions, 0 clicks) — both already rank, neither is optimized.", priority: "P2" },
      { title: "Turn on automated backlink submissions", detail: "Healthcare directories, Qualiopi-certified training registries, conference aggregators.", priority: "P2" },
      { title: "Lock the month 2–3 editorial calendar", detail: "So on-page cadence can jump straight to 2–3/week in month 2 with no gap.", priority: "P2" },
    ],
    content: [
      { channel: "On-page blog", cadence: "Week 1", target: "Financement DPC formation chirurgicale (pillar)", rationale: "Closes the only 0%-visibility Profound topic" },
      { channel: "On-page blog", cadence: "Week 2", target: "ESVB 2026 : programme, tarifs et inscription", rationale: "189 impressions, position 4.41, only 2 clicks — ranks, isn't optimized" },
      { channel: "On-page blog", cadence: "Week 3", target: "Analyse d'explants vasculaires : guide complet", rationale: "103 combined impressions across explant/explants queries, 0 clicks" },
      { channel: "On-page blog", cadence: "Week 4", target: "MSICS vs phacoémulsification : quelle formation choisir", rationale: "36 + 22 + 19 impressions across related queries, 0 clicks" },
      { channel: "Off-page blog", cadence: "2–3/week", target: "college-vasculaire.com, agencedpc.fr, escrs.org", rationale: "Rank #4–6 in citation share for this category, zero Gepromed backlinks today" },
      { channel: "Reddit", cadence: "Seed", target: "r/medicine, r/surgery, r/medecine — supervisor-led intro thread", rationale: "Warm-up before any promotional posting; Reddit content is heavily cited by AI engines" },
      { channel: "Manual backlink", cadence: "5+/month", target: "French medical societies, CHU partner pages, Qualiopi directories", rationale: "DR20+ requirement met by teaching-hospital and association domains" },
      { channel: "Automated backlink", cadence: "10+/month", target: "Healthcare directories, training registries, conference aggregators", rationale: "Lowest-effort volume channel — turn on early, let it run" },
    ],
  },
  {
    id: "60",
    label: "60-Day",
    short: "D60",
    window: "Day 31–60 · Full cadence",
    headline: "Hit full steady-state velocity and start compounding month 1's backlinks.",
    objective:
      "Every channel moves to its steady-state cadence — 5 off-page posts a week, 2–3 on-page, and Reddit/backlink volume ramping to the brief's monthly targets. On-page content extends to the remaining beachhead gaps (vitrectomy, phaco training), and month 1's backlink placements get their first impact review: which DR20+ links actually moved rankings, and which don't get renewed.",
    heroKpis: [
      { label: "On-page blogs (cumulative)", value: "16–18", sub: "Full 2–3/week from week 5", tone: "good", delta: "Full pace" },
      { label: "Off-page blogs (cumulative)", value: "~30", sub: "Full 5/week from week 5", tone: "good", delta: "Full pace" },
      { label: "Domain Rating", value: "18–20", sub: "From 15 baseline", tone: "good", delta: "+3–5" },
      { label: "ChatGPT visibility", value: "32%+", sub: "From 26.0% baseline — weakest engine", tone: "warn", delta: "Close gap" },
    ],
    kpiTable: [
      { metric: "Off-page blogs", baseline: "10–12 (Day 30)", target: "~30 cumulative", type: "Activity" },
      { metric: "On-page blogs", baseline: "6–8 (Day 30)", target: "16–18 cumulative", type: "Activity" },
      { metric: "Reddit mentions", baseline: "3+ (Day 30)", target: "8+ cumulative", type: "Activity" },
      { metric: "Manual backlinks (DR20+)", baseline: "5+ (Day 30)", target: "15+ cumulative", type: "Activity" },
      { metric: "Automated backlinks", baseline: "10+ (Day 30)", target: "30+ cumulative", type: "Activity" },
      { metric: "Domain Rating", baseline: "15", target: "18–20", type: "Outcome" },
      { metric: "Referring domains", baseline: "221 (109 → homepage only)", target: "240+, spread beyond the homepage", type: "Outcome" },
      { metric: "ChatGPT visibility", baseline: "26.0%", target: "32%+", type: "Outcome" },
      { metric: "Organic keywords (Ahrefs)", baseline: "5+ (Day 30)", target: "12+", type: "Outcome" },
    ],
    actions: [
      { title: "Scale off-page to full 5/week", detail: "Add 3 more syndication partners beyond the month-1 seed set to sustain volume without quality loss.", priority: "P1" },
      { title: "Scale on-page to 2–3/week on remaining gaps", detail: "Consolidate the vitrectomie query family (vitrectomie, vitréotome, vitrectomie antérieure — several 0-click variants at positions 8–90) and phacoemulsification training/course (41 combined impressions, 0 clicks, position ~16) into two authoritative pages.", priority: "P1" },
      { title: "Run the first backlink-impact review", detail: "Audit which month-1 DR20+ placements actually moved keyword rankings or DR. Double down on what worked, drop what didn't.", priority: "P1" },
      { title: "Move Reddit from seeding to sustained weekly participation", detail: "Plus one supervisor-led AMA in r/surgery or r/medicine.", priority: "P1" },
      { title: "Pitch content partnerships to the citation-gap domains", detail: "college-vasculaire.com and helpmesee.org both cite Gepromed's category heavily but not Gepromed itself.", priority: "P2" },
      { title: "Expand automated backlinks to English-language directories", detail: "The /en pages already pull real US/UK GSC impressions — give them the same automated-link support as the French pages.", priority: "P2" },
    ],
    content: [
      { channel: "On-page blog", cadence: "2–3/week", target: "Vitrectomie : indications et formation pratique (consolidated)", rationale: "5+ query variants, all 0-click, positions 8–90 — one authoritative page beats five thin ones" },
      { channel: "On-page blog", cadence: "2–3/week", target: "Formation phacoémulsification : programme et certification", rationale: "41 combined impressions across phaco training/course queries, position ~16, 0 clicks" },
      { channel: "On-page blog", cadence: "2–3/week", target: "Refresh: Bootcamp et simulation vasculaire, Congrès ESVB", rationale: "Already-strong Profound topics (74% and 34% visibility) — defend the lead, don't just chase gaps" },
      { channel: "Off-page blog", cadence: "5/week", target: "English-language surgical-education platforms", rationale: "Supports /en pages already surfacing in US/UK GSC impressions" },
      { channel: "Reddit", cadence: "Weekly + 1 AMA", target: "r/surgery or r/medicine — supervisor AMA", rationale: "Sustained presence past the seeding phase" },
      { channel: "Manual backlink", cadence: "10+/month", target: "French medical schools, CHU partnership pages", rationale: "Same DR20+ bar, deeper into academic/teaching-hospital network" },
      { channel: "Automated backlink", cadence: "20+/month", target: "English-language directories", rationale: "Extends automated volume to match /en organic demand" },
    ],
  },
  {
    id: "90",
    label: "90-Day",
    short: "D90",
    window: "Day 61–90 · Compound & prove ROI",
    headline: "Sustain full cadence, consolidate the gains, and report the 90-day delta.",
    objective:
      "Hold every channel at the brief's steady-state cadence for the full month. Consolidate three months of content and backlinks into a measurable shift away from 96%-branded organic traffic, defend and extend the #1 AI-visibility rank, and close the quarter with a full re-pull of every metric on this dashboard against the Day-0 baseline — the retrospective that sets next quarter's targets.",
    heroKpis: [
      { label: "AI visibility", value: "48%+", sub: "From 42.9% — defend #1, extend the lead", tone: "good", delta: "Extend" },
      { label: "Domain Rating", value: "22–25", sub: "From 15 baseline", tone: "good", delta: "+7–10" },
      { label: "Organic keywords", value: "20+", sub: "From 2 baseline", tone: "good", delta: "10x" },
      { label: "Branded click share", value: "<85%", sub: "From 95.7% of disclosed GSC clicks", tone: "warn", delta: "Diversify" },
    ],
    kpiTable: [
      { metric: "Off-page blogs", baseline: "~30 (Day 60)", target: "55–60 cumulative", type: "Activity" },
      { metric: "On-page blogs", baseline: "16–18 (Day 60)", target: "28–32 cumulative", type: "Activity" },
      { metric: "Reddit mentions", baseline: "8+ (Day 60)", target: "15+ cumulative (>5/mo sustained)", type: "Activity" },
      { metric: "Manual backlinks (DR20+)", baseline: "15+ (Day 60)", target: "30+ cumulative (>10/mo sustained)", type: "Activity" },
      { metric: "Automated backlinks", baseline: "30+ (Day 60)", target: "60+ cumulative (>20/mo sustained)", type: "Activity" },
      { metric: "AI visibility (Profound)", baseline: "42.9%", target: "48%+, rank #1 held", type: "Outcome" },
      { metric: "DPC financing topic visibility", baseline: "0%", target: "Positive and tracked", type: "Outcome" },
      { metric: "ChatGPT visibility", baseline: "26.0%", target: "38%+", type: "Outcome" },
      { metric: "Domain Rating", baseline: "15", target: "22–25", type: "Outcome" },
      { metric: "Referring domains", baseline: "221 (109 → homepage only)", target: "270+, measurable spread beyond the homepage", type: "Outcome" },
      { metric: "Organic keywords (Ahrefs)", baseline: "2", target: "20+", type: "Outcome" },
      { metric: "Branded share of disclosed GSC clicks", baseline: "95.7%", target: "<85%", type: "Outcome" },
    ],
    actions: [
      { title: "Run the full 90-day retrospective", detail: "Re-pull Ahrefs (DR, keywords, referring domains) and the GSC export; compare line-by-line against the Day-0 baseline on this dashboard.", priority: "P1" },
      { title: "Re-run the Profound category pull", detail: "Confirm the #1 rank held, quantify the visibility gain, and confirm the DPC topic moved off zero.", priority: "P1" },
      { title: "Identify the highest-ROI backlink placements", detail: "From the month-2 impact review — renew and expand specifically those partnerships for next quarter rather than spreading evenly.", priority: "P1" },
      { title: "Publish a visibility recap piece", detail: "\"State of AI + organic visibility\" — a natural off-page and Reddit share candidate in its own right, and proof of the program's ROI.", priority: "P2" },
      { title: "Set next-quarter targets from what actually worked", detail: "Not from the original brief's assumptions — from the 90 days of real placement and ranking data.", priority: "P2" },
    ],
    content: [
      { channel: "On-page blog", cadence: "2–3/week", target: "Final beachhead-topic refreshes + DPC FAQ update", rationale: "DPC page updated with the real applicant questions surfaced in months 1–2" },
      { channel: "Off-page blog", cadence: "5/week", target: "Renew top 2 performing partners from the Day-60 review", rationale: "Concentrate volume on the placements the retrospective proves move rankings" },
      { channel: "Reddit", cadence: ">5/month sustained", target: "Weekly participation + second AMA if the first performed", rationale: "Steady-state, not a one-off campaign" },
      { channel: "Manual backlink", cadence: ">10/month sustained", target: "Re-targeted toward the site category with the strongest DR movement", rationale: "Let the Day-60 impact data pick the channel, not the original assumption" },
      { channel: "Automated backlink", cadence: ">20/month sustained", target: "Steady-state across FR + EN directories", rationale: "Maintenance-mode volume channel by this point" },
    ],
  },
];
