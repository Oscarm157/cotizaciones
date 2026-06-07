import { BRIEF_SCHEMA, type PlainSection } from "./schema";
import type { Client } from "./clients";

// Devuelve las secciones del brief que el cliente tiene encendidas, en el orden
// del catalogo. Ya son planas (sin funciones), listas para un client component.
export function visibleSchema(client: Client): PlainSection[] {
  return BRIEF_SCHEMA.filter((s) => client.sections?.[s.id] === true);
}
