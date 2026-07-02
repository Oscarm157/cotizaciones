"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
} from "../content";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY = {
  es: {
    fase1Label: "Fase 1 · incluida en esta cotización",
    fase1Heading: "Sitio web + agente de ventas IA",
    fase1Items: [
      "Sitio web con catálogo por categorías y servicios",
      "Agente de ventas con IA, disponible 24/7",
      "Panel de administración de leads (cortesía)",
    ],
    fase2Label: "Fase 2 · próximo paso, sin costo aquí",
    fase2Heading: "Redes sociales",
    fase2Items: [
      "Redes sociales atraen leads",
      "El sitio y el agente IA atienden de inmediato",
      "Ventas recibe leads filtrados y con datos completos",
    ],
    highlightsTitle: "Lo que incluye el sitio",
    highlights: [
      "Diseño profesional, responsive de verdad",
      "Buscador conectado al formulario de cotización",
      "7 páginas: inicio, servicios, productos, industrias, contacto y más",
      "Medición de visitas desde el día uno",
    ],
    agentTitle: "Un agente que nunca duerme",
    agentSub: "Responde, identifica categoría, captura el prospecto y notifica a ventas.",
    investmentTitle: "Inversión",
    investmentSub: "Pago único · entrega completa",
    closingTitle: "Aprobemos y arrancamos",
    closingSub: "Anticipo del 50% para iniciar. 3–5 días hábiles y estamos en marcha.",
  },
  en: {
    fase1Label: "Phase 1 · included in this quote",
    fase1Heading: "Website + AI sales agent",
    fase1Items: [
      "Website with catalog by category and services",
      "AI sales agent, available 24/7",
      "Lead management panel (included at no cost)",
    ],
    fase2Label: "Phase 2 · next step, not priced here",
    fase2Heading: "Social media",
    fase2Items: [
      "Social media attracts leads",
      "The site and AI agent respond immediately",
      "Sales gets filtered leads with complete data",
    ],
    highlightsTitle: "What's included",
    highlights: [
      "Professional design, genuinely responsive",
      "Search connected straight to the quote form",
      "7 pages: home, services, products, industries, contact, and more",
      "Visitor tracking from day one",
    ],
    agentTitle: "An agent that never sleeps",
    agentSub: "Replies, identifies the category, captures the lead, and alerts sales.",
    investmentTitle: "Investment",
    investmentSub: "One-time payment · full delivery",
    closingTitle: "Approve and let's start",
    closingSub: "50% deposit to kick off. 3–5 business days and we're moving.",
  },
} as const;

