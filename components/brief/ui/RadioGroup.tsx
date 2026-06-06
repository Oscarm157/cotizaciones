import Icon from "./Icon";
import type { Option } from "@/lib/brief/schema";

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="space-y-3">
        {options.map((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.value;
          const optLabel = typeof opt === "string" ? opt : opt.label;
          const optDesc = typeof opt === "object" ? opt.description : null;
          const optIcon = typeof opt === "object" ? opt.icon : null;
          const isSelected = value === optValue;
          return (
            <button
              key={optValue}
              type="button"
              onClick={() => onChange(optValue)}
              className={`w-full text-left px-5 py-4 rounded-lg flex items-center gap-4 transition-all border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-card-border hover:border-accent"
              }`}
            >
              {optIcon && (
                <Icon name={optIcon} className={isSelected ? "text-accent-light" : "text-muted"} />
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm">{optLabel}</p>
                {optDesc && (
                  <p className={`text-xs mt-1 ${isSelected ? "text-primary-foreground/70" : "text-muted"}`}>
                    {optDesc}
                  </p>
                )}
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? "border-accent-light" : "border-muted-light"
                }`}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent-light" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
