"use client";

import { useState } from "react";

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number[]>(
    defaultOpen >= 0 ? [defaultOpen] : [],
  );

  function toggle(i: number) {
    setOpen((cur) => {
      const isOpen = cur.includes(i);
      if (allowMultiple) {
        return isOpen ? cur.filter((x) => x !== i) : [...cur, i];
      }
      return isOpen ? [] : [i];
    });
  }

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
            >
              <span className="font-medium text-ink">{item.title}</span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 text-brand-600 transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-brand-50" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
