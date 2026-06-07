import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@/lib/db";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Sube un archivo a Vercel Blob y devuelve su metadata.
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "sin archivo" }, { status: 400 });
  }

  const briefId = String(form.get("briefId") || "");
  const fieldId = String(form.get("fieldId") || "file").replace(/[^a-z0-9_-]/gi, "");

  if (!UUID.test(briefId)) {
    return NextResponse.json({ error: "brief inválido" }, { status: 400 });
  }
  const rows = await sql`select 1 from quote_briefs where id = ${briefId}`;
  if (!rows[0]) {
    return NextResponse.json({ error: "brief no existe" }, { status: 404 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "archivo muy grande (máx 10 MB)" }, { status: 400 });
  }
  if (file.type && !ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "tipo de archivo no permitido" }, { status: 400 });
  }

  const blob = await put(`${briefId}/${fieldId}/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
    token: process.env.BRIEF_BLOB_TOKEN,
  });

  return NextResponse.json({
    name: file.name,
    size: file.size,
    type: file.type,
    url: blob.url,
  });
}
