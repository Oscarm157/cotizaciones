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
import { LiveChat } from "./live-chat";

type SP = Promise<{ lang?: string }>;

export default async function Page({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const lang: Lang = sp?.lang === "en" ? "en" : "es";
  const t = CONTENT[lang];

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      {!sp?.lang && <BrowserLangDetector />}

      {/* Toolbar · solo pantalla */}
      <div className="no-print sticky top-0 z-20 border-b border-card-border bg-background/80 backdrop-blur">
        <div className="max-w-[880px] mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-muted truncate">
            {t.labels.toolbarLabel(FOLIO, t.client.short)}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LangToggle current={lang} ariaLabel={t.langToggle.ariaLabel} />
            <PrintButton label={t.labels.printPdf} />
          </div>
        </div>
      </div>

      {/* ───────────── HERO (solo pantalla) ───────────── */}
      <section className="screen-only slide-dark relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
        <div
          className="spotlight-accent absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120%] h-[140%] pointer-events-none"
          aria-hidden
        />
        <div className="relative max-w-[880px] mx-auto px-6 sm:px-10 pt-12 pb-14 hero-fade-in">
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
          <h1 className="mt-2 text-[34px] sm:text-[52px] font-bold leading-[1.05] tracking-[-0.02em] text-white max-w-[15ch]">
            {t.intro.titleLead}{" "}
            <em className="italic text-gradient-accent">{t.intro.titleEmphasis}</em>
          </h1>
          <p className="mt-4 text-[13.5px] sm:text-[14px] text-white/70 leading-relaxed max-w-[60ch]">
            {t.intro.paragraph}
          </p>

          <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-white/10 pt-5">
            <HeroMeta label={t.labels.quote} value={`${t.labels.quoteNumber} ${FOLIO}`} mono />
            <HeroMeta label={t.labels.issued} value={fmtDate(ISSUED, lang)} />
            <HeroMeta label={t.labels.validUntil} value={fmtDate(VALID, lang)} />
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

      {/* ───────────── MEMBRETE (solo PDF) ───────────── */}
      <header className="print-only px-10 pt-2 pb-4 border-b border-card-border">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-primary">
                {t.provider.name}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
            <p className="mt-0.5 text-[12px] text-muted">{t.provider.tagline}</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent">
              {t.labels.quote}
            </div>
            <div className="mt-0.5 font-mono text-base text-primary">
              {t.labels.quoteNumber} {FOLIO}
            </div>
            <div className="mt-1 text-[11.5px] text-muted tabular-nums">
              {t.labels.issued} {fmtDate(ISSUED, lang)} · {t.labels.validUntil}{" "}
              {fmtDate(VALID, lang)}
            </div>
          </div>
        </div>
        <h1 className="mt-3 text-[22px] font-bold tracking-tight text-primary">
          {t.intro.titleLead}{" "}
          <em className="italic text-gradient-accent">{t.intro.titleEmphasis}</em>
        </h1>
        <div className="mt-3 grid grid-cols-2 gap-6 border-t border-card-border pt-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-0.5">
              {t.labels.from}
            </div>
            <div className="text-[12.5px] text-foreground font-semibold">{t.provider.name}</div>
            <div className="text-[11.5px] text-muted">
              {t.provider.roleLabel} · {t.provider.lead} · {t.provider.email}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-0.5">
              {t.labels.preparedFor}
            </div>
            <div className="text-[12.5px] text-foreground font-semibold">{t.client.name}</div>
            <div className="text-[11.5px] text-muted">{t.client.descriptor}</div>
          </div>
        </div>
      </header>

      {/* ───────────── CUERPO (compartido pantalla + PDF) ───────────── */}
      <article className="doc relative max-w-[880px] mx-auto px-6 sm:px-10 py-9 text-[13px] leading-relaxed">
        {/* Hoy / Con el sitio */}
        <BeforeAfter t={t} />

        {/* Qué cambia en el día a día */}
        <section className="mt-9">
          <SectionHeader title={t.benefits.title} meta={t.benefits.meta} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-4 stagger-in">
            {t.benefits.items.map((b) => (
              <IconItem key={b.title} icon={b.icon} title={b.title} detail={b.detail} />
            ))}
          </ul>
        </section>

        {/* Qué incluye el sitio */}
        <section className="mt-9">
          <SectionHeader title={t.features.title} meta={t.features.meta} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-4 stagger-in">
            {t.features.items.map((f) => (
              <IconItem key={f.title} icon={f.icon} title={f.title} detail={f.detail} />
            ))}
          </ul>
        </section>

        {/* Páginas del sitio */}
        <section className="mt-9">
          <SectionHeader title={t.pages.title} meta={t.pages.meta} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-0 stagger-in">
            {t.pages.items.map((p, i) => (
              <li
                key={p.name}
                className={`flex gap-3 py-2.5 ${i < t.pages.items.length - 1 ? "border-b border-card-border" : ""}`}
              >
                <span className="font-display text-[15px] font-bold text-accent/40 tabular-nums leading-none mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold text-foreground">{p.name}</div>
                  <div className="text-[11.5px] text-muted leading-snug">{p.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Áreas de práctica */}
        <section className="mt-9">
          <SectionHeader title={t.practiceAreas.title} meta={t.practiceAreas.meta} />
          <p className="text-[12px] text-muted leading-relaxed max-w-[68ch] mb-4">
            {t.practiceAreas.intro}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-4 stagger-in">
            {t.practiceAreas.items.map((c) => (
              <IconItem key={c.name} icon={c.icon} title={c.name} detail={c.detail} />
            ))}
          </ul>
        </section>

        {/* Agente de ventas con IA */}
        <section className="mt-9">
          <SectionHeader
            title={t.agent.titleLead}
            emphasis={t.agent.titleEmphasis}
            meta={t.agent.meta}
          />
          <p className="text-[13.5px] font-semibold text-foreground leading-snug max-w-[68ch]">
            {t.agent.lead}
          </p>
          <p className="mt-1.5 text-[12px] text-muted leading-relaxed max-w-[68ch] mb-4">
            {t.agent.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <ul className="grid grid-cols-1 gap-3 stagger-in">
              {t.agent.features.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <Glyph icon={a.icon} />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-foreground leading-tight">
                      {a.title}
                    </div>
                    <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{a.detail}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Chat vivo (pantalla) */}
            <LiveChat messages={t.chat} ui={t.chatHeader} />

            {/* Transcript estático (PDF) */}
            <ChatTranscript t={t} />
          </div>

          {/* Nota de integración */}
          <div className="mt-4 rounded-lg bg-accent/8 border border-accent/20 px-3.5 py-2.5 flex items-start gap-2.5">
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

        {/* Inversión */}
        <section className="mt-9">
          <SectionHeader title={t.investment.title} />

          <div className="keep rounded-xl border border-card-border bg-card overflow-hidden">
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
                optional={t.labels.optional}
              />
              <InvestmentRow
                icon="translate"
                title={t.investment.lines.bilingue.title}
                detail={t.investment.lines.bilingue.detail}
                price={fmtMxn(PRICE_BILINGUE)}
                optional={t.labels.optional}
              />
            </div>

            {/* Total · dark */}
            <div className="grid grid-cols-[1fr_auto] gap-4 p-3.5 border-t border-primary bg-primary text-primary-foreground">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light mb-0.5">
                  {t.investment.oneTimeLabel}
                </div>
                <div className="text-[12px] text-white/70 leading-snug max-w-md">
                  {t.investment.totalFootnote}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display text-3xl font-bold tabular-nums text-accent-light">
                  {fmtMxn(TOTAL)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {t.investment.totalCaption}
                </div>
              </div>
            </div>

            {/* Anticipo / liquidación */}
            <div className="grid grid-cols-2 divide-x divide-card-border border-t border-card-border">
              <div className="p-3.5">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.depositLabel}
                </div>
                <div className="mt-0.5 font-display text-lg font-bold tabular-nums text-foreground">
                  {fmtMxn(DEPOSIT)}
                </div>
                <div className="text-[11px] text-muted">{t.investment.depositCaption}</div>
              </div>
              <div className="p-3.5">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.finalLabel}
                </div>
                <div className="mt-0.5 font-display text-lg font-bold tabular-nums text-foreground">
                  {fmtMxn(TOTAL - DEPOSIT)}
                </div>
                <div className="text-[11px] text-muted">{t.investment.finalCaption}</div>
              </div>
            </div>
          </div>

          {/* Hospedaje y dominio · anual */}
          <div className="keep mt-4 rounded-xl border border-card-border bg-card overflow-hidden">
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
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white bg-accent rounded px-2 py-0.5 shrink-0 whitespace-nowrap">
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
              <div className="text-[11.5px] font-semibold text-foreground leading-snug max-w-md">
                {t.investment.annual.intro}
              </div>
              <div className="text-right shrink-0 tabular-nums">
                <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                  {t.investment.annual.subtotalLabel}
                </div>
                <div className="font-display text-lg font-bold text-foreground">{fmtMxn(ANNUAL)}</div>
              </div>
            </div>
          </div>

          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11.5px] text-muted">
            {t.investment.notes.map((n) => (
              <li key={n}>· {n}</li>
            ))}
            <li>· {t.investment.validityNote(fmtDate(VALID, lang))}</li>
          </ul>
        </section>

        {/* Siguiente paso */}
        <section className="keep mt-7 rounded-xl bg-primary text-primary-foreground p-4">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light mb-1.5">
            {t.nextStep.label}
          </div>
          <p className="text-[13px] text-white/90 leading-relaxed">
            {t.nextStep.textBefore}{" "}
            <span className="font-semibold text-white">{fmtMxn(DEPOSIT)}</span>{" "}
            {t.nextStep.textAfter}
          </p>
        </section>

        {/* Firma */}
        <footer className="keep mt-6 pt-4 border-t border-card-border flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
              {t.labels.acceptance}
            </div>
            <div className="mt-7 w-56 border-t border-primary/50" />
            <div className="mt-1 text-[11.5px] text-muted">{t.labels.signatureOf(t.client.short)}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
              {t.provider.name}
            </div>
            <div className="mt-0.5 text-[13px] text-primary font-semibold">{t.provider.lead}</div>
            <div className="text-[11.5px] text-muted">{t.provider.email}</div>
          </div>
        </footer>
      </article>

      <style>{`
        .print-only { display: none; }
        @page { size: Letter; margin: 9mm 11mm; }
        @media print {
          .no-print, .screen-only { display: none !important; }
          .print-only { display: block !important; }
          html, body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .doc { padding: 6mm 0 0 0 !important; max-width: 100% !important; }
          header.print-only { padding-left: 0 !important; padding-right: 0 !important; }
          /* Garantizar contenido visible en PDF (sin animaciones a medias) */
          .stagger-in > *, .hero-fade-in, .slide-enter, .chat-in {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .keep, article ul > li, article section, header, footer {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          h1, h2, h3 { break-after: avoid; page-break-after: avoid; }
        }
      `}</style>
    </main>
  );
}

/* ────────── Helpers ────────── */

function HeroMeta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-white/45">{label}</div>
      <div className={`mt-0.5 text-[14px] text-white tabular-nums ${mono ? "font-mono" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  meta,
  emphasis,
}: {
  title: string;
  meta?: string;
  emphasis?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b border-card-border pb-2.5">
      <h2 className="text-[20px] sm:text-[23px] font-bold tracking-tight leading-tight text-primary">
        {title}
        {emphasis && (
          <>
            {" "}
            <em className="italic text-gradient-accent">{emphasis}</em>
          </>
        )}
      </h2>
      {meta && (
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted shrink-0 whitespace-nowrap pb-1">
          {meta}
        </span>
      )}
    </div>
  );
}

function Glyph({ icon }: { icon: string }) {
  return (
    <span
      className="material-symbols-outlined text-accent shrink-0 mt-0.5"
      style={{ fontSize: 20, fontVariationSettings: "'wght' 500, 'FILL' 0" }}
    >
      {icon}
    </span>
  );
}

function IconItem({ icon, title, detail }: { icon: string; title: string; detail: string }) {
  return (
    <li className="flex gap-3">
      <Glyph icon={icon} />
      <div className="min-w-0">
        <div className="text-[12.5px] font-semibold text-foreground leading-tight">{title}</div>
        <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{detail}</div>
      </div>
    </li>
  );
}

function BeforeAfter({ t }: { t: typeof CONTENT[Lang] }) {
  return (
    <section className="keep grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
      <div className="rounded-xl border border-card-border bg-surface-muted/60 p-4">
        <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-2.5">
          {t.before.heading}
        </div>
        <ul className="space-y-1.5">
          {t.before.items.map((text) => (
            <li key={text} className="text-[11.5px] text-muted leading-snug flex gap-2">
              <span className="text-muted/40 mt-0.5">·</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-primary bg-primary text-primary-foreground p-4">
        <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light mb-2.5">
          {t.after.heading}
        </div>
        <ul className="space-y-1.5">
          {t.after.items.map((text) => (
            <li key={text} className="text-[11.5px] text-white/90 leading-snug flex gap-2">
              <span className="text-accent-light mt-0.5">+</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Transcript estático del chat · solo PDF */
function ChatTranscript({ t }: { t: typeof CONTENT[Lang] }) {
  return (
    <div className="print-only rounded-xl border border-card-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-card-border bg-surface-muted/60">
        <span
          className="material-symbols-outlined text-accent"
          style={{ fontSize: 16, fontVariationSettings: "'wght' 600" }}
        >
          support_agent
        </span>
        <div className="text-[11.5px] font-semibold text-foreground">{t.chatHeader.title}</div>
        <span className="ml-auto text-[9px] uppercase tracking-[0.18em] font-semibold text-accent">
          {t.chatHeader.badge}
        </span>
      </div>
      <div className="p-3 space-y-2">
        {t.chat.map((m, i) => {
          const isAgent = m.from === "agent";
          return (
            <div key={i} className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
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
    </div>
  );
}

function InvestmentRow({
  icon,
  title,
  detail,
  price,
  optional,
}: {
  icon: string;
  title: string;
  detail: string;
  price: string;
  optional?: string;
}) {
  return (
    <div className="flex items-start gap-4 p-3">
      <span
        className="material-symbols-outlined text-accent shrink-0 mt-0.5"
        style={{ fontSize: 20, fontVariationSettings: "'wght' 500, 'FILL' 0" }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-semibold text-foreground">{title}</span>
          {optional && (
            <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-accent bg-accent/10 rounded px-1.5 py-0.5">
              {optional}
            </span>
          )}
        </div>
        <div className="text-[11.5px] text-muted mt-0.5 leading-snug max-w-md">{detail}</div>
      </div>
      <div className="text-right shrink-0 tabular-nums">
        <div className="font-display text-lg font-bold text-foreground">{price}</div>
      </div>
    </div>
  );
}
