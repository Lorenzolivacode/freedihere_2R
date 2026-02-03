import { Builder } from "../../Builder.js";

export const Category = Builder.prismaObject("Subcategory", {
  fields: (t) => ({
    id: t.exposeString("id"),
    subcategory_name: t.exposeString("subcategory_name"),

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

    category: t.relation("cat"),
    food: t.relation("food"),
    join_recipe: t.relation("join_recipe"),
  }),
});
