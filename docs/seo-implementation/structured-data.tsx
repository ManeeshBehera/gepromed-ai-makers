// Starter snippet — typed JSON-LD helpers for Gepromed.
// Drop this component anywhere in a Server Component tree (it renders a
// <script type="application/ld+json"> tag). Validate output with Google's
// Rich Results Test after wiring it up.
//
// Data is pulled from the shapes that already exist in this repo:
//   - lib/trainings.ts  -> TrainingSession (title, city, venue, dates, price, ...)
//   - lib/content.ts    -> FAQ (q/a), HISTORY (founding year)

import type { TrainingSession } from "@/lib/trainings";
import type { L } from "@/lib/i18n";

const SITE_URL = "https://gepromed.com"; // TODO: confirm production domain

/** Render any JSON-LD object as a script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide entity. Put in the root layout. Anchors SEO + GEO entity recognition. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalOrganization", "EducationalOrganization"],
    name: "Gepromed",
    alternateName: "GEPROVAS",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`, // TODO: provide a real logo asset
    foundingDate: "1993",
    description:
      "Qualiopi-certified surgical training organisation in Strasbourg, France, " +
      "specialising in vascular surgery and ophthalmology through high-fidelity simulation.",
    email: "formation@gepromed.com",
    // telephone: "+33 ...", // TODO: add a phone number (currently missing)
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 rue Marie Hamm",
      postalCode: "67000",
      addressLocality: "Strasbourg",
      addressCountry: "FR",
    },
    areaServed: ["FR", "EU"],
    sameAs: [
      // TODO: add real profiles — these strengthen GEO citability.
      // "https://www.linkedin.com/company/gepromed",
      // "https://www.wikidata.org/wiki/Qxxxxx",
    ],
  };
}

/** Home FAQ. The FAQ array already lives in lib/content.ts. */
export function faqJsonLd(faq: { q: L; a: L }[], lang: "fr" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q[lang],
      acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
    })),
  };
}

/** One Course per training session, with a CourseInstance for the dated session. */
export function courseJsonLd(t: TrainingSession, lang: "fr" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: t.title[lang],
    description: t.summary[lang],
    url: `${SITE_URL}/trainings/${t.slug}`,
    provider: {
      "@type": "Organization",
      name: "Gepromed",
      url: SITE_URL,
    },
    inLanguage: lang,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      startDate: t.startDate,
      endDate: t.endDate,
      location: {
        "@type": "Place",
        name: t.venue[lang],
        address: {
          "@type": "PostalAddress",
          addressLocality: t.city,
          addressCountry: "FR",
        },
      },
      offers: {
        "@type": "Offer",
        price: t.priceEUR,
        priceCurrency: "EUR",
        availability:
          t.enrolled < t.capacity
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
        url: `${SITE_URL}/trainings/${t.slug}`,
      },
    },
  };
}

/** Breadcrumbs for deep pages. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
