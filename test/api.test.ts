import { describe, expect, it } from "vitest";
import { createApi } from "../src/worker/api";

type Row = Record<string, unknown>;

// D1 の最小モック。SQL 文字列の特徴でどのクエリかを判定して結果を返す
function fakeDb(data: { sections: Row[]; articles: Row[]; questions: Row[] }) {
  const run = (sql: string, params: unknown[]) => {
    if (sql.includes("FROM sections")) return data.sections;
    if (sql.includes("FROM articles")) return data.articles;
    if (sql.includes("FROM questions")) {
      return data.questions.filter((q) => q.article_id === params[0]);
    }
    return [];
  };
  return {
    prepare(sql: string) {
      const stmt = (params: unknown[]) => ({
        all: async () => ({ results: run(sql, params) }),
        first: async () => run(sql, params)[0] ?? null,
        bind: (...next: unknown[]) => stmt(next),
      });
      return stmt([]);
    },
  } as unknown as D1Database;
}

const db = fakeDb({
  sections: [
    {
      id: 1,
      slug: "economics",
      name: "経済学・経済政策",
      description: "d",
      sort_order: 1,
    },
  ],
  articles: [
    {
      id: 101,
      section_id: 1,
      slug: "econ-intro",
      title: "経済学入門",
      summary: "s",
      body: "## 本文",
      sort_order: 101,
    },
    {
      id: 102,
      section_id: 1,
      slug: "econ-wip",
      title: "準備中の記事",
      summary: "s",
      body: null,
      sort_order: 102,
    },
  ],
  questions: [
    {
      id: 1,
      article_id: 101,
      question: "Q1",
      choices: '["a","b","c"]',
      answer_index: 1,
      explanation: "e",
    },
  ],
});

function request(path: string) {
  return createApi().request(path, {}, { DB: db });
}

describe("GET /sections", () => {
  it("科目と記事一覧を返す", async () => {
    const res = await request("/sections");
    expect(res.status).toBe(200);
    const json = (await res.json()) as {
      sections: { slug: string; articles: { published: boolean }[] }[];
    };
    expect(json.sections).toHaveLength(1);
    expect(json.sections[0].slug).toBe("economics");
    expect(json.sections[0].articles).toHaveLength(2);
    expect(json.sections[0].articles[0].published).toBe(true);
    expect(json.sections[0].articles[1].published).toBe(false);
  });
});

describe("GET /articles/:slug", () => {
  it("記事本文と問題を返す", async () => {
    const res = await request("/articles/econ-intro");
    expect(res.status).toBe(200);
    const json = (await res.json()) as {
      article: {
        title: string;
        no: string;
        questions: { choices: string[] }[];
      };
    };
    expect(json.article.title).toBe("経済学入門");
    expect(json.article.no).toBe("1-1");
    expect(json.article.questions).toHaveLength(1);
    expect(json.article.questions[0].choices).toEqual(["a", "b", "c"]);
  });

  it("存在しない記事は404", async () => {
    const res = await request("/articles/nope");
    expect(res.status).toBe(404);
  });

  it("本文のない記事（準備中）は404", async () => {
    const res = await request("/articles/econ-wip");
    expect(res.status).toBe(404);
  });
});
