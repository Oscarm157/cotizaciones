"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition hover:opacity-90"
      style={{ background: "linear-gradient(120deg,#E11D74,#FF7A1A)" }}
    >
      {label}
    </button>
  );
}
