import { sql } from "@/lib/db";

// Solo servidor (server components y server actions).

export interface Client {
  slug: string;
  title: string;
  folio: string;
  sections: Record<string, boolean>;
}

// Los clientes con pagina de cotizacion estatica (app/<slug>/page.tsx).
export const QUOTE_PAGES = ["inmobiliaria", "rentasa", "intransittech", "pescador", "bustamante"];

export function quotePathFor(slug: string): string | null {
  return QUOTE_PAGES.includes(slug) ? `/${slug}` : null;
}

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
