import { prisma } from "../../src/lib/prisma.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { getCat, getSubs } = require("../../../../script/getFood"); 

// Dati Categorie: es. [{id_cat:"cat_2", category: "Carne"},]
const categories = getCat(); 
// Dati Sottocategorie: es. [{id_sub:"sub_5", id_cat: "cat_2", subcategory: "Carne bianca"},]
const subs = getSubs(); 
console.log("CATEGORY\n", categories);


async function main() {
  console.log("Inizio creazione categorie e sottocategorie...");

  try {
    // --- 1. Creazione Categorie ---
    const categoryCreations = categories.map((catData: {id_cat:string, category: string}) =>
      prisma.category.create({
        data: {
          id: catData.id_cat,          // Mappa id_cat a 'id' del modello
          category_name: catData.category, // Mappa category a 'category_name'
        },
      })
    );

    await prisma.$transaction(categoryCreations);
    console.log(`Successo! Create ${categories.length} categorie.`);


    // --- 2. Creazione Sottocategorie ---
    const subcategoryCreations = subs.map((subData: {id_sub:string,id_cat:string, subcategory: string}) =>
      prisma.subcategory.create({
        data: {
          id: subData.id_sub,          // Mappa id_sub a 'id' del modello
          id_cat: subData.id_cat,      // Mappa id_cat a 'id_cat'
          subcategory_name: subData.subcategory, // Mappa subcategory a 'subcategory_name'
        },
      })
    );

    await prisma.$transaction(subcategoryCreations);
    console.log(`Successo! Create ${subs.length} sottocategorie.`);

  } catch (error) {
    console.error("Errore durante la creazione dei dati iniziali:", error);
    throw error; // Interrompe il processo in caso di errore
  }
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
