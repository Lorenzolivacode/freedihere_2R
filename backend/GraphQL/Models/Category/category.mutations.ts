import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

// CREATE
Builder.mutationField("CreateCategory", (t) =>
  t.prismaField({
    type: "Category",
    args: {
      category_name: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) =>
      prisma.category.create({
        data: { category_name: args.category_name },
        ...query,
      }),
  })
);
