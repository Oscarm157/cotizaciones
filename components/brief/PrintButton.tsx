"use client";

import Icon from "./ui/Icon";

export default function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`no-print inline-flex items-center gap-2 rounded-lg border border-card-border bg-card text-primary px-5 py-3 text-sm font-semibold hover:border-accent transition ${className}`}
    >
      <Icon name="print" className="text-base" />
      Imprimir / PDF
    </button>
  );
}
