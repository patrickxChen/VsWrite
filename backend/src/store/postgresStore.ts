import { PrismaClient } from "@prisma/client";
import type { SessionInput, SessionRecord } from "../types.js";
import type { SessionStore } from "./sessionStore.js";

export class PostgresSessionStore implements SessionStore {
  constructor(private readonly prisma: PrismaClient) {}

  private mapRecord(record: {
    id: string;
    content: string;
    wordCount: number;
    wordGoal: number;
    createdAt: Date;
    updatedAt: Date;
  }): SessionRecord {
    return {
      id: record.id,
      content: record.content,
      wordCount: record.wordCount,
      wordGoal: record.wordGoal,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString()
    };
  }

  async create(input: SessionInput): Promise<SessionRecord> {
    const saved = await this.prisma.session.create({
      data: {
        content: input.content,
        wordCount: input.wordCount,
        wordGoal: input.wordGoal
      }
    });
    return this.mapRecord(saved);
  }

  async getById(id: string): Promise<SessionRecord | null> {
    const saved = await this.prisma.session.findUnique({ where: { id } });
    return saved ? this.mapRecord(saved) : null;
  }

  async update(id: string, input: SessionInput): Promise<SessionRecord | null> {
    const exists = await this.prisma.session.findUnique({ where: { id } });
    if (!exists) {
      return null;
    }
    const saved = await this.prisma.session.update({
      where: { id },
      data: {
        content: input.content,
        wordCount: input.wordCount,
        wordGoal: input.wordGoal
      }
    });
    return this.mapRecord(saved);
  }

  async countActive(): Promise<number> {
    return this.prisma.session.count();
  }
}
