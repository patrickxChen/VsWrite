import type { SessionInput, SessionRecord } from "../types.js";

export interface SessionStore {
  create(input: SessionInput): Promise<SessionRecord>;
  getById(id: string): Promise<SessionRecord | null>;
  update(id: string, input: SessionInput): Promise<SessionRecord | null>;
  countActive(): Promise<number>;
}
