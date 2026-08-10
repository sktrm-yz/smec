import { describe, expect, it } from "vitest";
import { buildArticle, buildSections } from "../src/shared/shape";
import type { ArticleRow, QuestionRow, SectionRow } from "../src/shared/types";

const sections: SectionRow[] = [
  { id: 1, slug: "economics", name: "経済学", description: "d", sort_order: 1 },
  { id: 2, slug: "finance", name: "財務", description: "d", sort_order: 2 },
];

const articles: ArticleRow[] = [
  {
    id: 101,
    section_id: 1,
    slug: "a1",
    title: "記事1",
    summary: "s",
    body: "本文1",
    sort_order: 101,
  },
  {
    id: 102,
    section_id: 1,
    slug: "a2",
    title: "記事2",
    summary: "s",
    body: "本文2",
    sort_order: 102,
  },
  {
    id: 103,
    section_id: 1,
    slug: "a3",
    title: "記事3(準備中)",
    summary: "s",
    body: null,
    sort_order: 103,
  },
  {
    id: 201,
    section_id: 2,
    slug: "b1",
    title: "記事4",
    summary: "s",
    body: "本文4",
    sort_order: 201,
  },
];

const questions: QuestionRow[] = [
  {
    id: 1,
    article_id: 101,
    question: "Q",
    choices: '["a","b","c"]',
    answer_index: 2,
    explanation: "e",
  },
];

describe("buildSections", () => {
  it("科目順に記事一覧と番号を組み立てる", () => {
    const result = buildSections(sections, articles);
    expect(result).toHaveLength(2);
    expect(result[0].articles.map((a) => a.no)).toEqual(["1-1", "1-2", "1-3"]);
    expect(result[0].articles[2].published).toBe(false);
    expect(result[1].articles[0].no).toEqual("2-1");
  });
});

describe("buildArticle", () => {
  it("問題と前後ナビを含む記事を返す", () => {
    const article = buildArticle("a2", sections, articles, questions);
    expect(article?.no).toBe("1-2");
    expect(article?.prev?.slug).toBe("a1");
    // 準備中(a3)は飛ばして次の公開記事(b1)へ
    expect(article?.next?.slug).toBe("b1");
    expect(article?.next?.sectionId).toBe(2);
  });

  it("先頭記事に prev はない", () => {
    const article = buildArticle("a1", sections, articles, questions);
    expect(article?.prev).toBeNull();
    expect(article?.questions[0]?.choices).toEqual(["a", "b", "c"]);
  });

  it("準備中の記事は null", () => {
    expect(buildArticle("a3", sections, articles, questions)).toBeNull();
  });

  it("存在しない slug は null", () => {
    expect(buildArticle("zz", sections, articles, questions)).toBeNull();
  });
});
