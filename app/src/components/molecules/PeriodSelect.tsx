import AdvancedSelect from "../atoms/Select";

type Period = "week" | "month" | "year";

type PeriodSelectProps = {
  value: Period;
  onChange: (v: Period) => void;
};

const options = [
  { value: "week", label: "Settimana" },
  { value: "month", label: "Mese" },
  { value: "year", label: "Anno" },
];

export function PeriodSelect({ value, onChange }: PeriodSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
        Periodo
      </label>
      <AdvancedSelect
        options={options}
        value={value}
        onChange={(v) => onChange(v as Period)}
      />
    </div>
  );
}
