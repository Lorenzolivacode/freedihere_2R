import { Builder } from "../../Builder.js";
import { Prisma, prisma } from "../../../src/lib/prisma.js";

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

/**
 * Cerca più foods partendo da un nome composto
 * Effettua la ricerca per parola in:
 *  - Foods
 *  - Details
 *  - Brands
 *  - Shops
 */
Builder.queryField("getFoodsByFullName", (t) =>
  t.prismaField({
    type: ["Foods"],
    args: {
      input: t.arg.string({ required: true }),
      id_sub: t.arg.string({ required: false }),
      id_brand: t.arg.string({ required: false }),
      id_shop: t.arg.string({ required: false }),
    },
    resolve: (query, _parent, args) => {
      const tokens = args.input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((t) => t.length > 1);

      if (tokens.length === 0) return [];

      // Filtro atomico per i campi del dettaglio
      const detailFieldsFilter = (token: string) => ({
        OR: [
          { detail_product: { contains: token, mode: "insensitive" as const } },
          {
            brand: {
              name_brand: { contains: token, mode: "insensitive" as const },
            },
          },
          {
            join_shops: {
              some: {
                shop: {
                  name_shop: { contains: token, mode: "insensitive" as const },
                },
              },
            },
          },
        ],
      });

      return prisma.foods.findMany({
        ...query,
        where: {
          AND: tokens.map((token) => ({
            OR: [
              { food: { contains: token, mode: "insensitive" } },
              { dets: { some: detailFieldsFilter(token) } },
            ],
          })),
        },
        // Filtriamo i dettagli inclusi nell'output
        include: {
          ...query.include,
          dets: {
            where: {
              AND: tokens.map(
                (token) =>
                  ({
                    OR: [
                      // 1. Il token è presente nei campi del dettaglio
                      ...detailFieldsFilter(token).OR,
                      // 2. OPPURE il token è presente nel nome del cibo padre
                      {
                        food: {
                          is: {
                            food: { contains: token, mode: "insensitive" },
                          },
                        },
                      },
                    ],
                  } as Prisma.DetailsWhereInput)
              ),
            },
          },
        },
      });
    },
  })
);
