import { MacroBadgeGroup } from "./MacroBadgeGroup";
import type { IMealWithFoods } from "../../types/meal.types";
import { calcMacroFromWeight, sumMacros } from "../../utils/macroCalc";

type MealCardProps = {
  meal: IMealWithFoods;
  onClick: () => void;
};

export function MealCard({ meal, onClick }: MealCardProps) {
  // Calcola i macro totali del pasto sommando tutti gli alimenti scalati per peso
  const totalMacro = sumMacros(
    meal.join_meal_food
      .filter((jmf) => jmf.detail.macro)
      .map((jmf) => calcMacroFromWeight(jmf.detail.macro!, jmf.weight))
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="card w-full text-left hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
          {meal.meal_name}
        </h3>
        <span className="text-xs opacity-50" style={{ color: "var(--color-foreground)" }}>
          {meal.join_meal_food.length} alimenti
        </span>
      </div>
      <MacroBadgeGroup macro={totalMacro} compact />
    </button>
  );
}
