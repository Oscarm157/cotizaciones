import type { DeliverableFlags } from "./schema";

// Registro de cotizaciones. Los `flags` se derivan de los entregables reales de
// cada cotizacion (ver el content.ts de cada una): esa es la parte "automatica".
// `overrides` permite forzar una seccion a mano por cotizacion (clave = id de la
// seccion en BRIEF_SCHEMA, valor = true para mostrar, false para ocultar); el
// override siempre gana sobre el flag.

export interface QuoteRegistryEntry {
  slug: string;
  title: string;
  folio: string;
  flags: DeliverableFlags;
  overrides?: Record<string, boolean>;
}

export const QUOTE_REGISTRY: Record<string, QuoteRegistryEntry> = {
  rentasa: {
    slug: "rentasa",
    title: "Rentasa, Proyectos Inmobiliarios",
    folio: "WB-133",
    flags: { agent: true, autoadmin: true, bilingual: false, social: false, portal: true, blog: true, booking: false, pages: 10 },
  },
  intransittech: {
    slug: "intransittech",
    title: "Intransit Technologies Corp",
    folio: "384",
    flags: { agent: true, autoadmin: false, bilingual: true, social: false, portal: true, blog: false, booking: false, pages: 7 },
  },
  pescador: {
    slug: "pescador",
    title: "Daniel Alejandro Pescador Silva",
    folio: "WB-134",
    flags: { agent: false, autoadmin: false, bilingual: false, social: true, portal: false, blog: false, booking: false, pages: 5 },
  },
  bustamante: {
    slug: "bustamante",
    title: "Hector Bustamante",
    folio: "WB-135",
    flags: { agent: true, autoadmin: false, bilingual: true, social: false, portal: false, blog: true, booking: true, pages: 5 },
  },
  vbt: {
    slug: "vbt",
    title: "VBT Consultores",
    folio: "",
    flags: { agent: true, autoadmin: false, bilingual: true, social: false, portal: false, blog: false, booking: false, pages: 0 },
  },
};

export function getQuote(slug: string): QuoteRegistryEntry | null {
  return QUOTE_REGISTRY[slug] ?? null;
}
