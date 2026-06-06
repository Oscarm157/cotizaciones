import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Crea un borrador y devuelve su id.
export async function POST(req: Request) {
  const { quote_slug } = await req.json();
  if (!quote_slug) {
    return NextResponse.json({ error: "quote_slug requerido" }, { status: 400 });
  }
  const rows = await sql`
    insert into quote_briefs (quote_slug, status)
    values (${quote_slug}, 'draft')
    returning id`;
  return NextResponse.json({ id: rows[0].id });
}
