import { Builder } from "../../Builder.js";

export const Brand = Builder.prismaObject("Brand", {
  fields: (t) => ({
    id: t.exposeString("id"),
    name_brand: t.exposeString("name_brand"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    details: t.relation("dets"),
  }),
});
