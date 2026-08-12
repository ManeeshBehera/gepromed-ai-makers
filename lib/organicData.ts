/* Gepromed — GEO / organic reporting hub — data layer.
 *
 * Everything under `profound` below is a REAL snapshot pulled live from the
 * Profound MCP on 2026-08-12, scoped to the "Formation médicale et
 * chirurgicale" category (AI Makers org). Nothing here is invented — dates,
 * scores and domains are exactly what the API returned. Two things ARE
 * editorial: (1) the `insight` / `note` strings, which are this file's
 * author's read of the numbers, and (2) `ahrefs`/`gsc`, which are left
 * empty on purpose — no Ahrefs credits were available when this was built,
 * and no GSC export exists yet for gepromed.com. See ORGANIC_PULL_LIST for
 * exactly what to bring back.
 *
 * To refresh: re-run the same Profound MCP calls (list_prompts,
 * get_visibility_report, get_citations_report, get_sentiment_report) for
 * category_id 831e7990-4ce0-46cd-a5a0-7a8bbe874063 and replace the values
 * below. There is no generator script yet — unlike the Sage reference hub,
 * this is hand-updated until it's worth automating.
 */

export type Meta = {
  mission: string;
  category: string;
  market: string;
  updated: string;
  models: string;
  owners: string;
};

export const META: Meta = {
  mission: "Gepromed — Formation chirurgicale",
  category: "Formation médicale et chirurgicale (Profound)",
  market: "France / Europe",
  updated: "2026-08-12",
  models: "ChatGPT · Perplexity · Google AI Overviews",
  owners: "AI Makers · Gepromed",
};

export type LeaderboardRow = {
  rank: number;
  name: string;
  owned: boolean;
  visibility: number; // %
  shareOfVoice: number; // %
  avgPosition: number;
};

// get_visibility_report(scope:"all") — 2026-07-13 → 2026-08-12, 423 AI answers analyzed.
export const LEADERBOARD: LeaderboardRow[] = [
  { rank: 1, name: "Gepromed", owned: true, visibility: 42.89, shareOfVoice: 13.19, avgPosition: 1.65 },
  { rank: 2, name: "HelpMeSee", owned: false, visibility: 11.2, shareOfVoice: 3.45, avgPosition: 2.18 },
  { rank: 3, name: "Collège Français de Chirurgie Vasculaire et Endovasculaire", owned: false, visibility: 8.0, shareOfVoice: 2.25, avgPosition: 1.96 },
  { rank: 4, name: "ESCRS", owned: false, visibility: 7.29, shareOfVoice: 2.14, avgPosition: 2.12 },
  { rank: 5, name: "European Society for Vascular Surgery", owned: false, visibility: 6.68, shareOfVoice: 1.81, avgPosition: 2.11 },
  { rank: 6, name: "CFCVE", owned: false, visibility: 5.68, shareOfVoice: 1.62, avgPosition: 1.93 },
  { rank: 7, name: "ESVS", owned: false, visibility: 5.23, shareOfVoice: 1.64, avgPosition: 1.74 },
  { rank: 8, name: "Université de Bordeaux", owned: false, visibility: 5.09, shareOfVoice: 1.71, avgPosition: 2.87 },
  { rank: 9, name: "FAF-PM", owned: false, visibility: 4.54, shareOfVoice: 1.43, avgPosition: 2.86 },
  { rank: 10, name: "IRCAD", owned: false, visibility: 4.52, shareOfVoice: 1.35, avgPosition: 2.54 },
];

// Data-hygiene note surfaced in the UI rather than silently fixed.
export const LEADERBOARD_NOTE =
  "Rank 3/6 (“Collège Français de Chirurgie Vasculaire et Endovasculaire” / “CFCVE”) and rank 5/7 (“European Society for Vascular Surgery” / “ESVS”) look like the same two competitors tracked under both their full name and acronym — worth merging as Profound assets so their share of voice isn't split in two.";

export type TopicRow = {
  id: string;
  name: string;
  visibility: number; // %
  shareOfVoice: number; // %
  avgPosition: number | null;
};

