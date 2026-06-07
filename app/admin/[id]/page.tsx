import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "../auth";
import { sql } from "@/lib/db";
import { getClient, type Client } from "@/lib/brief/clients";
import { BRIEF_SCHEMA } from "@/lib/brief/schema";
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

  const client = await getClient(data.quote_slug);
  // El resumen muestra TODO lo respondido (catalogo completo), no solo las
  // secciones actualmente encendidas, para no esconder respuestas.
  const quote: Client =
    client ?? { slug: data.quote_slug, title: data.client_name || data.quote_slug, folio: "", sections: {} };
  const sections = BRIEF_SCHEMA;
  const answers = (data.answers || {}) as Record<string, unknown>;
  const files = (data.files || {}) as Record<string, FileMeta[]>;
  const submittedAt = new Date(data.updated_at).toLocaleDateString("es-MX", {
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
            {quote.folio ? `${quote.title} · ${quote.folio}` : quote.title}
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
