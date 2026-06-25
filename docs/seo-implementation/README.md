# SEO implementation — starter snippets

Reference snippets that accompany [`../ORGANIC-GROWTH-AUDIT.md`](../ORGANIC-GROWTH-AUDIT.md).

These are **starting points, not wired into the build.** They live under `docs/` on
purpose so they don't affect the running app until someone deliberately adopts them.

| File | Move to | Purpose |
|---|---|---|
| `robots.ts` | `app/robots.ts` | Generates `/robots.txt` (allow AI bots; block `/dashboard`, `/register`, `/api`) |
| `sitemap.ts` | `app/sitemap.ts` | Generates `/sitemap.xml` from the real `trainings` data |
| `structured-data.tsx` | `components/` (or inline) | Typed JSON-LD helpers: Organization, FAQPage, Course, Breadcrumb |
| `generateMetadata.example.ts` | pattern for `app/**/page.tsx` | `metadataBase` + per-page/per-course metadata |

**Before adopting:**
1. Confirm the production domain and replace `https://gepromed.com` placeholders.
2. Add the missing assets referenced as TODOs (logo, OG image, phone number).
3. Convert content pages from `"use client"` to Server Components so `generateMetadata`
   works (see audit §2.5).
4. Validate every JSON-LD type with Google's Rich Results Test after wiring.
