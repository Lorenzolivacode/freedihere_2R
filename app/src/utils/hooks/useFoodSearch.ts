import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_FOODS_BY_INPUT } from "../../gql_crud/foods_dets/queries";
import { GET_FOODS_BY_FULL_NAME } from "../../gql_crud/foods_dets/queries";
import type { IFoodSearchResult, IFoodFull } from "../../types/food.types";

type SearchFilters = {
  id_sub?: string;
  id_brand?: string;
  id_shop?: string;
};

// Hook per la ricerca alimenti: modalità semplice (getFoodsByInput) o completa (getFoodsByFullName)
export function useFoodSearch(mode: "simple" | "full" = "simple") {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});

  const [searchSimple, { loading: loadingSimple, data: dataSimple }] =
    useLazyQuery<{ getFoodsByInput: IFoodSearchResult[] }>(GET_FOODS_BY_INPUT);

  const [searchFull, { loading: loadingFull, data: dataFull }] =
    useLazyQuery<{ getFoodsByFullName: IFoodFull[] }>(GET_FOODS_BY_FULL_NAME);

  const doSearch = (input?: string, overrideFilters?: SearchFilters) => {
    const query = input ?? search;
    const activeFilters = overrideFilters ?? filters;

    if (!query.trim()) return;

    if (mode === "simple") {
      searchSimple({ variables: { input: query } });
    } else {
      searchFull({
        variables: {
          input: query,
          id_sub: activeFilters.id_sub || undefined,
          id_brand: activeFilters.id_brand || undefined,
          id_shop: activeFilters.id_shop || undefined,
        },
      });
    }
  };

  const results: IFoodSearchResult[] | IFoodFull[] =
    mode === "simple"
      ? (dataSimple?.getFoodsByInput ?? [])
      : (dataFull?.getFoodsByFullName ?? []);

  const loading = mode === "simple" ? loadingSimple : loadingFull;

  return { results, search, setSearch, filters, setFilters, doSearch, loading };
}
