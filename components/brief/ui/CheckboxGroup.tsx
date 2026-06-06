import type { Option } from "@/lib/brief/schema";

export default function CheckboxGroup({
  label,
  options,
  selected = [],
  onChange,
  max,
}: {
  label?: string;
  options: Option[];
  selected?: string[];
  onChange: (v: string[]) => void;
  max?: number;
}) {
  const toggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((s) => s !== item));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, item]);
    }
  };

  const atMax = max ? selected.length >= max : false;

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          const isSelected = selected.includes(value);
          const isDisabled = atMax && !isSelected;
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggle(value)}
              disabled={isDisabled}
              className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : isDisabled
                    ? "bg-card text-muted border-card-border opacity-40 cursor-not-allowed"
                    : "bg-card text-foreground border-card-border hover:border-accent"
              }`}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
