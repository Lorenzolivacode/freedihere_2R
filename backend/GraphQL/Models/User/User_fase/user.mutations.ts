import { prisma } from "../../../../src/lib/prisma.js";
import { Builder } from "../../../Builder.js";
import { mealFoodInput } from "../user.inputs.js";

Builder.mutationField("createUserFase", (t) =>
  t.prismaField({
    type: "FaseUser",
    args: {
      fase_name: t.arg.string({ required: true }),
      multiply_perc: t.arg.int({ required: true }),

      //specifics
      deltaKcal_perc: t.arg.int({ required: true }),
      fat_perc: t.arg.int({ required: true }),
      sat_fat_perc: t.arg.int({ required: true }),
      carbo_perc: t.arg.int({ required: true }),
      sugar_perc: t.arg.int({ required: true }),
      fiber_perc: t.arg.int({ required: true }),
      proteins_perc: t.arg.int({ required: true }),
      salt_perc: t.arg.int({ required: true }),
      validFrom: t.arg({ type: "DateTime", required: true }),
      validTo: t.arg({ type: "DateTime", required: true }),
    },
    resolve: (query, _parent, args, context) => {
      return prisma.faseUser.create({
        data: {
          fase_name: args.fase_name,
          multiply_perc: args.multiply_perc,
          id_user: context.userId,

          fase_specifics: {
            create: {
              deltaKcal_perc: args.deltaKcal_perc,
              fat_perc: args.fat_perc,
              sat_fat_perc: args.sat_fat_perc,
              carbo_perc: args.carbo_perc,
              sugar_perc: args.sugar_perc,
              fiber_perc: args.fiber_perc,
              proteins_perc: args.proteins_perc,
              salt_perc: args.salt_perc,
              validFrom: args.validFrom,
              validTo: args.validTo,
            },
          },
        },
        ...(query as any),
      });
    },
  }),
);

Builder.mutationField("createFase_specifics", (t) =>
  t.prismaField({
    type: "Fase_specifics",
    args: {
      deltaKcal_perc: t.arg.int({ required: true }),
      fat_perc: t.arg.int({ required: true }),
      sat_fat_perc: t.arg.int({ required: true }),
      carbo_perc: t.arg.int({ required: true }),
      sugar_perc: t.arg.int({ required: true }),
      fiber_perc: t.arg.int({ required: true }),
      proteins_perc: t.arg.int({ required: true }),
      salt_perc: t.arg.int({ required: true }),
      validFrom: t.arg({ type: "DateTime", required: true }),
      validTo: t.arg({ type: "DateTime", required: true }),
      id_fase: t.arg.string({ required: true }),
    },
    resolve: (query, _p, args) => {
      return prisma.fase_specifics.create({
        data: {
          deltaKcal_perc: args.deltaKcal_perc,
          fat_perc: args.fat_perc,
          sat_fat_perc: args.sat_fat_perc,
          carbo_perc: args.carbo_perc,
          sugar_perc: args.sugar_perc,
          fiber_perc: args.fiber_perc,
          proteins_perc: args.proteins_perc,
          salt_perc: args.salt_perc,
          validFrom: args.validFrom,
          validTo: args.validTo,
          id_fase: args.id_fase,
        },
        ...(query as any),
      });
    },
  }),
);

Builder.mutationField("createDiaryUserByMeal", (t) =>
  t.prismaField({
    type: "DiaryUser",
    args: {
      aspected_kcal: t.arg.string({ required: true }),
      day: t.arg.string({ required: true }),
      id_fase_specific: t.arg.string({ required: true }),

      // Creo il diary all'inserimento del primo meal
      meal_name: t.arg.string({ required: true }),
      mealSnapshot: t.arg.string({ required: true }),

      // Join meal-food
      mealFood: t.arg({ type: [mealFoodInput], required: true }),
    },
    resolve: (query, _p, args) => {
      return prisma.diaryUser.create({
        data: {
          aspected_kcal: args.aspected_kcal,
          day: args.day,
          id_fase_specific: args.id_fase_specific,

          // meal
          meals: {
            create: {
              data: {
                meal_name: args.meal_name,
                mealSnapshot: args.mealSnapshot,
                join_meal_food: args.mealFood,
              },
            },
          },
        },
        ...(query as any),
      });
    },
  }),
);
