import { create } from "zustand";
import type { FileMeta } from "@/lib/brief/types";

const DEBOUNCE_MS = 1500;

type FileItem = File | FileMeta;

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let initSlug: string | null = null;

const draftKey = (slug: string) => `quote-brief-draft-${slug}`;

function isUploaded(f: FileItem): f is FileMeta {
  return !(f instanceof File) && typeof (f as FileMeta).url === "string";
}

function clientNameFrom(answers: Record<string, unknown>): string | null {
  return (answers.companyName as string) || (answers.projectName as string) || null;
}

async function uploadOne(file: File, briefId: string, fieldId: string): Promise<FileMeta> {
  const form = new FormData();
  form.append("file", file);
  form.append("briefId", briefId);
  form.append("fieldId", fieldId);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("upload failed");
  return res.json();
}

interface BriefState {
  briefId: string | null;
  quoteSlug: string;
  answers: Record<string, unknown>;
  files: Record<string, FileMeta[]>;
  saving: boolean;
  saveError: boolean;
  loading: boolean;
  submitted: boolean;
  updateAnswer: (fieldId: string, value: unknown) => void;
  updateFiles: (fieldId: string, items: FileItem[]) => Promise<void>;
  createDraftRow: () => Promise<string | null>;
  debouncedSave: () => void;
  saveDraft: () => Promise<void>;
  saveLocal: () => void;
  initDraft: (slug: string, urlBriefId?: string | null) => Promise<void>;
  submitBrief: () => Promise<string>;
  flushPendingSave: () => void;
  resetInitGuard: () => void;
}

const useBriefStore = create<BriefState>((set, get) => ({
  briefId: null,
  quoteSlug: "",
  answers: {},
  files: {},
  saving: false,
  saveError: false,
  loading: true,
  submitted: false,

  updateAnswer: (fieldId, value) => {
    set((s) => ({ answers: { ...s.answers, [fieldId]: value } }));
    get().saveLocal();
    get().debouncedSave();
  },

  updateFiles: async (fieldId, items) => {
    let briefId = get().briefId;
    if (!briefId) {
      briefId = await get().createDraftRow();
      if (!briefId) return;
    }
    try {
      set({ saving: true });
      const kept = items.filter(isUploaded);
      const fresh = items.filter((f): f is File => f instanceof File);
      const uploaded = await Promise.all(fresh.map((f) => uploadOne(f, briefId!, fieldId)));
      set((s) => ({ files: { ...s.files, [fieldId]: [...kept, ...uploaded] }, saving: false, saveError: false }));
      get().saveLocal();
      await get().saveDraft();
    } catch (e) {
      console.error("File upload error:", e);
      set({ saving: false, saveError: true });
    }
  },

  createDraftRow: async () => {
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote_slug: get().quoteSlug }),
      });
      if (!res.ok) throw new Error("create failed");
      const { id } = await res.json();
      set({ briefId: id });
      return id as string;
    } catch (e) {
      console.error("Could not create draft:", e);
      set({ saveError: true });
      return null;
    }
  },

  debouncedSave: () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => get().saveDraft(), DEBOUNCE_MS);
  },

  saveDraft: async () => {
    if (!get().briefId) {
      await get().createDraftRow();
    }
    const id = get().briefId;
    if (!id) return;
    set({ saving: true });
    try {
      const s = get();
      const res = await fetch(`/api/brief/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: s.answers,
          files: s.files,
          client_name: clientNameFrom(s.answers),
          status: "draft",
        }),
      });
      if (!res.ok) throw new Error("save failed");
      set({ saving: false, saveError: false });
    } catch (e) {
      console.error("Could not save draft:", e);
      set({ saving: false, saveError: true });
    }
  },

  saveLocal: () => {
    const { quoteSlug, briefId, answers, files } = get();
    try {
      localStorage.setItem(draftKey(quoteSlug), JSON.stringify({ briefId, answers, files }));
    } catch {
      /* ignore */
    }
  },

  initDraft: async (slug, urlBriefId) => {
    if (initSlug === slug) return;
    initSlug = slug;
    set({ quoteSlug: slug, loading: true, submitted: false, briefId: null, answers: {}, files: {} });

    let briefId = urlBriefId || null;
    let localAnswers: Record<string, unknown> | null = null;
    let localFiles: Record<string, FileMeta[]> | null = null;
    if (!briefId) {
      try {
        const raw = localStorage.getItem(draftKey(slug));
        if (raw) {
          const d = JSON.parse(raw);
          briefId = d.briefId || null;
          localAnswers = d.answers || null;
          localFiles = d.files || null;
        }
      } catch {
        /* ignore */
      }
    }

    if (briefId) {
      try {
        const res = await fetch(`/api/brief/${briefId}`);
        if (res.ok) {
          const row = await res.json();
          if (row.quote_slug === slug) {
            set({
              briefId: row.id,
              answers: row.answers || localAnswers || {},
              files: row.files || localFiles || {},
              loading: false,
            });
            return;
          }
        }
      } catch {
        /* ignore */
      }
    }

    set({ answers: localAnswers || {}, files: localFiles || {}, loading: false });
  },

  submitBrief: async () => {
    if (!get().briefId) {
      await get().createDraftRow();
    }
    const id = get().briefId;
    if (!id) throw new Error("No se pudo enviar el brief. Revisa tu conexión e intenta de nuevo.");
    const s = get();
    const res = await fetch(`/api/brief/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: s.answers,
        files: s.files,
        client_name: clientNameFrom(s.answers),
        status: "submitted",
      }),
    });
    if (!res.ok) throw new Error("No se pudo enviar el brief. Revisa tu conexión e intenta de nuevo.");
    try {
      localStorage.removeItem(draftKey(s.quoteSlug));
    } catch {
      /* ignore */
    }
    set({ submitted: true });
    return id;
  },

  flushPendingSave: () => {
    if (!debounceTimer) return;
    clearTimeout(debounceTimer);
    debounceTimer = null;
    const s = get();
    if (!s.briefId) return;
    fetch(`/api/brief/${s.briefId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: s.answers,
        files: s.files,
        client_name: clientNameFrom(s.answers),
        status: "draft",
      }),
      keepalive: true,
    });
  },

  resetInitGuard: () => {
    initSlug = null;
  },
}));

export default useBriefStore;
