import { useState } from "react";
import { Input } from "../atoms/Input";
import AdvancedSelect from "../atoms/Select";
import { Button } from "../atoms/Button";
import { Notification } from "../atoms/Notification";
import { useCreateFood } from "../../utils/hooks/useCreateFood";
import { useQuery } from "@apollo/client/react";
import { GET_SUBCATEGORIES } from "../../gql_crud/cats_subs/queries";
import { GET_BRANDS } from "../../gql_crud/brands_shop/queries";
import { GET_SHOPS } from "../../gql_crud/brands_shop/queries";

type FormState = {
  food: string;
  food_note: string;
  id_sub: string;
  detail_product: string;
  note: string;
  id_brand: string;
  join_shops: string;
  kcal: string;
  fat: string;
  sat_fat: string;
  carbo: string;
  sugar: string;
  fiber: string;
  proteins: string;
  salt: string;
  unity_weights: string;
};

const emptyForm: FormState = {
  food: "",
  food_note: "",
  id_sub: "",
  detail_product: "",
  note: "",
  id_brand: "",
  join_shops: "",
  kcal: "",
  fat: "",
  sat_fat: "",
  carbo: "",
  sugar: "",
  fiber: "",
  proteins: "",
  salt: "",
  unity_weights: "",
};

type AccordionSection = "food" | "detail" | "macro" | "specifics";

// Componente estratto fuori dal render per evitare re-creazione ad ogni render
function AccordionHeader({
  section,
  label,
  open,
  onToggle,
}: {
  section: AccordionSection;
  label: string;
  open: AccordionSection;
  onToggle: (s: AccordionSection) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(section)}
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-sm cursor-pointer transition-colors"
      style={{
        backgroundColor:
          open === section
            ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
            : "color-mix(in srgb, var(--color-foreground) 5%, transparent)",
        color: "var(--color-foreground)",
      }}
    >
      <span>{label}</span>
      <span>{open === section ? "▲" : "▼"}</span>
    </button>
  );
}

