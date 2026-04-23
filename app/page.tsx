import Link from "next/link";

const QUOTES = [
  {
    slug: "intransittech",
    title: "Intransit Technologies Corp",
    subtitle: "Sitio web + Agente IA + Versión bilingüe",
    folio: "384",
    date: "23 de abril de 2026",
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
        </header>

        <section className="mt-10">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-3">
            Cotizaciones activas
          </div>
          <ul className="flex flex-col gap-2">
            {QUOTES.map((q) => (
              <li key={q.slug}>
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
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
