# Gepromed — GEO Command Center

Internal AI-visibility and organic-search reporting for Gepromed. Single page (`app/page.tsx`),
same design language as the Sage "GEO Command Center" reference dashboard, rebuilt with
Next.js (App Router) + TypeScript and a self-contained CSS Module — no Tailwind/UI kit
dependency on this page, no marketing site attached.

## What's inside

Five tabs, real data throughout — see `lib/organicData.ts` for exactly which numbers are
live API pulls vs. editorial framing:

- **Overview** — north-star AI-visibility trend, per-topic breakdown, and the standout
  finding: AI-answer visibility vs. classic Google organic are two very different pictures.
- **AI Visibility** — Profound pull for the "Formation médicale et chirurgicale" category:
  visibility by model and by topic, the full competitor leaderboard, sentiment.
- **Citations** — which domains AI engines actually cite, ranked by citation share.
- **Competitors** — the tracked rival set with visibility/position from Profound.
- **Organic & Search** — real Ahrefs (`*.gepromed.com/*`) and Google Search Console exports.
  Falls back to an explicit pull-list (with a "Copy pull list" button) if `AHREFS_READY` /
  `GSC_READY` in `lib/organicData.ts` are ever flipped back to `false`.

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

`lib/organicData.ts` is hand-updated, not generated. To refresh:

- **Profound**: re-run `list_prompts` / `get_visibility_report` / `get_citations_report` /
  `get_sentiment_report` against category `831e7990-4ce0-46cd-a5a0-7a8bbe874063` and replace
  the relevant constants.
- **Ahrefs / GSC**: re-pull the exports listed in `ORGANIC_PULL_LIST` and replace the
  `AHREFS_*` / `GSC_*` constants (or flip `AHREFS_READY` / `GSC_READY` to `false` to fall
  back to the pull-list view in the meantime).

## Project structure

```
app/
  page.tsx        The dashboard (all 5 tabs)
  page.module.css Design system — tokens, components, light/dark theme
  layout.tsx      Minimal root layout, page metadata
  globals.css     Tailwind directives + a bare body reset
lib/
  organicData.ts  All dashboard data — documents live pulls vs. framing
```
