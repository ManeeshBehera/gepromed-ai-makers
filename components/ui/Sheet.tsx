"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** "right" = side drawer, "center" = modal */
  position?: "right" | "center";
  title?: React.ReactNode;
  /** max width for the panel */
  maxWidth?: string;
};

export function Sheet({
  open,
  onClose,
  children,
  position = "right",
  title,
  maxWidth = "max-w-xl",
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const isRight = position === "right";

  return createPortal(
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
    >
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={
          isRight
            ? `absolute right-0 top-0 h-full w-full ${maxWidth} bg-white shadow-2xl transition-transform duration-300 ease-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`
            : `absolute left-1/2 top-1/2 w-[calc(100%-2rem)] ${maxWidth} -translate-x-1/2 -translate-y-1/2 rounded-2xl2 bg-white shadow-2xl transition-all duration-300 ${
                open ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`
        }
      >
        {(title || isRight) && (
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/90 px-6 py-4 backdrop-blur">
            <div className="min-w-0 text-sm font-semibold text-ink">{title}</div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-muted transition hover:bg-slate-100 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div className={isRight ? "h-[calc(100%-65px)] overflow-y-auto" : "max-h-[85vh] overflow-y-auto"}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
