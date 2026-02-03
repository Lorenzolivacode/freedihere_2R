import "dotenv/config";
import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const globalForPrisma = globalThis as {
  prisma?: InstanceType<typeof PrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// Esporta il namespace Prisma per il Builder
export { Prisma };

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

//export { Prisma }; // ✅ Esporta il namespace per il Builder
