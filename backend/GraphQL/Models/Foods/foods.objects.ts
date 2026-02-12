import { Builder } from "../../Builder.js";

export const Foods = Builder.prismaObject("Foods", {
  fields: (t) => ({
    id: t.exposeString("id"),
    food: t.exposeString("food"),
    food_note: t.exposeString("food_note", {
      nullable: true,
      description: "Note opzionali relative al cibo", // Opzionale
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    subcategory: t.relation("subcat", { nullable: true }),
    dets: t.relation("dets"),
  }),
});
