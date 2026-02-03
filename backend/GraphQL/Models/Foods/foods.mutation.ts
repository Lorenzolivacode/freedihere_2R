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
      unity_weights: t.arg({ type: ["Decimal"], required: false }),
    },
    resolve: async (query, _parent, args) => {
      const dets = {
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
            isFSApproximated: false,
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
      };

      const existingFood = await prisma.foods.findUnique({
        where: {
          food_id_sub: {
            // Prisma genera un nome composito per unique key
            food: args.food,
            id_sub: args.id_sub,
          },
        },
      });

      if (existingFood) {
        await prisma.details.create({
          data: {
            id_food: existingFood.id,
            ...dets,
          },
        });

        // restituisci l'oggetto food esistente, non il detail
        return existingFood;
      } else {
        return prisma.foods.create({
          data: {
            food: args.food,
            food_note: args.food_note,
            id_sub: args.id_sub,
            dets: {
              create: dets,
            },
          },
          ...(query as any),
        });
      }
    },
  })
);
