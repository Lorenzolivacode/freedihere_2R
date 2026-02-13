type DatePickerProps = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
  max?: string;
};

export function DatePicker({ label, value, onChange, min, max }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        className="input-base"
      />
    </div>
  );
}
