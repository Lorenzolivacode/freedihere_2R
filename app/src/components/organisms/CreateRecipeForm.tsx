import { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Toggle } from "../atoms/Toggle";
import { Notification } from "../atoms/Notification";
import { FoodSearchBar } from "../molecules/FoodSearchBar";
import { FoodRow } from "../molecules/FoodRow";
import { useCreateRecipe } from "../../utils/hooks/useCreateRecipe";
import { useFoodSearch } from "../../utils/hooks/useFoodSearch";
import { useSubcategories } from "../../utils/hooks/useSubcategories";
import type { IJoinMealFood } from "../../types/meal.types";
import type { IFoodFull } from "../../types/food.types";
import AdvancedSelect from "../atoms/Select";

export function CreateRecipeForm() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [isCotto, setIsCotto] = useState(false);
  const [weightCotto, setWeightCotto] = useState("");
  const [ingredients, setIngredients] = useState<IJoinMealFood[]>([]);
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const { createRecipe, loading } = useCreateRecipe();
  const { results, search, setSearch, filters, setFilters, doSearch, loading: searchLoading } = useFoodSearch("full");
  const { subOptions } = useSubcategories();

  // Somma pesi crudi di tutti gli ingredienti
  const totalWeightRaw = ingredients.reduce((sum, i) => sum + i.weight, 0);

  const handleAddDetail = (food: IFoodFull, detailId: string) => {
    const det = food.dets.find((d) => d.id === detailId);
    if (!det || ingredients.some((i) => i.detail.id === detailId)) return;
    setIngredients((prev) => [...prev, { id: `temp_${Date.now()}`, weight: 100, detail: det }]);
  };

  const handleWeightChange = (id: string, weight: number) => {
    setIngredients((prev) => prev.map((i) => (i.id === id ? { ...i, weight } : i)));
  };

  const handleRemove = (id: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCreate = async () => {
    if (!name || ingredients.length === 0) return;

    const weightCottoNum = parseFloat(weightCotto) || undefined;
    const conversionPerc =
      totalWeightRaw > 0 && weightCottoNum ? (weightCottoNum / totalWeightRaw) * 100 : undefined;

    try {
      await createRecipe({
        name_recipe: name,
        recipe_note: note || undefined,
        id_subs: selectedSubs,
        details: ingredients.map((i) => ({
          id_detail: i.detail.id,
          // percentuale: peso ingrediente / peso crudo totale × 100
          amount_food_perc: totalWeightRaw > 0 ? (i.weight / totalWeightRaw) * 100 : 0,
        })),
        total_weight_raw: totalWeightRaw,
        total_weight_cooked: weightCottoNum,
        conversion_perc: conversionPerc,
      });
      setName(""); setNote(""); setSelectedSubs([]); setIngredients([]);
      setIsCotto(false); setWeightCotto("");
      setNotification({ msg: "Ricetta creata con successo!", type: "success" });
    } catch {
      setNotification({ msg: "Errore nella creazione della ricetta", type: "error" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {notification && (
        <Notification message={notification.msg} type={notification.type} onDismiss={() => setNotification(null)} />
      )}

      <Input label="Nome ricetta *" value={name} onChange={setName} placeholder="es. Pasta al tonno" />
      <Input label="Note / Procedimento" value={note} onChange={setNote} placeholder="..." />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium opacity-70" style={{ color: "var(--color-foreground)" }}>
          Sottocategorie
        </label>
        <AdvancedSelect
          options={subOptions}
          value={selectedSubs}
          multiple
          clearable
          placeholder="Seleziona sottocategorie..."
          onChange={(v) => setSelectedSubs(v as string[])}
        />
      </div>

      <div>
        <p className="text-xs font-medium mb-2 opacity-70" style={{ color: "var(--color-foreground)" }}>
          Aggiungi ingredienti
        </p>
        <FoodSearchBar
          search={search}
          onSearchChange={setSearch}
          onSearch={doSearch}
          filters={filters}
          onFilterChange={setFilters}
          loading={searchLoading}
          hideBrandShop
        />
      </div>

      {(results as IFoodFull[]).length > 0 && (
        <div className="max-h-40 overflow-y-auto flex flex-col gap-1">
          {(results as IFoodFull[]).map((food) =>
            food.dets.map((det) => (
              <button
                key={`${food.id}-${det.id}`}
                type="button"
                onClick={() => handleAddDetail(food, det.id)}
                className="text-left px-3 py-2 rounded-lg text-sm cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                  color: "var(--color-foreground)",
                }}
              >
                {food.food} — {det.detail_product}
              </button>
            ))
          )}
        </div>
      )}

      {ingredients.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium opacity-70" style={{ color: "var(--color-foreground)" }}>
            Ingredienti — peso crudo totale: {totalWeightRaw}g
          </p>
          {ingredients.map((ing) => (
            <div key={ing.id} className="flex items-center gap-2">
              <div className="flex-1">
                <FoodRow food={ing} onWeightChange={handleWeightChange} />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(ing.id)}
                className="text-xs opacity-50 hover:opacity-100 cursor-pointer shrink-0"
                style={{ color: "#ef4444" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <Toggle value={isCotto} onChange={setIsCotto} label="Inserisci peso a cotto" />

      {isCotto && (
        <Input
          label="Peso a cotto (g)"
          value={weightCotto}
          onChange={setWeightCotto}
          type="number"
          placeholder="0"
        />
      )}

      <Button
        label={loading ? "Creazione..." : "Crea ricetta"}
        onClick={handleCreate}
        loading={loading}
        disabled={!name || ingredients.length === 0}
        fullWidth
      />
    </div>
  );
}
