# Gepromed — Organic Growth Audit & Action Plan (SEO · GEO · AEO)

**Prepared:** 2026-06-25
**Scope:** `gepromed.com` web app (this repository — Next.js 14 App Router, TypeScript, Tailwind, bilingual FR/EN)
**Goal:** Maximise *organic* (unpaid) discovery across three surfaces:

| Acronym | Surface | What "winning" looks like |
|---|---|---|
| **SEO** — Search Engine Optimization | Google / Bing classic blue links + local pack | Ranking page-1 for "formation chirurgie vasculaire", "formation phacoémulsification", "formation chirurgicale Strasbourg" |
| **AEO** — Answer Engine Optimization | Google AI Overviews, featured snippets, "People Also Ask", voice | Gepromed's FAQ/answers shown directly in the answer box |
| **GEO** — Generative Engine Optimization | ChatGPT, Perplexity, Gemini, Claude, Copilot, Bing Chat | Gepromed *cited by name* when a user asks an AI "where can a surgeon train in vascular surgery in Europe?" |

> A note on terminology: "GEO" is used here in its current industry sense — **Generative Engine Optimization** (being cited by AI answer engines), not "geographic/local SEO". Local/geographic search is a real opportunity for a Strasbourg-based organisation and is covered inside the **SEO → Local** section.

---

## 0. Executive summary

The redesigned site is **well-structured for humans but nearly invisible to machines.** The content is strong (real KPIs, Qualiopi proof, 30-year heritage, named supervisors, bilingual copy) — but almost none of the technical signals that search engines and AI answer engines rely on are present.

**The five highest-leverage problems, in order:**

1. **No structured data (JSON-LD) anywhere.** This is the single biggest miss for both AEO and GEO. Without `Organization`, `Course`, `FAQPage`, `MedicalOrganization`, and `Event` schema, Google can't build rich results and AI engines have nothing machine-readable to quote. *(See §2.1)*
2. **No `sitemap.xml` and no `robots.txt`.** Crawlers and AI bots have no map of the site and no crawl directives. *(See §2.2)*
3. **Bilingual content is switched client-side via `localStorage`** — there are no `/en` URLs and no `hreflang`. Google only ever indexes the **French** version; the entire English market is unreachable organically. *(See §2.3)*
4. **Per-page metadata is missing.** Only the root layout sets a title/description, so every URL — `/trainings`, `/about`, every individual course — shares one generic title and snippet. No canonical URLs, no Open Graph, no `metadataBase`. *(See §2.4)*
5. **Everything is a Client Component (`"use client"`).** Content does render in the initial HTML, but the architecture blocks per-page `generateMetadata`, makes the page depend on JS for language, and weakens the crawl/quote experience. *(See §2.5)*

**The good news:** the content quality, the IA, real proof points (satisfaction %, pass rates), named experts, and the FAQ are exactly what GEO/AEO reward. The gaps are almost entirely *technical wiring* — high impact, low-to-medium effort, and mostly fixable in this codebase. A focused 4–6 week sprint moves this from "invisible" to "competitive".

**Effort/impact at a glance:**

| Workstream | Impact | Effort | When |
|---|---|---|---|
| Structured data (JSON-LD) | 🔴 Very high | 🟢 Low | Week 1 |
| `sitemap.ts` + `robots.ts` + GSC/Bing | 🔴 Very high | 🟢 Low | Week 1 |
| Per-page metadata + canonical + OG | 🔴 High | 🟢 Low | Week 1–2 |
| Bilingual URLs + hreflang (`/en`) | 🔴 High | 🟠 Medium-high | Week 2–4 |
| Server-render content / reduce `use client` | 🟠 Medium | 🟠 Medium | Week 2–4 |
| Content & AEO (FAQ pages, glossary, blog) | 🟠 Medium (compounding) | 🟠 Medium | Ongoing |
| Local SEO (Google Business Profile, NAP, citations) | 🟠 Medium | 🟢 Low | Week 1–3 |
| GEO trust signals (E-E-A-T, citations, listings) | 🟠 Medium (compounding) | 🟠 Medium | Ongoing |

---

## 1. Current-state snapshot (what's in the repo today)

Findings are grounded in the actual code at audit time.

