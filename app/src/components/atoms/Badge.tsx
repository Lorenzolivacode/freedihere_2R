type MacroType = "kcal" | "fat" | "sat_fat" | "carbo" | "sugar" | "fiber" | "prot" | "salt";

type BadgeProps = {
  label: string;
  value: string | number;
  type: MacroType;
};

export function Badge({ label, value, type }: BadgeProps) {
  return (
    <span className={`badge-macro badge-${type}`}>
      <span className="opacity-70">{label}</span>
      <span>{value}</span>
    </span>
  );
}
