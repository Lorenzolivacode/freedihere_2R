import type { IFoodFull, IDetail } from "../../types/food.types";
import { MacroBadgeGroup } from "./MacroBadgeGroup";

type FoodDetailPanelProps = {
  food: IFoodFull;
};

function DetailSection({ detail }: { detail: IDetail }) {
  return (
    <div className="card mb-2">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
            {detail.detail_product}
          </p>
          {detail.detail_note && (
            <p className="text-xs opacity-60 mt-0.5" style={{ color: "var(--color-foreground)" }}>
              {detail.detail_note}
            </p>
          )}
        </div>
        {detail.brand && (
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)", color: "var(--color-primary)" }}
          >
            {detail.brand.name_brand}
          </span>
        )}
      </div>

      {detail.macro && <MacroBadgeGroup macro={detail.macro} />}

      {detail.join_shops.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {detail.join_shops.map((js) => (
            <span
              key={js.id}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-foreground) 8%, transparent)", color: "var(--color-foreground)" }}
            >
              {js.shop.name_shop}
            </span>
          ))}
        </div>
      )}

      {detail.specifics.length > 0 && (
        <div className="mt-2">
          <p className="text-xs opacity-50 mb-1" style={{ color: "var(--color-foreground)" }}>
            Porzioni:
          </p>
          <div className="flex flex-wrap gap-1">
            {detail.specifics.map((sp) => (
              <span
                key={sp.id}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary) 20%, transparent)", color: "var(--color-foreground)" }}
              >
                {sp.unity_weight}g
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function FoodDetailPanel({ food }: FoodDetailPanelProps) {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg font-bold" style={{ color: "var(--color-foreground)" }}>
          {food.food}
        </h2>
        {food.food_note && (
          <p className="text-sm opacity-60 mt-1" style={{ color: "var(--color-foreground)" }}>
            {food.food_note}
          </p>
        )}
        {food.subcategory && (
          <span
            className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)", color: "var(--color-primary)" }}
          >
            {food.subcategory.subcategory_name}
          </span>
        )}
      </div>

      {food.dets.length === 0 ? (
        <p className="text-sm opacity-50" style={{ color: "var(--color-foreground)" }}>
          Nessun dettaglio disponibile
        </p>
      ) : (
        food.dets.map((det) => <DetailSection key={det.id} detail={det} />)
      )}
    </div>
  );
}
