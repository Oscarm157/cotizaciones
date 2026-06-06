export default function Icon({
  name,
  className = "",
  fill = false,
  style = {},
}: {
  name: string;
  className?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={fill ? { ...style, fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : style}
    >
      {name}
    </span>
  );
}
