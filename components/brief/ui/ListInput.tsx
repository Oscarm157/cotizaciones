"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function ListInput({
  label,
  items = [],
  onChange,
  placeholder = "Agregar…",
}: {
  label?: string;
  items?: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...items, v]);
    setDraft("");
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">{label}</label>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base font-medium text-primary placeholder:text-muted-light"
        />
        <button
          type="button"
          onClick={add}
          className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition"
        >
          <Icon name="add" className="text-base" />
          Agregar
        </button>
      </div>

      {items.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-2 rounded-lg bg-surface-muted border border-card-border pl-3 pr-2 py-1.5 text-sm text-primary"
            >
              <span className="truncate max-w-[220px]">{item}</span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="shrink-0 text-muted-light hover:text-accent transition-colors"
              >
                <Icon name="close" className="text-sm" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
