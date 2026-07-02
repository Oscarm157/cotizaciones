import { sql } from "@/lib/db";

// Solo servidor (server components y server actions).

export interface Client {
  slug: string;
  title: string;
  folio: string;
  sections: Record<string, boolean>;
}

// Los clientes con pagina de cotizacion estatica (app/<slug>/page.tsx).
export const QUOTE_PAGES = [
  "inmobiliaria",
  "rentasa",
  "intransittech",
  "pescador",
  "bustamante",
  "autoempleo",
  "marabunta",
];

export function quotePathFor(slug: string): string | null {
  return QUOTE_PAGES.includes(slug) ? `/${slug}` : null;
}

// Todas las cotizaciones/presupuestos estaticos, para listarlos en /admin.
export interface QuoteMeta {
  slug: string;
  folio: string;
  client: string;
}

export const QUOTES: QuoteMeta[] = [
  { slug: "pescador", folio: "WB-134", client: "Daniel Alejandro Pescador Silva" },
  { slug: "rentasa", folio: "WB-136", client: "Rentasa, Proyectos Inmobiliarios" },
  { slug: "intransittech", folio: "WB-132", client: "Intransit Technologies Corp" },
  { slug: "bustamante", folio: "WB-135", client: "Hector Bustamante" },
  { slug: "inmobiliaria", folio: "WB-133", client: "Inmobiliaria Vértice" },
  { slug: "marabunta", folio: "MCS-0042", client: "Kimberly Celaya · Marabunta" },
  { slug: "autoempleo", folio: "AE-2026-01", client: "Oscar Arredondo Mayoral · Impulso al Autoempleo" },
];

export async function getClient(slug: string): Promise<Client | null> {
  const rows = await sql`select slug, title, folio, sections from clients where slug = ${slug}`;
  return (rows[0] as Client) ?? null;
}

export async function listClients(): Promise<Client[]> {
  const rows = await sql`select slug, title, folio, sections from clients order by created_at desc`;
  return rows as Client[];
}

export async function createClient(c: Client): Promise<void> {
  await sql`
    insert into clients (slug, title, folio, sections)
    values (${c.slug}, ${c.title}, ${c.folio}, ${JSON.stringify(c.sections)}::jsonb)`;
}

export async function updateClient(
  slug: string,
  c: { title: string; folio: string; sections: Record<string, boolean> },
): Promise<void> {
  await sql`
    update clients
    set title = ${c.title}, folio = ${c.folio}, sections = ${JSON.stringify(c.sections)}::jsonb, updated_at = now()
    where slug = ${slug}`;
}

export async function deleteClient(slug: string): Promise<void> {
  await sql`delete from clients where slug = ${slug}`;
}
