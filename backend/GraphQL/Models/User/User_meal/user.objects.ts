import { Builder } from "../../../Builder.js";
import { SexEnum } from "../../../enum.js";

export const Meals = Builder.prismaObject("Meals", {
  fields: (t) => ({
    id: t.exposeString("id"),
    meal_name: t.exposeString("meal_name"),
    mealSnapshot: t.expose("mealSnapshot", { type: "JSON" }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    diaryUser: t.relation("diaryUser"),
    join_meal_food: t.relation("join_meal_food"),
  }),
});

export const join_meal_food = Builder.prismaObject("join_meal_food", {
  fields: (t) => ({
    id: t.exposeString("id"),
    weight: t.expose("weight", {
      type: "Decimal",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),

    // relations
    meals: t.relation("meals"),
    detail: t.relation("detail"),
    recipe: t.relation("recipe"),
  }),
});
