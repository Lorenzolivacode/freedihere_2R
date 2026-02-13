import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_RECIPES_BY_INPUT, GET_RECIPE_DETAILS } from "../../gql_crud/recipes/queries";
import type { IRecipe } from "../../types/recipe.types";

export function useRecipeSearch() {
  const [search, setSearch] = useState("");

  const [doSearchQuery, { data, loading }] = useLazyQuery<{
    getRecipesByInput: IRecipe[];
  }>(GET_RECIPES_BY_INPUT);

  const [fetchDetail, { data: detailData, loading: detailLoading }] = useLazyQuery<{
    getRecipeById: IRecipe | null;
  }>(GET_RECIPE_DETAILS);

  const results: IRecipe[] = data?.getRecipesByInput ?? [];
  const selectedRecipe: IRecipe | null = detailData?.getRecipeById ?? null;

  const doSearch = () => {
    if (!search.trim()) return;
    doSearchQuery({ variables: { input: search.trim() } });
  };

  const loadDetail = (id: string) => {
    fetchDetail({ variables: { id } });
  };

  return { search, setSearch, results, loading, doSearch, loadDetail, selectedRecipe, detailLoading };
}
