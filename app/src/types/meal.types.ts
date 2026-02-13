import { IDetail } from "./food.types";

export interface IJoinMealFood {
  id: string;
  weight: number;
  detail: IDetail;
  // recipe è opzionale (può essere un alimento o una ricetta)
  recipe?: { id: string; name_recipe: string } | null;
}

export interface IMeal {
  id: string;
  meal_name: string;
  mealSnapshot: unknown;
}

export interface IMealWithFoods extends IMeal {
  join_meal_food: IJoinMealFood[];
}
