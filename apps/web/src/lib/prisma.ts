import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

function getClient(): PrismaClient {
  const existing = globalThis.__prisma;
  if (existing) return existing;

  const created = new PrismaClient({ log: ["error"] });
  if (process.env.NODE_ENV !== "production") {
    globalThis.__prisma = created;
  }
  return created;
}

// Lazy proxy: evita di istanziare PrismaClient durante `next build`
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient() as unknown as object, prop, receiver);
  },
});


