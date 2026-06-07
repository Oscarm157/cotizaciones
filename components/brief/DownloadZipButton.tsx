"use client";

import { useState } from "react";
import { zipSync, strToU8 } from "fflate";
import { briefToMarkdown } from "@/lib/brief/markdown";
import type { PlainSection } from "@/lib/brief/schema";
import type { Client } from "@/lib/brief/clients";
import type { FileMeta } from "@/lib/brief/types";
import Icon from "./ui/Icon";

export default function DownloadZipButton({
  entry,
  sections,
  answers,
  files,
  submittedAt,
  className = "",
}: {
  entry: Client;
  sections: PlainSection[];
  answers: Record<string, unknown>;
  files: Record<string, FileMeta[]>;
  submittedAt?: string;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);

  const allFiles = Object.values(files).flat();

  const download = async () => {
    setBusy(true);
    try {
      const md = briefToMarkdown(entry, sections, answers, files, submittedAt);
      const zipFiles: Record<string, Uint8Array> = {
        "brief.md": strToU8(md),
      };

      const used = new Set<string>();
      for (const f of allFiles) {
        try {
          const res = await fetch(f.url);
          const buf = new Uint8Array(await res.arrayBuffer());
          let name = f.name;
          let n = 1;
          while (used.has(name)) {
            const dot = f.name.lastIndexOf(".");
            name = dot > 0 ? `${f.name.slice(0, dot)}-${n}${f.name.slice(dot)}` : `${f.name}-${n}`;
            n++;
          }
          used.add(name);
          zipFiles[`imagenes/${name}`] = buf;
        } catch {
          /* si un archivo falla, sigue con el resto */
        }
      }

      const zipped = zipSync(zipFiles);
      const blob = new Blob([zipped as BlobPart], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `brief-${entry.slug}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  // Si no hay archivos, baja solo el .md (sin zip)
  const downloadMd = () => {
    const md = briefToMarkdown(entry, sections, answers, files, submittedAt);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brief-${entry.slug}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={allFiles.length > 0 ? download : downloadMd}
      disabled={busy}
      className={`inline-flex items-center gap-2 rounded-lg bg-accent text-white px-5 py-3 text-sm font-semibold hover:bg-accent/90 transition disabled:opacity-60 ${className}`}
    >
      <Icon name="download" className="text-base" />
      {busy ? "Generando…" : allFiles.length > 0 ? "Descargar brief (.zip)" : "Descargar brief (.md)"}
    </button>
  );
}
