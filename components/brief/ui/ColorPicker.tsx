"use client";

import { useState } from "react";

export default function ColorPicker({
  label,
  colors = [],
  onChange,
}: {
  label?: string;
  colors?: string[];
  onChange: (colors: string[]) => void;
}) {
  const [editing, setEditing] = useState<number | null>(null);

  const updateColor = (index: number, hex: string) => {
    const next = [...colors];
    next[index] = hex;
    onChange(next);
  };

  const addColor = () => {
    if (colors.length < 6) onChange([...colors, "#cccccc"]);
  };

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="flex gap-3 flex-wrap items-center">
        {colors.map((color, i) => (
          <div key={i} className="relative">
            <button
              type="button"
              onClick={() => setEditing(editing === i ? null : i)}
              className="w-12 h-12 rounded-lg cursor-pointer transition-all hover:scale-110 ring-2 ring-offset-2 ring-transparent hover:ring-accent"
              style={{ backgroundColor: color }}
              title={color}
            />
            {editing === i && (
              <div className="absolute top-full left-0 mt-2 z-10 bg-card border border-card-border p-3 rounded-lg shadow-xl space-y-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="w-full h-8 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => {
                    removeColor(i);
                    setEditing(null);
                  }}
                  className="text-xs text-accent font-semibold"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
        {colors.length < 6 && (
          <button
            type="button"
            onClick={addColor}
            className="w-12 h-12 rounded-lg border-2 border-dashed border-muted-light flex items-center justify-center text-muted-light hover:border-accent hover:text-accent transition-all"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}
