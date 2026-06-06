export default function DateInput({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
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
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none py-3 px-4 text-base font-medium text-primary cursor-pointer"
        />
      </div>
    </div>
  );
}
