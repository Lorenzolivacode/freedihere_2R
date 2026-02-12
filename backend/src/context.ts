import { prisma } from "./lib/prisma.js";

interface Context {
  prisma: typeof prisma;
  userId: string | null;
}

export function createContext({
  req,
}: {
  req: { headers: Record<string, string | undefined> };
}): Context {
  return {
    prisma,
    userId: req.headers["x-user-id"] ?? null,
  };
}
