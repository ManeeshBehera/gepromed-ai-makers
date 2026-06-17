import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Gepromed — accueil"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-600 shadow-sm transition group-hover:bg-brand-700">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
          {/* stylised pulse / vessel mark */}
          <path
            d="M2 12h4l2-6 4 12 2.5-9L18 12h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Gepromed
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand-600">
          Surgical Training
        </span>
      </span>
    </Link>
  );
}
