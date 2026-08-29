import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// シードデータの整合性チェック
const seed = readFileSync(new URL("../seed/seed.sql", import.meta.url), "utf8");

describe("seed.sql", () => {
  it("7科目が定義されている", () => {
    const sections = seed.match(/\(\d+, '[a-z-]+', '[^']+', '[^']+', \d+\)/g);
    expect(seed).toContain("INSERT INTO smec_sections");
    expect(sections?.length).toBeGreaterThanOrEqual(7);
  });

  it("問題の選択肢はすべて3択で、正解インデックスが範囲内", () => {
    const rows = [...seed.matchAll(/'(\[[^\]]+\])',\s*(\d+),\n/g)];
    expect(rows.length).toBeGreaterThan(0);
    for (const [, choicesJson, answerIndex] of rows) {
      const choices = JSON.parse(choicesJson) as string[];
      expect(choices).toHaveLength(3);
      expect(Number(answerIndex)).toBeGreaterThanOrEqual(0);
      expect(Number(answerIndex)).toBeLessThan(3);
    }
  });
});
