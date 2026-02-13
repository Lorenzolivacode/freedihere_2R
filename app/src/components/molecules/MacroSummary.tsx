import type { IMacro } from "../../types/food.types";

type MacroSummaryProps = {
  consumed: IMacro;
  expected: IMacro;
};

const fmt = (v: number | null | undefined) =>
  v != null ? Math.round(v) : 0;

type MacroRowProps = {
  label: string;
  consumed: number;
  expected: number;
  colorVar: string;
  unit?: string;
};

function MacroRow({ label, consumed, expected, colorVar, unit = "g" }: MacroRowProps) {
  const pct = expected > 0 ? Math.min(100, (consumed / expected) * 100) : 0;
  const remaining = Math.max(0, expected - consumed);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs" style={{ color: "var(--color-foreground)" }}>
        <span className="font-medium">{label}</span>
        <span>
          <span style={{ color: colorVar }}>{fmt(consumed)}</span>
          {" / "}
          <span className="opacity-50">{fmt(expected)}{unit}</span>
          {" · "}
          <span className="opacity-70">-{fmt(remaining)}{unit}</span>
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `color-mix(in srgb, ${colorVar} 20%, transparent)` }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: colorVar }}
        />
      </div>
    </div>
  );
}

export function MacroSummary({ consumed, expected }: MacroSummaryProps) {
  return (
    <div className="card flex flex-col gap-3">
      <h3 className="section-title text-base mb-0">Riepilogo macro</h3>
      <MacroRow
        label="Kcal"
        consumed={consumed.kcal}
        expected={expected.kcal}
        colorVar="var(--color-kcal)"
        unit=" kcal"
      />
      <MacroRow
        label="Grassi"
        consumed={consumed.fat}
        expected={expected.fat}
        colorVar="var(--color-fat)"
      />
      <MacroRow
        label="Carboidrati"
        consumed={consumed.carbo}
        expected={expected.carbo}
        colorVar="var(--color-carbo)"
      />
      <MacroRow
        label="Proteine"
        consumed={consumed.proteins}
        expected={expected.proteins}
        colorVar="var(--color-prot)"
      />
    </div>
  );
}
