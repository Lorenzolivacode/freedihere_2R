import { ISubcategory, IMacro, IDetail } from "./food.types";

export interface IJoinDetailRecipe {
  id: string;
  amount_food_perc: number;
  detail: IDetail;
}

export interface IRecipe {
  id: string;
  name_recipe: string;
  recipe_note?: string | null;
  macros: IMacro[];
  join_subs: { id: string; subs: ISubcategory }[];
  join_details: IJoinDetailRecipe[];
}
