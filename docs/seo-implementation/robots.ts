// Starter snippet — move to `app/robots.ts` to generate /robots.txt
// Next.js App Router: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import type { MetadataRoute } from "next";

const SITE_URL = "https://gepromed.com"; // TODO: confirm production domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default: allow classic crawlers AND AI crawlers (GPTBot, PerplexityBot,
        // Google-Extended, ClaudeBot, CCBot, etc.). Being crawlable by AI engines
        // is the whole point of GEO — do not block them at discovery stage.
        userAgent: "*",
        allow: "/",
        // Keep transactional/internal surfaces out of the index.
        disallow: ["/dashboard", "/register", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
