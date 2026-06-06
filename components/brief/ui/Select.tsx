import Icon from "./Icon";
import type { Option } from "@/lib/brief/schema";

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecciona una opción",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none py-3 px-4 text-base font-medium text-primary appearance-none cursor-pointer"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => {
            const v = typeof opt === "string" ? opt : opt.value;
            const l = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={v} value={v}>
                {l}
              </option>
            );
          })}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="expand_more" className="text-muted" />
        </div>
      </div>
    </div>
  );
}
