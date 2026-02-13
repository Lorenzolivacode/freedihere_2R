import { useQuery } from "@apollo/client/react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import AdvancedSelect from "../atoms/Select";
import { GET_SUBCATEGORIES } from "../../gql_crud/cats_subs/queries";
import { GET_BRANDS, GET_SHOPS } from "../../gql_crud/brands_shop/queries";

type SearchFilters = {
  id_sub?: string;
  id_brand?: string;
  id_shop?: string;
};

type FoodSearchBarProps = {
  search: string;
  onSearchChange: (v: string) => void;
  onSearch: () => void;
  filters: SearchFilters;
  onFilterChange: (f: SearchFilters) => void;
  loading?: boolean;
  hideBrandShop?: boolean;
};

function SelectWithLabel({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium" style={{ color: "var(--color-foreground)", opacity: 0.7 }}>
        {label}
      </label>
      <AdvancedSelect
        options={options}
        value={value}
        placeholder={placeholder}
        clearable
        onChange={(v) => onChange(v as string)}
      />
    </div>
  );
}

export function FoodSearchBar({
  search,
  onSearchChange,
  onSearch,
  filters,
  onFilterChange,
  loading = false,
  hideBrandShop = false,
}: FoodSearchBarProps) {
  const { data: subsData } = useQuery<{ getSubcategories: { id: string; subcategory_name: string }[] }>(GET_SUBCATEGORIES);
  const { data: brandsData } = useQuery<{ getBrands: { id: string; name_brand: string }[] }>(GET_BRANDS, { skip: hideBrandShop });
  const { data: shopsData } = useQuery<{ getShops: { id: string; name_shop: string }[] }>(GET_SHOPS, { skip: hideBrandShop });

  const subOptions = (subsData?.getSubcategories ?? []).map((s) => ({ value: s.id, label: s.subcategory_name }));
  const brandOptions = (brandsData?.getBrands ?? []).map((b) => ({ value: b.id, label: b.name_brand }));
  const shopOptions = (shopsData?.getShops ?? []).map((s) => ({ value: s.id, label: s.name_shop }));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1" onKeyDown={handleKey}>
          <Input value={search} onChange={onSearchChange} placeholder="Cerca alimento..." />
        </div>
        <Button label="Cerca" onClick={onSearch} loading={loading} />
      </div>

      <div className={`grid gap-2 ${hideBrandShop ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"}`}>
        <SelectWithLabel
          label="Sottocategoria"
          value={filters.id_sub ?? ""}
          onChange={(v) => onFilterChange({ ...filters, id_sub: v || undefined })}
          options={subOptions}
          placeholder="Tutte le sottocategorie"
        />
        {!hideBrandShop && (
          <>
            <SelectWithLabel
              label="Brand"
              value={filters.id_brand ?? ""}
              onChange={(v) => onFilterChange({ ...filters, id_brand: v || undefined })}
              options={brandOptions}
              placeholder="Tutti i brand"
            />
            <SelectWithLabel
              label="Shop"
              value={filters.id_shop ?? ""}
              onChange={(v) => onFilterChange({ ...filters, id_shop: v || undefined })}
              options={shopOptions}
              placeholder="Tutti gli shop"
            />
          </>
        )}
      </div>
    </div>
  );
}
