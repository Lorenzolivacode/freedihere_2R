import { prisma } from "../../../src/lib/prisma.js";
import { Builder } from "../../Builder.js";

// Tipo di input per ogni ingrediente della ricetta
const recipeDetailInput = Builder.inputType("recipeDetailInput", {
  fields: (t) => ({
    id_detail: t.string({ required: true }),
    // frazione: ingredient_weight / total_weight_raw (es. 0.5 = 50%)
    amount_food_perc: t.float({ required: true }),
  }),
});

Builder.mutationField("createRecipe", (t) =>
  t.prismaField({
    type: "Recipe",
    args: {
      name_recipe: t.arg.string({ required: true }),
      recipe_note: t.arg.string({ required: false }),
      id_subs: t.arg.stringList({ required: true }),
      details: t.arg({ type: [recipeDetailInput], required: true }),
      total_weight_raw: t.arg.float({ required: true }),
      total_weight_cooked: t.arg.float({ required: false }),
      conversion_perc: t.arg.float({ required: false }),
    },
    resolve: async (query, _parent, args, context) => {
      // Carica i macro di ciascun dettaglio per calcolare i macro aggregati della ricetta
      const detailIds = args.details.map((d) => d.id_detail);
      const detailsDb = await prisma.details.findMany({
        where: { id: { in: detailIds } },
        include: { macro: true },
      });

      // Aggrega i macro pesati per amount_food_perc (frazione del peso crudo)
      let aggKcal = 0, aggFat = 0, aggSatFat = 0, aggCarbo = 0;
      let aggSugar = 0, aggFiber = 0, aggProteins = 0, aggSalt = 0;
      let hasMissing = false;

      for (const inp of args.details) {
        const det = detailsDb.find((d) => d.id === inp.id_detail);
        if (!det?.macro) { hasMissing = true; continue; }
        // amount_food_perc è in base 100 (es. 50 = 50%)
        const p = inp.amount_food_perc / 100;
        aggKcal     += Number(det.macro.kcal) * p;
        aggFat      += Number(det.macro.fat) * p;
        aggSatFat   += Number(det.macro.sat_fat) * p;
        aggCarbo    += Number(det.macro.carbo) * p;
        aggSugar    += Number(det.macro.sugar) * p;
        aggFiber    += det.macro.fiber   ? Number(det.macro.fiber) * p : 0;
        aggProteins += Number(det.macro.proteins) * p;
        aggSalt     += det.macro.salt    ? Number(det.macro.salt) * p : 0;
      }

      return prisma.recipe.create({
        ...(query as any),
        data: {
          name_recipe: args.name_recipe,
          recipe_note: args.recipe_note,
          id_user: context.userId,
          join_subs: {
            create: args.id_subs.map((id_sub) => ({ id_sub })),
          },
          join_details: {
            create: args.details.map((d) => ({
              id_detail: d.id_detail,
              amount_food_perc: d.amount_food_perc,
            })),
          },
          macros: {
            create: {
              kcal:            aggKcal,
              fat:             aggFat,
              sat_fat:         aggSatFat,
              carbo:           aggCarbo,
              sugar:           aggSugar,
              fiber:           aggFiber,
              proteins:        aggProteins,
              salt:            aggSalt,
              isFSApproximated: hasMissing,
              total_weight:    args.total_weight_raw,
              conversion_perc: args.conversion_perc ?? null,
            },
          },
        },
      });
    },
  })
);
