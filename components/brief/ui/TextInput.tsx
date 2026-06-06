export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[0.7rem] font-bold text-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base font-medium text-primary placeholder:text-muted-light transition-all"
          placeholder={placeholder}
        />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-card-border group-focus-within:bg-accent transition-all" />
      </div>
    </div>
  );
}
