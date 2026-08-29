import { Hono } from "hono";
import { buildArticle, buildSections } from "../shared/shape";
import type { ArticleRow, QuestionRow, SectionRow } from "../shared/types";

type Env = {
  DB: D1Database;
};

async function loadRows(db: D1Database) {
  const [sections, articles] = await Promise.all([
    db
      .prepare(
        "SELECT id, slug, name, description, sort_order FROM smec_sections",
      )
      .all<SectionRow>(),
    db
      .prepare(
        "SELECT id, section_id, slug, title, summary, body, sort_order FROM smec_articles",
      )
      .all<ArticleRow>(),
  ]);
  return { sections: sections.results, articles: articles.results };
}

export function createApi() {
  const api = new Hono<{ Bindings: Env }>();

  api.get("/sections", async (c) => {
    const { sections, articles } = await loadRows(c.env.DB);
    return c.json({ sections: buildSections(sections, articles) });
  });

  api.get("/articles/:slug", async (c) => {
    const slug = c.req.param("slug");
    const { sections, articles } = await loadRows(c.env.DB);
    const target = articles.find((a) => a.slug === slug);
    if (!target) return c.json({ error: "not found" }, 404);

    const { results: questions } = await c.env.DB.prepare(
      "SELECT id, article_id, question, choices, answer_index, explanation FROM smec_questions WHERE article_id = ? ORDER BY sort_order",
    )
      .bind(target.id)
      .all<QuestionRow>();

    const article = buildArticle(slug, sections, articles, questions);
    if (!article) return c.json({ error: "not found" }, 404);
    return c.json({ article });
  });

  return api;
}
