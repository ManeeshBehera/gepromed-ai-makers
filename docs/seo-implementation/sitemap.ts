// Starter snippet — move to `app/sitemap.ts` to generate /sitemap.xml
// Iterates the real `trainings` array so every course slug is included.
import type { MetadataRoute } from "next";
import { trainings } from "@/lib/trainings";

const SITE_URL = "https://gepromed.com"; // TODO: confirm production domain

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/trainings`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about/quality`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about/team`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about/publications`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about/membership`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about/funders`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    // NOTE: /dashboard and /register are intentionally excluded (non-indexable).
  ].map((r) => ({ ...r, lastModified: now }));

  const courseRoutes: MetadataRoute.Sitemap = trainings.map((t) => ({
    url: `${SITE_URL}/trainings/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];

  // Once bilingual URLs exist (/fr, /en), add per-entry:
  //   alternates: { languages: { "fr-FR": `${SITE_URL}/fr/...`, en: `${SITE_URL}/en/...` } }
}
