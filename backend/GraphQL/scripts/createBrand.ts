import { prisma } from "../../src/lib/prisma.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { getBrands } = require("../../../../script/getFood");

const brands: { id_brand: string; name_brand: string }[] = getBrands();

async function main() {
  console.log("Inizio creazione brands...");

  try {
    const result = await prisma.brand.createMany({
      data: brands.map((brand) => ({
        id: brand.id_brand,          // ID già esistente
        name_brand: brand.name_brand,
      })),
      skipDuplicates: true, // 🔥 IMPORTANTISSIMO
    });

    console.log(`Successo! Inseriti ${result.count} brand.`);
  } catch (error) {
    console.error("Errore durante la creazione dei brand:", error);
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
