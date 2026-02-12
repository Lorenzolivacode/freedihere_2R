import { Builder } from "../../Builder.js";

export const Recipe = Builder.prismaObject("Recipe", {
  fields: (t) => ({
    id: t.exposeString("id"),
    name_recipe: t.exposeString("name_recipe"),
    recipe_note: t.exposeString("recipe_note", {
      nullable: true,
      description: "Note e/o ricetta",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    // relations
    user: t.relation("user"),
    recipe_princ: t.relation("recipe_princ"),
    recipe_ingr: t.relation("recipe_ingr"),
    macros: t.relation("macros"),
    join_subs: t.relation("join_subs"),
    join_details: t.relation("join_details"),
    join_meal_food: t.relation("join_meal_food"),
  }),
});

export const join_recipe_recipe = Builder.prismaObject("join_recipe_recipe", {
  fields: (t) => ({
    id: t.exposeString("id"),
    amount_food_perc: t.expose("amount_food_perc", {
      type: "Decimal",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    // relations
    recipe_princ: t.relation("recipe_princ"),
    recipe_ingr: t.relation("recipe_ingr"),
  }),
});

export const join_subs_recipe = Builder.prismaObject("join_subs_recipe", {
  fields: (t) => ({
    id: t.exposeString("id"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),

    // relations
    recipe: t.relation("recipe"),
    subs: t.relation("subs"),
  }),
});
