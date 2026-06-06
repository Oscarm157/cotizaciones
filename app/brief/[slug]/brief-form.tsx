"use client";

import { useEffect, useState } from "react";
import useBriefStore from "@/store/useBriefStore";
import type { FileMeta } from "@/lib/brief/types";
import type { PlainSection } from "@/lib/brief/schema";
import type { QuoteRegistryEntry } from "@/lib/brief/registry";
import FieldRenderer from "@/components/brief/FieldRenderer";
import ExpertTip from "@/components/brief/ExpertTip";
import DownloadZipButton from "@/components/brief/DownloadZipButton";
import Icon from "@/components/brief/ui/Icon";

type Snapshot = { answers: Record<string, unknown>; files: Record<string, FileMeta[]> };

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

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    initDraft(entry.slug, resumeId);
    return () => resetInitGuard();
  }, [entry.slug, resumeId, initDraft, resetInitGuard]);

  useEffect(() => {
    const handler = () => flushPendingSave();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [flushPendingSave]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await submitBrief();
      const st = useBriefStore.getState();
      setSnapshot({ answers: st.answers, files: st.files });
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo enviar el brief.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && snapshot) {
    return (
      <main className="slide-light min-h-screen w-full flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center bg-card border border-card-border rounded-2xl p-10">
          <div className="mx-auto w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mb-5">
            <Icon name="check" className="text-success text-3xl" />
          </div>
          <h1 className="text-2xl font-semibold text-primary">Brief enviado</h1>
          <p className="mt-3 text-muted text-sm leading-relaxed">
            Recibimos tu información para {entry.title}. El equipo de Bravo Publicidad la revisará para
            arrancar el proyecto. Puedes descargar una copia con tus respuestas y los archivos que subiste.
          </p>
          <div className="mt-7 flex justify-center">
            <DownloadZipButton
              entry={entry}
              sections={sections}
              answers={snapshot.answers}
              files={snapshot.files}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="slide-light min-h-screen w-full text-foreground">
      <div className="sticky top-0 z-20 bg-background/85 backdrop-blur border-b border-card-border">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
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

      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12">
        <header className="pb-8 border-b border-card-border">
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold text-accent">
            {entry.folio ? `Cotización ${entry.folio}` : entry.title}
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-primary leading-tight">
            Brief del proyecto
          </h1>
          <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed max-w-xl">
            {entry.title}. Cuéntanos los detalles para arrancar con todo claro. Se guarda solo conforme
            escribes, puedes salir y volver con el mismo enlace.
          </p>
        </header>

        {loading ? (
          <div className="py-20 text-center text-muted text-sm">Cargando tu brief…</div>
        ) : (
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section
                key={section.id}
                className="bg-card border border-card-border rounded-2xl p-6 sm:p-8"
              >
                <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
                {section.description && (
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">{section.description}</p>
                )}
                <div className="mt-7 space-y-7">
                  {section.fields.map((field) => (
                    <FieldRenderer key={field.id} field={field} />
                  ))}
                </div>
                {section.expertTip && (
                  <div className="mt-8">
                    <ExpertTip text={section.expertTip} />
                  </div>
                )}
              </section>
            ))}

            {error && <p className="text-danger text-sm text-center">{error}</p>}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted">
                Al enviar, el equipo de Bravo recibe tu brief para iniciar el proyecto.
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60"
              >
                {submitting ? "Enviando…" : "Enviar brief"}
                {!submitting && <Icon name="arrow_forward" className="text-base" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