// get_visibility_report(scope:"owned", group_by:["topic"]) — same window.
export const TOPICS: TopicRow[] = [
  { id: "bootcamp", name: "Bootcamp et simulation vasculaire", visibility: 73.84, shareOfVoice: 24.12, avgPosition: 1.09 },
  { id: "ophtalmo", name: "Formation en chirurgie ophtalmologique (cataracte)", visibility: 53.8, shareOfVoice: 15.68, avgPosition: 1.85 },
  { id: "vasculaire", name: "Formation en chirurgie vasculaire", visibility: 51.63, shareOfVoice: 16.03, avgPosition: 1.41 },
  { id: "explants", name: "Analyse d'explants vasculaires", visibility: 41.04, shareOfVoice: 13.02, avgPosition: 2.41 },
  { id: "simulation", name: "Simulation chirurgicale haute fidélité", visibility: 37.52, shareOfVoice: 9.78, avgPosition: 2.21 },
  { id: "esvb", name: "Congrès et symposium en chirurgie vasculaire (ESVB)", visibility: 34.43, shareOfVoice: 13.06, avgPosition: 1.63 },
  { id: "dpc", name: "DPC et financement de la formation chirurgicale", visibility: 0, shareOfVoice: 0, avgPosition: null },
];

export type ModelRow = { name: string; visibility: number; shareOfVoice: number; avgPosition: number };

// get_visibility_report(scope:"owned", group_by:["model"]) — same window.
export const MODELS: ModelRow[] = [
  { name: "Google AI Overviews", visibility: 59.09, shareOfVoice: 14.82, avgPosition: 1.85 },
  { name: "Perplexity", visibility: 43.56, shareOfVoice: 17.25, avgPosition: 1.52 },
  { name: "ChatGPT", visibility: 26.03, shareOfVoice: 7.48, avgPosition: 1.58 },
];

// get_visibility_report(scope:"owned", group_by:["date"], interval:"week") — sparse, 4 weeks with data.
export const WEEKLY_TREND: { label: string; value: number }[] = [
  { label: "21 juin", value: 24.42 },
  { label: "28 juin", value: 28.06 },
  { label: "2 août", value: 41.68 },
  { label: "9 août", value: 44.82 },
];

// get_visibility_report(scope:"owned", group_by:["date"], interval:"day") — last 8 days with data.
export const DAILY_SPARKLINE: number[] = [48.29, 43.0, 36.51, 39.81, 41.89, 47.78, 42.58, 43.85];

export type CitationRow = {
  rank: number;
  domain: string;
  count: number;
  share: number; // %
  category: string;
};

// get_citations_report(scope:"all") — top 15, 496 domains cited in total.
export const CITATIONS: CitationRow[] = [
  { rank: 1, domain: "gepromed.com", count: 429, share: 12.07, category: "owned" },
  { rank: 2, domain: "esvs.org", count: 142, share: 4.67, category: "earned_institutions" },
  { rank: 3, domain: "nih.gov", count: 131, share: 4.29, category: "earned_institutions" },
  { rank: 4, domain: "college-vasculaire.com", count: 93, share: 2.99, category: "other" },
  { rank: 5, domain: "agencedpc.fr", count: 69, share: 2.63, category: "other" },
  { rank: 6, domain: "escrs.org", count: 48, share: 1.73, category: "earned_institutions" },
  { rank: 7, domain: "anfh.fr", count: 46, share: 1.66, category: "earned_institutions" },
  { rank: 8, domain: "helpmesee.org", count: 46, share: 1.63, category: "other" },
  { rank: 9, domain: "ophthalmology24.com", count: 43, share: 1.26, category: "earned_media" },
  { rank: 10, domain: "aphp.fr", count: 34, share: 1.24, category: "earned_institutions" },
  { rank: 11, domain: "youtube.com", count: 26, share: 1.09, category: "social" },
  { rank: 12, domain: "ecolechirurgie15-20.fr", count: 27, share: 1.07, category: "other" },
  { rank: 13, domain: "vasculaire.com", count: 28, share: 1.04, category: "earned_institutions" },
  { rank: 14, domain: "ircad.fr", count: 38, share: 1.04, category: "competition" },
  { rank: 15, domain: "u-paris.fr", count: 45, share: 1.02, category: "earned_institutions" },
];

