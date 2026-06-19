"use client";

import { useSearchParams } from "next/navigation";
import { useT } from "@/lib/i18n";
import { RegisterPanel } from "@/components/RegisterPanel";

export function RegisterFlow() {
  const t = useT();
  const params = useSearchParams();
  const preselect = params.get("session") || "";

  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-page py-12">
          <h1 className="text-4xl">{t("reg.title")}</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">{t("reg.subtitle")}</p>
        </div>
      </section>
      <section className="container-page max-w-3xl py-12">
        <div className="card p-6 sm:p-8">
          <RegisterPanel initialSlug={preselect} />
        </div>
      </section>
    </>
  );
}
