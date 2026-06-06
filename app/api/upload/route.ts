import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Sube un archivo a Vercel Blob y devuelve su metadata.
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "sin archivo" }, { status: 400 });
  }
  const briefId = String(form.get("briefId") || "brief");
  const fieldId = String(form.get("fieldId") || "file");

  const blob = await put(`${briefId}/${fieldId}/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({
    name: file.name,
    size: file.size,
    type: file.type,
    url: blob.url,
  });
}
