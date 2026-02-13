type TextareaProps = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  error?: string;
  rows?: number;
  name?: string;
};

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  error,
  rows = 3,
  name,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        className={`input-base resize-none ${readOnly ? "opacity-60 cursor-default" : ""} ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
