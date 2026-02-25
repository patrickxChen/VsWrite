import type { StoreKind } from "./store/index.js";

function parseStoreKind(raw: string | undefined): StoreKind {
  if (raw === "postgres" || raw === "redis") {
    return raw;
  }
  return "memory";
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  storeKind: parseStoreKind(process.env.DATA_STORE),
  databaseUrl: process.env.DATABASE_URL ?? "",
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379"
};
