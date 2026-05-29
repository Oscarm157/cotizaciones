import { Fragment } from "react";
import {
  CONTENT as t,
  FOLIO,
  ISSUED,
  VALID,
  PRICE_SITIO,
  PRICE_REDES,
  TOTAL,
  DEPOSIT,
  fmtMxn,
  fmtDate,
} from "./content";
import { PrintButton } from "./print-button";

export default function Page() {
  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      {/* Toolbar — solo pantalla */}
      <div className="no-print sticky top-0 z-20 border-b border-card-border bg-background/80 backdrop-blur">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-muted truncate">
            {t.labels.toolbarLabel(FOLIO, t.client.short)}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <PrintButton label={t.labels.printPdf} />
          </div>
        </div>
      </div>

      {/* ─────────── PÁGINA 1 · PROPUESTA ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed">
        <PhaseBar active={1} phases={t.phases} />

        {/* Encabezado */}
        <header className="flex items-start justify-between gap-6 pb-5 border-b border-card-border mt-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-primary">
                {t.provider.name}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
            <p className="mt-0.5 text-[12px] text-muted max-w-xs leading-snug">
              {t.provider.tagline}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent">
              {t.labels.quote}
            </div>
            <div className="mt-0.5 font-mono text-base text-primary">
              {t.labels.quoteNumber} {FOLIO}
            </div>
            <dl className="mt-1.5 text-[12px] text-muted grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 justify-end">
              <dt className="text-right">{t.labels.issued}</dt>
              <dd className="text-foreground tabular-nums text-right">{fmtDate(ISSUED)}</dd>
              <dt className="text-right">{t.labels.validUntil}</dt>
              <dd className="text-foreground tabular-nums text-right">{fmtDate(VALID)}</dd>
            </dl>
          </div>
        </header>

        {/* Partes */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 border-b border-card-border">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-1">
              {t.labels.from}
            </div>
            <div className="text-[13px] text-foreground font-semibold">{t.provider.name}</div>
            <div className="text-[12px] text-muted">
              {t.provider.roleLabel} · {t.provider.lead}
            </div>
            <div className="text-[12px] text-muted">{t.provider.email}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-1">
              {t.labels.preparedFor}
            </div>
            <div className="text-[13px] text-foreground font-semibold">{t.client.name}</div>
            <div className="text-[12px] text-muted">{t.client.descriptor}</div>
          </div>
        </section>

        {/* Intro */}
        <section className="pt-6">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent">
            {t.intro.eyebrow}
          </div>
          <h1 className="mt-1.5 text-[28px] sm:text-[32px] font-bold leading-[1.08] tracking-[-0.015em] text-primary">
            {t.intro.titleLead}{" "}
            <em className="italic text-gradient-accent">{t.intro.titleEmphasis}</em>{" "}
            {t.intro.titleSuffix} {t.client.short}
          </h1>
          <p className="mt-2 text-[13px] text-muted leading-relaxed max-w-2xl">
            {t.intro.paragraph}
          </p>
        </section>

        {/* Antes / Después */}
        <BeforeAfter />

        <PageFooter label={t.labels.pageOf(1, 3)} />
      </article>

      {/* ─────────── PÁGINA 2 · SITIO Y REDES ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed page-break">
        <PhaseBar active={2} phases={t.phases} />

        <section className="mt-6">
          <SectionTitle icon="check_circle" title={t.features.title} meta={t.features.meta} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {t.features.items.map((f) => (
              <li
                key={f.title}
                className="rounded-xl border border-card-border bg-card p-3 flex gap-3"
              >
                <IconBadge icon={f.icon} />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground leading-tight">
                    {f.title}
                  </div>
                  <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{f.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7">
          <SectionTitle icon="menu_book" title={t.pages.title} meta={t.pages.meta} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {t.pages.items.map((p) => (
              <li
                key={p.name}
                className="rounded-lg bg-card border border-card-border border-l-4 border-l-accent px-3 py-2.5"
              >
                <div className="text-[13px] font-semibold text-foreground">{p.name}</div>
                <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{p.detail}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7">
          <SectionTitle icon="share" title={t.social.title} meta={t.social.meta} />
          <p className="text-[12px] text-muted leading-relaxed max-w-2xl mb-3">
            {t.social.intro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {t.social.items.map((s) => (
              <li
                key={s.title}
                className="rounded-xl border border-card-border bg-card p-3 flex gap-3"
              >
                <IconBadge icon={s.icon} />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground leading-tight">
                    {s.title}
                  </div>
                  <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{s.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <PageFooter label={t.labels.pageOf(2, 3)} />
      </article>

      {/* ─────────── PÁGINA 3 · INVERSIÓN ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed page-break">
        <PhaseBar active={3} phases={t.phases} />

        <section className="mt-6">
          <SectionTitle icon="payments" title={t.investment.title} />

          <div className="rounded-xl border border-card-border bg-card overflow-hidden">
            {/* Renglones */}
            <div className="divide-y divide-card-border">
              <InvestmentRow
                icon="language"
                title={t.investment.lines.sitio.title}
                detail={t.investment.lines.sitio.detail}
                price={fmtMxn(PRICE_SITIO)}
              />
              <InvestmentRow
                icon="share"
                title={t.investment.lines.redes.title}
                detail={t.investment.lines.redes.detail}
                price={fmtMxn(PRICE_REDES)}
              />
              {/* Hosting · cortesía */}
              <div className="flex items-start gap-4 p-4 bg-accent/5">
                <IconBadge icon="dns" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-foreground">
                      {t.investment.lines.hosting.title}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-white bg-accent rounded px-1.5 py-0.5">
                      {t.labels.complimentaryBadge}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-muted mt-0.5 leading-snug max-w-md">
                    {t.investment.lines.hosting.detail}
                  </div>
                </div>
                <div className="text-right shrink-0 tabular-nums">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold">
                    {t.labels.noCharge}
                  </div>
                </div>
              </div>
            </div>

            {/* Total · dark */}
            <div className="grid grid-cols-[1fr_auto] gap-4 p-4 border-t border-primary bg-primary text-primary-foreground">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light mb-0.5">
                  {t.investment.oneTimeLabel}
                </div>
                <div className="text-[12px] text-white/70 leading-snug max-w-md">
                  {t.investment.totalFootnote}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-semibold tabular-nums text-accent-light">
                  {fmtMxn(TOTAL)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {t.investment.totalCaption}
                </div>
              </div>
            </div>

            {/* Anticipo / liquidación */}
            <div className="grid grid-cols-2 divide-x divide-card-border border-t border-card-border">
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.depositLabel}
                </div>
                <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                  {fmtMxn(DEPOSIT)}
                </div>
                <div className="text-[11px] text-muted">{t.investment.depositCaption}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.finalLabel}
                </div>
                <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                  {fmtMxn(TOTAL - DEPOSIT)}
                </div>
                <div className="text-[11px] text-muted">{t.investment.finalCaption}</div>
              </div>
            </div>
          </div>

          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11.5px] text-muted">
            {t.investment.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
            <li>• {t.investment.validityNote(fmtDate(VALID))}</li>
          </ul>
        </section>

        <section className="mt-6 rounded-xl bg-surface-muted border border-card-border p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent mb-1.5">
            {t.nextStep.label}
          </div>
          <p className="text-[13px] text-foreground/90 leading-relaxed">
            {t.nextStep.textBefore}{" "}
            <span className="font-semibold text-foreground">{fmtMxn(DEPOSIT)}</span>{" "}
            {t.nextStep.textAfter}
          </p>
        </section>

        <footer className="mt-8 pt-5 border-t border-card-border flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
              {t.labels.acceptance}
            </div>
            <div className="mt-8 w-60 border-t border-primary/60" />
            <div className="mt-1 text-[11.5px] text-muted">
              {t.labels.signatureOf(t.client.short)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
              {t.provider.name}
            </div>
            <div className="mt-0.5 text-[13px] text-primary font-semibold">{t.provider.lead}</div>
            <div className="text-[11.5px] text-muted">{t.provider.email}</div>
          </div>
        </footer>

        <PageFooter label={t.labels.pageOf(3, 3)} />
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
            break-inside: avoid-page;
            page-break-inside: avoid;
            break-after: page;
            page-break-after: always;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .doc-page:last-of-type {
            break-after: auto;
            page-break-after: auto;
          }
          .page-break {
            break-before: auto !important;
            page-break-before: auto !important;
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

/* ────────── Helpers locales ────────── */

function IconBadge({ icon }: { icon: string }) {
  return (
    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 22, fontVariationSettings: "'wght' 500, 'FILL' 0" }}
      >
        {icon}
      </span>
    </div>
  );
}

function PhaseBar({
  active,
  phases,
}: {
  active: 1 | 2 | 3;
  phases: readonly { num: string; name: string }[];
}) {
  return (
    <div className="flex items-center gap-3 w-full">
      {phases.map((p, i) => {
        const idx = (i + 1) as 1 | 2 | 3;
        const done = idx < active;
        const current = idx === active;
        return (
          <Fragment key={p.num}>
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-semibold tabular-nums ${
                  current
                    ? "bg-accent text-white"
                    : done
                    ? "bg-accent/20 text-accent"
                    : "bg-surface-muted text-muted"
                }`}
              >
                {p.num}
              </div>
              <span
                className={`text-[10.5px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap ${
                  current ? "text-primary" : done ? "text-accent" : "text-muted"
                }`}
              >
                {p.name}
              </span>
            </div>
            {i < phases.length - 1 && (
              <div
                className={`h-px flex-1 min-w-[10px] ${
                  done ? "bg-accent/40" : "bg-card-border"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

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
    <div className="flex items-center justify-between rounded-xl bg-primary text-primary-foreground px-4 py-2.5 mb-4 gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="material-symbols-outlined text-accent shrink-0"
          style={{ fontSize: 20, fontVariationSettings: "'wght' 600" }}
        >
          {icon}
        </span>
        <h2 className="text-[16px] font-bold tracking-tight leading-tight">{title}</h2>
      </div>
      {meta && (
        <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/60 shrink-0 whitespace-nowrap">
          {meta}
        </span>
      )}
    </div>
  );
}

function BeforeAfter() {
  return (
    <section className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
      {/* Antes */}
      <div className="rounded-xl border border-card-border bg-surface-muted/70 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="material-symbols-outlined text-muted"
            style={{ fontSize: 20, fontVariationSettings: "'wght' 500" }}
          >
            remove_circle
          </span>
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
            {t.before.heading}
          </div>
        </div>
        <ul className="space-y-1.5">
          {t.before.items.map((text) => (
            <li key={text} className="text-[12px] text-muted leading-snug flex gap-2">
              <span className="text-muted/50 mt-0.5">·</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Flecha */}
      <div className="hidden md:flex items-center justify-center px-1">
        <span
          className="material-symbols-outlined text-accent"
          style={{ fontSize: 28, fontVariationSettings: "'wght' 500" }}
        >
          arrow_forward
        </span>
      </div>

      {/* Después · dark */}
      <div className="rounded-xl border border-primary bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="material-symbols-outlined text-accent-light"
            style={{ fontSize: 20, fontVariationSettings: "'wght' 600" }}
          >
            check_circle
          </span>
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light">
            {t.after.heading}
          </div>
        </div>
        <ul className="space-y-1.5">
          {t.after.items.map((text) => (
            <li key={text} className="text-[12px] text-white/90 leading-snug flex gap-2">
              <span className="text-accent-light mt-0.5">+</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function InvestmentRow({
  icon,
  title,
  detail,
  price,
}: {
  icon: string;
  title: string;
  detail: string;
  price: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4">
      <IconBadge icon={icon} />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-foreground">{title}</div>
        <div className="text-[11.5px] text-muted mt-0.5 leading-snug max-w-md">{detail}</div>
      </div>
      <div className="text-right shrink-0 tabular-nums">
        <div className="text-lg font-semibold text-foreground">{price}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted">MXN</div>
      </div>
    </div>
  );
}

function PageFooter({ label }: { label: string }) {
  return (
    <div className="mt-6 text-right text-[10px] uppercase tracking-[0.22em] text-muted/70">
      {label}
    </div>
  );
}
