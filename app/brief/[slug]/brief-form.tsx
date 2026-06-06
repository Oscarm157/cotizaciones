"use client";

import { useEffect, useMemo, useState } from "react";
import useBriefStore from "@/store/useBriefStore";
import type { PlainSection } from "@/lib/brief/schema";
import type { QuoteRegistryEntry } from "@/lib/brief/registry";
import FieldRenderer from "@/components/brief/FieldRenderer";
import ExpertTip from "@/components/brief/ExpertTip";
import Icon from "@/components/brief/ui/Icon";

const STEP_TITLES: Record<number, string> = {
  1: "Tu marca",
  2: "El proyecto",
  3: "Cierre",
};

export default function BriefForm({
  entry,
  sections,
  resumeId,
}: {
  entry: QuoteRegistryEntry;
  sections: PlainSection[];
  resumeId: string | null;
}) {
  const loading = useBriefStore((s) => s.loading);
  const saving = useBriefStore((s) => s.saving);
  const saveError = useBriefStore((s) => s.saveError);
  const submitted = useBriefStore((s) => s.submitted);
  const initDraft = useBriefStore((s) => s.initDraft);
  const submitBrief = useBriefStore((s) => s.submitBrief);
  const flushPendingSave = useBriefStore((s) => s.flushPendingSave);
  const resetInitGuard = useBriefStore((s) => s.resetInitGuard);
  const editAgain = useBriefStore((s) => s.editAgain);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [stepIdx, setStepIdx] = useState(0);

  // Pasos que de verdad tienen secciones visibles para esta cotizacion.
  const steps = useMemo(() => [1, 2, 3].filter((n) => sections.some((s) => s.step === n)), [sections]);
  const total = steps.length;
  const currentStep = steps[stepIdx] ?? steps[0];
  const currentSections = sections.filter((s) => s.step === currentStep);
  const isLast = stepIdx >= total - 1;

  useEffect(() => {
    initDraft(entry.slug, resumeId);
    return () => resetInitGuard();
  }, [entry.slug, resumeId, initDraft, resetInitGuard]);

  useEffect(() => {
    const handler = () => flushPendingSave();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [flushPendingSave]);

  const goTo = (idx: number) => {
    setStepIdx(idx);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await submitBrief();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo enviar el brief.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="slide-light min-h-screen w-full flex items-center justify-center px-5 py-16">
        <div className="max-w-lg w-full text-center bg-card border border-card-border rounded-2xl p-8 sm:p-10">
          <div className="mx-auto w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mb-5">
            <Icon name="check" className="text-success text-3xl" />
          </div>
          <h1 className="text-2xl font-semibold text-primary">Brief enviado</h1>
          <p className="mt-3 text-muted text-sm leading-relaxed">
            Recibimos tu información para {entry.title}. Se revisará para iniciar el proyecto.
          </p>
          <button
            type="button"
            onClick={editAgain}
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-card text-primary px-5 py-2.5 text-sm font-semibold hover:border-accent transition"
          >
            <Icon name="edit" className="text-base" />
            Editar mis respuestas
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="sticky top-0 z-20 bg-background/85 backdrop-blur border-b border-card-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-primary">Bravo Publicidad</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <div className="text-[11px] uppercase tracking-[0.18em] font-semibold">
            {saveError ? (
              <span className="text-danger">Error al guardar</span>
            ) : saving ? (
              <span className="text-muted">Guardando…</span>
            ) : (
              <span className="text-success">Guardado</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {stepIdx === 0 && (
          <header className="pb-5">
            <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent">
              {entry.folio ? `Cotización ${entry.folio}` : entry.title}
            </div>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-semibold text-primary leading-tight">
              Brief del proyecto
            </h1>
            <p className="mt-2 text-muted text-sm leading-relaxed max-w-xl">
              {entry.title}. Cuéntanos los detalles para arrancar con todo claro. Se guarda solo conforme
              escribes, puedes salir y volver con el mismo enlace.
            </p>
          </header>
        )}

        {loading ? (
          <div className="py-20 text-center text-muted text-sm">Cargando tu brief…</div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-muted">
                  Paso {stepIdx + 1} de {total} · {STEP_TITLES[currentStep]}
                </span>
                <span className="text-[11px] font-semibold text-accent">
                  {Math.round(((stepIdx + 1) / total) * 100)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-muted overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${((stepIdx + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-5">
              {currentSections.map((section) => (
                <section key={section.id} className="bg-card border border-card-border rounded-2xl p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-primary">{section.title}</h2>
                  {section.description && (
                    <p className="mt-1 text-sm text-muted leading-relaxed">{section.description}</p>
                  )}
                  <div className="mt-5 space-y-5">
                    {section.fields.map((field) => (
                      <FieldRenderer key={field.id} field={field} />
                    ))}
                  </div>
                  {section.expertTip && (
                    <div className="mt-6">
                      <ExpertTip text={section.expertTip} />
                    </div>
                  )}
                </section>
              ))}
            </div>

            {error && <p className="mt-5 text-danger text-sm text-center">{error}</p>}

            <div className="mt-6 flex items-center justify-between gap-3">
              {stepIdx > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(stepIdx - 1)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-card text-primary px-5 py-3 text-sm font-semibold hover:border-accent transition"
                >
                  <Icon name="arrow_back" className="text-base" />
                  Atrás
                </button>
              ) : (
                <span />
              )}

              {isLast ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-7 py-3 text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60"
                >
                  {submitting ? "Enviando…" : "Enviar brief"}
                  {!submitting && <Icon name="arrow_forward" className="text-base" />}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(stepIdx + 1)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-7 py-3 text-sm font-semibold hover:bg-primary/90 transition"
                >
                  Siguiente
                  <Icon name="arrow_forward" className="text-base" />
                </button>
              )}
            </div>

            <p className="mt-3 text-xs text-muted text-center">
              {isLast ? "Al enviar, la agencia recibe tu brief para iniciar el proyecto." : "Se guarda solo, puedes volver después con el mismo enlace."}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