export const CITATIONS_TOTAL_DOMAINS = 496;

export type SentimentSnapshot = { positive: number; negative: number };

// get_sentiment_report(asset:"Gepromed") — same window.
export const SENTIMENT: SentimentSnapshot = { positive: 85.64, negative: 14.36 };

export const PROMPTS_ACTIVE = 35;
export const AI_ANSWERS_ANALYZED = 423;

// list_prompts — 35 active prompts across the 7 topics above, two flavours:
// demand-style "visibility" prompts, and head-to-head "Evaluate <brand> on
// <topic>" sentiment prompts. IRCAD is the only competitor benchmarked this
// way (an "Evaluate IRCAD on…" prompt exists for every topic) — despite
// ranking only #10 on the leaderboard, it's the one Profound is watching
// nose-to-nose with Gepromed.
export const PROMPT_INSIGHT =
  "35 active prompts, 7 topics. IRCAD is the only named competitor with a head-to-head “Evaluate IRCAD on…” prompt in every topic — it's the rival Profound is watching closest, even though it only ranks #10 on raw visibility.";

// ---------------------------------------------------------------------------
// Ahrefs + Google Search Console — real exports for gepromed.com/www.gepromed.com,
// pulled 2026-08-12 (Ahrefs: subdomains scope; GSC: Performance on Search,
// ~41 days, 2026-06-30 → 2026-08-09). AHREFS_READY/GSC_READY gate whether the
// Organic tab renders these or the pull-list — flip back to false and the
// empty state returns automatically if these ever need to be pulled again.
// ---------------------------------------------------------------------------
export const AHREFS_READY = true;
export const GSC_READY = true;

export type AhrefsSnapshot = {
  healthScore: number;
  domainRating: number;
  referringDomains: number;
  organicTrafficMonthly: number;
  organicKeywords: number;
  trackedKeywordsFR: number;
  trackedKeywordsUS: number;
};

// Ahrefs Site Explorer overview card, *.gepromed.com/*.
export const AHREFS_SNAPSHOT: AhrefsSnapshot = {
  healthScore: 80,
  domainRating: 15,
  referringDomains: 221,
  organicTrafficMonthly: 2,
  organicKeywords: 2,
  trackedKeywordsFR: 1,
  trackedKeywordsUS: 1,
};

export type AhrefsTrendPoint = { date: string; keywords: number; traffic: number };

// Monthly checkpoints sampled from the daily organic-keywords-history and
// perf(subdomains, 6-month, daily) exports. `keywords` = ranking keywords at
// any position, all buckets summed; `traffic` = Ahrefs' own monthly estimate.
export const AHREFS_TREND: AhrefsTrendPoint[] = [
  { date: "12 févr.", keywords: 1, traffic: 0 },
  { date: "1 mars", keywords: 4, traffic: 11 },
  { date: "1 avr.", keywords: 3, traffic: 3 },
  { date: "1 mai", keywords: 3, traffic: 10 },
  { date: "1 juin", keywords: 3, traffic: 1 },
  { date: "1 juil.", keywords: 2, traffic: 1 },
  { date: "12 août", keywords: 2, traffic: 2 },
];

export type AhrefsTopPage = { url: string; ur: number; referringDomains: number; keywords: number };

