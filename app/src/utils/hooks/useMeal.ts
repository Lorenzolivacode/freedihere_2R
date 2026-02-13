import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_MEALS_BY_DIARY } from "../../gql_crud/meals/queries";
import { CREATE_MEAL, CREATE_DIARY_WITH_MEAL } from "../../gql_crud/meals/mutations";
import type { IMealWithFoods } from "../../types/meal.types";

type MealFoodInput = {
  id_detail: string;
  weight: number;
};

// Hook per gestire i pasti di un diary
export function useMeal() {
  const [fetchMeals, { loading: loadingMeals, data: mealsData }] =
    useLazyQuery<{ meals: IMealWithFoods[] }>(GET_MEALS_BY_DIARY);

  const [createMealMutation, { loading: loadingCreate }] =
    useMutation(CREATE_MEAL);

  const [createDiaryWithMealMutation, { loading: loadingCreateDiary }] =
    useMutation(CREATE_DIARY_WITH_MEAL);

  const getMealsByDiary = (id_diary: string) => {
    fetchMeals({ variables: { id_diary } });
  };

  const createMeal = (
    meal_name: string,
    id_diary: string,
    foods: MealFoodInput[]
  ) => {
    const snapshot = JSON.stringify(foods);
    return createMealMutation({
      variables: {
        meal_name,
        mealSnapshot: snapshot,
        id_diary,
        mealFood: foods,
      },
    });
  };

  const createDiaryWithMeal = (
    aspected_kcal: string,
    day: string,
    id_fase_specific: string,
    meal_name: string,
    foods: MealFoodInput[]
  ) => {
    const snapshot = JSON.stringify(foods);
    return createDiaryWithMealMutation({
      variables: {
        aspected_kcal,
        day,
        id_fase_specific,
        meal_name,
        mealSnapshot: snapshot,
        mealFood: foods,
      },
    });
  };

  return {
    meals: mealsData?.meals ?? [],
    loadingMeals,
    loadingCreate: loadingCreate || loadingCreateDiary,
    getMealsByDiary,
    createMeal,
    createDiaryWithMeal,
  };
}
