import "dotenv/config";
//import { PrismaClient } from "../../generated/prisma/client.js";
import * as PrismaNamespace from "../../generated/prisma/index.js"; // Importa tutto il namespace
import { PrismaPg } from "@prisma/adapter-pg";

// Estrai ciò che ti serve dal namespace
const { PrismaClient } = PrismaNamespace;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const globalForPrisma = globalThis as {
  prisma?: InstanceType<typeof PrismaClient>;
};
/* const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
}; */

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// ✅ Esporta Prisma correttamente per il Builder
export const Prisma = (PrismaNamespace as any).Prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

//export { Prisma }; // ✅ Esporta il namespace per il Builder
