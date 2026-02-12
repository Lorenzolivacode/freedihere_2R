import { Builder } from "../../Builder.js";

export const Category = Builder.prismaObject("Subcategory", {
  fields: (t) => ({
    id: t.exposeString("id"),
    subcategory_name: t.exposeString("subcategory_name"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    //Relazioni
    category: t.relation("cat"),
    food: t.relation("food"),
    join_recipe: t.relation("join_recipe"),
  }),
});
