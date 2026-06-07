"use client";

import { useState } from "react";
import Icon from "./Icon";

export interface ServiceItem {
  name: string;
  desc: string;
}

export default function ServiceListInput({
  label,
  items = [],
  onChange,
  placeholder = "Nombre del servicio",
}: {
  label?: string;
  items?: ServiceItem[];
  onChange: (items: ServiceItem[]) => void;
  placeholder?: string;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const add = () => {
    const n = name.trim();
    if (!n) return;
    onChange([...items, { name: n, desc: desc.trim() }]);
    setName("");
    setDesc("");
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">{label}</label>
      )}

      <div className="space-y-2 rounded-lg bg-surface-muted p-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-card rounded-lg border border-card-border focus:ring-0 focus:outline-none focus:border-accent px-4 py-2.5 text-base font-medium text-primary placeholder:text-muted-light"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              add();
            }
          }}
          placeholder="Breve descripción (qué incluye, para quién)"
          rows={2}
          className="w-full bg-card rounded-lg border border-card-border focus:ring-0 focus:outline-none focus:border-accent px-4 py-2.5 text-sm text-primary placeholder:text-muted-light resize-none"
        />
        <button
          type="button"
          onClick={add}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition"
        >
          <Icon name="add" className="text-base" />
          Agregar servicio
        </button>
      </div>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 rounded-lg bg-card border border-card-border p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary">{item.name}</p>
                {item.desc && <p className="mt-0.5 text-sm text-muted leading-snug">{item.desc}</p>}
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="shrink-0 text-muted-light hover:text-accent transition-colors"
              >
                <Icon name="close" className="text-base" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
