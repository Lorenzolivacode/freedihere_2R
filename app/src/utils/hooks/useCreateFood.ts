import { useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import { CREATE_FOOD_DETS } from "../../gql_crud/foods_dets/mutations";
import { GET_FOODS_BY_FULL_NAME } from "../../gql_crud/foods_dets/queries";
import type { IFoodFull } from "../../types/food.types";

type CreateFoodInput = {
  food: string;
  food_note?: string;
  id_sub: string;
  detail_product: string;
  note?: string;
  id_brand?: string;
  join_shops?: string[];
  kcal: number;
  fat: number;
  sat_fat: number;
  carbo: number;
  sugar: number;
  fiber: number;
  proteins: number;
  salt: number;
  unity_weights?: number[];
};

// Hook per la creazione alimento con controllo duplicati tramite getFoodsByFullName
export function useCreateFood() {
  const [duplicates, setDuplicates] = useState<IFoodFull[]>([]);

  const [createFoodMutation, { loading: loadingCreate, error }] =
    useMutation(CREATE_FOOD_DETS);

  const [checkDuplicates, { loading: loadingCheck }] =
    useLazyQuery<{ getFoodsByFullName: IFoodFull[] }>(GET_FOODS_BY_FULL_NAME);

  // Controlla se esiste già un alimento con nome e sottocategoria simili
  const checkForDuplicates = async (foodName: string, id_sub?: string): Promise<IFoodFull[]> => {
    const result = await checkDuplicates({
      variables: { input: foodName, id_sub: id_sub || undefined },
    });
    const found = result.data?.getFoodsByFullName ?? [];
    setDuplicates(found);
    return found;
  };

  const createFood = async (input: CreateFoodInput) => {
    return createFoodMutation({
      variables: {
        ...input,
        unity_weights: input.unity_weights ?? [],
        join_shops: input.join_shops ?? [],
      },
    });
  };

  return {
    createFood,
    checkForDuplicates,
    duplicates,
    loading: loadingCreate || loadingCheck,
    error,
  };
}
