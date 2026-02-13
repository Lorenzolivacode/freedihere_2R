import { Button } from "../atoms/Button";
import { MealCard } from "./MealCard";
import type { IMealWithFoods } from "../../types/meal.types";

type GiornataComponentProps = {
  date: Date;
  meals: IMealWithFoods[];
  onEditMeal: (meal: IMealWithFoods) => void;
  onAddMeal: () => void;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function GiornataComponent({
  date,
  meals,
  onEditMeal,
  onAddMeal,
}: GiornataComponentProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold capitalize" style={{ color: "var(--color-foreground)" }}>
          {formatDate(date)}
        </h2>
        <Button label="+ Pasto" onClick={onAddMeal} variant="primary" size="sm" />
      </div>

      {meals.length === 0 ? (
        <div className="card text-center py-6">
          <p className="text-sm opacity-50" style={{ color: "var(--color-foreground)" }}>
            Nessun pasto registrato per questo giorno
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onClick={() => onEditMeal(meal)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
