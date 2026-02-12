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
    brand: t.relation("brand"),
    shop: t.relation("shop"),
  }),
});
