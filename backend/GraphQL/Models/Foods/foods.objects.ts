import { Builder } from "../../Builder.js";

export const Foods = Builder.prismaObject("Foods", {
  fields: (t) => ({
    id: t.exposeString("id"),
    food: t.exposeString("food"),
    food_note: t.exposeString("food_note", {
      nullable: true,
      description: "Note opzionali relative al cibo", // Opzionale
    }),

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

    subcategory: t.relation("subcat", { nullable: true }),
    dets: t.relation("dets"),
  }),
});
