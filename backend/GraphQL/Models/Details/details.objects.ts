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
    id_food: t.exposeString("id_food"),
    food: t.relation("food", { nullable: false }),
    macro: t.relation("macro", { nullable: true }),
    id_brand: t.exposeString("id_brand"),
    brand: t.relation("brand", { nullable: true }),
    specifics: t.relation("specifics"),
    join_shops: t.relation("join_shops"),
    join_recipe: t.relation("join_recipe"),
    join_meal_food: t.relation("join_meal_food"),
  }),
});

export const join_detail_shop = Builder.prismaObject("join_detail_shop", {
  fields: (t) => ({
    id: t.exposeString("id"),

    createdAt: t.field({
      type: "String",
      resolve: (parent) => parent.createdAt.toISOString(),
    }),
    updatedAt: t.field({
      type: "String",
      resolve: (parent) =>
        parent.updatedAt ? parent.updatedAt.toISOString() : null,
    }),
    deletedAt: t.field({
      type: "String",
      resolve: (parent) =>
        parent.deletedAt ? parent.deletedAt.toISOString() : null,
    }),

    // relations
    id_detail: t.exposeString("id_detail"),
    detail: t.relation("detail"),
    id_shop: t.exposeString("id_shop"),
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
