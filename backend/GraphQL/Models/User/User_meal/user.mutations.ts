import { prisma } from "../../../../src/lib/prisma.js";
import { Builder } from "../../../Builder.js";
import { mealFoodInput } from "../user.inputs.js";

Builder.mutationField("createUserMeal", (t) =>
  t.prismaField({
    type: "Meals",
    args: {
      meal_name: t.arg.string({ required: true }),
      mealSnapshot: t.arg.string({ required: true }),
      id_diary: t.arg.string({ required: true }),
      //aggiungere input per alimenti per creare join_meal_food
      mealFood: t.arg({ type: [mealFoodInput], required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.meals.create({
        data: {
          meal_name: args.meal_name,
          mealSnapshot: args.mealSnapshot,
          id_diary: args.id_diary,

          join_meal_food: args.mealFood,
        },
        ...(query as any),
      });
    },
  }),
);
