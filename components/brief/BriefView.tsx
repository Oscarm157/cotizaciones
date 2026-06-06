import type { PlainSection, Option } from "@/lib/brief/schema";
import type { FileMeta } from "@/store/useBriefStore";

function labelFor(options: Option[] | undefined, value: string): string {
  if (!options) return value;
  for (const o of options) {
    if (typeof o === "object" && o.value === value) return o.label;
  }
  return value;
}

export default function BriefView({
  sections,
  answers,
  files,
}: {
  sections: PlainSection[];
  answers: Record<string, unknown>;
  files: Record<string, FileMeta[]>;
}) {
  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const rows = section.fields
          .map((field) => {
            if (field.type === "file") {
              const fs = files[field.id] || [];
              if (fs.length === 0) return null;
              return (
                <div key={field.id}>
                  <div className="text-[0.7rem] font-bold text-muted uppercase tracking-wider">{field.label}</div>
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {fs.map((f, i) => (
                      <li key={i}>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-accent underline underline-offset-2"
                        >
                          {f.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            const v = answers[field.id];
            if (v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return null;

            if (field.type === "color" && Array.isArray(v)) {
              return (
                <div key={field.id}>
                  <div className="text-[0.7rem] font-bold text-muted uppercase tracking-wider">{field.label}</div>
                  <div className="mt-1.5 flex gap-2">
                    {(v as string[]).map((c, i) => (
                      <span
                        key={i}
                        className="w-7 h-7 rounded-md border border-card-border"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            const text = Array.isArray(v)
              ? (v as string[]).map((x) => labelFor(field.options, x)).join(", ")
              : labelFor(field.options, String(v));

            return (
              <div key={field.id}>
                <div className="text-[0.7rem] font-bold text-muted uppercase tracking-wider">{field.label}</div>
                <div className="mt-1 text-sm text-primary whitespace-pre-wrap leading-relaxed">{text}</div>
              </div>
            );
          })
          .filter(Boolean);

        if (rows.length === 0) return null;

        return (
          <section key={section.id} className="bg-card border border-card-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-primary mb-5">{section.title}</h2>
            <div className="space-y-5">{rows}</div>
          </section>
        );
      })}
    </div>
  );
}
