import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

Builder.queryField("getShops", (t) =>
  t.prismaField({
    type: ["Shop"],
    resolve: (query) => {
      return prisma.shop.findMany({
        ...query,
        orderBy: {
          name_shop: "asc",
        },
      });
    },
  })
);
