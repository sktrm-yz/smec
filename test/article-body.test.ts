import { describe, expect, it } from "vitest";
import { splitBody } from "../src/client/lib/article-body";

describe("splitBody", () => {
  it("ウィジェットマーカーで本文を分割する", () => {
    const body = "## A\n\n本文1\n\n{{widget:supply-demand}}\n\n## B\n\n本文2";
    expect(splitBody(body)).toEqual([
      { type: "markdown", content: "## A\n\n本文1\n\n" },
      { type: "widget", name: "supply-demand" },
      { type: "markdown", content: "\n\n## B\n\n本文2" },
    ]);
  });

  it("マーカーがなければ全体が1つの markdown", () => {
    expect(splitBody("## A\n\n本文")).toEqual([
      { type: "markdown", content: "## A\n\n本文" },
    ]);
  });

  it("複数マーカーにも対応する", () => {
    const parts = splitBody("a{{widget:x-1}}b{{widget:y-2}}c");
    expect(parts.map((p) => p.type)).toEqual([
      "markdown",
      "widget",
      "markdown",
      "widget",
      "markdown",
    ]);
  });
});
