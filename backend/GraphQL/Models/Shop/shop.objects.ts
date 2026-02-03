import { Builder } from "../../Builder.js";

export const Shop = Builder.prismaObject("Shop", {
  fields: (t) => ({
    id: t.exposeString("id"),
    name_shop: t.exposeString("name_shop"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime", nullable: true }),
    deletedAt: t.expose("deletedAt", { type: "DateTime", nullable: true }),

    join_details: t.relation("join_details"),
  }),
});

export const join_shop_brand = Builder.prismaObject("join_shop_brand", {
  fields: (t) => ({
    id: t.exposeString("id"),

    createdAt: t.expose("createdAt", { type: "DateTime" }),

    // relations
    id_brand: t.exposeString("id_brand"),
    brand: t.relation("brand"),
    id_shop: t.exposeString("id_shop"),
    shop: t.relation("shop"),
  }),
});
