type InputProps = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  error?: string;
  type?: string;
  name?: string;
  required?: boolean;
};

export function Input({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  error,
  type = "text",
  name,
  required = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        className={`input-base ${readOnly ? "opacity-60 cursor-default" : ""} ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
