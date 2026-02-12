import { Builder } from "../../Builder.js";

export const Category = Builder.prismaObject("Category", {
  fields: (t) => ({
    id: t.exposeString("id"),
    category_name: t.exposeString("category_name"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    subcategory: t.relation("subcat"),
  }),
});
