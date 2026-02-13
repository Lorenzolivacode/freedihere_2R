import { Builder } from "GraphQL/Builder.js";

export const mealFoodInput = Builder.inputType("mealFoodInput", {
  fields: (t) => ({
    weight: t.field({ type: "Decimal", required: true }),
    id_detail: t.string({ required: true }),
  }),
});
