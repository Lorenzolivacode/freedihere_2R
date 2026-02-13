import type { IDiaryUser } from "../../types/diary.types";
import type { IDataUser } from "../../types/user.types";
import type { IMealWithFoods } from "../../types/meal.types";
import { calcMacroFromWeight } from "../../utils/macroCalc";

type DiaryCardProps = {
  diary: IDiaryUser;
  dataUser?: IDataUser | null;
  onClick: () => void;
};

function formatDay(day: string) {
  return new Date(day).toLocaleDateString("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function calcTotalKcal(meals: IMealWithFoods[]): number {
  return meals.reduce((total, meal) => {
    const mealKcal = meal.join_meal_food.reduce((sum, jmf) => {
      if (!jmf.detail.macro) return sum;
      const scaled = calcMacroFromWeight(jmf.detail.macro, jmf.weight);
      return sum + scaled.kcal;
    }, 0);
    return total + mealKcal;
  }, 0);
}

export function DiaryCard({ diary, dataUser, onClick }: DiaryCardProps) {
  const consumedKcal = calcTotalKcal(diary.meals);
  const remainingKcal = Math.max(0, diary.aspected_kcal - consumedKcal);
  const pct = diary.aspected_kcal > 0
    ? Math.min(100, (consumedKcal / diary.aspected_kcal) * 100)
    : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="card w-full text-left hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
            {formatDay(diary.day)}
          </p>
          <p className="text-xs opacity-50 mt-0.5" style={{ color: "var(--color-foreground)" }}>
            {diary.meals.length} pasti
          </p>
        </div>
        {dataUser && (
          <div className="text-right">
            <p className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
              {dataUser.weight} kg
            </p>
          </div>
        )}
      </div>

      {/* Barra progresso kcal */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs" style={{ color: "var(--color-foreground)" }}>
          <span style={{ color: "var(--color-kcal)" }}>{Math.round(consumedKcal)} kcal</span>
          <span className="opacity-50">-{Math.round(remainingKcal)} rimanenti</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--color-kcal) 20%, transparent)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: "var(--color-kcal)" }}
          />
        </div>
      </div>
    </button>
  );
}
