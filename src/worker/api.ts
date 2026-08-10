import { Hono } from "hono";

type Env = {
  DB: D1Database;
};

type SectionRow = {
  id: number;
  slug: string;
  name: string;
  description: string;
};

type ArticleRow = {
  id: number;
  section_id: number;
  slug: string;
  title: string;
  summary: string;
  published: number;
};

type QuestionRow = {
  id: number;
  question: string;
  choices: string;
  answer_index: number;
  explanation: string;
};

export function createApi() {
  const api = new Hono<{ Bindings: Env }>();

  api.get("/sections", async (c) => {
    const { results: sections } = await c.env.DB.prepare(
      "SELECT id, slug, name, description FROM sections ORDER BY sort_order",
    ).all<SectionRow>();
    const { results: articles } = await c.env.DB.prepare(
      "SELECT id, section_id, slug, title, summary, (body IS NOT NULL) AS published FROM articles ORDER BY sort_order",
    ).all<ArticleRow>();

    return c.json({
      sections: sections.map((s) => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        description: s.description,
        articles: articles
          .filter((a) => a.section_id === s.id)
          .map((a) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            summary: a.summary,
            published: a.published === 1,
          })),
      })),
    });
  });

  api.get("/articles/:slug", async (c) => {
    const slug = c.req.param("slug");
    const article = await c.env.DB.prepare(
      `SELECT a.id, a.slug, a.title, a.summary, a.body,
              s.name AS section_name, s.slug AS section_slug
       FROM articles a JOIN sections s ON s.id = a.section_id
       WHERE a.slug = ? AND a.body IS NOT NULL`,
    )
      .bind(slug)
      .first<{
        id: number;
        slug: string;
        title: string;
        summary: string;
        body: string;
        section_name: string;
        section_slug: string;
      }>();

    if (!article) {
      return c.json({ error: "not found" }, 404);
    }

    const { results: questions } = await c.env.DB.prepare(
      "SELECT id, question, choices, answer_index, explanation FROM questions WHERE article_id = ? ORDER BY sort_order",
    )
      .bind(article.id)
      .all<QuestionRow>();

    return c.json({
      article: {
        id: article.id,
        slug: article.slug,
        title: article.title,
        summary: article.summary,
        body: article.body,
        sectionName: article.section_name,
        sectionSlug: article.section_slug,
        questions: questions.map((q) => ({
          id: q.id,
          question: q.question,
          choices: JSON.parse(q.choices) as string[],
          answerIndex: q.answer_index,
          explanation: q.explanation,
        })),
      },
    });
  });

  return api;
}