// site-explorer-top-pages, sorted by referring domains — only 7 indexed
// pages returned at all, and only the homepage carries any external links.
export const AHREFS_TOP_PAGES: AhrefsTopPage[] = [
  { url: "/", ur: 6, referringDomains: 109, keywords: 1 },
  { url: "/cycle-de-l-implant", ur: 5, referringDomains: 0, keywords: 1 },
  { url: "/a-propos/adherer-ou-donner", ur: 5, referringDomains: 0, keywords: 1 },
  { url: "/formations", ur: 5, referringDomains: 0, keywords: 1 },
  { url: "/a-propos/qualite", ur: 5, referringDomains: 0, keywords: 1 },
  { url: "/a-propos/qui-sommes-nous", ur: 5, referringDomains: 0, keywords: 1 },
  { url: "/en/symposium", ur: 4.7, referringDomains: 0, keywords: 1 },
];

export type AhrefsCompetitorRow = { domain: string; dr: number; commonKeywords: number; targetKeywords: number };

// site-explorer-organic-competitors — Ahrefs' algorithmic list. Kept verbatim
// rather than cleaned up; see AHREFS_COMPETITORS_NOTE for why it isn't useful.
export const AHREFS_COMPETITORS: AhrefsCompetitorRow[] = [
  { domain: "unistra.fr", dr: 82, commonKeywords: 1, targetKeywords: 0 },
  { domain: "bfmtv.com", dr: 89, commonKeywords: 1, targetKeywords: 0 },
  { domain: "helloasso.com", dr: 92, commonKeywords: 1, targetKeywords: 0 },
  { domain: "data.gouv.fr", dr: 89, commonKeywords: 1, targetKeywords: 0 },
  { domain: "linkedin.com", dr: 99, commonKeywords: 1, targetKeywords: 0 },
  { domain: "biovalley-france.com", dr: 51, commonKeywords: 0, targetKeywords: 1 },
];

export const AHREFS_COMPETITORS_NOTE =
  "Ahrefs' algorithmic “organic competitors” match is noise here (unistra.fr, bfmtv.com, LinkedIn…) — with only 1–2 ranking keywords, a single incidental overlap is enough to surface unrelated high-DR domains. gepromed.com's organic footprint is too thin for this list to mean anything; the real competitive set is the Profound AI-visibility leaderboard.";

export type GscSummary = {
  windowLabel: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  brandedClicks: number;
  brandedShareOfDisclosed: number;
};

// GSC "Performance on Search" export, Web search type, gepromed.com property.
export const GSC_SUMMARY: GscSummary = {
  windowLabel: "30 June – 9 August 2026 (41 days)",
  clicks: 222,
  impressions: 5091,
  ctr: 4.36,
  avgPosition: 9.04,
  brandedClicks: 111, // "gepromed" (97) + "gepromed strasbourg" (14)
  brandedShareOfDisclosed: 95.7, // of the individually-disclosed query clicks (116) — GSC anonymizes the rest
};

export type GscDailyPoint = { date: string; clicks: number; impressions: number };

// Sampled every ~3 days from Chart.csv for a readable sparkline/bar chart.
export const GSC_DAILY: GscDailyPoint[] = [
  { date: "30 juin", clicks: 10, impressions: 352 },
  { date: "6 juil.", clicks: 6, impressions: 190 },
  { date: "13 juil.", clicks: 4, impressions: 210 },
  { date: "20 juil.", clicks: 5, impressions: 180 },
  { date: "27 juil.", clicks: 3, impressions: 160 },
  { date: "3 août", clicks: 4, impressions: 155 },
  { date: "9 août", clicks: 1, impressions: 90 },
];

export type GscQueryRow = { query: string; clicks: number; impressions: number; ctr: number; position: number };

// Top rows of Queries.csv with any clicks — the rest of the 118-row export is
// all-zero-click long-tail (mostly brand misspellings: "pogromed", "geromed",
// "giromed", "gpmed"…) which GSC discloses for impressions but not clicks.
export const GSC_TOP_QUERIES: GscQueryRow[] = [
  { query: "gepromed", clicks: 97, impressions: 192, ctr: 50.52, position: 1.57 },
  { query: "gepromed strasbourg", clicks: 14, impressions: 28, ctr: 50, position: 1 },
  { query: "esvb", clicks: 2, impressions: 189, ctr: 1.06, position: 4.41 },
  { query: "nabil chakfe", clicks: 2, impressions: 14, ctr: 14.29, position: 10.36 },
  { query: "for ophthalmology", clicks: 1, impressions: 1, ctr: 100, position: 6 },
];

