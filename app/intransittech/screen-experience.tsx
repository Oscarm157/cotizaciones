"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  CONTENT,
  FOLIO,
  PRICE_SITIO,
  PRICE_AGENTE,
  PRICE_TRANSLATION,
  USD_TOTAL,
  USD_DEPOSIT,
  fmtUsd,
  type Lang,
} from "./content";
import { IconBadge, SectionTitle, PhaseBar, InvestmentRow } from "./page";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { ProgressRail } from "./progress-rail";
import { ChatMockLive } from "./chat-mock-live";

/**
 * Experiencia animada de scroll, solo pantalla (screen-only). El árbol print-only
 * en page.tsx sigue siendo el documento estático que ya funciona.
 */
export function ScreenExperience({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], [0, 60]);

  return (
    <div ref={containerRef} className="screen-only">
      <ProgressRail phases={t.phases} containerRef={containerRef} />

      {/* ═══════════ PARTE 1 · PROPUESTA ═══════════ */}
      <section data-phase="1" className="relative">
        <div
          ref={heroRef}
          className="slide-dark relative min-h-[86vh] flex items-end overflow-hidden"
        >
          <motion.img
            src="/intransittech/hero.jpg"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: heroBgY }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="relative max-w-[900px] mx-auto px-8 sm:px-12 pb-16 pt-32 w-full">
            <Reveal variant="fade" delay={0}>
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light">
                {t.intro.eyebrow}
              </div>
            </Reveal>
            <Reveal variant="fade-up" delay={0.1}>
              <h1 className="mt-2 text-[36px] sm:text-[52px] font-bold leading-[1.05] tracking-[-0.02em] text-white max-w-2xl">
                {t.intro.titleLead}{" "}
                <em className="italic text-accent-light">{t.intro.titleEmphasis}</em>{" "}
                {t.intro.titleSuffix} {t.client.short}
              </h1>
            </Reveal>
            <Reveal variant="fade-up" delay={0.2}>
              <p className="mt-4 text-[15px] text-white/70 leading-relaxed max-w-xl">
                {t.intro.paragraph}
              </p>
            </Reveal>
            <Reveal variant="fade" delay={0.3}>
              <div className="mt-8 flex items-center gap-4 text-[11px] text-white/50 font-mono">
                <span>{t.labels.quoteNumber} {FOLIO}</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>{t.client.name}</span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="max-w-[900px] mx-auto px-8 sm:px-12 py-14">
          <div className="lg:hidden mb-6">
            <PhaseBar active={1} phases={t.phases} />
          </div>

          <PhaseRoadmapAnimated t={t} />

          <BeforeAfterAnimated t={t} />

          <section className="mt-10">
            <Reveal>
              <SectionTitle icon="auto_awesome" title={t.benefits.title} meta={t.benefits.meta} />
            </Reveal>
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.benefits.items.map((b) => (
                <StaggerItem key={b.title}>
                  <div className="rounded-xl bg-card border border-card-border p-3.5 flex gap-3 h-full">
                    <IconBadge icon={b.icon} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-foreground leading-tight">
                        {b.title}
                      </div>
                      <div className="text-[11.5px] text-muted mt-1 leading-snug">{b.detail}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        </div>
      </section>

      {/* ═══════════ PARTE 2 · TRANSFORMACIÓN ═══════════ */}
      <section data-phase="2" className="relative">
        <Reveal variant="fade" duration={0.8}>
          <div className="slide-dark relative h-[220px] flex items-center justify-center overflow-hidden">
            <img
              src="/intransittech/transformacion-banner.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-background/50" />
            <span className="relative text-[11px] uppercase tracking-[0.3em] font-semibold text-accent-light/70">
              {t.phases[1].num} · {t.phases[1].name}
            </span>
          </div>
        </Reveal>

        <div className="max-w-[900px] mx-auto px-8 sm:px-12 py-10">
          <div className="lg:hidden mb-6">
            <PhaseBar active={2} phases={t.phases} />
          </div>

          <section>
            <Reveal>
              <SectionTitle icon="check_circle" title={t.features.title} meta={t.features.meta} />
            </Reveal>
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" stagger={0.06}>
              {t.features.items.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="rounded-xl border border-card-border bg-card p-3 flex gap-3 h-full">
                    <IconBadge icon={f.icon} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-foreground leading-tight">
                        {f.title}
                      </div>
                      <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{f.detail}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section className="mt-10">
            <Reveal>
              <SectionTitle icon="menu_book" title={t.pages.title} meta={t.pages.meta} />
            </Reveal>
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-2" stagger={0.06}>
              {t.pages.items.map((p) => (
                <StaggerItem key={p.name}>
                  <div className="rounded-lg bg-card border border-card-border border-l-4 border-l-accent px-3 py-2.5 h-full">
                    <div className="text-[13px] font-semibold text-foreground">{p.name}</div>
                    <div className="text-[11.5px] text-muted mt-0.5 leading-snug">{p.detail}</div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        </div>
      </section>

      {/* ═══════════ PARTE 3 · CONTENIDO ═══════════ */}
      <section data-phase="3" className="relative">
        <div className="max-w-[900px] mx-auto px-8 sm:px-12 py-14">
          <div className="lg:hidden mb-6">
            <PhaseBar active={3} phases={t.phases} />
          </div>

          <section className="relative rounded-2xl overflow-hidden">
            <img
              src="/intransittech/contenido-bg.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
            />
            <div className="relative p-1">
              <Reveal>
                <SectionTitle icon="category" title={t.categories.title} meta={t.categories.meta} />
              </Reveal>
              <Reveal variant="fade" delay={0.05}>
                <p className="text-[12px] text-muted leading-relaxed max-w-2xl mb-3">
                  {t.categories.intro}
                </p>
              </Reveal>
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-2" stagger={0.05}>
                {t.categories.items.map((c) => (
                  <StaggerItem key={c.name} variant="scale">
                    <div className="rounded-lg bg-card border border-card-border px-3 py-2.5 flex gap-3 h-full glow-accent-subtle">
                      <IconBadge icon={c.icon} small />
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-foreground leading-tight">
                          {c.name}
                        </div>
                        <div className="text-[11.5px] text-muted mt-0.5 leading-snug">
                          {c.detail}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>

          <section className="mt-10">
            <Reveal>
              <SectionTitle
                icon="smart_toy"
                title={t.agent.titleLead}
                emphasis={t.agent.titleEmphasis}
                meta={t.agent.meta}
              />
            </Reveal>
            <Reveal variant="fade" delay={0.05}>
              <p className="text-[12px] text-muted leading-relaxed max-w-2xl mb-3">
                {t.agent.intro}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Stagger className="grid grid-cols-1 gap-2" stagger={0.08}>
                {t.agent.features.map((a) => (
                  <StaggerItem key={a.title} variant="slide-right">
                    <div className="rounded-lg bg-primary text-primary-foreground border border-primary/30 p-3 flex gap-3">
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
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal variant="scale" delay={0.15}>
                <ChatMockLive t={t} />
              </Reveal>
            </div>

            <Reveal variant="fade-up" delay={0.1}>
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
            </Reveal>
          </section>
        </div>
      </section>

      {/* ═══════════ PARTE 4 · INVERSIÓN ═══════════ */}
      <section data-phase="4" className="relative">
        <div className="max-w-[900px] mx-auto px-8 sm:px-12 py-14">
          <div className="lg:hidden mb-6">
            <PhaseBar active={4} phases={t.phases} />
          </div>

          <section className="relative">
            <img
              src="/intransittech/inversion-bg.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-10 w-full h-full object-cover opacity-[0.06]"
            />
            <Reveal>
              <SectionTitle icon="payments" title={t.investment.title} />
            </Reveal>

            <div className="rounded-xl border border-card-border bg-card overflow-hidden">
              <Stagger className="divide-y divide-card-border" stagger={0.12}>
                <StaggerItem variant="line-in">
                  <InvestmentRow
                    icon="language"
                    title={t.investment.lines.sitio.title}
                    detail={t.investment.lines.sitio.detail}
                    price={fmtUsd(PRICE_SITIO)}
                  />
                </StaggerItem>
                <StaggerItem variant="line-in">
                  <InvestmentRow
                    icon="support_agent"
                    title={t.investment.lines.agente.title}
                    detail={t.investment.lines.agente.detail}
                    price={fmtUsd(PRICE_AGENTE)}
                  />
                </StaggerItem>
                <StaggerItem variant="line-in">
                  <InvestmentRow
                    icon="translate"
                    title={t.investment.lines.bilingue.title}
                    detail={t.investment.lines.bilingue.detail}
                    price={fmtUsd(PRICE_TRANSLATION)}
                  />
                </StaggerItem>
                <StaggerItem variant="line-in">
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
                        <span className="font-semibold text-foreground">
                          {t.investment.lines.hosting.hostingWord}
                        </span>{" "}
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
                </StaggerItem>
              </Stagger>

              <Reveal variant="scale" amount={0.4}>
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
              </Reveal>

              <Stagger
                className="grid grid-cols-2 divide-x divide-card-border border-t border-card-border"
                stagger={0.1}
              >
                <StaggerItem>
                  <div className="p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                      {t.investment.depositLabel}
                    </div>
                    <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                      {fmtUsd(USD_DEPOSIT)}{" "}
                      <span className="text-[10px] text-muted font-normal">USD</span>
                    </div>
                    <div className="text-[11px] text-muted">{t.investment.depositCaption}</div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted">
                      {t.investment.finalLabel}
                    </div>
                    <div className="mt-0.5 text-lg font-semibold tabular-nums text-foreground">
                      {fmtUsd(USD_TOTAL - USD_DEPOSIT)}{" "}
                      <span className="text-[10px] text-muted font-normal">USD</span>
                    </div>
                    <div className="text-[11px] text-muted">{t.investment.finalCaption}</div>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>

            <Reveal variant="fade" delay={0.1}>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11.5px] text-muted">
                {t.investment.notes.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
            </Reveal>
          </section>

          <Reveal variant="fade-up" className="block mt-6">
            <section className="rounded-xl bg-surface-muted border border-card-border p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent mb-1.5">
                {t.nextStep.label}
              </div>
              <p className="text-[13px] text-foreground/90 leading-relaxed">
                {t.nextStep.textBefore}{" "}
                <span className="font-semibold text-foreground">{fmtUsd(USD_DEPOSIT)} USD</span>{" "}
                {t.nextStep.textAfter}
              </p>
            </section>
          </Reveal>

          <Reveal variant="fade" className="block">
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
                <div className="mt-0.5 text-[13px] text-primary font-semibold">
                  {t.provider.lead}
                </div>
                <div className="text-[11.5px] text-muted">{t.provider.email}</div>
              </div>
            </footer>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ────────── Fase 1 / Fase 2, animado ────────── */

function PhaseRoadmapAnimated({ t }: { t: (typeof CONTENT)[Lang] }) {
  const r = t.roadmap;
  return (
    <section className="mt-10">
      <Reveal>
        <SectionTitle icon="route" title={r.eyebrow} />
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Reveal variant="slide-right">
          <div className="rounded-xl border border-primary bg-primary text-primary-foreground p-4 h-full">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-accent-light whitespace-nowrap">
                {r.fase1.label}
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-white bg-accent rounded px-1.5 py-0.5">
                {r.fase1.tag}
              </span>
            </div>
            <div className="text-[14px] font-semibold leading-tight mb-2.5">{r.fase1.heading}</div>
            <Stagger className="space-y-2" stagger={0.08}>
              {r.fase1.items.map((it) => (
                <StaggerItem key={it.title}>
                  <div className="flex gap-2.5">
                    <span
                      className="material-symbols-outlined text-accent-light shrink-0 mt-0.5"
                      style={{ fontSize: 16, fontVariationSettings: "'wght' 500" }}
                    >
                      {it.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold leading-snug">{it.title}</div>
                      <div className="text-[11px] text-white/70 leading-snug mt-0.5">
                        {it.detail}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        <Reveal variant="slide-left" delay={0.12}>
          <div className="rounded-xl border border-dashed border-card-border bg-surface-muted/60 p-4 h-full">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted whitespace-nowrap">
                {r.fase2.label}
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-muted border border-card-border rounded px-1.5 py-0.5">
                {r.fase2.tag}
              </span>
            </div>
            <div className="text-[14px] font-semibold leading-tight text-foreground mb-1.5">
              {r.fase2.heading}
            </div>
            <p className="text-[11.5px] text-muted leading-snug mb-2.5">{r.fase2.description}</p>
            <Stagger className="space-y-1.5" stagger={0.1}>
              {r.fase2.flow.map((f, i) => (
                <StaggerItem key={f.text}>
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-muted shrink-0"
                      style={{ fontSize: 15, fontVariationSettings: "'wght' 500" }}
                    >
                      {f.icon}
                    </span>
                    <span className="text-[11.5px] text-foreground/80 leading-snug">{f.text}</span>
                    {i < r.fase2.flow.length - 1 && (
                      <span
                        className="material-symbols-outlined text-muted/50 ml-auto shrink-0"
                        style={{ fontSize: 14 }}
                      >
                        arrow_downward
                      </span>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────── Antes / Después, animado ────────── */

function BeforeAfterAnimated({ t }: { t: (typeof CONTENT)[Lang] }) {
  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
      <Reveal variant="slide-right">
        <div className="rounded-xl border border-card-border bg-surface-muted/70 p-4 h-full">
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
      </Reveal>

      <div className="hidden md:flex items-center justify-center px-1">
        <span
          className="material-symbols-outlined text-accent"
          style={{ fontSize: 28, fontVariationSettings: "'wght' 500" }}
        >
          arrow_forward
        </span>
      </div>

      <Reveal variant="slide-left" delay={0.12}>
        <div className="rounded-xl border border-primary bg-primary text-primary-foreground p-4 h-full">
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
      </Reveal>
    </section>
  );
}
