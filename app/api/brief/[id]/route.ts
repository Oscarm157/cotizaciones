import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Carga un brief por id (para resumir un borrador).
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await sql`select * from quote_briefs where id = ${id}`;
  if (!rows[0]) return NextResponse.json({ error: "no encontrado" }, { status: 404 });
  return NextResponse.json(rows[0]);
}

// Guarda el borrador o lo marca como enviado (status).
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { answers, files, client_name, status } = await req.json();
  const rows = await sql`
    update quote_briefs
    set answers = ${JSON.stringify(answers ?? {})}::jsonb,
        files = ${JSON.stringify(files ?? {})}::jsonb,
        client_name = ${client_name ?? null},
        status = ${status ?? "draft"},
        updated_at = now()
    where id = ${id}
    returning id`;
  if (!rows[0]) return NextResponse.json({ error: "no encontrado" }, { status: 404 });
  return NextResponse.json({ id: rows[0].id });
}
