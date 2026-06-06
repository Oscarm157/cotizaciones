import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "./auth";
import { logout } from "./actions";
import { supabase } from "@/lib/supabase";
import { QUOTE_REGISTRY } from "@/lib/brief/registry";

export const dynamic = "force-dynamic";

interface BriefRow {
  id: string;
  quote_slug: string;
  client_name: string | null;
  created_at: string;
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const { data } = await supabase
    .from("quote_briefs")
    .select("id,quote_slug,client_name,created_at")
    .eq("status", "submitted")
    .order("created_at", { ascending: false });

  const briefs = (data as BriefRow[] | null) || [];

  const groups = new Map<string, BriefRow[]>();
  for (const b of briefs) {
    const list = groups.get(b.quote_slug) || [];
    list.push(b);
    groups.set(b.quote_slug, list);
  }

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-14">
        <header className="flex items-center justify-between pb-8 border-b border-card-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold tracking-tight text-primary">Briefs recibidos</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
            <p className="mt-1 text-sm text-muted">{briefs.length} brief(s) enviados.</p>
          </div>
          <form action={logout}>
            <button className="text-xs uppercase tracking-[0.18em] font-semibold text-muted hover:text-primary transition">
              Salir
            </button>
          </form>
        </header>

        {briefs.length === 0 ? (
          <div className="py-20 text-center text-muted text-sm">Aún no hay briefs enviados.</div>
        ) : (
          <div className="mt-10 space-y-10">
            {[...groups.entries()].map(([slug, rows]) => (
              <section key={slug}>
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-3">
                  {QUOTE_REGISTRY[slug]?.title || slug}
                </div>
                <ul className="flex flex-col gap-2">
                  {rows.map((b) => (
                    <li key={b.id}>
                      <Link
                        href={`/admin/${b.id}`}
                        className="flex items-center justify-between rounded-xl bg-card border border-card-border px-5 py-4 hover:border-accent/50 transition"
                      >
                        <div>
                          <div className="text-base font-semibold text-primary">
                            {b.client_name || "Sin nombre"}
                          </div>
                          <div className="text-[12px] text-muted">
                            {QUOTE_REGISTRY[slug]?.folio || slug}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] text-muted">{fmtDate(b.created_at)}</div>
                          <div className="mt-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                            Ver →
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