| Area | Status | Evidence |
|---|---|---|
| Framework | Next.js 14 App Router + TS + Tailwind | `package.json`, `app/` |
| Root metadata | ✅ Present (FR title + description) | `app/layout.tsx:7-11` |
| Per-page metadata | ❌ Only the root layout exports `metadata` | `grep "export const metadata"` → 1 file |
| `metadataBase` / canonical | ❌ Not set | `app/layout.tsx` |
| Open Graph / Twitter cards | ❌ None | no `openGraph`/`twitter` keys |
| `sitemap.xml` / `sitemap.ts` | ❌ Absent | no file |
| `robots.txt` / `robots.ts` | ❌ Absent | no file |
| `manifest` / PWA | ❌ Absent | no file |
| JSON-LD structured data | ❌ None | no `application/ld+json` in repo |
| Bilingual strategy | ⚠️ Client-side only | `lib/i18n.tsx` (`localStorage`, `"use client"`) |
| `lang` attribute | ⚠️ Hardcoded `lang="fr"` | `app/layout.tsx:19` |
| hreflang | ❌ None | — |
| Rendering | ⚠️ Every page is `"use client"` | 12 pages + components |
| Training detail routes | ✅ `generateStaticParams` (static) but ❌ no `generateMetadata` | `app/trainings/[slug]/page.tsx` |
| Images | ⚠️ Hotlinked Unsplash, no `next/image`, no alt strategy | `lib/trainings.ts` (`SPECIALTY_IMAGE`) |
| NAP data | ✅ Real addresses + email exist as text | `app/contact/page.tsx`, `components/SiteFooter.tsx` |
| Analytics / Search Console | ❌ No evidence of GA4 / GSC / Bing | — |

**Pages that exist** (all good content, all under-optimised): `/` , `/trainings`, `/trainings/[slug]`, `/register`, `/dashboard`, `/contact`, `/about` (+ `/about/quality`, `/team`, `/publications`, `/membership`, `/legal`, `/funders`, `/privacy`).

> ⚠️ `/dashboard` (organiser pipeline) and `/register` should be **excluded from indexing** — they're transactional/internal, not organic landing pages.

---

## 2. SEO audit — technical foundation

### 2.1 Structured data (JSON-LD) — *the #1 priority*

**Problem:** there is zero structured data. Search engines must infer everything; AI engines have no clean facts to quote. For a medical training organisation this is a large, easy win.

**Schema types to add (mapped to existing pages):**

| Page | Schema | Why |
|---|---|---|
| Site-wide (in layout) | `Organization` + `MedicalOrganization` + `EducationalOrganization` | Establishes the entity, address (Strasbourg), founding date (1993), logo, `sameAs` social/registry links — the backbone of GEO entity recognition |
| `/` | `WebSite` (+ `SearchAction`), `FAQPage` (home FAQ already exists in `lib/content.ts`) | Sitelinks search box; FAQ rich result + AEO |
| `/trainings/[slug]` | `Course` (+ `CourseInstance` for each session) | Eligible for Google's course rich results; gives AI structured course facts (title, provider, location, dates, price) |
| `/trainings` | `ItemList` of courses + `BreadcrumbList` | Carousel eligibility, navigation context |
| `/about` | `AboutPage`, reinforce `Organization` | E-E-A-T |
| `/contact` | `MedicalOrganization` with `address`, `geo`, `openingHours`, `email` | Local pack + GEO "where is it" answers |
| All deep pages | `BreadcrumbList` | Breadcrumb rich result |

**Data is already available** — `lib/trainings.ts` carries title, specialty, level, city, venue, dates, price, capacity, supervisors, satisfaction, passRate. `lib/content.ts` carries the FAQ, history (founding year), partners, testimonials. This is a wiring job, not a content job.

> Implementation snippets are in **`docs/seo-implementation/`** (created alongside this audit): `structured-data.tsx` (typed JSON-LD helpers), `sitemap.ts`, `robots.ts`, and a `generateMetadata` pattern. Treat them as drop-in starting points to adapt.

### 2.2 Crawlability — sitemap & robots

- **Add `app/sitemap.ts`** (Next.js generates `/sitemap.xml`): include `/`, `/trainings`, every `/trainings/[slug]` (iterate `trainings`), `/about` + sub-pages, `/contact`. Set `lastModified`, `changeFrequency`, `priority`. Once bilingual URLs exist, emit `alternates.languages`.
- **Add `app/robots.ts`** (generates `/robots.txt`): `allow` the marketing pages, `disallow` `/dashboard`, `/register`, `/api`; point `sitemap` at the absolute URL. Do **not** block AI crawlers (GPTBot, PerplexityBot, Google-Extended, ClaudeBot, CCBot) — being crawlable by them is the entire point of GEO. (Decide deliberately; the default of *allow* is correct for a discovery-stage org.)
- **Submit** `sitemap.xml` to **Google Search Console** and **Bing Webmaster Tools**; verify the domain. This is non-negotiable and currently absent.

