import { useQuery } from "@apollo/client/react";
import { GET_SUBCATEGORIES } from "../../gql_crud/cats_subs/queries";
import type { AdvancedSelectOption } from "../../components/atoms/Select";

type SubcategoryRaw = {
  id: string;
  subcategory_name: string;
};

export function useSubcategories() {
  const { data, loading, error } = useQuery<{ getSubcategories: SubcategoryRaw[] }>(
    GET_SUBCATEGORIES
  );

  const subcategories = data?.getSubcategories ?? [];

  const subOptions: AdvancedSelectOption[] = subcategories.map((s) => ({
    value: s.id,
    label: s.subcategory_name,
  }));

  return { subOptions, loading, error };
}
