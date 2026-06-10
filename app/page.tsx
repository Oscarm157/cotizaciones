import Link from "next/link";

const QUOTES = [
  {
    slug: "inmobiliaria",
    title: "Inmobiliaria Vértice",
    subtitle: "Portal inmobiliario + Autoadmin + Cotizador con CRM",
    folio: "WB-133",
    date: "25 de mayo de 2026",
  },
  {
    slug: "rentasa",
    title: "Rentasa, Proyectos Inmobiliarios",
    subtitle: "Sitio web informativo · 5 páginas",
    folio: "WB-136",
    date: "8 de junio de 2026",
  },
  {
    slug: "intransittech",
    title: "Intransit Technologies Corp",
    subtitle: "Sitio web + Agente IA + Versión bilingüe",
    folio: "384",
    date: "23 de abril de 2026",
  },
  {
    slug: "pescador",
    title: "Daniel Alejandro Pescador Silva",
    subtitle: "Sitio web 5 páginas + Gestión de redes",
    folio: "WB-134",
    date: "29 de mayo de 2026",
  },
  {
    slug: "bustamante",
    title: "Hector Bustamante",
    subtitle: "Sitio web de servicios legales · agente IA y bilingüe opcionales",
    folio: "WB-135",
    date: "1 de junio de 2026",
  },
];

export default function Page() {
  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="max-w-[900px] mx-auto px-8 sm:px-12 py-16">
        <header className="pb-8 border-b border-card-border">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-primary">
              Bravo Publicidad
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <p className="mt-1 text-sm text-muted">
            Cotizaciones y propuestas digitales.
          </p>
          <Link
            href="/admin"
            className="mt-3 inline-block text-[11px] uppercase tracking-[0.18em] font-semibold text-accent hover:text-accent-light transition"
          >
            Briefs recibidos →
          </Link>
        </header>

        <section className="mt-10">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-3">
            Cotizaciones activas
          </div>
          <ul className="flex flex-col gap-2">
            {QUOTES.map((q) => (
              <li key={q.slug} className="flex flex-col gap-1.5">
                <Link
                  href={`/${q.slug}`}
                  className="flex items-center justify-between rounded-xl bg-card border border-card-border px-5 py-4 hover:border-accent/50 transition"
                >
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent">
                      Cotización {q.folio}
                    </div>
                    <div className="mt-0.5 text-base font-semibold text-primary">
                      {q.title}
                    </div>
                    <div className="text-[12px] text-muted">{q.subtitle}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-muted">{q.date}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                      Abrir →
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/brief/${q.slug}`}
                  className="self-start pl-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-muted hover:text-accent transition"
                >
                  Brief del proyecto →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
