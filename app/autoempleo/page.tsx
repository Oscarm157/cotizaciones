import { CONTENT as t, FOLIO, ISSUED, IVA_RATE, fmtMxn, fmtDate } from "./content";
import { PrintButton } from "./print-button";

// Los precios mostrados ya incluyen IVA; se desglosa el neto y el impuesto.
const TOTALS = t.categories.map((c) =>
  c.items.reduce((sum, i) => sum + i.price, 0)
);
const NETS = TOTALS.map((tot) => Math.round(tot / (1 + IVA_RATE)));
const IVAS = TOTALS.map((tot, i) => tot - NETS[i]);

const TOTAL = TOTALS.reduce((sum, n) => sum + n, 0);
const TOTAL_NET = NETS.reduce((sum, n) => sum + n, 0);
const TOTAL_IVA = IVAS.reduce((sum, n) => sum + n, 0);

export default function Page() {
  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      {/* Toolbar — solo pantalla */}
      <div className="no-print sticky top-0 z-20 border-b border-card-border bg-background/80 backdrop-blur">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-muted truncate">
            {t.labels.toolbarLabel(FOLIO, t.beneficiary.name)}
          </div>
          <PrintButton label={t.labels.printPdf} />
        </div>
      </div>

      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-7 text-[14px] leading-relaxed">
        {/* Encabezado */}
        <header className="flex items-start justify-between gap-6 pb-4 border-b border-card-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-primary">
                {t.program.name}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
            <p className="mt-0.5 text-[12px] text-muted leading-snug">
              {t.labels.docType}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent">
              {t.labels.folio}
            </div>
            <div className="mt-0.5 font-mono text-base text-primary">{FOLIO}</div>
            <dl className="mt-1.5 text-[12px] text-muted grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 justify-end">
              <dt className="text-right">{t.labels.issued}</dt>
              <dd className="text-foreground tabular-nums text-right">
                {fmtDate(ISSUED)}
              </dd>
            </dl>
          </div>
        </header>

        {/* Beneficiario / Programa */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4 border-b border-card-border">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-1">
              {t.labels.beneficiary}
            </div>
            <div className="text-[13px] text-foreground font-semibold">
              {t.beneficiary.name}
            </div>
            <div className="text-[12px] text-muted mt-0.5">
              <span className="font-semibold text-foreground/80">
                {t.labels.rfc}:
              </span>{" "}
              {t.beneficiary.rfc ? (
                <span className="font-mono tracking-wide">{t.beneficiary.rfc}</span>
              ) : (
                <span className="inline-block w-40 border-b border-foreground/40 align-baseline" />
              )}
            </div>
            <div className="text-[12px] text-muted">
              <span className="font-semibold text-foreground/80">
                {t.labels.business}:
              </span>{" "}
              {t.beneficiary.business}
            </div>
            <div className="text-[12px] text-muted">{t.beneficiary.location}</div>
            <div className="text-[12px] text-accent">{t.beneficiary.email}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-1">
              {t.labels.program}
            </div>
            <div className="text-[13px] text-foreground font-semibold">
              {t.program.name}
            </div>
            <div className="text-[12px] text-muted leading-snug">
              {t.beneficiary.activity}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="pt-4">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent">
            {t.intro.eyebrow}
          </div>
          <h1 className="mt-1 text-[24px] sm:text-[26px] font-bold leading-[1.1] tracking-[-0.015em] text-primary">
            {t.intro.title}
          </h1>
          <p className="mt-1.5 text-[12.5px] text-muted leading-snug max-w-3xl">
            {t.intro.paragraph}
          </p>
        </section>

        {/* Categorías */}
        {t.categories.map((cat, ci) => (
          <section className="mt-5" key={cat.key}>
            <SectionTitle
              icon={cat.icon}
              title={cat.label}
              meta={`${t.labels.supplier}: ${cat.supplier}`}
            />
            <div className="rounded-xl border border-card-border bg-card overflow-hidden">
              <div className="divide-y divide-card-border">
                {cat.items.map((it) => (
                  <LineRow
                    key={it.name}
                    name={it.name}
                    detail={it.detail}
                    price={fmtMxn(it.price)}
                  />
                ))}
              </div>
              <div className="border-t border-card-border bg-surface-muted px-3.5 py-2 space-y-1">
                <div className="grid grid-cols-[1fr_auto] gap-4 text-[11.5px] text-muted">
                  <span>{t.labels.subtotalNet}</span>
                  <span className="text-right tabular-nums text-foreground/80">
                    {fmtMxn(NETS[ci])}
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 text-[11.5px] text-muted">
                  <span>{t.labels.iva}</span>
                  <span className="text-right tabular-nums text-foreground/80">
                    {fmtMxn(IVAS[ci])}
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 pt-1 border-t border-card-border">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted self-center">
                    {t.labels.totalCat} · {cat.label}
                  </span>
                  <span className="text-right tabular-nums text-[15px] font-semibold text-foreground">
                    {fmtMxn(TOTALS[ci])}{" "}
                    <span className="text-[10px] text-muted">MXN</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Total */}
        <section className="mt-5">
          <div className="grid grid-cols-[1fr_auto] gap-4 p-4 rounded-xl border border-primary bg-primary text-primary-foreground">
            <div className="self-center">
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light mb-1">
                {t.labels.total}
              </div>
              <dl className="text-[11.5px] text-white/70 grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 w-fit tabular-nums">
                <dt>{t.labels.subtotalNet}</dt>
                <dd className="text-right text-white/90">{fmtMxn(TOTAL_NET)}</dd>
                <dt>{t.labels.iva}</dt>
                <dd className="text-right text-white/90">{fmtMxn(TOTAL_IVA)}</dd>
              </dl>
            </div>
            <div className="text-right shrink-0 self-center">
              <div className="text-3xl font-semibold tabular-nums text-accent-light">
                {fmtMxn(TOTAL)}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                {t.labels.totalCaption}
              </div>
            </div>
          </div>

          <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 text-[11px] text-muted">
            {t.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
          </ul>
        </section>

        {/* Firma */}
        <footer className="mt-8 pt-4 border-t border-card-border flex items-end justify-between gap-6">
          <div>
            <div className="mt-7 w-64 border-t border-primary/60" />
            <div className="mt-1 text-[11.5px] text-muted">
              {t.labels.acceptance}
            </div>
            <div className="text-[12.5px] text-foreground font-semibold">
              {t.beneficiary.name}
            </div>
          </div>
        </footer>

        <div className="mt-5 text-right text-[10px] uppercase tracking-[0.22em] text-muted/70">
          {t.labels.pageOf(1, 1)}
        </div>
      </article>

      <style>{`
        @page { size: Letter; margin: 10mm 12mm; }
        @media print {
          .no-print { display: none !important; }
          html, body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .doc-page {
            padding: 0 !important;
            max-width: 100% !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          article section, article ul li, article header, article footer {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}

/* ────────── Helpers ────────── */

function SectionTitle({
  icon,
  title,
  meta,
}: {
  icon: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-primary text-primary-foreground px-4 py-2 mb-3 gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="material-symbols-outlined text-accent shrink-0"
          style={{ fontSize: 20, fontVariationSettings: "'wght' 600" }}
        >
          {icon}
        </span>
        <h2 className="text-[15px] font-bold tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {meta && (
        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/60 shrink-0 whitespace-nowrap truncate max-w-[55%]">
          {meta}
        </span>
      )}
    </div>
  );
}

function LineRow({
  name,
  detail,
  price,
}: {
  name: string;
  detail: string;
  price: string;
}) {
  return (
    <div className="flex items-start gap-4 px-3.5 py-2.5">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-foreground">{name}</div>
        <div className="text-[11px] text-muted mt-0.5 leading-snug max-w-md">
          {detail}
        </div>
      </div>
      <div className="text-right shrink-0 tabular-nums">
        <div className="text-[15px] font-semibold text-foreground">{price}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted">
          MXN
        </div>
      </div>
    </div>
  );
}
