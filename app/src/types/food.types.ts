export interface IMacro {
  id: string;
  kcal: number;
  fat: number;
  sat_fat: number;
  carbo: number;
  sugar: number;
  fiber?: number | null;
  proteins: number;
  salt?: number | null;
  // isFSApproximated indica che i valori fibra/sale sono stimati
  isFSApproximated: boolean;
  conversion_perc?: number | null;
  total_weight?: number | null;
}

export interface IDetailSpecific {
  id: string;
  unity_weight: number;
}

export interface IBrand {
  id: string;
  name_brand: string;
}

export interface IShop {
  id: string;
  name_shop: string;
}

export interface ISubcategory {
  id: string;
  subcategory_name: string;
}

export interface ICategory {
  id: string;
  category_name: string;
}

export interface IDetail {
  id: string;
  detail_product: string;
  detail_note?: string | null;
  food?: { id: string; food: string } | null;
  macro?: IMacro | null;
  brand?: IBrand | null;
  specifics: IDetailSpecific[];
  join_shops: { id: string; shop: IShop }[];
}

export interface IFood {
  id: string;
  food: string;
  food_note?: string | null;
  subcategory?: ISubcategory | null;
}

// Risultato ricerca semplice (getFoodsByInput)
export interface IFoodSearchResult extends IFood {
  subcategory?: ISubcategory | null;
}

// Alimento completo con dettagli (getFoodsByFullName)
export interface IFoodFull extends IFood {
  dets: IDetail[];
}
