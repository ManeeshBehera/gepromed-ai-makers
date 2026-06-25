// Starter pattern for per-page metadata.
//
// 1) Root layout — set metadataBase + a title template + default OG.
//    (app/layout.tsx)
import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  metadataBase: new URL("https://gepromed.com"), // TODO: confirm production domain
  title: {
    default: "Gepromed — Plateforme de formation chirurgicale",
    template: "%s | Gepromed",
  },
  description:
    "Gepromed forme les chirurgiens de demain en chirurgie vasculaire et " +
    "ophtalmologie. Plateforme de référence en France et en Europe, certifiée Qualiopi.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Gepromed",
    locale: "fr_FR",
    images: ["/opengraph-image.png"], // TODO: provide a real OG image
  },
  twitter: { card: "summary_large_image" },
};

// 2) Per-course metadata — UNIQUE title/description/canonical/OG per session.
//    Put this in app/trainings/[slug]/page.tsx (already a Server Component, so this works).
//
//    import { getTraining } from "@/lib/trainings";
//
//    export async function generateMetadata(
//      { params }: { params: { slug: string } },
//    ): Promise<Metadata> {
//      const t = getTraining(params.slug);
//      if (!t) return {};
//      const title = t.title.fr;                  // or resolve by locale once /en exists
//      const description = t.summary.fr;
//      return {
//        title,
//        description,
//        alternates: { canonical: `/trainings/${t.slug}` },
//        openGraph: {
//          title,
//          description,
//          type: "website",
//          url: `/trainings/${t.slug}`,
//        },
//      };
//    }
//
// NOTE: pages currently marked "use client" CANNOT export generateMetadata.
// Convert them to Server Components (push interactivity into client leaves) first —
// the /trainings/[slug] route already demonstrates the server-page → client-view split.
