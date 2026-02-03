import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

Builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: (query) => {
      return prisma.user.findMany({
        ...query,
      });
    },
  })
);

Builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.user.findUnique({
        where: { id: args.id },
        ...query,
      });
    },
  })
);
