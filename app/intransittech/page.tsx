import { Fragment } from "react";
import {
  CONTENT,
  FOLIO,
  ISSUED,
  VALID,
  PRICE_SITIO,
  PRICE_AGENTE,
  PRICE_TRANSLATION,
  USD_TOTAL,
  USD_DEPOSIT,
  fmtUsd,
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

  const depositLabel = t.labels.signatureOf; // unused helper placeholder to keep types happy
  void depositLabel;

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      {!sp?.lang && <BrowserLangDetector />}

      {/* Toolbar — solo pantalla */}
      <div className="no-print sticky top-0 z-20 border-b border-card-border bg-background/80 backdrop-blur">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center justify-between gap-3">
          <div className="text-[11.5px] uppercase tracking-[0.22em] font-semibold text-muted truncate">
            {t.labels.toolbarLabel(FOLIO, t.client.short)}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LangToggle current={lang} ariaLabel={t.langToggle.ariaLabel} />
            <PrintButton label={t.labels.printPdf} />
          </div>
        </div>
      </div>

      {/* ─────────── PÁGINA 1 · PROPUESTA ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[13px] leading-relaxed">
        {/* Portada · bloque navy a ancho completo */}
        <div className="cover bleed -mx-8 sm:-mx-12 -mt-8 bg-primary text-primary-foreground px-8 sm:px-12 pt-6 pb-7">
          <PhaseBar active={1} phases={t.phases} dark />

          <div className="mt-7 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold tracking-tight text-white">
                {t.provider.name}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-light" />
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light">
                {t.labels.quote}
              </div>
              <div className="mt-0.5 font-mono text-[15px] text-white">
                {t.labels.quoteNumber} {FOLIO}
              </div>
            </div>
          </div>

          <div className="mt-6 text-[10px] uppercase tracking-[0.24em] font-semibold text-accent-light">
            {t.intro.eyebrow}
          </div>
          <h1 className="mt-2.5 text-[38px] sm:text-[46px] font-bold leading-[1.02] tracking-[-0.015em] text-white max-w-3xl">
            {t.intro.titleLead}{" "}
            <em className="italic text-accent-light">{t.intro.titleEmphasis}</em>{" "}
            {t.intro.titleSuffix} {t.client.short}
          </h1>
          <p className="mt-3.5 text-[13px] text-white/70 leading-relaxed max-w-2xl">
            {t.intro.paragraph}
          </p>

          <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3">
            <CoverMeta
              label={t.labels.from}
              value={t.provider.name}
              sub={`${t.provider.roleLabel} · ${t.provider.lead}`}
            />
            <CoverMeta
              label={t.labels.preparedFor}
              value={t.client.name}
              sub={t.client.descriptor}
            />
            <CoverMeta label={t.labels.issued} value={fmtDate(ISSUED, lang)} />
            <CoverMeta label={t.labels.validUntil} value={fmtDate(VALID, lang)} />
          </div>
        </div>

        {/* Antes / Después */}
        <BeforeAfter t={t} />

        {/* Beneficios en el día a día */}
        <section className="mt-8 bleed -mx-8 sm:-mx-12">
          <SectionBand num="01" title={t.benefits.title} meta={t.benefits.meta} tone="navy" />
          <div className="bg-surface-muted/40 px-8 sm:px-12 py-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {t.benefits.items.map((b, i) => (
                <li key={b.title} className="flex gap-3.5">
                  <span className="font-mono text-[10px] text-accent tabular-nums pt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-primary leading-tight">
                      {b.title}
                    </div>
                    <div className="text-[11.5px] text-muted mt-1 leading-relaxed">{b.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PageFooter label={t.labels.pageOf(1, 4)} />
      </article>

      {/* ─────────── PÁGINA 2 · TRANSFORMACIÓN ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[13px] leading-relaxed page-break">
        <PhaseBar active={2} phases={t.phases} />

        <section className="mt-6 bleed -mx-8 sm:-mx-12">
          <SectionBand num="02" title={t.features.title} meta={t.features.meta} tone="accent" />
          <div className="px-8 sm:px-12 py-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {t.features.items.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <IconBadge icon={f.icon} />
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-primary leading-tight">
                      {f.title}
                    </div>
                    <div className="text-[11.5px] text-muted mt-0.5 leading-relaxed">{f.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8 bleed -mx-8 sm:-mx-12">
          <SectionBand num="03" title={t.pages.title} meta={t.pages.meta} tone="navy" />
          <div className="bg-surface-muted/40 px-8 sm:px-12 py-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              {t.pages.items.map((p, i) => (
                <li
                  key={p.name}
                  className="flex items-baseline gap-3 py-2 border-b border-dashed border-card-border"
                >
                  <span className="font-mono text-[10px] text-accent tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-semibold text-primary shrink-0">{p.name}</span>
                  <span className="text-[11.5px] text-muted leading-snug text-right ml-auto max-w-[62%]">
                    {p.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PageFooter label={t.labels.pageOf(2, 4)} />
      </article>

      {/* ─────────── PÁGINA 3 · CONTENIDO ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[13px] leading-relaxed page-break">
        <PhaseBar active={3} phases={t.phases} />

        {/* Catálogo por categorías */}
        <section className="mt-6 bleed -mx-8 sm:-mx-12">
          <SectionBand num="04" title={t.categories.title} meta={t.categories.meta} tone="accent" />
          <div className="px-8 sm:px-12 py-7">
            <p className="text-[12px] text-muted leading-relaxed max-w-2xl mb-5">
              {t.categories.intro}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
              {t.categories.items.map((c) => (
                <li key={c.name} className="flex gap-3.5 py-3 border-t border-card-border">
                  <span
                    className="material-symbols-outlined text-accent shrink-0 mt-px"
                    style={{ fontSize: 21, fontVariationSettings: "'wght' 300, 'FILL' 0" }}
                  >
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-primary leading-tight">
                      {c.name}
                    </div>
                    <div className="text-[11.5px] text-muted mt-1 leading-snug">{c.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Agente de ventas IA */}
        <section className="mt-7 bleed -mx-8 sm:-mx-12">
          <SectionBand
            num="05"
            title={t.agent.titleLead}
            emphasis={t.agent.titleEmphasis}
            meta={t.agent.meta}
            tone="navy"
          />
          <div className="bg-surface-muted/40 px-8 sm:px-12 py-7">
            <p className="text-[12px] text-muted leading-relaxed max-w-2xl mb-3">
              {t.agent.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8">
              {/* Flujo · cómo califica al lead */}
              <ol className="relative">
                {t.agent.features.map((a, i) => (
                  <li key={a.title} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < t.agent.features.length - 1 && (
                      <span className="absolute left-4 top-9 -bottom-0 w-px bg-accent/30" aria-hidden />
                    )}
                    <span className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-primary text-accent-light flex items-center justify-center">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 17, fontVariationSettings: "'wght' 400, 'FILL' 0" }}
                      >
                        {a.icon}
                      </span>
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-accent tabular-nums">
                          0{i + 1}
                        </span>
                        <span className="text-[13px] font-semibold text-primary leading-tight">
                          {a.title}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-muted mt-1 leading-snug">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Mock de chat */}
              <ChatMock t={t} />
            </div>

            {/* Nota de integración */}
            <div className="mt-4 border-l-2 border-accent pl-3.5 py-0.5 flex items-start gap-2.5">
              <div className="text-[11.5px] text-foreground/90 leading-snug">
                <span className="font-semibold text-primary">{t.requisite.label}</span>{" "}
                {t.requisite.before} <span className="font-semibold">ChatGPT (OpenAI)</span>{" "}
                {t.requisite.or} <span className="font-semibold">Gemini (Google)</span>
                {t.requisite.middle}
              </div>
            </div>
          </div>
        </section>

        <PageFooter label={t.labels.pageOf(3, 4)} />
      </article>

      {/* ─────────── PÁGINA 4 · INVERSIÓN ─────────── */}
      <article className="doc-page relative max-w-[900px] mx-auto px-8 sm:px-12 py-8 text-[13px] leading-relaxed page-break">
        <PhaseBar active={4} phases={t.phases} />

        <section className="mt-6 bleed -mx-8 sm:-mx-12">
          <SectionBand num="06" title={t.investment.title} tone="accent" />
          <div className="px-8 sm:px-12 py-7">
          <div className="border-t-2 border-t-primary border-b border-b-card-border border-x border-x-card-border overflow-hidden">
            {/* Renglones */}
            <div className="divide-y divide-card-border">
              <InvestmentRow
                icon="language"
                title={t.investment.lines.sitio.title}
                detail={t.investment.lines.sitio.detail}
                price={fmtUsd(PRICE_SITIO)}
              />
              <InvestmentRow
                icon="support_agent"
                title={t.investment.lines.agente.title}
                detail={t.investment.lines.agente.detail}
                price={fmtUsd(PRICE_AGENTE)}
              />
              <InvestmentRow
                icon="translate"
                title={t.investment.lines.bilingue.title}
                detail={t.investment.lines.bilingue.detail}
                price={fmtUsd(PRICE_TRANSLATION)}
              />
              {/* Hosting · cortesía */}
              <div className="flex items-start gap-4 p-4 bg-accent/5">
                <IconBadge icon="dns" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-foreground">
                      {t.investment.lines.hosting.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent border border-accent/50 rounded-sm px-1.5 py-0.5">
                      {t.labels.complimentaryBadge}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-muted mt-0.5 leading-snug max-w-md">
                    {t.investment.lines.hosting.detail}
                  </div>
                </div>
                <div className="text-right shrink-0 tabular-nums">
                  <div className="text-[12px] text-muted/70 line-through">$140 USD</div>
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
                  {fmtUsd(USD_TOTAL)}
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
                  {fmtUsd(USD_DEPOSIT)}{" "}
                  <span className="text-[10px] text-muted font-normal">USD</span>
                </div>
                <div className="text-[11.5px] text-muted">{t.investment.depositCaption}</div>
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.finalLabel}
                </div>
                <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                  {fmtUsd(USD_TOTAL - USD_DEPOSIT)}{" "}
                  <span className="text-[10px] text-muted font-normal">USD</span>
                </div>
                <div className="text-[11.5px] text-muted">{t.investment.finalCaption}</div>
              </div>
            </div>
          </div>

          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11.5px] text-muted">
            {t.investment.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
            <li>• {t.investment.validityNote(fmtDate(VALID, lang))}</li>
          </ul>
          </div>
        </section>

        <section className="mt-6 border-l-2 border-accent pl-4 py-1">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent mb-1.5">
            {t.nextStep.label}
          </div>
          <p className="text-[13px] text-foreground/90 leading-relaxed">
            {t.nextStep.textBefore}{" "}
            <span className="font-semibold text-foreground">{fmtUsd(USD_DEPOSIT)} USD</span>{" "}
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
          /* Full-bleed en pantalla se neutraliza en print: el doc-page ya no
             tiene padding lateral, así que la banda ocupa el ancho imprimible
             con su padding interno intacto. */
          .bleed { margin-left: 0 !important; margin-right: 0 !important; }
          .cover { margin-top: 0 !important; }
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
  return (
    <span
      className="material-symbols-outlined shrink-0 text-accent mt-0.5"
      style={{ fontSize: small ? 17 : 19, fontVariationSettings: "'wght' 450, 'FILL' 0" }}
    >
      {icon}
    </span>
  );
}

function PhaseBar({
  active,
  phases,
  dark = false,
}: {
  active: 1 | 2 | 3 | 4;
  phases: readonly { num: string; name: string }[];
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 w-full">
      {phases.map((p, i) => {
        const idx = (i + 1) as 1 | 2 | 3 | 4;
        const done = idx < active;
        const current = idx === active;
        const numClass = dark
          ? current
            ? "text-accent-light font-semibold"
            : done
              ? "text-accent-light/60"
              : "text-white/35"
          : current
            ? "text-accent font-semibold"
            : done
              ? "text-accent/60"
              : "text-muted/50";
        const nameClass = dark
          ? current
            ? "text-white"
            : done
              ? "text-white/60"
              : "text-white/35"
          : current
            ? "text-primary"
            : done
              ? "text-muted"
              : "text-muted/50";
        const lineClass = dark
          ? done
            ? "bg-accent-light/40"
            : "bg-white/15"
          : done
            ? "bg-accent/30"
            : "bg-card-border";
        return (
          <Fragment key={p.num}>
            <div className="flex items-baseline gap-1.5 shrink-0">
              <span className={`font-mono text-[10px] tabular-nums ${numClass}`}>{p.num}</span>
              <span
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap ${nameClass}`}
              >
                {p.name}
              </span>
            </div>
            {i < phases.length - 1 && (
              <div className={`h-px flex-1 min-w-[10px] ${lineClass}`} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function SectionBand({
  num,
  title,
  meta,
  emphasis,
  tone = "navy",
}: {
  num: string;
  title: string;
  meta?: string;
  emphasis?: string;
  tone?: "navy" | "accent";
}) {
  const bg = tone === "accent" ? "bg-accent" : "bg-primary";
  return (
    <div className={`${bg} text-white px-8 sm:px-12 py-5 flex items-center gap-5`}>
      <span
        className="font-display text-[54px] leading-[0.7] text-white/20 tabular-nums select-none shrink-0"
        aria-hidden
      >
        {num}
      </span>
      <div className="flex-1 min-w-0 flex items-baseline justify-between gap-4">
        <h2 className="text-[23px] font-bold tracking-tight leading-none min-w-0">
          {title}
          {emphasis && (
            <>
              {" "}
              <em className="italic text-white/85">{emphasis}</em>
            </>
          )}
        </h2>
        {meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 shrink-0 whitespace-nowrap">
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}

function CoverMeta({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/45">
        {label}
      </div>
      <div className="mt-1 text-[12px] font-semibold text-white leading-snug">{value}</div>
      {sub && <div className="text-[11.5px] text-white/55 leading-snug">{sub}</div>}
    </div>
  );
}

function BeforeAfter({ t }: { t: typeof CONTENT[Lang] }) {
  return (
    <section className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
      {/* Antes */}
      <div className="border border-card-border bg-surface-muted/70 p-4">
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
      <div className="border border-primary bg-primary text-primary-foreground p-4">
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
          <div className="text-[10px] text-muted mt-0.5">{t.chatHeader.status}</div>
        </div>
        <div className="ml-auto flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] font-semibold text-accent">
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
        <div className="flex-1 text-[11.5px] text-muted/70 italic">{t.chatHeader.placeholder}</div>
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
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted">USD</div>
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