### 2.3 Internationalisation — the hidden traffic leak

**Problem:** the site is genuinely bilingual, but the language lives in React state + `localStorage` (`lib/i18n.tsx`) with a hardcoded `<html lang="fr">`. Consequences:

- There is exactly **one URL per page**, serving **French** HTML to every crawler. The English content **does not exist as far as Google is concerned** — no English keywords can ever rank.
- No `hreflang` annotations, so even if EN existed Google couldn't pair FR/EN versions.

**Fix (the correct long-term architecture):** move language into the **URL** via the App Router's `[lang]` segment or a locale prefix (`/fr/...`, `/en/...`), render the right language **server-side**, and emit reciprocal `hreflang` tags (`fr-FR`, `en`, and `x-default`). Keep `localStorage` only as a *redirect hint* for first-time visitors, never as the source of truth.

This is the **highest-effort** item in the plan and the one most worth doing — it unlocks an entire second market (European/English-speaking surgeons, which the brand explicitly targets — "Cap sur l'Europe").

### 2.4 Metadata, canonical & social

- **Set `metadataBase`** in the root layout (`new URL("https://gepromed.com")`) so OG/canonical URLs resolve absolutely.
- **Add `generateMetadata`** to every route — unique `title` (template: `%s | Gepromed`), unique `description`, `alternates.canonical`, `openGraph`, `twitter`. For `/trainings/[slug]`, derive title/description/price/date from the session object (rich, unique snippets per course — currently all identical).
- **Add Open Graph images** (`opengraph-image.tsx` per route or static). Right now shared links render as bare text on social/Slack/WhatsApp.
- **Title/description quality:** front-load the primary keyword + city + Qualiopi; keep titles ≤ ~60 chars, descriptions ≤ ~155.

### 2.5 Rendering & Core Web Vitals

- **Reduce `"use client"`.** Every page is a Client Component. App Router *does* pre-render their initial HTML, so content is crawlable — but this pattern (a) blocks `generateMetadata` on those routes, (b) makes language JS-dependent, and (c) ships more JS than needed. Refactor toward **Server Components for content**, isolating interactivity (version switcher, accordion, register flow, language toggle) into small client leaves. The `/trainings/[slug]` route already shows the right shape (server page → client view); apply it everywhere.
- **Images:** replace hotlinked Unsplash URLs (`SPECIALTY_IMAGE`) with `next/image` + an `images` allowlist (or self-host), add descriptive `alt` text (alt is also an AEO/accessibility signal), use AVIF/WebP, set width/height to protect CLS. Hotlinking Unsplash is also a reliability/ToS risk in production.
- **Vitals to monitor** once live: LCP (hero images), CLS (image dims, web fonts), INP. Track in GSC + PageSpeed Insights.

### 2.6 Local / geographic SEO (Strasbourg)

The org has two real Strasbourg addresses and a `formation@gepromed.com` email (`app/contact/page.tsx`, `SiteFooter.tsx`) — strong local signals that aren't being used.

