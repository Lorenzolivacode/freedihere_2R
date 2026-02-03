import { Builder } from "../../Builder.js";

export const Category = Builder.prismaObject("Category", {
  fields: (t) => ({
    id: t.exposeString("id"),
    category_name: t.exposeString("category_name"),

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

    subcategory: t.relation("subcat"),
  }),
});
