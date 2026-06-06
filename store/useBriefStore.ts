import { create } from "zustand";
import { supabase, supabaseUrl, supabaseKey } from "@/lib/supabase";

const TABLE = "quote_briefs";
const BUCKET = "brief-files";
const DEBOUNCE_MS = 1500;

export interface FileMeta {
  name: string;
  size: number;
  type: string;
  url: string;
}

type FileItem = File | FileMeta;

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let initSlug: string | null = null;

const draftKey = (slug: string) => `quote-brief-draft-${slug}`;

function isUploaded(f: FileItem): f is FileMeta {
  return !(f instanceof File) && typeof (f as FileMeta).url === "string";
}

async function uploadFile(file: File, briefId: string, fieldId: string): Promise<FileMeta> {
  const path = `${briefId}/${fieldId}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { name: file.name, size: file.size, type: file.type, url: data.publicUrl };
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
  saveToSupabase: () => Promise<void>;
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
      const uploaded = await Promise.all(fresh.map((f) => uploadFile(f, briefId!, fieldId)));
      const all = [...kept, ...uploaded];
      set((s) => ({ files: { ...s.files, [fieldId]: all }, saving: false, saveError: false }));
      await supabase
        .from(TABLE)
        .update({ files: get().files, updated_at: new Date().toISOString() })
        .eq("id", briefId);
      get().saveLocal();
    } catch (e) {
      console.error("File upload error:", e);
      set({ saving: false, saveError: true });
    }
  },

  createDraftRow: async () => {
    try {
      const { data, error } = await supabase
        .from(TABLE)
        .insert({ quote_slug: get().quoteSlug, status: "draft", updated_at: new Date().toISOString() })
        .select()
        .single();
      if (error) throw error;
      set({ briefId: data.id });
      return data.id as string;
    } catch (e) {
      console.error("Could not create draft row:", e);
      set({ saveError: true });
      return null;
    }
  },

  debouncedSave: () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => get().saveToSupabase(), DEBOUNCE_MS);
  },

  saveToSupabase: async () => {
    const state = get();
    set({ saving: true });
    try {
      if (!state.briefId) {
        await get().createDraftRow();
      }
      const briefId = get().briefId;
      if (briefId) {
        const latest = get();
        const { error } = await supabase
          .from(TABLE)
          .update({
            answers: latest.answers,
            files: latest.files,
            client_name: (latest.answers.companyName as string) || (latest.answers.projectName as string) || null,
            status: "draft",
            updated_at: new Date().toISOString(),
          })
          .eq("id", briefId);
        if (error) throw error;
      }
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
        const { data, error } = await supabase.from(TABLE).select("*").eq("id", briefId).single();
        if (!error && data && data.quote_slug === slug) {
          set({
            briefId: data.id,
            answers: data.answers || localAnswers || {},
            files: data.files || localFiles || {},
            loading: false,
          });
          return;
        }
      } catch {
        /* ignore */
      }
    }

    set({ answers: localAnswers || {}, files: localFiles || {}, loading: false });
  },

  submitBrief: async () => {
    const state = get();
    const payload = {
      quote_slug: state.quoteSlug,
      answers: state.answers,
      files: state.files,
      client_name: (state.answers.companyName as string) || (state.answers.projectName as string) || null,
      status: "submitted",
      updated_at: new Date().toISOString(),
    };

    let id: string;
    if (state.briefId) {
      const { data, error } = await supabase.from(TABLE).update(payload).eq("id", state.briefId).select().single();
      if (error) throw new Error("No se pudo enviar el brief. Revisa tu conexión e intenta de nuevo.");
      id = data.id;
    } else {
      const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
      if (error) throw new Error("No se pudo enviar el brief. Revisa tu conexión e intenta de nuevo.");
      id = data.id;
    }

    try {
      localStorage.removeItem(draftKey(state.quoteSlug));
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
    const state = get();
    if (!state.briefId) return;
    fetch(`${supabaseUrl}/rest/v1/${TABLE}?id=eq.${state.briefId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        answers: state.answers,
        files: state.files,
        status: "draft",
        updated_at: new Date().toISOString(),
      }),
      keepalive: true,
    });
  },

  resetInitGuard: () => {
    initSlug = null;
  },
}));

export default useBriefStore;
