import type { IMacro } from "../types/food.types";

// Scala i macro di un alimento per un dato peso (i valori sono per 100g)
export function calcMacroFromWeight(macro: IMacro, weight: number): IMacro {
  const ratio = weight / 100;
  return {
    ...macro,
    kcal: macro.kcal * ratio,
    fat: macro.fat * ratio,
    sat_fat: macro.sat_fat * ratio,
    carbo: macro.carbo * ratio,
    sugar: macro.sugar * ratio,
    fiber: macro.fiber != null ? macro.fiber * ratio : null,
    proteins: macro.proteins * ratio,
    salt: macro.salt != null ? macro.salt * ratio : null,
  };
}

// Somma un array di macro (es. tutti gli alimenti di un pasto)
export function sumMacros(macros: IMacro[]): IMacro {
  const base: IMacro = {
    id: "",
    kcal: 0,
    fat: 0,
    sat_fat: 0,
    carbo: 0,
    sugar: 0,
    fiber: 0,
    proteins: 0,
    salt: 0,
    isFSApproximated: false,
  };

  return macros.reduce((acc, m) => ({
    ...acc,
    kcal: acc.kcal + m.kcal,
    fat: acc.fat + m.fat,
    sat_fat: acc.sat_fat + m.sat_fat,
    carbo: acc.carbo + m.carbo,
    sugar: acc.sugar + m.sugar,
    fiber: (acc.fiber ?? 0) + (m.fiber ?? 0),
    proteins: acc.proteins + m.proteins,
    salt: (acc.salt ?? 0) + (m.salt ?? 0),
    // Se almeno un macro è approssimato, il totale è marcato come approssimato
    isFSApproximated: acc.isFSApproximated || m.isFSApproximated,
  }), base);
}

// Calcola i macro residui a partire dalle kcal attese e quelle già consumate
// 1g grassi = 9 kcal, 1g carboidrati = 4 kcal, 1g proteine = 4 kcal
export function calcRemainingMacros(consumed: IMacro, expectedKcal: number): IMacro {
  const remainingKcal = Math.max(0, expectedKcal - consumed.kcal);

  // Distribuzione di default 30% grassi / 40% carbo / 30% proteine
  const fatKcal = remainingKcal * 0.3;
  const carboKcal = remainingKcal * 0.4;
  const protKcal = remainingKcal * 0.3;

  return {
    id: "",
    kcal: remainingKcal,
    fat: fatKcal / 9,
    sat_fat: 0,
    carbo: carboKcal / 4,
    sugar: 0,
    fiber: null,
    proteins: protKcal / 4,
    salt: null,
    isFSApproximated: false,
  };
}
