import { useState } from "react";
import { Modal } from "../atoms/Modal";
import { Button } from "../atoms/Button";
import AdvancedSelect from "../atoms/Select";
import { Spinner } from "../atoms/Spinner";
import { FoodSearchBar } from "../molecules/FoodSearchBar";
import { FoodRow } from "../molecules/FoodRow";
import type { IMealWithFoods, IJoinMealFood } from "../../types/meal.types";
import { useFoodSearch } from "../../utils/hooks/useFoodSearch";
import type { IFoodFull } from "../../types/food.types";

type MealModalProps = {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  meal?: IMealWithFoods;
  onConfirm: (mealName: string, foods: { id_detail: string; weight: number }[]) => void;
  loading?: boolean;
};

const MEAL_NAMES = ["Colazione", "Pranzo", "Cena", "Spuntino", "Pre-allenamento", "Post-allenamento"];

export function MealModal({ isOpen, onClose, date, meal, onConfirm, loading = false }: MealModalProps) {
  const [mealName, setMealName] = useState(meal?.meal_name ?? "");

  // Stato locale degli alimenti nel pasto con i loro pesi
  const [foods, setFoods] = useState<IJoinMealFood[]>(meal?.join_meal_food ?? []);

  const { results, search, setSearch, filters, setFilters, doSearch, loading: searchLoading } =
    useFoodSearch("full");

  const handleWeightChange = (id: string, weight: number) => {
    setFoods((prev) =>
      prev.map((f) => (f.id === id ? { ...f, weight } : f))
    );
  };

  // Aggiunge un dettaglio dalla ricerca al pasto
  const handleAddDetail = (food: IFoodFull, detailId: string) => {
    const det = food.dets.find((d) => d.id === detailId);
    if (!det) return;

    // Evita duplicati
    if (foods.some((f) => f.detail.id === detailId)) return;

    const newEntry: IJoinMealFood = {
      id: `temp_${crypto.randomUUID()}`,
      weight: 100,
      detail: det,
    };
    setFoods((prev) => [...prev, newEntry]);
  };

  const handleRemoveFood = (id: string) => {
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  const handleConfirm = () => {
    if (!mealName || foods.length === 0) return;
    onConfirm(
      mealName,
      foods.map((f) => ({ id_detail: f.detail.id, weight: f.weight }))
    );
    onClose();
  };

  const mealNameOptions = MEAL_NAMES.map((n) => ({ value: n, label: n }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={meal ? "Modifica pasto" : "Aggiungi pasto"}>
      <div className="flex flex-col gap-4">
        <p className="text-xs opacity-50" style={{ color: "var(--color-foreground)" }}>
          {new Date(date).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}
        </p>

        {/* Nome pasto */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
            Nome pasto
          </label>
          <AdvancedSelect
            options={mealNameOptions}
            value={mealName}
            onChange={(v) => setMealName(v as string)}
            placeholder="Seleziona..."
          />
        </div>

        {/* Ricerca alimento */}
        <div>
          <p className="text-xs font-medium mb-2 opacity-70" style={{ color: "var(--color-foreground)" }}>
            Cerca alimento
          </p>
          <FoodSearchBar
            search={search}
            onSearchChange={setSearch}
            onSearch={doSearch}
            filters={filters}
            onFilterChange={setFilters}
            loading={searchLoading}
          />
        </div>

        {/* Risultati ricerca */}
        {searchLoading && (
          <div className="flex justify-center py-2">
            <Spinner size="sm" />
          </div>
        )}

        {(results as IFoodFull[]).length > 0 && (
          <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
            {(results as IFoodFull[]).map((food) =>
              food.dets.map((det) => (
                <button
                  key={`${food.id}-${det.id}`}
                  type="button"
                  onClick={() => handleAddDetail(food, det.id)}
                  className="text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer hover:opacity-80"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                    color: "var(--color-foreground)",
                  }}
                >
                  <span className="font-medium">{food.food}</span>
                  {" — "}
                  <span className="opacity-70">{det.detail_product}</span>
                  {det.brand && <span className="opacity-50"> · {det.brand.name_brand}</span>}
                </button>
              ))
            )}
          </div>
        )}

        {/* Lista alimenti nel pasto */}
        {foods.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium opacity-70" style={{ color: "var(--color-foreground)" }}>
              Alimenti nel pasto
            </p>
            {foods.map((food) => (
              <div key={food.id} className="flex items-center gap-2">
                <div className="flex-1">
                  <FoodRow food={food} onWeightChange={handleWeightChange} />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFood(food.id)}
                  className="text-xs opacity-50 hover:opacity-100 cursor-pointer shrink-0"
                  style={{ color: "#ef4444" }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Bottone conferma */}
        <Button
          label={loading ? "Salvataggio..." : "Conferma pasto"}
          onClick={handleConfirm}
          disabled={!mealName || foods.length === 0 || loading}
          loading={loading}
          fullWidth
        />
      </div>
    </Modal>
  );
}
