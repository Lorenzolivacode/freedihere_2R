import { useState } from "react";
import { FoodSearchBar } from "../molecules/FoodSearchBar";
import { FoodDetailPanel } from "../molecules/FoodDetailPanel";
import { RecipeDetailPanel } from "../molecules/RecipeDetailPanel";
import { Modal } from "../atoms/Modal";
import { Button } from "../atoms/Button";
import { Spinner } from "../atoms/Spinner";
import { CreateFoodForm } from "./CreateFoodForm";
import { CreateRecipeForm } from "./CreateRecipeForm";
import { useFoodSearch } from "../../utils/hooks/useFoodSearch";
import { useRecipeSearch } from "../../utils/hooks/useRecipeSearch";
import type { IFoodFull } from "../../types/food.types";

type FoodsTab = "search" | "create_food" | "create_recipe" | "search_recipe";

export function Foods() {
  const [activeTab, setActiveTab] = useState<FoodsTab>("search");
  const [selectedFood, setSelectedFood] = useState<IFoodFull | null>(null);
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);

  const {
    results,
    search,
    setSearch,
    filters,
    setFilters,
    doSearch,
    loading,
  } = useFoodSearch("full");

  const {
    search: recipeSearch,
    setSearch: setRecipeSearch,
    results: recipeResults,
    loading: recipeLoading,
    doSearch: doRecipeSearch,
    loadDetail,
    selectedRecipe,
    detailLoading,
  } = useRecipeSearch();

  const tabs: { key: FoodsTab; label: string }[] = [
    { key: "search", label: "Cerca alimento" },
    { key: "search_recipe", label: "Cerca ricetta" },
    { key: "create_food", label: "Crea alimento" },
    { key: "create_recipe", label: "Crea ricetta" },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
      <h1 className="section-title">Alimenti & Ricette</h1>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
            style={{
              backgroundColor:
                activeTab === tab.key
                  ? "var(--color-primary)"
                  : "color-mix(in srgb, var(--color-foreground) 8%, transparent)",
              color: activeTab === tab.key ? "var(--color-black)" : "var(--color-foreground)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Cerca alimento */}
      {activeTab === "search" && (
        <div className="flex flex-col gap-3">
          <FoodSearchBar
            search={search}
            onSearchChange={setSearch}
            onSearch={doSearch}
            filters={filters}
            onFilterChange={setFilters}
            loading={loading}
          />

          {loading && (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          )}

          {!loading && (results as IFoodFull[]).length === 0 && search && (
            <div className="card text-center py-6 opacity-40">
              <p className="text-sm" style={{ color: "var(--color-foreground)" }}>
                Nessun alimento trovato
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {(results as IFoodFull[]).map((food) => (
              <div key={food.id} className="card flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--color-foreground)" }}>
                    {food.food}
                  </p>
                  {food.subcategory && (
                    <p className="text-xs opacity-50 truncate" style={{ color: "var(--color-foreground)" }}>
                      {food.subcategory.subcategory_name}
                    </p>
                  )}
                  <p className="text-xs opacity-50" style={{ color: "var(--color-foreground)" }}>
                    {food.dets.length} varianti
                  </p>
                </div>
                <Button
                  label="Dettaglio"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedFood(food)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Cerca ricetta */}
      {activeTab === "search_recipe" && (
        <div className="flex flex-col gap-3">
          {/* Barra di ricerca — senza filtri brand/shop */}
          <div className="flex gap-2">
            <input
              type="text"
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doRecipeSearch()}
              placeholder="Cerca ricetta..."
              className="input-base flex-1"
            />
            <Button label="Cerca" onClick={doRecipeSearch} size="sm" />
          </div>

          {recipeLoading && (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          )}

          {!recipeLoading && recipeResults.length === 0 && recipeSearch && (
            <div className="card text-center py-6 opacity-40">
              <p className="text-sm" style={{ color: "var(--color-foreground)" }}>
                Nessuna ricetta trovata
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {recipeResults.map((recipe) => {
              const macro = recipe.macros[0] ?? null;
              return (
                <div key={recipe.id} className="card flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--color-foreground)" }}>
                      {recipe.name_recipe}
                    </p>
                    {recipe.join_subs.length > 0 && (
                      <p className="text-xs opacity-50 truncate" style={{ color: "var(--color-foreground)" }}>
                        {recipe.join_subs.map((js) => js.subs.subcategory_name).join(", ")}
                      </p>
                    )}
                    {macro && (
                      <p className="text-xs opacity-50" style={{ color: "var(--color-foreground)" }}>
                        {Math.round(macro.kcal)} kcal · {Math.round(macro.proteins)}g prot
                      </p>
                    )}
                  </div>
                  <Button
                    label="Dettaglio"
                    variant="secondary"
                    size="sm"
                    onClick={() => { loadDetail(recipe.id); setRecipeModalOpen(true); }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Crea alimento */}
      {activeTab === "create_food" && <CreateFoodForm />}

      {/* Tab: Crea ricetta */}
      {activeTab === "create_recipe" && <CreateRecipeForm />}

      {/* Modale dettaglio alimento */}
      <Modal
        isOpen={!!selectedFood}
        onClose={() => setSelectedFood(null)}
        title="Dettaglio alimento"
      >
        {selectedFood && <FoodDetailPanel food={selectedFood} />}
      </Modal>

      {/* Modale dettaglio ricetta */}
      <Modal
        isOpen={recipeModalOpen}
        onClose={() => setRecipeModalOpen(false)}
        title="Dettaglio ricetta"
      >
        <RecipeDetailPanel recipe={selectedRecipe} loading={detailLoading} />
      </Modal>
    </div>
  );
}
