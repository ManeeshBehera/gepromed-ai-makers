"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { useLang } from "@/lib/i18n";

type Pub = { title: string; venue: string; year: string; href: string };

const PUBLICATIONS: Pub[] = [
  {
    title:
      "Validity evidence of a new virtual reality simulator for phacoemulsification training in cataract surgery",
    venue: "PubMed",
    year: "2024",
    href: "https://pubmed.ncbi.nlm.nih.gov/39461993/",
  },
  {
    title:
      "Virtual reality simulator-based assessment of non-technical skills in eye surgery: managing complex cataract surgery",
    venue: "BMC Medical Education",
    year: "2026",
    href: "https://link.springer.com/article/10.1186/s12909-026-09029-6",
  },
];

export default function PublicationsPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Publications clés", en: "Key Publications" }}
      intro={{
        fr: "Une sélection de travaux scientifiques issus de nos activités de recherche et de formation.",
        en: "A selection of scientific works from our research and training activities.",
      }}
    >
      <Prose>
        <p>
          {tx(
            "Plus de 20 études cliniques et un programme continu d'analyse d'explants nourrissent nos publications et la sécurité des dispositifs médicaux.",
            "More than 20 clinical studies and an ongoing explant-analysis program feed our publications and medical-device safety.",
          )}
        </p>
      </Prose>

      <ul className="mt-8 space-y-4">
        {PUBLICATIONS.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl border border-slate-100 p-5 transition hover:border-brand-300 hover:shadow-card"
            >
              <p className="font-medium text-ink group-hover:text-brand-700">{p.title}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {p.venue} · {p.year}
              </p>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 rounded-xl bg-brand-50/60 px-4 py-3 text-sm text-ink-soft">
        {tx(
          "La liste complète des publications est disponible sur le site institutionnel de Gepromed.",
          "The full list of publications is available on Gepromed's institutional website.",
        )}
      </p>
    </DocPage>
  );
}
