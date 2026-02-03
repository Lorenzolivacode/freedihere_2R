import { Builder } from "../../Builder.js";

export const Pans = Builder.prismaObject("Pans", {
  fields: (t) => ({
    id: t.exposeString("id"),
    pan_name: t.exposeString("pan_name"),
    pan_weight: t.expose("pan_weight", {
      type: "Decimal",
    }),

    createdAt: t.expose("createdAt", { type: "DateTime" }),

    id_user: t.exposeString("id_user"),
    user: t.relation("user"),
  }),
});
