import { useMutation } from "@apollo/client/react";
import { CREATE_RECIPE } from "../../gql_crud/recipes/mutations";

type RecipeDetailInput = {
  id_detail: string;
  amount_food_perc: number;
};

type CreateRecipeInput = {
  name_recipe: string;
  recipe_note?: string;
  id_subs: string[];
  details: RecipeDetailInput[];
  total_weight_raw: number;
  total_weight_cooked?: number;
  conversion_perc?: number;
};

export function useCreateRecipe() {
  const [createRecipeMutation, { loading, error }] = useMutation(CREATE_RECIPE);

  const createRecipe = (input: CreateRecipeInput) => {
    return createRecipeMutation({ variables: input });
  };

  return { createRecipe, loading, error };
}
