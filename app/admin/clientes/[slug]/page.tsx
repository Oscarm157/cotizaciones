import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "../../auth";
import { sql } from "@/lib/db";
import { getClient, quotePathFor } from "@/lib/brief/clients";
import { SECTION_CATALOG, BRIEF_SCHEMA } from "@/lib/brief/schema";
import type { FileMeta } from "@/lib/brief/types";
import { updateClientAction, deleteClientAction } from "../actions";
import BriefView from "@/components/brief/BriefView";
import DownloadZipButton from "@/components/brief/DownloadZipButton";

export const dynamic = "force-dynamic";

const STEP_TITLES: Record<number, string> = { 1: "Tu marca", 2: "El proyecto", 3: "Cierre" };

export default async function ClienteEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ok?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { slug } = await params;
  const { ok } = await searchParams;
  const client = await getClient(slug);
  if (!client) notFound();

  const quotePath = quotePathFor(slug);

  // Último brief ENVIADO de este cliente (para el resumen).
  const rows = await sql`
    select id, answers, files, updated_at from quote_briefs
    where quote_slug = ${slug} and status = 'submitted'
    order by updated_at desc limit 1`;
  const last = rows[0];
  const answers = (last?.answers || {}) as Record<string, unknown>;
  const files = (last?.files || {}) as Record<string, FileMeta[]>;
  const submittedAt = last
    ? new Date(last.updated_at).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })
    : null;

  const byStep = [1, 2, 3].map((step) => ({
    step,
    sections: SECTION_CATALOG.filter((s) => s.step === step),
  }));

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-14">
        <Link href="/admin/clientes" className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted hover:text-primary transition">
          ← Clientes
        </Link>

        <header className="mt-4 pb-6 border-b border-card-border">
          <h1 className="text-2xl font-semibold text-primary">{client.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link href={`/brief/${slug}`} className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-white px-4 py-2 text-sm font-semibold hover:bg-accent/90 transition">
              Abrir brief →
            </Link>
            {quotePath && (
              <Link href={quotePath} className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-card text-primary px-4 py-2 text-sm font-semibold hover:border-accent transition">
                Ver cotización →
              </Link>
            )}
          </div>
        </header>

        {/* Resumen del último brief enviado */}
        <section className="mt-8">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-3">
            Brief cargado
          </div>
          {last ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">Enviado el {submittedAt}</p>
                <DownloadZipButton entry={client} sections={BRIEF_SCHEMA} answers={answers} files={files} submittedAt={submittedAt ?? undefined} />
              </div>
              <BriefView sections={BRIEF_SCHEMA} answers={answers} files={files} />
            </div>
          ) : (
            <p className="text-sm text-muted py-6">Este cliente todavía no ha enviado su brief.</p>
          )}
        </section>

        {/* Editor del brief: datos + secciones */}
        <section className="mt-12">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-3">
            Editor del brief
          </div>
          {ok && <p className="mb-3 text-sm text-success">Cambios guardados.</p>}
          <form action={updateClientAction} className="space-y-6">
            <input type="hidden" name="slug" value={slug} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="title" defaultValue={client.title} placeholder="Nombre del cliente"
                className="bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base text-primary placeholder:text-muted-light" />
              <input name="folio" defaultValue={client.folio} placeholder="Folio (opcional)"
                className="bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base text-primary placeholder:text-muted-light" />
            </div>

            {byStep.map(({ step, sections }) => (
              <div key={step} className="bg-card border border-card-border rounded-2xl p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent mb-3">
                  Paso {step} · {STEP_TITLES[step]}
                </div>
                <div className="space-y-1">
                  {sections.map((s) => (
                    <label key={s.id} className="flex items-center justify-between py-2 cursor-pointer">
                      <span className="text-sm text-primary">{s.title}</span>
                      <input type="checkbox" name={`s_${s.id}`} defaultChecked={client.sections?.[s.id] === true}
                        className="w-5 h-5 accent-[var(--accent)] cursor-pointer" />
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button type="submit"
              className="w-full rounded-lg bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition">
              Guardar cambios
            </button>
          </form>

          <form action={deleteClientAction} className="mt-4">
            <input type="hidden" name="slug" value={slug} />
            <button type="submit"
              className="text-xs uppercase tracking-[0.18em] font-semibold text-danger hover:opacity-80 transition">
              Eliminar cliente
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
