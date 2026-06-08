import { Fragment } from "react";
import Link from "next/link";
import {
  CONTENT,
  FOLIO,
  ISSUED,
  VALID,
  PRICE_SITIO,
  PRICE_HOSTING,
  PRICE_DOMINIO_MIN,
  PRICE_DOMINIO_MAX,
  fmtMxn,
  fmtRange,
  fmtDate,
} from "./content";
import { PrintButton } from "./print-button";

const t = CONTENT;

// Anticipo = el sitio. Liquidacion = hosting + dominio del primer ano (pagos anuales).
const DEPOSIT_MXN = PRICE_SITIO;
const FINAL_MIN = PRICE_HOSTING + PRICE_DOMINIO_MIN;
const FINAL_MAX = PRICE_HOSTING + PRICE_DOMINIO_MAX;
const TOTAL_MIN = DEPOSIT_MXN + FINAL_MIN;
const TOTAL_MAX = DEPOSIT_MXN + FINAL_MAX;

export default function Page() {
  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="no-print sticky top-0 z-20 border-b border-card-border bg-background/80 backdrop-blur">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-muted truncate">
            {t.labels.toolbarLabel(FOLIO, t.client.short)}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={t.relatedQuote.href}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-card-border text-[11px] uppercase tracking-[0.16em] font-semibold text-muted hover:text-accent hover:border-accent/50 transition"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 15, fontVariationSettings: "'wght' 600" }}
              >
                link
              </span>
              {t.relatedQuote.name}
            </Link>
            <PrintButton label={t.labels.printPdf} />
          </div>
        </div>
      </div>

      {/* ─────────── HERO (solo pantalla) ─────────── */}
      <section className="screen-only slide-dark relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
        <div
          className="spotlight-accent absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120%] h-[140%] pointer-events-none"
          aria-hidden
        />
        <div className="relative max-w-[900px] mx-auto px-6 sm:px-10 pt-12 pb-14 hero-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold tracking-tight text-white">
              {t.provider.name}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-light" />
            <span className="text-[12px] text-white/55">{t.provider.tagline}</span>
          </div>

          <div className="mt-9 text-[11px] uppercase tracking-[0.24em] font-semibold text-accent-light">
            {t.intro.eyebrow}
          </div>
          <h1 className="mt-2 text-[32px] sm:text-[48px] font-bold leading-[1.06] tracking-[-0.02em] text-white max-w-[18ch]">
            {t.intro.titleLead}{" "}
            <em className="italic text-gradient-accent">{t.intro.titleEmphasis}</em>{" "}
            {t.intro.titleSuffix} {t.client.short}
          </h1>
          <p className="mt-4 text-[13.5px] sm:text-[14px] text-white/70 leading-relaxed max-w-[62ch]">
            {t.intro.paragraph}
          </p>

          <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-white/10 pt-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/45">
                {t.labels.quote}
              </div>
              <div className="mt-0.5 font-mono text-[14px] text-white">
                {t.labels.quoteNumber} {FOLIO}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/45">
                {t.labels.issued}
              </div>
              <div className="mt-0.5 text-[14px] text-white tabular-nums">{fmtDate(ISSUED)}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/45">
                {t.labels.validUntil}
              </div>
              <div className="mt-0.5 text-[14px] text-white tabular-nums">{fmtDate(VALID)}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/45">
                {t.labels.preparedFor}
              </div>
              <div className="mt-0.5 text-[14px] font-semibold text-white">{t.client.name}</div>
              <div className="text-[12px] text-white/55">{t.client.descriptor}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── PÁGINA 1 · PROPUESTA ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed">
        <PhaseBar active={1} />

        <header className="print-only flex items-start justify-between gap-6 pb-5 border-b border-card-border mt-5">
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

        <section className="print-only grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 border-b border-card-border">
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

        <section className="print-only pt-6">
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

        <BeforeAfter />

        <section className="mt-6">
          <SectionTitle icon="auto_awesome" title={t.benefits.title} meta={t.benefits.meta} />
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {t.benefits.items.map((b) => (
              <li
                key={b.title}
                className="rounded-xl bg-card border border-card-border p-3.5 flex gap-3"
              >
                <IconBadge icon={b.icon} />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground leading-tight">
                    {b.title}
                  </div>
                  <div className="text-[11.5px] text-muted mt-1 leading-snug">{b.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <PageFooter label={t.labels.pageOf(1, 3)} />
      </article>

      {/* ─────────── PÁGINA 2 · EL SITIO ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed page-break">
        <PhaseBar active={2} />

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

        <PageFooter label={t.labels.pageOf(2, 3)} />
      </article>

      {/* ─────────── PÁGINA 3 · INVERSIÓN ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed page-break">
        <PhaseBar active={3} />

        <section className="mt-6">
          <SectionTitle icon="payments" title={t.investment.title} />

          <div className="rounded-xl border border-card-border bg-card overflow-hidden">
            <div className="divide-y divide-card-border">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <IconBadge icon="domain" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-foreground">
                      {t.investment.lines.sitio.title}
                    </div>
                    <div className="text-[11.5px] text-muted mt-0.5 leading-snug max-w-md">
                      {t.investment.lines.sitio.detail}
                    </div>
                  </div>
                  <div className="text-right shrink-0 tabular-nums">
                    <div className="text-lg font-semibold text-foreground">
                      {fmtMxn(PRICE_SITIO)}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted mt-0.5">
                      {t.labels.plusVat}
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:ml-14 rounded-lg bg-surface-muted/60 border border-card-border p-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent mb-2">
                    {t.investment.pagesLabel}
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5">
                    {t.pages.items.map((p) => (
                      <li key={p.name} className="flex gap-2 text-[11.5px] leading-snug">
                        <span className="font-mono font-semibold text-accent tabular-nums shrink-0">
                          {p.num}
                        </span>
                        <span className="min-w-0">
                          <span className="font-semibold text-foreground">{p.name}</span>
                          <span className="text-muted"> · {p.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <InvestmentRow
                icon="dns"
                title={t.investment.lines.hosting.title}
                detail={t.investment.lines.hosting.detail}
                price={`${fmtMxn(PRICE_HOSTING)} ${t.labels.perYear}`}
              />
              <InvestmentRow
                icon="language"
                title={t.investment.lines.dominio.title}
                detail={t.investment.lines.dominio.detail}
                price={`${fmtRange(PRICE_DOMINIO_MIN, PRICE_DOMINIO_MAX)} ${t.labels.perYear}`}
              />
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-4 p-4 border-t border-primary bg-primary text-primary-foreground">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light mb-0.5">
                  {t.investment.totalLabel}
                </div>
                <div className="text-[12px] text-white/70 leading-snug max-w-md">
                  {t.investment.recurringNote}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-semibold tabular-nums text-accent-light">
                  {fmtRange(TOTAL_MIN, TOTAL_MAX)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {t.investment.totalCaption} · {t.labels.plusVat}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-card-border border-t border-card-border">
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.depositLabel}
                </div>
                <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                  {fmtMxn(DEPOSIT_MXN)}{" "}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-normal">
                    {t.labels.plusVat}
                  </span>
                </div>
                <div className="text-[11px] text-muted">{t.investment.depositCaption}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.finalLabel}
                </div>
                <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                  {fmtRange(FINAL_MIN, FINAL_MAX)}{" "}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-normal">
                    {t.labels.plusVat}
                  </span>
                </div>
                <div className="text-[11px] text-muted">{t.investment.finalCaption}</div>
              </div>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11.5px] text-muted">
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
            <span className="font-semibold text-foreground">{fmtMxn(DEPOSIT_MXN)}</span>{" "}
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
        @media screen {
          .print-only { display: none !important; }
        }
        @media print {
          .no-print { display: none !important; }
          .screen-only { display: none !important; }
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

function IconBadge({ icon, small = false }: { icon: string; small?: boolean }) {
  const size = small ? "w-8 h-8" : "w-10 h-10";
  const iconSize = small ? 18 : 22;
  return (
    <div
      className={`shrink-0 ${size} rounded-lg bg-accent/10 text-accent flex items-center justify-center`}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: iconSize, fontVariationSettings: "'wght' 500, 'FILL' 0" }}
      >
        {icon}
      </span>
    </div>
  );
}

function PhaseBar({ active }: { active: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1.5 w-full">
      {t.phases.map((p, i) => {
        const idx = (i + 1) as 1 | 2 | 3;
        const done = idx < active;
        const current = idx === active;
        return (
          <Fragment key={p.num}>
            <div className="flex items-center gap-1.5 shrink-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-semibold tabular-nums ${
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
                className={`text-[9.5px] uppercase tracking-[0.08em] font-semibold whitespace-nowrap ${
                  current ? "text-primary" : done ? "text-accent" : "text-muted"
                }`}
              >
                {p.name}
              </span>
            </div>
            {i < t.phases.length - 1 && (
              <div
                className={`h-px flex-1 min-w-[6px] ${done ? "bg-accent/40" : "bg-card-border"}`}
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
  emphasis,
}: {
  icon: string;
  title: string;
  meta?: string;
  emphasis?: string;
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
        <h2 className="text-[16px] font-bold tracking-tight leading-tight">
          {title}
          {emphasis && (
            <>
              {" "}
              <em className="italic text-accent-light font-bold">{emphasis}</em>
            </>
          )}
        </h2>
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

      <div className="hidden md:flex items-center justify-center px-1">
        <span
          className="material-symbols-outlined text-accent"
          style={{ fontSize: 28, fontVariationSettings: "'wght' 500" }}
        >
          arrow_forward
        </span>
      </div>

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
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted mt-0.5">
          {t.labels.plusVat}
        </div>
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
