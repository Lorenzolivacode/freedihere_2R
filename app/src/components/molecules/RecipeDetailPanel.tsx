import { MacroBadgeGroup } from "./MacroBadgeGroup";
import { Spinner } from "../atoms/Spinner";
import type { IRecipe } from "../../types/recipe.types";

type RecipeDetailPanelProps = {
  recipe: IRecipe | null;
  loading?: boolean;
};

// Formatta numero decimale per la visualizzazione
const fmt = (v: number | null | undefined, dec = 1) =>
  v != null ? (Math.round(v * 10 ** dec) / 10 ** dec).toString() : "—";

export function RecipeDetailPanel({ recipe, loading = false }: RecipeDetailPanelProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!recipe) return null;

  const macro = recipe.macros[0] ?? null;

  return (
    <div className="flex flex-col gap-4">
      {/* Nome e note */}
      <div>
        <h2 className="text-lg font-bold" style={{ color: "var(--color-foreground)" }}>
          {recipe.name_recipe}
        </h2>
        {recipe.recipe_note && (
          <p className="text-sm mt-1 whitespace-pre-wrap opacity-70" style={{ color: "var(--color-foreground)" }}>
            {recipe.recipe_note}
          </p>
        )}
      </div>

      {/* Sottocategorie */}
      {recipe.join_subs.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {recipe.join_subs.map((js) => (
            <span
              key={js.id}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                color: "var(--color-foreground)",
              }}
            >
              {js.subs.subcategory_name}
            </span>
          ))}
        </div>
      )}

      {/* Macro aggregati */}
      {macro && (
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold opacity-60" style={{ color: "var(--color-foreground)" }}>
            Valori nutrizionali per 100g
            {macro.total_weight != null && ` · peso crudo totale: ${fmt(macro.total_weight, 0)}g`}
            {macro.conversion_perc != null &&
              ` · resa cottura: ${fmt(macro.conversion_perc, 0)}%`}
          </p>
          <MacroBadgeGroup macro={macro} />
        </div>
      )}

      {/* Ingredienti */}
      {recipe.join_details && recipe.join_details.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold opacity-60" style={{ color: "var(--color-foreground)" }}>
            Ingredienti
          </p>
          {recipe.join_details.map((jd) => {
            const perc = Math.round(jd.amount_food_perc ?? 0);
            const weightG =
              macro?.total_weight != null
                ? Math.round(((jd.amount_food_perc ?? 0) / 100) * macro.total_weight)
                : null;

            return (
              <div
                key={jd.id}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-foreground) 5%, transparent)" }}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--color-foreground)" }}>
                    {[jd.detail.food?.food, jd.detail.detail_product].filter(Boolean).join(", ")}
                  </p>
                  {jd.detail.brand && (
                    <p className="text-xs opacity-50" style={{ color: "var(--color-foreground)" }}>
                      {jd.detail.brand.name_brand}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                    {weightG != null ? `${weightG}g` : `${perc}%`}
                  </p>
                  {jd.detail.macro && (
                    <MacroBadgeGroup macro={jd.detail.macro} compact />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
