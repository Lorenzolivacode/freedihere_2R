import { Input } from "../atoms/Input";
import { MacroBadgeGroup } from "./MacroBadgeGroup";
import type { IJoinMealFood } from "../../types/meal.types";
import { calcMacroFromWeight } from "../../utils/macroCalc";

type FoodRowProps = {
  food: IJoinMealFood;
  onWeightChange: (id: string, weight: number) => void;
};

export function FoodRow({ food, onWeightChange }: FoodRowProps) {
  const macro = food.detail.macro;

  // Evidenziazione: gialla se isFSApproximated, rossa se fiber o salt nulli
  const isMissingValues = macro && (macro.fiber == null || macro.salt == null);
  const isApprox = macro?.isFSApproximated;

  let rowStyle: React.CSSProperties = {};
  if (isApprox) {
    rowStyle = { backgroundColor: "color-mix(in srgb, var(--color-secondary) 20%, transparent)" };
  } else if (isMissingValues) {
    rowStyle = { backgroundColor: "color-mix(in srgb, #ef4444 15%, transparent)" };
  }

  const scaledMacro = macro ? calcMacroFromWeight(macro, food.weight) : null;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-2 py-2 px-3 rounded-lg"
      style={rowStyle}
    >
      {/* Nome alimento (readOnly) */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "var(--color-foreground)" }}>
          {food.detail.detail_product}
        </p>
        <p className="text-xs opacity-50 truncate" style={{ color: "var(--color-foreground)" }}>
          {food.detail.brand?.name_brand ?? "—"}
        </p>
      </div>

      {/* Macro scalati per il peso */}
      {scaledMacro && (
        <div className="shrink-0">
          <MacroBadgeGroup macro={scaledMacro} compact />
        </div>
      )}

      {/* Input peso */}
      <div className="w-24 shrink-0">
        <Input
          value={String(food.weight)}
          onChange={(v) => onWeightChange(food.id, parseFloat(v) || 0)}
          placeholder="g"
          type="number"
        />
      </div>
    </div>
  );
}
