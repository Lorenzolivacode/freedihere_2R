import { useState, useEffect } from "react";
import { GiornataComponent } from "../molecules/GiornataComponent";
import { MacroSummary } from "../molecules/MacroSummary";
import { MealModal } from "./MealModal";
import { useDiary } from "../../utils/hooks/useDiary";
import { useMeal } from "../../utils/hooks/useMeal";
import { calcMacroFromWeight, sumMacros, calcRemainingMacros } from "../../utils/macroCalc";
import type { IMealWithFoods } from "../../types/meal.types";
import { getActiveUser } from "../../utils/session";

function toYMD(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<IMealWithFoods | undefined>();

  const today = toYMD(new Date());
  const userId = getActiveUser() ?? "";

  const { diary, getDiaryByDate } = useDiary();
  const { loadingCreate, createMeal, createDiaryWithMeal } = useMeal();

  // Carica il diary di oggi al mount
  useEffect(() => {
    if (userId) getDiaryByDate(userId, today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const meals = diary?.meals ?? [];

  // Macro consumati sommando tutti gli alimenti del giorno
  const allMealMacros = meals.flatMap((meal) =>
    meal.join_meal_food
      .filter((jmf) => jmf.detail.macro)
      .map((jmf) => calcMacroFromWeight(jmf.detail.macro!, jmf.weight))
  );
  const consumed = sumMacros(allMealMacros);
  const expectedKcal = diary?.aspected_kcal ?? 2000;
  const expected = calcRemainingMacros(consumed, expectedKcal);

  const handleAddMeal = () => {
    setEditingMeal(undefined);
    setModalOpen(true);
  };

  const handleEditMeal = (meal: IMealWithFoods) => {
    setEditingMeal(meal);
    setModalOpen(true);
  };

  const handleConfirmMeal = async (
    mealName: string,
    foods: { id_detail: string; weight: number }[]
  ) => {
    if (!diary) {
      // Nessun diary per oggi: da implementare la selezione della fase
      // Per ora usa un placeholder
      await createDiaryWithMeal(
        String(expectedKcal),
        today,
        "fase_specific_id_placeholder",
        mealName,
        foods
      );
    } else {
      await createMeal(mealName, diary.id, foods);
    }
    // Ricarica il diary dopo la creazione
    getDiaryByDate(userId, today);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto w-full">
      <GiornataComponent
        date={new Date(today)}
        meals={meals}
        onAddMeal={handleAddMeal}
        onEditMeal={handleEditMeal}
      />

      <MacroSummary consumed={consumed} expected={{ ...expected, kcal: expectedKcal }} />

      {/* Segnaposto grafici futuri */}
      <div className="card text-center py-6 opacity-40">
        <p className="text-sm" style={{ color: "var(--color-foreground)" }}>
          Grafici — in sviluppo
        </p>
      </div>

      <MealModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        date={today}
        meal={editingMeal}
        onConfirm={handleConfirmMeal}
        loading={loadingCreate}
      />
    </div>
  );
}
