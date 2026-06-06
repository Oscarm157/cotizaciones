import type { PlainSection, Option } from "./schema";
import type { QuoteRegistryEntry } from "./registry";
import type { FileMeta } from "./types";

function labelFor(options: Option[] | undefined, value: string): string {
  if (!options) return value;
  for (const o of options) {
    if (typeof o === "object" && o.value === value) return o.label;
  }
  return value;
}

function formatAnswer(value: unknown, options: Option[] | undefined): string | null {
  if (value === null || value === undefined || value === "") return null;
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return value.map((v) => `- ${labelFor(options, String(v))}`).join("\n");
  }
  return labelFor(options, String(value));
}

export function briefToMarkdown(
  entry: QuoteRegistryEntry,
  sections: PlainSection[],
  answers: Record<string, unknown>,
  files: Record<string, FileMeta[]>,
  submittedAt?: string,
): string {
  const lines: string[] = [];
  lines.push(`# Brief del proyecto · ${entry.title}`);
  lines.push("");
  lines.push(`Cotización: ${entry.folio}`);
  if (submittedAt) lines.push(`Enviado: ${submittedAt}`);
  lines.push("");

  for (const section of sections) {
    const parts: string[] = [];

    for (const field of section.fields) {
      if (field.type === "file") {
        const fs = files[field.id] || [];
        if (fs.length === 0) continue;
        parts.push(`**${field.label}**`);
        parts.push(fs.map((f) => `- [${f.name}](${f.url})`).join("\n"));
        parts.push("");
        continue;
      }
      const formatted = formatAnswer(answers[field.id], field.options);
      if (formatted === null) continue;
      parts.push(`**${field.label}**`);
      parts.push(formatted);
      parts.push("");
    }

    if (parts.length === 0) continue;
    lines.push(`## ${section.title}`);
    lines.push("");
    lines.push(...parts);
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