export type GscPageRow = { url: string; clicks: number; impressions: number; ctr: number; position: number };

// Top rows of Pages.csv by clicks.
export const GSC_TOP_PAGES: GscPageRow[] = [
  { url: "/", clicks: 73, impressions: 500, ctr: 14.6, position: 4.44 },
  { url: "/a-propos/qui-sommes-nous", clicks: 44, impressions: 362, ctr: 12.15, position: 3.99 },
  { url: "/formations", clicks: 12, impressions: 339, ctr: 3.54, position: 2.83 },
  { url: "/en", clicks: 10, impressions: 173, ctr: 5.78, position: 9.09 },
  { url: "/en/symposium", clicks: 8, impressions: 152, ctr: 5.26, position: 6.59 },
  { url: "/formations/vascularbootcamp_15th", clicks: 6, impressions: 52, ctr: 11.54, position: 6 },
  { url: "/en/about-us/gepromed-team", clicks: 5, impressions: 170, ctr: 2.94, position: 5.16 },
  { url: "/cycle-de-l-implant", clicks: 4, impressions: 250, ctr: 1.6, position: 2.09 },
];

export type GscCountryRow = { country: string; clicks: number; impressions: number };

export const GSC_COUNTRIES: GscCountryRow[] = [
  { country: "France", clicks: 167, impressions: 2723 },
  { country: "Germany", clicks: 11, impressions: 141 },
  { country: "Switzerland", clicks: 6, impressions: 60 },
  { country: "United States", clicks: 4, impressions: 476 },
  { country: "Morocco", clicks: 4, impressions: 106 },
  { country: "Italy", clicks: 4, impressions: 52 },
];

export const GSC_DEVICES = [
  { device: "Desktop", clicks: 111, impressions: 3347 },
  { device: "Mobile", clicks: 107, impressions: 1715 },
  { device: "Tablet", clicks: 4, impressions: 29 },
];

export const ORGANIC_INSIGHT =
  "Two different search games, two very different results. In AI answer engines, Gepromed is #1 with 429 citations and 43% visibility. In classic Google organic, it barely exists: Domain Rating 15, 2 tracked keywords, ~2 estimated monthly organic visits — and of the individual queries GSC discloses, 96% of clicks are on the brand name itself. Almost the entire referring-domain count (109 of 221) points at the homepage; every other page has zero external links. The AI-visibility win is real and should be defended, but it is not yet backed by a traditional SEO base to fall back on if AI engines change how they cite sources.";

// Kept for graceful degradation: if AHREFS_READY / GSC_READY are ever flipped
// back to false (data goes stale, property changes, etc.), the Organic tab
// falls back to this pull-list instead of rendering out-of-date numbers.
export const ORGANIC_PULL_LIST: { label: string; detail: string }[] = [
  { label: "Domain Rating + backlink profile", detail: "site-explorer-domain-rating + site-explorer-metrics for gepromed.com (mode=subdomains)" },
  { label: "Organic keywords export", detail: "site-explorer-organic-keywords for gepromed.com — France, top 200 by traffic, with volume/KD/position" },
  { label: "Top pages by organic traffic", detail: "site-explorer-top-pages for gepromed.com — which training/specialty pages actually pull search traffic" },
  { label: "Referring domains", detail: "site-explorer-referring-domains for gepromed.com — DR, traffic, dofollow/nofollow" },
  { label: "Organic competitors", detail: "site-explorer-organic-competitors for gepromed.com, France — cross-check against the Profound leaderboard above" },
  { label: "Keyword gap vs. named rivals", detail: "helpmesee.org, escrs.org, college-vasculaire.com, esvs.org, ircad.fr — same keyword universe, where Gepromed is absent" },
  { label: "Google Search Console export", detail: "Performance on Search, last 3 months, gepromed.com property — clicks/impressions/CTR/position" },
];
