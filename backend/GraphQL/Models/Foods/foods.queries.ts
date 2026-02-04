import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

Builder.queryField("getFoodsByInput", (t) =>
  t.prismaField({
    type: ["Foods"],
    args: {
      input: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.foods.findMany({
        ...query,
        where: { food: { contains: args.input, mode: "insensitive" } },
      });
    },
  })
);
