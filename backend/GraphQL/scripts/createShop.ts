import { prisma } from "../../src/lib/prisma.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { getShop } = require("../../../../script/getFood");

const shops: {
    id_shop: any;
    name_shop: any;
}[] = getShop();

async function main() {
  console.log("Inizio creazione shops...");

  try {
    const result = await prisma.shop.createMany({
      data: shops.map((shop) => ({
        id: shop.id_shop,          // ID già esistente
        name_shop: shop.name_shop,
      })),
      skipDuplicates: true, // 🔥 IMPORTANTISSIMO
    });

    console.log(`Successo! Inseriti ${result.count} shop.`);
  } catch (error) {
    console.error("Errore durante la creazione dei shop:", error);
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
