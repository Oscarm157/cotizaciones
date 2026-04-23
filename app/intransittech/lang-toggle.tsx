"use client";

import Link from "next/link";
import type { Lang } from "./content";

export function LangToggle({
  current,
  labels,
}: {
  current: Lang;
  labels: { es: string; en: string; ariaLabel: string };
}) {
  return (
    <div
      role="group"
      aria-label={labels.ariaLabel}
      className="inline-flex items-center rounded-lg border border-card-border bg-card p-0.5 text-[11px] font-semibold"
    >
      <Link
        href="?lang=es"
        scroll={false}
        className={`px-2.5 py-1 rounded-md transition ${
          current === "es"
            ? "bg-primary text-primary-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        {labels.es}
      </Link>
      <Link
        href="?lang=en"
        scroll={false}
        className={`px-2.5 py-1 rounded-md transition ${
          current === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        {labels.en}
      </Link>
    </div>
  );
}
