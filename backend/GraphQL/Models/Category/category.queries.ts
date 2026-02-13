import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

Builder.queryField("getCategories", (t) =>
  t.prismaField({
    type: ["Category"],
    resolve: (query) =>
      prisma.category.findMany({
        ...query,
        orderBy: { category_name: "asc" },
      }),
  })
);
