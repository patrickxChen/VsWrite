import { z } from "zod";
import type { SessionInput } from "../types.js";

export const sessionInputSchema = z.object({
  content: z.string().max(1000000),
  wordCount: z.number().int().nonnegative(),
  wordGoal: z.number().int().positive()
});

export function parseSessionInput(payload: unknown): SessionInput {
  return sessionInputSchema.parse(payload);
}
