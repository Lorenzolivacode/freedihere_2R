import { prisma } from "../../src/lib/prisma.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const productsReducedByFood: IProduct[] = require("../../../../script/productsReducedByFood");
//const { findFiberSaltByCurr } = require("../../../../script/approximationFiberSalt");

// eseguire tramite root project -> npx tsc backend/GraphQL/scripts/createProduct.ts

interface IDetail {
    detail: {
        id_detail: string,
        id_food: string,
        detail_product: string,
        kcal: number,
        fat: number,
        sat_fat: number,
        carbo: number,
        sugar: number,
        fiber: number | null,
        proteins: number,
        salt: number | null,
        notes: string,
        isApproximatedFS: boolean,
    },
    join_detail_brand: {
        id_join_detail_brand: string,
        id_detail: string,
        id_brand: string,
    } | null,
    join_detail_shop: {
        id_join_detail_shop: string,
        id_detail: string,
        id_shop: string,
    } | null,
    detail_specify: {
        id_detail_specify: string,
        id_detail: string,
        unity_weight: number,
        unity_price: number | null,
    } | null
}
interface IProduct {
    id_food: string,
    food: string,
    id_sub: string,
    food_note: string,
    details: IDetail[]
}

/* 
PRENDE I DATI DAL JSON
*/
async function main() {
    console.log("Inizio creazione food e details...");

    await prisma.$transaction(async (tx) => {

        let i = 0
        for (const food of productsReducedByFood) {
            i++
            if (i === 5) console.log("Siamo a ", i, productsReducedByFood.length);

            const foodPerc = Math.floor(productsReducedByFood.length / 100)
            if (
                i === 10 * foodPerc ||
                i === 20 * foodPerc ||
                i === 50 * foodPerc ||
                i === 70 * foodPerc ||
                i === 80 * foodPerc ||
                i === 90 * foodPerc ||
                i === 95 * foodPerc ||
                i === 99 * foodPerc
            ) console.log(`Creazione arrivata al ${Math.floor((i / productsReducedByFood.length) * 100)} %, i: ${i}`);

            try {

                const exist = await tx.foods.findUnique({
                    where: {
                        id: food.id_food
                    },
                    select: {
                        id: true
                    }
                })
                if (!!exist) continue

                await tx.foods.create({
                    data: {
                        id: food.id_food,
                        food: food.food,
                        id_sub: food.id_sub,
                        food_note: food.food_note ?? null,

                        dets: {
                            create: food.details.map((detail) => {
                                // Creiamo l'oggetto base del dettaglio
                                const detailData = {
                                    id: detail.detail.id_detail,
                                    detail_product: detail.detail.detail_product,
                                    id_brand: detail.join_detail_brand?.id_brand ?? null,

                                    macro: {
                                        create: {
                                            kcal: detail.detail.kcal,
                                            fat: detail.detail.fat,
                                            sat_fat: detail.detail.sat_fat,
                                            carbo: detail.detail.carbo,
                                            sugar: detail.detail.sugar,
                                            fiber: detail.detail.fiber ?? null,
                                            proteins: detail.detail.proteins,
                                            salt: detail.detail.salt ?? null,
                                            isFSApproximated: detail.detail.isApproximatedFS,
                                        },
                                    },

                                    // Applichiamo lo spread condizionale per le relazioni
                                    ...(detail.detail_specify && {
                                        specifics: {
                                            create: {
                                                unity_weight: detail.detail_specify.unity_weight,
                                            },
                                        },
                                    }),

                                    ...(detail.join_detail_shop && {
                                        join_shops: {
                                            create: {
                                                id_shop: detail.join_detail_shop.id_shop,
                                            },
                                        },
                                    }),
                                };

                                return detailData;
                            }),
                        },
                    },
                })

                //await prisma.$transaction(foodCreations);
                /* await prisma.$transaction(
                    async (_tx) => {
                        await Promise.all(foodCreations)
                    }, { timeout: 20_000 }
                ); */
                //console.log(`Successo! Creati ${foodCreations.length} food.`);
            } catch (err: any) {
                //console.error("Errore durante la creazione dei dati iniziali:", err);
                console.error("Errore durante la creazione dei dati iniziali:", {
                    food: food.food,
                    foodId: food.id_food,
                    prismaCode: err.code,
                    meta: err.meta,
                    message: err.message
                });
                throw err;
            }
        }

    }, { timeout: 260_000 })

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

