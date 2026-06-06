import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "../auth";
import { sql } from "@/lib/db";
import { getQuote } from "@/lib/brief/registry";
import { visibleSchema } from "@/lib/brief/visibility";
import type { FileMeta } from "@/lib/brief/types";
import BriefView from "@/components/brief/BriefView";
import DownloadZipButton from "@/components/brief/DownloadZipButton";
import PrintButton from "@/components/brief/PrintButton";

export const dynamic = "force-dynamic";

export default async function BriefDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;

  const rows = await sql`select * from quote_briefs where id = ${id}`;
  const data = rows[0];
  if (!data) notFound();

  const quote = getQuote(data.quote_slug);
  if (!quote) notFound();

  const sections = visibleSchema(data.quote_slug);
  const answers = (data.answers || {}) as Record<string, unknown>;
  const files = (data.files || {}) as Record<string, FileMeta[]>;
  const submittedAt = new Date(data.created_at).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-14">
        <div className="no-print">
          <Link href="/admin" className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted hover:text-primary transition">
            ← Briefs
          </Link>
        </div>

        <header className="mt-4 pb-8 border-b border-card-border">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent">
            {quote.title} · {quote.folio}
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-primary leading-tight">
            {data.client_name || "Brief sin nombre"}
          </h1>
          <p className="mt-2 text-sm text-muted">Enviado el {submittedAt}</p>

          <div className="no-print mt-6 flex flex-wrap gap-3">
            <DownloadZipButton
              entry={quote}
              sections={sections}
              answers={answers}
              files={files}
              submittedAt={submittedAt}
            />
            <PrintButton />
          </div>
        </header>

        <div className="mt-10">
          <BriefView sections={sections} answers={answers} files={files} />
        </div>
      </div>
    </main>
  );
}