export function CreateFoodForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [open, setOpen] = useState<AccordionSection>("food");
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const { createFood, checkForDuplicates, duplicates, loading } = useCreateFood();

  const { data: subsData } = useQuery<{ getSubcategories: { id: string; subcategory_name: string }[] }>(GET_SUBCATEGORIES);
  const { data: brandsData } = useQuery<{ getBrands: { id: string; name_brand: string }[] }>(GET_BRANDS);
  const { data: shopsData } = useQuery<{ getShops: { id: string; name_shop: string }[] }>(GET_SHOPS);

  const subOptions = (subsData?.getSubcategories ?? []).map((s) => ({ value: s.id, label: s.subcategory_name }));
  const brandOptions = (brandsData?.getBrands ?? []).map((b) => ({ value: b.id, label: b.name_brand }));
  const shopOptions = (shopsData?.getShops ?? []).map((s) => ({ value: s.id, label: s.name_shop }));

  const set = (key: keyof FormState) => (v: string) => setForm((p) => ({ ...p, [key]: v }));

  const handleCheckDuplicates = async () => {
    if (!form.food) return;
    const found = await checkForDuplicates(form.food, form.id_sub || undefined);
    if (found.length > 0) setDuplicateWarning(true);
  };

  const handleSubmit = async () => {
    if (!form.food || !form.id_sub || !form.detail_product || !form.kcal) return;

    try {
      await createFood({
        food: form.food,
        food_note: form.food_note || undefined,
        id_sub: form.id_sub,
        detail_product: form.detail_product,
        note: form.note || undefined,
        id_brand: form.id_brand || undefined,
        join_shops: form.join_shops ? form.join_shops.split(",").map((s) => s.trim()) : [],
        kcal: parseFloat(form.kcal),
        fat: parseFloat(form.fat),
        sat_fat: parseFloat(form.sat_fat),
        carbo: parseFloat(form.carbo),
        sugar: parseFloat(form.sugar),
        fiber: parseFloat(form.fiber),
        proteins: parseFloat(form.proteins),
        salt: parseFloat(form.salt),
        unity_weights: form.unity_weights
          ? form.unity_weights.split(",").map((n) => parseFloat(n.trim()))
          : [],
      });
      setForm(emptyForm);
      setNotification({ msg: "Alimento creato con successo!", type: "success" });
    } catch {
      setNotification({ msg: "Errore nella creazione dell'alimento", type: "error" });
    }
  };

  const handleToggle = (section: AccordionSection) => {
    setOpen((prev) => (prev === section ? "food" : section));
  };

  return (
    <div className="flex flex-col gap-3">
      {notification && (
        <Notification
          message={notification.msg}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}

      {/* Duplicati */}
      {duplicateWarning && duplicates.length > 0 && (
        <div className="card" style={{ borderColor: "var(--color-secondary)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-secondary)" }}>
            ⚠ Trovati {duplicates.length} alimenti simili:
          </p>
          {duplicates.slice(0, 3).map((d) => (
            <p key={d.id} className="text-xs opacity-70" style={{ color: "var(--color-foreground)" }}>
              • {d.food} {d.food_note ? `(${d.food_note})` : ""}
            </p>
          ))}
          <Button
            label="Ignora e continua"
            variant="ghost"
            size="sm"
            onClick={() => setDuplicateWarning(false)}
          />
        </div>
      )}

      {/* SEZIONE 1: Alimento */}
      <AccordionHeader section="food" label="1. Alimento" open={open} onToggle={handleToggle} />
      {open === "food" && (
        <div className="flex flex-col gap-3 px-1">
          <Input label="Nome alimento *" value={form.food} onChange={set("food")} placeholder="es. Petto di pollo" />
          <Input label="Nota alimento" value={form.food_note} onChange={set("food_note")} placeholder="es. crudo, cotto..." />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>Sottocategoria *</label>
            <AdvancedSelect options={subOptions} value={form.id_sub} onChange={(v) => set("id_sub")(v as string)} placeholder="Seleziona..." clearable />
          </div>
          <Button label="Controlla duplicati" variant="secondary" size="sm" onClick={handleCheckDuplicates} />
          <Button label="Avanti →" onClick={() => setOpen("detail")} disabled={!form.food || !form.id_sub} />
        </div>
      )}

      {/* SEZIONE 2: Dettaglio */}
      <AccordionHeader section="detail" label="2. Dettaglio prodotto" open={open} onToggle={handleToggle} />
      {open === "detail" && (
        <div className="flex flex-col gap-3 px-1">
          <Input label="Descrizione prodotto *" value={form.detail_product} onChange={set("detail_product")} placeholder="es. Conad Bio 100g" />
          <Input label="Note dettaglio" value={form.note} onChange={set("note")} />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>Brand</label>
            <AdvancedSelect options={brandOptions} value={form.id_brand} onChange={(v) => set("id_brand")(v as string)} placeholder="Nessun brand" clearable />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>Shop</label>
            <AdvancedSelect options={shopOptions} value={form.join_shops} onChange={(v) => set("join_shops")(v as string)} placeholder="Nessuno shop" clearable />
          </div>
          <Button label="Avanti →" onClick={() => setOpen("macro")} disabled={!form.detail_product} />
        </div>
      )}

      {/* SEZIONE 3: Macro */}
      <AccordionHeader section="macro" label="3. Valori nutrizionali (per 100g)" open={open} onToggle={handleToggle} />
      {open === "macro" && (
        <div className="flex flex-col gap-3 px-1">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Kcal *" value={form.kcal} onChange={set("kcal")} type="number" placeholder="0" />
            <Input label="Grassi (g) *" value={form.fat} onChange={set("fat")} type="number" placeholder="0" />
            <Input label="di cui saturi (g)" value={form.sat_fat} onChange={set("sat_fat")} type="number" placeholder="0" />
            <Input label="Carboidrati (g) *" value={form.carbo} onChange={set("carbo")} type="number" placeholder="0" />
            <Input label="di cui zuccheri (g)" value={form.sugar} onChange={set("sugar")} type="number" placeholder="0" />
            <Input label="Fibre (g)" value={form.fiber} onChange={set("fiber")} type="number" placeholder="0" />
            <Input label="Proteine (g) *" value={form.proteins} onChange={set("proteins")} type="number" placeholder="0" />
            <Input label="Sale (g)" value={form.salt} onChange={set("salt")} type="number" placeholder="0" />
          </div>
          <Button label="Avanti →" onClick={() => setOpen("specifics")} disabled={!form.kcal} />
        </div>
      )}

      {/* SEZIONE 4: Specifiche */}
      <AccordionHeader section="specifics" label="4. Pesi unitari (opzionale)" open={open} onToggle={handleToggle} />
      {open === "specifics" && (
        <div className="flex flex-col gap-3 px-1">
          <Input
            label="Pesi separati da virgola (es. 100, 250, 500)"
            value={form.unity_weights}
            onChange={set("unity_weights")}
            placeholder="100, 250"
          />
          <Button
            label={loading ? "Creazione..." : "Crea alimento"}
            onClick={handleSubmit}
            loading={loading}
            fullWidth
          />
        </div>
      )}
    </div>
  );
}
