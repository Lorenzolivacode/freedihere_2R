import { Builder } from "../../../Builder.js";
import { prisma } from "../../../../src/lib/prisma.js";

// possibilmente si può prendere tutto da diaryUser
Builder.queryField("meals", (t) =>
  t.prismaField({
    type: ["Meals"],
    args: {
      id_diary: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      const { id_diary } = args;

      return prisma.meals.findMany({
        ...query, // per id_diary && meal_name
        where: {
          id_diary,
        },
      });
    },
  }),
);

// non serve, prendo tutto assieme da meals
Builder.queryField("join_meal_food", (t) =>
  t.prismaField({
    type: "join_meal_food",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args) => {
      return prisma.join_meal_food.findUnique({
        where: { id: args.id }, // per id_meal
        ...query,
      });
    },
  }),
);
