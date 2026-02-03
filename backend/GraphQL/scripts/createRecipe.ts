import { prisma } from "../../src/lib/prisma.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const recipiesDetails: IRecipe[] = require("../../../../script/recipe/recipe.json");

interface IIngredient {
  originalIng: {
    id_sub: string;
  };
  nameIng: string;
  id_join_detail_recipe: string;
  id_detail: string;
  id_recipe: string;
  amount_food_perc: string;
}

interface IMacro {
  kcal: number;
  fat: number;
  sat_fat: number;
  carbo: number;
  sugar: number;
  proteins: number;
  fiber: number | null;
  salt: number | null;
}

interface IRecipe {
  recipe: {
    id_recipe: string;
    recipe_name: string;
    recipe_note: string;
    conversion_perc: number;
  };
  join_detail_recipe: IIngredient[];
  macro: IMacro;
}

async function main() {
  console.log("Inizio creazione food e details...");
  await prisma.$transaction(
    async (tx) => {
      let i = 0;
      for (const recipe of recipiesDetails) {
        i++;
        if (i === 5) console.log("Siamo a ", i, "/", recipiesDetails.length);

        const ingredients = recipe.join_detail_recipe.filter(
          (d) => !!d.id_detail,
        );
        if (ingredients.length <= 0) continue;

        const recipePerc = Math.floor(recipiesDetails.length / 100);
        if (
          i === 10 * recipePerc ||
          i === 20 * recipePerc ||
          i === 50 * recipePerc ||
          i === 70 * recipePerc ||
          i === 80 * recipePerc ||
          i === 90 * recipePerc ||
          i === 95 * recipePerc ||
          i === 99 * recipePerc
        )
          console.log(
            `Creazione arrivata al ${Math.floor((i / recipiesDetails.length) * 100)} %, i: ${i}`,
          );

        try {
          const exist = await tx.recipe.findUnique({
            where: {
              id: recipe.recipe.recipe_name,
            },
            select: {
              id: true,
            },
          });
          if (!!exist) continue;

          await tx.recipe.create({
            data: {
              id: recipe.recipe.id_recipe,
              name_recipe: recipe.recipe.recipe_name,
              recipe_note: null,

              ...(!!recipe.macro.kcal && {
                macros: {
                  create: {
                    kcal: recipe.macro.kcal,
                    fat: recipe.macro.fat,
                    sat_fat: recipe.macro.sat_fat,
                    carbo: recipe.macro.carbo,
                    sugar: recipe.macro.sugar,
                    fiber: recipe.macro.fiber,
                    proteins: recipe.macro.proteins,
                    salt: recipe.macro.salt,
                    isFSApproximated: false,
                    conversion_perc: recipe.recipe.conversion_perc,
                  },
                },
              }),

              join_subs: {
                create: [
                  ...new Set(ingredients.map((d) => d.originalIng.id_sub)),
                ].map((id_sub) => ({
                  id_sub,
                })),
              },

              join_details: {
                create: ingredients.map((d) => ({
                  amount_food_perc: d.amount_food_perc,
                  id_detail: d.id_detail,
                })),
              },
            },
          });
        } catch (err: any) {
          console.error("Errore durante la creazione dei dati iniziali:", {
            recipe: recipe.recipe.recipe_name,
            recipeId: recipe.recipe.id_recipe,
            prismaCode: err.code,
            meta: err.meta,
            message: err.message,
          });
          throw err;
        }
      }
    },
    { timeout: 260_000 },
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Script completato.");
  })
  .catch(async (e) => {
    console.error("Disconnessione forzata a causa di errore.", e);
    await prisma.$disconnect();
    process.exit(1);
  });
