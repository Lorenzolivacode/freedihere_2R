type ToggleProps = {
  value: boolean;
  onChange: (v: boolean) => void;
  label?: string;
};

export function Toggle({ value, onChange, label }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        className="relative w-10 h-6 rounded-full transition-colors"
        style={{ backgroundColor: value ? "var(--color-primary)" : "color-mix(in srgb, var(--color-foreground) 25%, transparent)" }}
        onClick={() => onChange(!value)}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full transition-transform bg-white`}
          style={{ transform: value ? "translateX(20px)" : "translateX(4px)" }}
        />
      </div>
      {label && (
        <span className="text-sm" style={{ color: "var(--color-foreground)" }}>
          {label}
        </span>
      )}
    </label>
  );
}
