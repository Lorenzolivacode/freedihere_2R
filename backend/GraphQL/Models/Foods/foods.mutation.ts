import { prisma } from "../../../src/lib/prisma.js";
import { Builder } from "../../Builder.js";

Builder.mutationField("createFood", (t) =>
  t.prismaField({
    type: "Foods",
    args: {
      food: t.arg.string({ required: true }),
      food_note: t.arg.string({ required: false }),
      id_sub: t.arg.string({ required: true }),

      // details
      detail_product: t.arg.string({ required: false }),
      note: t.arg.string({ required: false }),
      id_brand: t.arg.string({ required: false }),
      join_shops: t.arg.stringList({ required: false }),

      // macro
      kcal: t.arg({ type: "Decimal", required: true }),
      fat: t.arg({ type: "Decimal", required: true }),
      sat_fat: t.arg({ type: "Decimal", required: true }),
      carbo: t.arg({ type: "Decimal", required: true }),
      sugar: t.arg({ type: "Decimal", required: true }),
      fiber: t.arg({ type: "Decimal", required: true }),
      proteins: t.arg({ type: "Decimal", required: true }),
      salt: t.arg({ type: "Decimal", required: true }),

      // specifics
      unity_weights: t.arg({ type: ["Decimal"], required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.foods.create({
        data: {
          food: args.food,
          food_note: args.food_note,
          id_sub: args.id_sub,
          dets: {
            create: {
              detail_product: args.detail_product,
              note: args.note,
              id_brand: args.id_brand || null,
              macro: {
                create: {
                  kcal: args.kcal,
                  fat: args.fat,
                  sat_fat: args.sat_fat,
                  carbo: args.carbo,
                  sugar: args.sugar,
                  fiber: args.fiber,
                  proteins: args.proteins,
                  salt: args.salt,
                },
              },

              ...(args.join_shops && {
                join_shops: {
                  create: args.join_shops?.map((id_shop) => ({
                    id_shop,
                  })),
                },
              }),

              ...(args.unity_weights && {
                specifics: {
                  create: args.unity_weights.map((uw) => ({
                    unity_weight: uw,
                  })),
                },
              }),
            },
          },
        },
        ...(query as any),
      });
    },
  })
);
