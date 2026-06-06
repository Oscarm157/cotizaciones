import { BRIEF_SCHEMA, type DeliverableFlags, type PlainSection } from "./schema";
import { getQuote } from "./registry";

export function sectionVisible(
  sectionId: string,
  visibleIf: ((f: DeliverableFlags) => boolean) | undefined,
  flags: DeliverableFlags,
  overrides?: Record<string, boolean>,
): boolean {
  if (overrides && sectionId in overrides) return overrides[sectionId];
  return visibleIf ? visibleIf(flags) : true;
}

// Devuelve el esquema filtrado para un slug, SIN funciones visibleIf, listo para
// cruzar a un client component.
export function visibleSchema(slug: string): PlainSection[] {
  const quote = getQuote(slug);
  if (!quote) return [];
  return BRIEF_SCHEMA.filter((s) =>
    sectionVisible(s.id, s.visibleIf, quote.flags, quote.overrides),
  ).map((s) => ({
    id: s.id,
    title: s.title,
    step: s.step,
    description: s.description,
    expertTip: s.expertTip,
    highlight: s.highlight,
    fields: s.fields,
  }));
}
