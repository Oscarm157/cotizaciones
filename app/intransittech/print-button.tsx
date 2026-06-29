"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary text-primary-foreground text-[12px] sm:text-sm font-semibold hover:opacity-90 transition whitespace-nowrap"
    >
      {label}
    </button>
  );
}
