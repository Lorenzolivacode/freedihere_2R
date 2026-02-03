import { Builder } from "../../Builder.js";

export const Brand = Builder.prismaObject("Brand", {
  fields: (t) => ({
    id: t.exposeString("id"),
    name_brand: t.exposeString("name_brand"),

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

    details: t.relation("dets"),
  }),
});
