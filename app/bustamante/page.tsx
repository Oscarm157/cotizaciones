import { Fragment } from "react";
import {
  CONTENT,
  FOLIO,
  ISSUED,
  VALID,
  PRICE_SITIO,
  PRICE_AGENTE,
  PRICE_BILINGUE,
  PRICE_HOSTING,
  PRICE_DOMINIO,
  TOTAL,
  DEPOSIT,
  ANNUAL,
  fmtMxn,
  fmtDate,
  type Lang,
} from "./content";
import { PrintButton } from "./print-button";
import { LangToggle } from "./lang-toggle";
import { BrowserLangDetector } from "./browser-lang-detector";

type SP = Promise<{ lang?: string }>;

export default async function Page({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const lang: Lang = sp?.lang === "en" ? "en" : "es";
  const t = CONTENT[lang];

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      {!sp?.lang && <BrowserLangDetector />}

      {/* Toolbar — solo pantalla */}
      <div className="no-print sticky top-0 z-20 border-b border-card-border bg-background/80 backdrop-blur">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-muted truncate">
            {t.labels.toolbarLabel(FOLIO, t.client.short)}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LangToggle current={lang} ariaLabel={t.langToggle.ariaLabel} />
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
              <dd className="text-foreground tabular-nums text-right">{fmtDate(ISSUED, lang)}</dd>
              <dt className="text-right">{t.labels.validUntil}</dt>
              <dd className="text-foreground tabular-nums text-right">{fmtDate(VALID, lang)}</dd>
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
        <BeforeAfter t={t} />

        {/* Beneficios en el día a día */}
        <section className="mt-6">
          <SectionTitle icon="auto_awesome" title={t.benefits.title} meta={t.benefits.meta} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <PageFooter label={t.labels.pageOf(1, 4)} />
      </article>

      {/* ─────────── PÁGINA 2 · EL SITIO ─────────── */}
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

        <PageFooter label={t.labels.pageOf(2, 4)} />
      </article>

      {/* ─────────── PÁGINA 3 · CONTENIDO ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed page-break">
        <PhaseBar active={3} phases={t.phases} />

        {/* Áreas de práctica */}
        <section className="mt-6">
          <SectionTitle icon="gavel" title={t.practiceAreas.title} meta={t.practiceAreas.meta} />
          <p className="text-[12px] text-muted leading-relaxed max-w-2xl mb-3">
            {t.practiceAreas.intro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {t.practiceAreas.items.map((c) => (
              <li
                key={c.name}
                className="rounded-lg bg-card border border-card-border px-3 py-2.5 flex gap-3"
              >
                <IconBadge icon={c.icon} small />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground leading-tight">
                    {c.name}
                  </div>
                  <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{c.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Agente con IA */}
        <section className="mt-7">
          <SectionTitle
            icon="smart_toy"
            title={t.agent.titleLead}
            emphasis={t.agent.titleEmphasis}
            meta={t.agent.meta}
          />
          <p className="text-[12px] text-muted leading-relaxed max-w-2xl mb-3">
            {t.agent.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Qué hace · cards en dark */}
            <ul className="grid grid-cols-1 gap-2">
              {t.agent.features.map((a) => (
                <li
                  key={a.title}
                  className="rounded-lg bg-primary text-primary-foreground border border-primary/30 p-3 flex gap-3"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-accent/20 text-accent-light flex items-center justify-center">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 18, fontVariationSettings: "'wght' 500" }}
                    >
                      {a.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold leading-tight">{a.title}</div>
                    <div className="text-[11.5px] text-white/70 mt-0.5 leading-snug">
                      {a.detail}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mock de chat */}
            <ChatMock t={t} />
          </div>

          {/* Nota de integración */}
          <div className="mt-3 rounded-lg bg-accent/10 border border-accent/30 px-3 py-2.5 flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-accent shrink-0 mt-0.5"
              style={{ fontSize: 18, fontVariationSettings: "'wght' 600" }}
            >
              info
            </span>
            <div className="text-[11.5px] text-foreground/90 leading-snug">
              <span className="font-semibold text-primary">{t.requisite.label}</span>{" "}
              {t.requisite.before} <span className="font-semibold">ChatGPT (OpenAI)</span>{" "}
              {t.requisite.or} <span className="font-semibold">Gemini (Google)</span>
              {t.requisite.middle}
            </div>
          </div>
        </section>

        <PageFooter label={t.labels.pageOf(3, 4)} />
      </article>

      {/* ─────────── PÁGINA 4 · INVERSIÓN ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[14px] leading-relaxed page-break">
        <PhaseBar active={4} phases={t.phases} />

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
                icon="support_agent"
                title={t.investment.lines.agente.title}
                detail={t.investment.lines.agente.detail}
                price={fmtMxn(PRICE_AGENTE)}
              />
              <InvestmentRow
                icon="translate"
                title={t.investment.lines.bilingue.title}
                detail={t.investment.lines.bilingue.detail}
                price={fmtMxn(PRICE_BILINGUE)}
              />
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

          {/* Mantenimiento anual */}
          <div className="mt-4 rounded-xl border border-card-border bg-card overflow-hidden">
            <div className="flex items-center justify-between bg-surface-muted/60 px-4 py-2.5 border-b border-card-border gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="material-symbols-outlined text-accent shrink-0"
                  style={{ fontSize: 18, fontVariationSettings: "'wght' 600" }}
                >
                  autorenew
                </span>
                <h3 className="text-[13px] font-semibold text-foreground leading-tight">
                  {t.investment.annual.title}
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted shrink-0 whitespace-nowrap">
                {t.investment.annual.caption}
              </span>
            </div>
            <div className="divide-y divide-card-border">
              <InvestmentRow
                icon="dns"
                title={t.investment.annual.lines.hosting.title}
                detail={t.investment.annual.lines.hosting.detail}
                price={fmtMxn(PRICE_HOSTING)}
              />
              <InvestmentRow
                icon="public"
                title={t.investment.annual.lines.dominio.title}
                detail={t.investment.annual.lines.dominio.detail}
                price={fmtMxn(PRICE_DOMINIO)}
              />
            </div>
            <div className="flex items-end justify-between gap-4 px-4 py-3 border-t border-card-border bg-surface-muted/40">
              <div className="text-[11.5px] text-muted leading-snug max-w-md">
                {t.investment.annual.intro}
              </div>
              <div className="text-right shrink-0 tabular-nums">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.annual.subtotalLabel}
                </div>
                <div className="text-lg font-semibold text-foreground">{fmtMxn(ANNUAL)}</div>
              </div>
            </div>
          </div>

          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11.5px] text-muted">
            {t.investment.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
            <li>• {t.investment.validityNote(fmtDate(VALID, lang))}</li>
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

        <PageFooter label={t.labels.pageOf(4, 4)} />
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

function PhaseBar({
  active,
  phases,
}: {
  active: 1 | 2 | 3 | 4;
  phases: readonly { num: string; name: string }[];
}) {
  return (
    <div className="flex items-center gap-3 w-full">
      {phases.map((p, i) => {
        const idx = (i + 1) as 1 | 2 | 3 | 4;
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

function BeforeAfter({ t }: { t: typeof CONTENT[Lang] }) {
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

function ChatMock({ t }: { t: typeof CONTENT[Lang] }) {
  return (
    <div className="rounded-xl border border-card-border bg-card overflow-hidden flex flex-col">
      {/* Header del chat */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-card-border bg-surface-muted/60">
        <div className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 14, fontVariationSettings: "'wght' 600" }}
          >
            support_agent
          </span>
        </div>
        <div>
          <div className="text-[11.5px] font-semibold text-foreground leading-none">
            {t.chatHeader.title}
          </div>
          <div className="text-[9.5px] text-muted mt-0.5">{t.chatHeader.status}</div>
        </div>
        <div className="ml-auto flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] font-semibold text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {t.chatHeader.badge}
        </div>
      </div>

      {/* Mensajes */}
      <div className="p-3 space-y-2 flex-1">
        {t.chat.map((m, i) => {
          const isAgent = m.from === "agent";
          return (
            <div key={i} className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[11.5px] leading-snug ${
                  isAgent
                    ? "bg-accent text-white rounded-tl-sm"
                    : "bg-surface-muted text-foreground rounded-tr-sm border border-card-border"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input simulado */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-card-border">
        <div className="flex-1 text-[11px] text-muted/70 italic">{t.chatHeader.placeholder}</div>
        <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 14, fontVariationSettings: "'wght' 700" }}
          >
            send
          </span>
        </div>
      </div>
    </div>
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
