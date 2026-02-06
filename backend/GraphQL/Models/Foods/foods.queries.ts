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
      const { id_sub, id_brand, id_shop, input } = args;
      const tokens = input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((t) => t.length > 1);

      if (tokens.length === 0) return [];

      // 1. Filtro puramente TESTUALE (Cerca solo la parola)
      const textOnlyFilter = (token: string): Prisma.DetailsWhereInput => ({
        OR: [
          {
            detail_product: {
              contains: token,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            brand: {
              name_brand: {
                contains: token,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
          },
          {
            join_shops: {
              some: {
                shop: {
                  name_shop: {
                    contains: token,
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
              },
            },
          },
        ],
      });

      return prisma.foods.findMany({
        ...query,
        where: {
          AND: [
            // Filtri ID tassativi (AND)
            ...(id_sub ? [{ id_sub }] : []),
            ...(id_brand ? [{ dets: { some: { id_brand } } }] : []),
            ...(id_shop
              ? [{ dets: { some: { join_shops: { some: { id_shop } } } } }]
              : []),

            // Filtro TESTO tassativo (Ogni token deve essere presente in Food o Dets)
            ...tokens.map((token) => ({
              OR: [
                {
                  food: {
                    contains: token,
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
                {
                  dets: {
                    some: {
                      AND: [
                        textOnlyFilter(token),
                        ...(id_brand ? [{ id_brand }] : []), // Deve anche essere di questo brand
                        ...(id_shop
                          ? [{ join_shops: { some: { id_shop } } }]
                          : []), // E di questo shop
                      ],
                    },
                  },
                },
              ],
            })),
          ],
        },
        include: {
          ...query.include,
          dets: {
            where: {
              AND: [
                // Mostra solo i dettagli che rispettano gli ID
                ...(id_brand ? [{ id_brand }] : []),
                ...(id_shop ? [{ join_shops: { some: { id_shop } } }] : []),
                // E che matchano il testo (o il cui padre matcha il testo)
                ...tokens.map((token) => ({
                  OR: [
                    textOnlyFilter(token),
                    {
                      food: {
                        is: {
                          food: {
                            contains: token,
                            mode: "insensitive" as Prisma.QueryMode,
                          },
                        },
                      },
                    },
                  ],
                })),
              ],
            },
          },
        },
      });
    },
  })
);

/* 1.2 - bho - forse ok
resolve: async (query, _parent, args) => {
  const { id_sub, id_brand, id_shop, input } = args;
  const tokens = input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  if (tokens.length === 0) return [];

  // 1. Definiamo esplicitamente il tipo per il filtro atomico
  const detailFieldsFilter = (token: string): Prisma.DetailsWhereInput => ({
    OR: [
      {
        detail_product: {
          contains: token,
          mode: "insensitive" as Prisma.QueryMode,
        },
      },
      id_brand
        ? { id_brand: id_brand }
        : {
            brand: {
              name_brand: {
                contains: token,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
          },
      {
        join_shops: {
          some: id_shop
            ? { id_shop: id_shop }
            : {
                shop: {
                  name_shop: {
                    contains: token,
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
              },
        },
      },
    ],
  });

  return prisma.foods.findMany({
    ...query,
    where: {
      AND: [
        ...(id_sub ? [{ id_sub }] : []),
        ...(id_brand ? [{ dets: { some: { id_brand } } }] : []),
        ...(id_shop
          ? [{ dets: { some: { join_shops: { some: { id_shop } } } } }]
          : []),
        ...tokens.map(
          (token): Prisma.FoodsWhereInput => ({
            OR: [
              {
                food: {
                  contains: token,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
              { dets: { some: detailFieldsFilter(token) } },
            ],
          })
        ),
      ],
    },
    include: {
      ...query.include,
      dets: {
        where: {
          AND: [
            ...(id_brand ? [{ id_brand }] : []),
            ...(id_shop ? [{ join_shops: { some: { id_shop } } }] : []),
            ...tokens.map(
              (token): Prisma.DetailsWhereInput => ({
                OR: [
                  // Usiamo .OR per "appiattire" i filtri ed evitare livelli extra
                  ...(detailFieldsFilter(token)
                    .OR as Prisma.DetailsWhereInput[]),
                  {
                    food: {
                      // Se 'food' nella tabella Food è una stringa, l'is.food era l'errore.
                      // Correggo in base al tuo schema:
                      is: {
                        food: {
                          contains: token,
                          mode: "insensitive" as Prisma.QueryMode,
                        },
                      },
                    },
                  },
                ],
              })
            ),
          ],
        },
      },
    },
  });
}, */
/* 1.1 - OK
resolve: (query, _parent, args) => {
  const { id_sub, id_brand, id_shop } = args;
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
          ...(id_sub ? [{ id_sub: id_sub }] : []),
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
}, */
/* 1 - OK
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
}, */

/* 2 - NO ok
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
      const { input, id_sub, id_brand, id_shop } = args;

      const tokens = input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((t) => t.length > 1);

      if (tokens.length === 0 && !id_sub && !id_brand && !id_shop) return [];

      // 1. Filtro per i campi del Dettaglio (utilizzato sia in where che in include)
      const getDetailFilter = (token?: string): Prisma.DetailsWhereInput => {
        const conditions: Prisma.DetailsWhereInput[] = [];

        // Se c'è id_brand, match esatto, altrimenti cerca il token nel nome del brand
        if (id_brand) {
          conditions.push({ id_brand: id_brand });
        } else if (token) {
          conditions.push({
            brand: { name_brand: { contains: token, mode: "insensitive" } },
          });
        }

        // Se c'è id_shop, match esatto tramite join_shops, altrimenti cerca il token nel nome dello shop
        if (id_shop) {
          conditions.push({ join_shops: { some: { id_shop: id_shop } } });
        } else if (token) {
          conditions.push({
            join_shops: {
              some: {
                shop: { name_shop: { contains: token, mode: "insensitive" } },
              },
            },
          });
        }

        // Aggiungiamo sempre la ricerca sul testo del dettaglio se il token esiste
        if (token) {
          conditions.push({
            detail_product: { contains: token, mode: "insensitive" },
          });
        }

        return { OR: conditions };
      };

      // 2. Filtro principale per Foods
      const foodsWhere: Prisma.FoodsWhereInput = {
        AND: [
          // Filtro per Sottocategoria (se presente)
          ...(id_sub ? [{ id_sub: id_sub }] : []),
          // Logica dei Token
          ...tokens.map((token) => ({
            OR: [
              { food: { contains: token, mode: "insensitive" as const } },
              { dets: { some: getDetailFilter(token) } },
            ],
          })),
          // Se non ci sono token ma ci sono ID brand/shop, assicuriamoci di filtrare Foods
          ...(tokens.length === 0 && (id_brand || id_shop)
            ? [{ dets: { some: getDetailFilter() } }]
            : []),
        ],
      };

      return prisma.foods.findMany({
        ...query,
        where: foodsWhere,
        include: {
          ...query.include,
          dets: {
            where: {
              AND: [
                // Filtro restrittivo basato su ID o Token
                ...(id_brand ? [{ id_brand }] : []),
                ...(id_shop ? [{ join_shops: { some: { id_shop } } }] : []),
                ...tokens.map((token) => ({
                  OR: [
                    getDetailFilter(token),
                    {
                      food: {
                        is: {
                          food: {
                            contains: token,
                            mode: "insensitive" as const,
                          },
                        },
                      },
                    },
                  ],
                })),
              ],
            } as Prisma.DetailsWhereInput,
          },
        },
      });
    },
  })
); */
