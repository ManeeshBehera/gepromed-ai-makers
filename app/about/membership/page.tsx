"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { useLang } from "@/lib/i18n";

export default function MembershipPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const cards = [
    {
      t: tx("Devenir membre", "Become a member"),
      d: tx(
        "Rejoignez l'association et participez à la mission de sécurité du patient et de formation chirurgicale.",
        "Join the association and take part in the mission of patient safety and surgical training.",
      ),
      cta: tx("Adhérer", "Join"),
    },
    {
      t: tx("Faire un don", "Make a donation"),
      d: tx(
        "Soutenez nos plateaux techniques, la recherche et l'accès à la formation. Un reçu fiscal est délivré.",
        "Support our technical platforms, research and access to training. A tax receipt is issued.",
      ),
      cta: tx("Donner", "Donate"),
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Adhésion ou don", en: "Membership or donation" }}
      intro={{
        fr: "Gepromed est une association. Votre adhésion ou votre don soutient directement la formation chirurgicale et la sécurité des dispositifs médicaux.",
        en: "Gepromed is a non-profit association. Your membership or donation directly supports surgical training and medical-device safety.",
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <div key={c.t} className="card flex flex-col p-6">
            <h2 className="text-xl">{c.t}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.d}</p>
            <a
              href="https://www.helloasso.com/associations/gepromed"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5 w-full"
            >
              {c.cta}
            </a>
          </div>
        ))}
      </div>

      <Prose>
        <p className="mt-8">
          {tx(
            "Les adhésions et dons sont gérés via la plateforme HelloAsso. Pour un don d'entreprise, un mécénat ou un partenariat, contactez-nous directement.",
            "Memberships and donations are handled via the HelloAsso platform. For a corporate gift, sponsorship or partnership, contact us directly.",
          )}
        </p>
      </Prose>
    </DocPage>
  );
}
