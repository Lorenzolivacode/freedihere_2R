import { Builder } from "../../Builder.js";

export const Details = Builder.prismaObject("Details", {
  fields: (t) => ({
    id: t.exposeString("id"),
    detail_product: t.exposeString("detail_product"),
    detail_note: t.exposeString("note", {
      nullable: true,
      description: "Note opzionali relative al dettaglio",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    // relations
    food: t.relation("food", { nullable: false }),
    macro: t.relation("macro", { nullable: true }),
    brand: t.relation("brand", { nullable: true }),
    specifics: t.relation("specifics"),
    user: t.relation("user", { nullable: true }),
    join_shops: t.relation("join_shops"),
    join_recipe: t.relation("join_recipe"),
    join_meal_food: t.relation("join_meal_food"),
  }),
});

export const join_detail_shop = Builder.prismaObject("join_detail_shop", {
  fields: (t) => ({
    id: t.exposeString("id"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    // relations
    detail: t.relation("detail"),
    shop: t.relation("shop"),
  }),
});

export const join_detail_recipe = Builder.prismaObject("join_detail_recipe", {
  fields: (t) => ({
    id: t.exposeString("id"),
    amount_food_perc: t.expose("amount_food_perc", {
      type: "Decimal",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    // relations
    detail: t.relation("detail"),
    recipe: t.relation("recipe"),
  }),
});
