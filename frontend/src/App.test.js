import { describe, expect, it } from "vitest";
import { countWords } from "./lib/wordCount";
describe("countWords", () => {
    it("counts words in sentence", () => {
        expect(countWords("hello aesthetic writing app")).toBe(4);
    });
    it("returns 0 for empty content", () => {
        expect(countWords("   ")).toBe(0);
    });
});
