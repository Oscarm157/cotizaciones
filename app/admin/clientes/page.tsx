import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "../auth";
import { listClients, quotePathFor } from "@/lib/brief/clients";
import { createClientAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { error } = await searchParams;
  const clients = await listClients();

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-14">
        <div className="no-print">
          <Link href="/admin" className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted hover:text-primary transition">
            ← Panel
          </Link>
        </div>

        <header className="mt-4 pb-8 border-b border-card-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-primary">Clientes</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <p className="mt-1 text-sm text-muted">{clients.length} cliente(s). Cada uno define qué secciones tiene su brief.</p>
        </header>

        <section className="mt-8 bg-card border border-card-border rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-primary">Nuevo cliente</h2>
          {error === "existe" && <p className="mt-2 text-sm text-danger">Ya existe un cliente con ese slug.</p>}
          {error === "datos" && <p className="mt-2 text-sm text-danger">Revisa los datos: el slug solo lleva minúsculas, números y guiones.</p>}
          <form action={createClientAction} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="title" required placeholder="Nombre del cliente"
              className="bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base text-primary placeholder:text-muted-light" />
            <input name="slug" required placeholder="slug (ej. vbt)"
              className="bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base text-primary placeholder:text-muted-light" />
            <input name="folio" placeholder="Folio (opcional, ej. WB-136)"
              className="bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base text-primary placeholder:text-muted-light" />
            <button type="submit"
              className="rounded-lg bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition">
              Crear cliente
            </button>
          </form>
          <p className="mt-2 text-xs text-muted">El link del brief será /brief/&lt;slug&gt;. Al crearlo eliges las secciones.</p>
        </section>

        <div className="mt-10 space-y-2">
          {clients.map((c) => (
            <Link key={c.slug} href={`/admin/clientes/${c.slug}`}
              className="flex items-center justify-between rounded-xl bg-card border border-card-border px-5 py-4 hover:border-accent/50 transition">
              <div>
                <div className="text-base font-semibold text-primary">{c.title}</div>
                <div className="text-[12px] text-muted">
                  /brief/{c.slug}{quotePathFor(c.slug) ? ` · cotización ${quotePathFor(c.slug)}` : ""}
                </div>
              </div>
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">Editar →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
