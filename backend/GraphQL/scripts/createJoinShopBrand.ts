import { prisma } from "../../src/lib/prisma.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const shopUnionBrand: {
    id_shop: string,
    shop_name: string,
    brandIds: string[]
}[] = require("../../../../script/structure_join_brand_shop.js");

const unionReduced = shopUnionBrand.flatMap(curr =>
    curr.brandIds.map(b => ({
        id_shop: curr.id_shop,
        id_brand: b
    }))
);
async function main() {
    console.log("Inizio creazione join...");

    try {
        const result = await prisma.join_shop_brand.createMany({
            data: unionReduced.map((join) => ({
                id_brand: join.id_brand,
                id_shop: join.id_shop,
            })),
            skipDuplicates: true,
        });

        console.log(`Successo! Inseriti ${result.count} join.`);
    } catch (error) {
        console.error("Errore durante la creazione dei join:", error);
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("Script completato.");
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    });