- **Create/claim a Google Business Profile** ("Gepromed", category: *Training centre / Medical school*). This alone can win the local pack for "formation chirurgicale Strasbourg".
- **NAP consistency:** ensure **N**ame/**A**ddress/**P**hone are byte-identical across the site, GBP, and every directory. *Add a phone number* — none is present in the code today; phone is a key local + AEO signal.
- **`MedicalOrganization` schema** with `address`, `geo` coordinates, `areaServed` (France, Europe), `email`, `telephone`.
- **Citations/directories:** PagesJaunes, list on relevant French medical-training registries, university/CHU partner pages (the real backlink gold for a CHU-adjacent org), Datadock/Qualiopi public listings.

---

## 3. AEO audit — winning the answer box

Answer engines (AI Overviews, featured snippets, People Also Ask, voice) reward **direct, well-structured answers to specific questions**. Gepromed already has raw material; it needs structure.

**Strengths to exploit:**
- A real FAQ exists (`lib/content.ts` → 7 Q&As). **Wrap it in `FAQPage` JSON-LD** immediately — likely the fastest AEO win available.

**Gaps & actions:**
- **Question-shaped content.** Build standalone pages answering high-intent queries surgeons actually type: *"Comment se former à la phacoémulsification ?"*, *"Qu'est-ce qu'une formation certifiée Qualiopi ?"*, *"Combien coûte une formation en chirurgie vasculaire ?"*, *"Formation sur modèle perfusé : comment ça marche ?"* Each: H1 = the question, a 40–60 word direct answer up top, then depth.
- **Answer-first formatting.** Lead sections with the concise answer, then expand. Use clear H2/H3, short paragraphs, bullet lists, and comparison tables — the formats engines lift into snippets.
- **Expand the FAQ** and add per-course FAQs (prerequisites, certificate, cancellation, accommodation — several already exist as copy, just not as schema).
- **Definitional/glossary content.** A medical-training glossary (perfused model, high-fidelity simulation, Qualiopi, explant analysis, phacoemulsification) is highly quotable by both featured snippets and generative engines.
- **`HowTo`/`Course` structure** for "how registration works" (the lead→deposit→contract→confirmed pipeline is already documented).

---

## 4. GEO audit — getting cited by AI engines

GEO is about being the **trusted, machine-readable, frequently-referenced source** an LLM reaches for. It overlaps with SEO/AEO but adds an emphasis on *entity clarity*, *citability*, and *off-site corroboration*.

**What helps Gepromed get cited:**

1. **Entity clarity (do this first).** `Organization`/`MedicalOrganization` schema with `sameAs` links to LinkedIn, the Qualiopi registry, university/CHU partners, Wikipedia/Wikidata if eligible. Consider creating a **Wikidata item** for Gepromed (founded 1993, ex-GEPROVAS, Strasbourg) — Wikidata is heavily consumed by LLMs.
2. **Statistics, dates, named entities, citations.** Studies repeatedly find generative engines favour content with **concrete numbers, dates, named experts, and citations**. Gepromed has these (30 years, 20+ clinical studies, satisfaction %, pass rates, named supervisors) — surface them as **explicit, sourced, machine-readable text**, not just decorative UI.
3. **Crawlability for AI bots.** Don't block GPTBot, Google-Extended, PerplexityBot, ClaudeBot, CCBot in `robots.ts` (see §2.2). Server-rendered, JS-light content is easier for these crawlers (reinforces §2.5).
4. **Off-site corroboration.** LLMs trust entities mentioned across many independent sources: directory listings, partner/CHU pages, conference/society mentions, press, third-party reviews. Build these deliberately — they're also classic SEO backlinks.
5. **E-E-A-T signals.** Author bios for supervisors (credentials, affiliations), publications page with real citations (a `/about/publications` route already exists — populate it with structured citations), clear "about/quality/Qualiopi" pages. Medical = **YMYL**; trust signals are weighted heavily.
6. **Quotable, self-contained passages.** Write sections that stand alone as a correct, attributable answer (e.g. "Gepromed is a Qualiopi-certified surgical training organisation founded in 1993 in Strasbourg, France, specialising in vascular surgery and ophthalmology…"). LLMs lift clean, factual sentences.

**Measure GEO:** periodically prompt ChatGPT/Perplexity/Gemini/Claude with the target questions ("best places for surgeons to train in vascular surgery in Europe", "Qualiopi surgical training Strasbourg") and track whether/how Gepromed is named. Perplexity's source citations are a useful proxy for what's working.

---

## 5. Content & keyword strategy

**Priority keyword clusters** (FR primary, EN secondary once `/en` ships):

| Cluster | Example queries | Target page |
|---|---|---|
| Specialty training | formation chirurgie vasculaire, formation endovasculaire, formation phacoémulsification, formation ophtalmologie microchirurgie | `/trainings`, specialty hubs, course pages |
| Method | formation simulation chirurgicale, modèle perfusé, simulation haute-fidélité | Glossary + method page |
| Trust/credential | formation chirurgicale Qualiopi, DPC chirurgie | `/about/quality`, FAQ |
| Local | formation chirurgicale Strasbourg, centre formation médicale Strasbourg | `/contact`, GBP, local hub |
| Brand/entity | Gepromed, GEPROVAS, Institut Gepromed | `/about`, schema, Wikidata |
| Informational (AEO) | "comment se former à…", "qu'est-ce que Qualiopi", "combien coûte…" | Q-pages, glossary, blog |

**Actions:**
- **Specialty hub pages** (`/specialites/chirurgie-vasculaire`, `/ophtalmologie`) — pillar content linking to relevant courses; strong topical-authority play.
- **A blog / "Ressources" section** for informational queries and fresh-content signals (case studies, technique explainers, post-session outcome reports — the proof data already exists).
- **Internal linking:** hub → course → register; cross-link FAQ answers to deep pages. Currently linking is thin.
- **Surface the proof numbers as text** (satisfaction %, pass rate, alumni count) — good for conversion, SEO, AEO, and GEO simultaneously.

---

## 6. Measurement & tooling (set up first — you can't improve what you can't see)

- **Google Search Console** + **Bing Webmaster Tools** — verify domain, submit sitemap, monitor queries/coverage/Core Web Vitals. *(Currently absent — do in week 1.)*
- **GA4** (or privacy-friendly Plausible/Matomo, fitting for an EU medical org) — organic sessions, landing pages, conversions (registration starts).
- **Rich Results Test / Schema validator** — validate every JSON-LD type after adding.
- **PageSpeed Insights / Lighthouse** — Core Web Vitals.
- **Rank tracking** for the priority clusters (FR, Strasbourg-geo).
- **GEO tracking** — a recurring manual (or scripted) prompt set against ChatGPT/Perplexity/Gemini/Claude.
- **Conversion goal:** organic → registration lead (the `lead` stage already modelled in `lib/types.ts`).

---

## 7. Prioritised action plan

### Phase 0 — Instrumentation (Week 1, do these first)
- [ ] Verify domain in **Google Search Console** + **Bing Webmaster Tools**
- [ ] Install **GA4 / Plausible**; define the registration-lead conversion
- [ ] Confirm production domain + set `metadataBase`

### Phase 1 — Technical foundation (Weeks 1–2) 🔴 highest ROI
- [ ] `app/robots.ts` (allow marketing + AI bots; disallow `/dashboard`, `/register`, `/api`)
- [ ] `app/sitemap.ts` (all marketing routes + every course slug)
- [ ] Site-wide `Organization` / `MedicalOrganization` / `EducationalOrganization` JSON-LD
- [ ] `FAQPage` JSON-LD on `/` (FAQ already exists in `lib/content.ts`)
- [ ] `Course` (+ `CourseInstance`) JSON-LD on `/trainings/[slug]`
- [ ] `BreadcrumbList` on deep pages
- [ ] `generateMetadata` on every route (unique title/description/canonical/OG) — especially per-course
- [ ] Add a phone number to NAP; ensure NAP consistency
- [ ] `noindex` `/dashboard` and `/register`

### Phase 2 — Internationalisation & rendering (Weeks 2–4) 🔴 unlocks EN market
- [ ] Move language into URLs (`/fr`, `/en`), server-render the correct locale
- [ ] Reciprocal `hreflang` (`fr-FR`, `en`, `x-default`) + per-locale sitemap alternates
- [ ] Refactor content pages toward Server Components; isolate interactivity in client leaves
- [ ] Replace hotlinked Unsplash with `next/image` + descriptive `alt`

### Phase 3 — Local & off-site (Weeks 2–4, parallel)
- [ ] Create/claim **Google Business Profile** (Strasbourg)
- [ ] Directory citations (PagesJaunes, medical-training registries, Qualiopi listing)
- [ ] Partner/CHU/university backlinks
- [ ] Create a **Wikidata** item for the Gepromed entity

### Phase 4 — Content & AEO (ongoing)
- [ ] Specialty hub pages (vascular, ophthalmology) + per-course FAQs (`FAQPage`)
- [ ] Question-shaped pages for high-intent informational queries
- [ ] Medical-training glossary (highly quotable for AEO/GEO)
- [ ] Blog / Ressources for fresh content + informational keywords
- [ ] Populate `/about/publications` with structured, cited references (E-E-A-T)
- [ ] Author bios for supervisors (credentials, affiliations)

### Phase 5 — Measure & iterate (ongoing)
- [ ] Monthly GSC review (queries, coverage, CWV); validate schema after each change
- [ ] Rank tracking for priority clusters
- [ ] Quarterly GEO prompt-test across the major AI engines

---

## 8. Quick wins (highest impact ÷ effort — ship this week)

1. **`FAQPage` JSON-LD** on the home FAQ — data already exists; minutes of work, real AEO upside.
2. **`robots.ts` + `sitemap.ts`** — a few lines each; immediate crawlability.
3. **`Organization`/`MedicalOrganization` JSON-LD** in the layout — anchors entity recognition for GEO.
4. **`metadataBase` + per-page `generateMetadata`** — unique titles/snippets, esp. per course.
5. **Submit to Search Console & Bing** — start collecting data now.
6. **Add a phone number + claim Google Business Profile** — local pack eligibility.

---

*This audit is grounded in the repository state at 2026-06-25. Items marked with file paths reference verified code; recommendations involving the live domain (GBP, GSC, backlinks, Wikidata) require account/domain access to execute. Starter implementation snippets accompany this document under `docs/seo-implementation/`.*
