import { describe, expect, it } from "vitest";
import { parseSessionInput } from "./sessionService.js";

describe("parseSessionInput", () => {
  it("parses valid payload", () => {
    const parsed = parseSessionInput({ content: "hello", wordCount: 1, wordGoal: 100 });
    expect(parsed.wordGoal).toBe(100);
  });

  it("throws for invalid payload", () => {
    expect(() => parseSessionInput({ content: "x", wordCount: -1, wordGoal: 0 })).toThrow();
  });
});
