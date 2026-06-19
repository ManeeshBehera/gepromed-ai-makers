"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { useLang } from "@/lib/i18n";

export default function LegalPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const rows: [string, React.ReactNode][] = [
    [tx("Éditeur", "Publisher"), "Gepromed"],
    [
      tx("Siège", "Registered office"),
      <>Bâtiment d&apos;Anesthésiologie, 1 place de l&apos;Hôpital, 67085 Strasbourg, France</>,
    ],
    [tx("Statut", "Status"), tx("Association à but non lucratif", "Non-profit association")],
    [tx("Contact", "Contact"), "formation@gepromed.com"],
    [tx("Hébergement", "Hosting"), tx("Fournisseur d'hébergement web", "Web hosting provider")],
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Mentions légales", en: "Legal notice" }}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-slate-100">
            {rows.map(([k, v], i) => (
              <tr key={i}>
                <td className="w-1/3 bg-slate-50 px-4 py-3 font-medium text-ink">{k}</td>
                <td className="px-4 py-3 text-ink-soft">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Prose>
        <p className="mt-8">
          {tx(
            "L'ensemble des contenus de ce site (textes, visuels, logos) est protégé. Toute reproduction sans autorisation est interdite. Ce site est une démonstration de refonte.",
            "All content on this site (text, images, logos) is protected. Any reproduction without authorization is prohibited. This site is a redesign demonstration.",
          )}
        </p>
        <p>
          {tx(
            "Les mentions légales officielles et complètes figurent sur le site institutionnel de Gepromed.",
            "The complete official legal notice is available on Gepromed's institutional website.",
          )}
        </p>
      </Prose>
    </DocPage>
  );
}
