import { PrismaClient } from "@prisma/client";
import { Redis } from "ioredis";
import { MemorySessionStore } from "./memoryStore.js";
import { PostgresSessionStore } from "./postgresStore.js";
import { RedisSessionStore } from "./redisStore.js";
import type { SessionStore } from "./sessionStore.js";

export type StoreKind = "memory" | "postgres" | "redis";

export function createSessionStore(kind: StoreKind, options: { databaseUrl: string; redisUrl: string }): SessionStore {
  if (kind === "postgres") {
    const prisma = new PrismaClient({ datasources: { db: { url: options.databaseUrl } } });
    return new PostgresSessionStore(prisma);
  }

  if (kind === "redis") {
    return new RedisSessionStore(new Redis(options.redisUrl));
  }

  return new MemorySessionStore();
}
