import { IMealWithFoods } from "./meal.types";

export interface IFaseSpecifics {
  id: string;
  deltaKcal_perc: number;
  fat_perc: number;
  sat_fat_perc: number;
  carbo_perc: number;
  sugar_perc: number;
  fiber_perc: number;
  proteins_perc: number;
  salt_perc: number;
  validFrom: string;
  validTo?: string | null;
}

export interface IFaseUser {
  id: string;
  fase_name: string;
  multiply_perc: number;
  fase_specifics: IFaseSpecifics[];
}

export interface IDiaryUser {
  id: string;
  aspected_kcal: number;
  day: string;
  meals: IMealWithFoods[];
  fase_specific: IFaseSpecifics;
}