function useReduce() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReduce();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Deck({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const c = COPY[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slideCount = 8;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = Array.from(container.querySelectorAll<HTMLElement>("[data-slide]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-slide")));
        });
      },
      { root: container, threshold: 0.6 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        container.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        container.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (i: number) => {
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-slide="${i}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 bg-[#050608] text-white overflow-hidden">
      {/* Progreso */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              active === i ? "bg-[#3b82f6] scale-150" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {/* ═══ 0 · COVER ═══ */}
        <section
          data-slide="0"
          className="h-screen w-full snap-start relative flex flex-col justify-end overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(59,130,246,0.16) 0%, transparent 70%)",
            }}
          />
          <div className="relative px-10 sm:px-20 pb-24 max-w-5xl">
            <Reveal>
              <div className="text-[12px] uppercase tracking-[0.35em] font-semibold text-[#60a5fa]">
                {t.provider.name} · {t.labels.quoteNumber} {FOLIO}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="mt-6 text-[52px] sm:text-[96px] font-bold leading-[0.98] tracking-[-0.03em]">
                {t.client.short}
              </h1>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-6 text-[18px] sm:text-[22px] text-white/50 max-w-2xl leading-snug">
                {t.intro.titleLead} <em className="italic text-[#93c5fd]">{t.intro.titleEmphasis}</em>{" "}
                {t.intro.titleSuffix} {t.client.short}.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ 1 · HOY (problema) ═══ */}
        <section
          data-slide="1"
          className="h-screen w-full snap-start relative flex items-center overflow-hidden bg-[#0a0a0a]"
        >
          <div className="relative px-10 sm:px-20 max-w-4xl">
            <Reveal>
              <div className="text-[12px] uppercase tracking-[0.35em] font-semibold text-white/30">
                {t.before.heading}
              </div>
            </Reveal>
            <div className="mt-10 space-y-8">
              {t.before.items.map((item, i) => (
                <Reveal key={item} delay={i * 0.1}>
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-[15px] text-white/25 pt-2 shrink-0">
                      0{i + 1}
                    </span>
                    <p className="text-[22px] sm:text-[30px] leading-[1.2] text-white/70 font-light">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 2 · CON EL SITIO NUEVO (solución) ═══ */}
        <section
          data-slide="2"
          className="h-screen w-full snap-start relative flex items-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #050608 70%)" }}
        >
          <div className="relative px-10 sm:px-20 max-w-4xl">
            <Reveal>
              <div className="text-[12px] uppercase tracking-[0.35em] font-semibold text-[#60a5fa]">
                {t.after.heading}
              </div>
            </Reveal>
            <div className="mt-10 space-y-8">
              {t.after.items.map((item, i) => (
                <Reveal key={item} delay={i * 0.1}>
                  <div className="flex items-start gap-6">
                    <span className="material-symbols-outlined text-[#3b82f6] shrink-0 mt-1.5" style={{ fontSize: 22 }}>
                      check_circle
                    </span>
                    <p className="text-[22px] sm:text-[30px] leading-[1.2] text-white font-light">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 3 · FASE 1 / FASE 2 (split diagram) ═══ */}
        <section data-slide="3" className="h-screen w-full snap-start relative flex overflow-hidden">
          <div className="w-1/2 h-full bg-[#3b82f6] flex flex-col justify-center px-8 sm:px-16 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/70">
                {c.fase1Label}
              </div>
              <h2 className="mt-3 text-[28px] sm:text-[44px] font-bold leading-[1.05] text-white">
                {c.fase1Heading}
              </h2>
              <ul className="mt-8 space-y-3">
                {c.fase1Items.map((it) => (
                  <li key={it} className="text-[14px] sm:text-[16px] text-white/90 flex gap-2">
                    <span className="text-white/60">→</span> {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="w-1/2 h-full bg-[#0a0a0a] flex flex-col justify-center px-8 sm:px-16 border-l border-dashed border-white/15">
            <Reveal delay={0.15}>
              <div className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/30">
                {c.fase2Label}
              </div>
              <h2 className="mt-3 text-[28px] sm:text-[44px] font-bold leading-[1.05] text-white/50">
                {c.fase2Heading}
              </h2>
              <ul className="mt-8 space-y-3">
                {c.fase2Items.map((it) => (
                  <li key={it} className="text-[14px] sm:text-[16px] text-white/40 flex gap-2">
                    <span className="text-white/25">→</span> {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═══ 4 · QUÉ INCLUYE (highlights) ═══ */}
        <section
          data-slide="4"
          className="h-screen w-full snap-start relative flex items-center overflow-hidden bg-[#0a0a0a]"
        >
          <div className="relative px-10 sm:px-20 w-full max-w-5xl">
            <Reveal>
              <div className="text-[12px] uppercase tracking-[0.35em] font-semibold text-[#60a5fa]">
                {c.highlightsTitle}
              </div>
            </Reveal>
            <div className="mt-10 divide-y divide-white/10">
              {c.highlights.map((h, i) => (
                <Reveal key={h} delay={i * 0.08}>
                  <div className="py-6 flex items-center gap-8">
                    <span className="font-mono text-[13px] text-white/25 w-6 shrink-0">
                      0{i + 1}
                    </span>
                    <p className="text-[20px] sm:text-[28px] font-light text-white/85">{h}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 5 · AGENTE IA ═══ */}
        <section
          data-slide="5"
          className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(59,130,246,0.12) 0%, #050608 70%)" }}
        >
          <Reveal className="text-center px-6">
            <span className="material-symbols-outlined text-[#3b82f6]" style={{ fontSize: 44 }}>
              smart_toy
            </span>
            <h2 className="mt-4 text-[34px] sm:text-[56px] font-bold leading-[1.05] max-w-3xl">
              {c.agentTitle}
            </h2>
            <p className="mt-4 text-[16px] sm:text-[19px] text-white/50 max-w-xl mx-auto">
              {c.agentSub}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 w-full max-w-md px-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[12px] text-white/60">{t.chatHeader.title}</span>
              </div>
              <div className="p-4 space-y-2">
                {t.chat.slice(0, 3).map((m, i) => (
                  <div key={i} className={`flex ${m.from === "agent" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] rounded-xl px-3 py-2 text-[12.5px] leading-snug ${
                        m.from === "agent"
                          ? "bg-[#3b82f6] text-white rounded-tl-sm"
                          : "bg-white/10 text-white/90 rounded-tr-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══ 6 · INVERSIÓN ═══ */}
        <section
          data-slide="6"
          className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
        >
          <Reveal className="text-center">
            <div className="text-[12px] uppercase tracking-[0.35em] font-semibold text-white/40">
              {c.investmentTitle}
            </div>
            <div className="mt-6 text-[80px] sm:text-[140px] font-bold leading-none tracking-[-0.03em] text-white">
              {fmtUsd(USD_TOTAL)}
            </div>
            <div className="mt-3 text-[13px] uppercase tracking-[0.2em] text-white/40">
              {c.investmentSub}
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mt-14 flex gap-10 sm:gap-16 text-center">
            <div>
              <div className="text-[24px] font-semibold text-white">{fmtUsd(PRICE_SITIO)}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-1">
                {t.investment.lines.sitio.title}
              </div>
            </div>
            <div>
              <div className="text-[24px] font-semibold text-white">{fmtUsd(PRICE_AGENTE)}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-1">
                {t.investment.lines.agente.title}
              </div>
            </div>
            <div>
              <div className="text-[24px] font-semibold text-white">{fmtUsd(PRICE_TRANSLATION)}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-1">
                {t.investment.lines.bilingue.title}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.32} className="mt-10 text-[13px] text-white/30">
            {t.investment.depositLabel}: {fmtUsd(USD_DEPOSIT)} USD
          </Reveal>
        </section>

        {/* ═══ 7 · CIERRE ═══ */}
        <section
          data-slide="7"
          className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.18) 0%, #050608 75%)",
            }}
          />
          <Reveal className="relative text-center px-6">
            <h2 className="text-[36px] sm:text-[64px] font-bold leading-[1.05] max-w-3xl">
              {c.closingTitle}
            </h2>
            <p className="mt-5 text-[16px] sm:text-[19px] text-white/50 max-w-xl mx-auto">
              {c.closingSub}
            </p>
            <div className="mt-10 text-[13px] text-white/40">
              {t.provider.lead} · {t.provider.email}
            </div>
          </Reveal>
        </section>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
