import crypto from "node:crypto";
import type { SessionInput, SessionRecord } from "../types.js";
import type { SessionStore } from "./sessionStore.js";

export class MemorySessionStore implements SessionStore {
  private readonly sessions = new Map<string, SessionRecord>();

  async create(input: SessionInput): Promise<SessionRecord> {
    const now = new Date().toISOString();
    const record: SessionRecord = {
      id: crypto.randomUUID(),
      content: input.content,
      wordCount: input.wordCount,
      wordGoal: input.wordGoal,
      createdAt: now,
      updatedAt: now
    };
    this.sessions.set(record.id, record);
    return record;
  }

  async getById(id: string): Promise<SessionRecord | null> {
    return this.sessions.get(id) ?? null;
  }

  async update(id: string, input: SessionInput): Promise<SessionRecord | null> {
    const existing = this.sessions.get(id);
    if (!existing) {
      return null;
    }
    const updated: SessionRecord = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString()
    };
    this.sessions.set(id, updated);
    return updated;
  }

  async countActive(): Promise<number> {
    return this.sessions.size;
  }
}
