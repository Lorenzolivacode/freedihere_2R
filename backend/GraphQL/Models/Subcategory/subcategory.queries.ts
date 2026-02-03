import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

Builder.queryField("getSubcategories", (t) =>
  t.prismaField({
    type: ["Subcategory"],
    resolve: (query) => {
      return prisma.subcategory.findMany({
        ...query,
        orderBy: {
          subcategory_name: "asc",
        },
      });
    },
  })
);
