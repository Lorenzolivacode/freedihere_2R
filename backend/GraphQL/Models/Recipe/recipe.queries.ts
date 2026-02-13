import { Builder } from "../../Builder.js";
import { prisma } from "../../../src/lib/prisma.js";

// Cerca ricette per nome (input parziale)
Builder.queryField("getRecipesByInput", (t) =>
  t.prismaField({
    type: ["Recipe"],
    args: {
      input: t.arg.string({ required: true }),
      userId: t.arg.string({ required: false }),
    },
    resolve: (query, _parent, args) => {
      return prisma.recipe.findMany({
        ...query,
        where: {
          name_recipe: { contains: args.input, mode: "insensitive" },
          ...(args.userId ? { id_user: args.userId } : {}),
        },
        orderBy: { name_recipe: "asc" },
      });
    },
  })
);

// Dettaglio completo di una ricetta per ID
Builder.queryField("getRecipeById", (t) =>
  t.prismaField({
    type: "Recipe",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.recipe.findUnique({
        ...query,
        where: { id: args.id },
      });
    },
  })
);
