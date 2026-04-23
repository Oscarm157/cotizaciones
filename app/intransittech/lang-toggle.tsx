"use client";

import Link from "next/link";
import type { Lang } from "./content";

export function LangToggle({
  current,
  ariaLabel,
}: {
  current: Lang;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center rounded-lg border border-card-border bg-card p-0.5 text-[11px] font-semibold shadow-sm"
    >
      <Option href="?lang=es" active={current === "es"} code="ES" name="Español" />
      <Option href="?lang=en" active={current === "en"} code="EN" name="English" />
    </div>
  );
}

function Option({
  href,
  active,
  code,
  name,
}: {
  href: string;
  active: boolean;
  code: string;
  name: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-md transition ${
        active
          ? "bg-primary text-primary-foreground shadow-[0_0_0_1px_var(--color-primary)]"
          : "text-muted hover:text-foreground"
      }`}
    >
      <span
        className={`font-mono tabular-nums text-[10.5px] tracking-[0.04em] ${
          active ? "text-accent-light" : "text-muted/80"
        }`}
      >
        {code}
      </span>
      <span className="hidden sm:inline text-[11px]">{name}</span>
    </Link>
  );
}
