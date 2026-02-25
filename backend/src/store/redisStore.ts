import crypto from "node:crypto";
import type { Redis } from "ioredis";
import type { SessionInput, SessionRecord } from "../types.js";
import type { SessionStore } from "./sessionStore.js";

const SESSION_PREFIX = "session:";
const SESSION_INDEX = "session:index";

export class RedisSessionStore implements SessionStore {
  constructor(private readonly redis: Redis) {}

  async create(input: SessionInput): Promise<SessionRecord> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const record: SessionRecord = {
      id,
      content: input.content,
      wordCount: input.wordCount,
      wordGoal: input.wordGoal,
      createdAt: now,
      updatedAt: now
    };

    await this.redis.set(`${SESSION_PREFIX}${id}`, JSON.stringify(record));
    await this.redis.sadd(SESSION_INDEX, id);
    return record;
  }

  async getById(id: string): Promise<SessionRecord | null> {
    const raw = await this.redis.get(`${SESSION_PREFIX}${id}`);
    return raw ? (JSON.parse(raw) as SessionRecord) : null;
  }

  async update(id: string, input: SessionInput): Promise<SessionRecord | null> {
    const existing = await this.getById(id);
    if (!existing) {
      return null;
    }
    const updated: SessionRecord = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString()
    };
    await this.redis.set(`${SESSION_PREFIX}${id}`, JSON.stringify(updated));
    return updated;
  }

  async countActive(): Promise<number> {
    return this.redis.scard(SESSION_INDEX);
  }
}
