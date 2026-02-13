import { Badge } from "../atoms/Badge";
import type { IMacro } from "../../types/food.types";

type MacroBadgeGroupProps = {
  macro: IMacro;
  compact?: boolean;
};

// Arrotonda a 1 decimale per la visualizzazione
const fmt = (v: number | null | undefined) =>
  v != null ? Math.round(v * 10) / 10 : null;

export function MacroBadgeGroup({ macro, compact = false }: MacroBadgeGroupProps) {
  const fiber = fmt(macro.fiber);
  const salt = fmt(macro.salt);

  return (
    <div className={`flex flex-wrap gap-1 ${compact ? "" : "mt-1"}`}>
      <Badge label="kcal" value={fmt(macro.kcal) ?? 0} type="kcal" />
      <Badge label="g" value={fmt(macro.fat) ?? 0} type="fat" />
      <Badge label="g" value={fmt(macro.carbo) ?? 0} type="carbo" />
      <Badge label="g" value={fmt(macro.proteins) ?? 0} type="prot" />
      {!compact && (
        <>
          <Badge label="g" value={fmt(macro.sat_fat) ?? 0} type="sat_fat" />
          <Badge label="g" value={fmt(macro.sugar) ?? 0} type="sugar" />
          {fiber != null && <Badge label="g" value={fiber} type="fiber" />}
          {salt != null && <Badge label="g" value={salt} type="salt" />}
        </>
      )}
    </div>
  );
}
