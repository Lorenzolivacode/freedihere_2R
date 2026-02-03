import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

Builder.queryField("getBrands", (t) =>
  t.prismaField({
    type: ["Brand"],
    resolve: (query) => {
      return prisma.brand.findMany({
        ...query,
        orderBy: {
          name_brand: "asc",
        },
      });
    },
  })
);
