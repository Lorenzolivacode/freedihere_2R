import { Builder } from "../../Builder.js";

export const Macro = Builder.prismaObject("Macro", {
  fields: (t) => ({
    id: t.exposeString("id"),
    //scalar definito in Builder.ts
    kcal: t.expose("kcal", {
      type: "Decimal",
    }),
    fat: t.expose("fat", {
      type: "Decimal",
    }),
    sat_fat: t.expose("sat_fat", {
      type: "Decimal",
    }),
    carbo: t.expose("carbo", {
      type: "Decimal",
    }),
    sugar: t.expose("sugar", {
      type: "Decimal",
    }),
    fiber: t.expose("fiber", {
      type: "Decimal",
      nullable: true,
    }),
    proteins: t.expose("proteins", {
      type: "Decimal",
    }),
    salt: t.expose("salt", {
      type: "Decimal",
      nullable: true,
    }),
    isFSApproximated: t.exposeBoolean("isFSApproximated"),
    // for recipe
    conversion_perc: t.expose("conversion_perc", {
      type: "Decimal",
      nullable: true,
    }),
    total_weight: t.expose("total_weight", {
      type: "Decimal",
      nullable: true,
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),

    // relations
    id_detail: t.exposeString("id_detail"),
    detail: t.relation("detail"),
    id_recipe: t.exposeString("id_recipe"),
    recipe: t.relation("recipe"),
  }),
});
