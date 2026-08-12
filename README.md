# Gepromed — Growth Command Center

Internal growth reporting for Gepromed — AI visibility, organic search, and the 90-day plan
to move both. Next.js (App Router) + TypeScript, a self-contained CSS Module design system
(no Tailwind/UI kit dependency on either page), no marketing site attached.

## Pages

- **`/` — Growth Command Center.** Five tabs, real data throughout — see `lib/organicData.ts`
  for exactly which numbers are live API pulls vs. editorial framing:
  - **Overview** — north-star AI-visibility trend, per-topic breakdown, and the standout
    finding: AI-answer visibility vs. classic Google organic are two very different pictures.
  - **AI Visibility** — Profound pull for the "Formation médicale et chirurgicale" category:
    visibility by model and by topic, the full competitor leaderboard, sentiment.
  - **Citations** — which domains AI engines actually cite, ranked by citation share.
  - **Competitors** — the tracked rival set with visibility/position from Profound.
  - **Organic & Search** — real Ahrefs (`*.gepromed.com/*`) and Google Search Console exports.
    Falls back to an explicit pull-list (with a "Copy pull list" button) if `AHREFS_READY` /
    `GSC_READY` in `lib/organicData.ts` are ever flipped back to `false`.

- **`/90-day-attack-plan` — the growth plan.** Three tabs (30/60/90-day), each with Objective,
  KPIs targeted, Action plan and Content plan. Targets and content topics tie back to real gaps
  already surfaced on the Command Center (the DPC-financing visibility gap, GSC queries ranking
  but not converting, citation-source domains with no Gepromed backlink) — see `lib/planData.ts`.

Both pages share one design system: `components/shell/CommandShell.tsx` (sidebar, topbar,
search filter, theme toggle) and `components/shell/dashboardUI.tsx` (KPI cards, sparklines,
badges, section headers), styled by `app/page.module.css`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Deploy

Deployed on Vercel — import the repo, Next.js is auto-detected, no config needed.

## Refreshing the data

Both data files are hand-updated, not generated.

- **`lib/organicData.ts`** — Profound: re-run `list_prompts` / `get_visibility_report` /
  `get_citations_report` / `get_sentiment_report` against category
  `831e7990-4ce0-46cd-a5a0-7a8bbe874063` and replace the relevant constants. Ahrefs/GSC:
  re-pull the exports listed in `ORGANIC_PULL_LIST` and replace the `AHREFS_*` / `GSC_*`
  constants (or flip `AHREFS_READY` / `GSC_READY` to `false` to fall back to the pull-list
  view in the meantime).
- **`lib/planData.ts`** — `BASELINE` should track whatever `organicData.ts` currently reports;
  update `PHASES[].kpiTable` baselines and re-check which content-plan gaps have been closed.

## Project structure

```
app/
  page.tsx                   Growth Command Center (5 tabs)
  90-day-attack-plan/page.tsx 90-Day Attack Plan (3 tabs)
  page.module.css            Design system — tokens, components, light/dark theme
  layout.tsx                 Minimal root layout, page metadata
  globals.css                Tailwind directives + a bare body reset
components/shell/
  CommandShell.tsx           Shared sidebar/topbar/search/theme shell
  dashboardUI.tsx            Shared KPI card, sparkline, badge, section header
lib/
  organicData.ts             Command Center data — documents live pulls vs. framing
  planData.ts                90-day plan data — cadence targets, KPIs, actions, content
```
