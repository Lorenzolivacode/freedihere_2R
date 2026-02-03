import { Builder } from "../../Builder.js";

export const Detail_specifics = Builder.prismaObject("Detail_specifics", {
  fields: (t) => ({
    id: t.exposeString("id"),
    unity_weight: t.expose("unity_weight", {
      type: "Decimal",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    detail: t.relation("detail"),
  }),
});
