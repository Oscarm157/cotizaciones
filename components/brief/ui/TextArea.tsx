export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  maxLength = 500,
  showCount = true,
  minHeight = "108px",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  minHeight?: string;
}) {
  return (
    <div className="group">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface-muted rounded-lg p-5 text-base text-primary focus:ring-0 focus:outline-none resize-none transition-all placeholder:text-muted-light border-b-2 border-transparent focus:border-accent"
          style={{ minHeight }}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </div>
      {showCount && (
        <div className="mt-2 flex justify-end text-[0.7rem] font-semibold uppercase tracking-wider text-muted-light">
          <span>
            {value.length} / {maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
