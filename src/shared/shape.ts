import type {
  Article,
  ArticleNav,
  ArticleRow,
  Question,
  QuestionRow,
  Section,
  SectionRow,
} from "./types";

// 記事番号ラベル（例: "1-2" = 科目1の2番目）。サムネや前後ナビで使う
function numbering(
  sections: SectionRow[],
  articles: ArticleRow[],
): Map<number, string> {
  const map = new Map<number, string>();
  const ordered = [...sections].sort((a, b) => a.sort_order - b.sort_order);
  ordered.forEach((section, si) => {
    articles
      .filter((a) => a.section_id === section.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .forEach((article, ai) => {
        map.set(article.id, `${si + 1}-${ai + 1}`);
      });
  });
  return map;
}

export function buildSections(
  sections: SectionRow[],
  articles: ArticleRow[],
): Section[] {
  const numbers = numbering(sections, articles);
  return [...sections]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      description: s.description,
      articles: articles
        .filter((a) => a.section_id === s.id)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          summary: a.summary,
          published: a.body !== null,
          no: numbers.get(a.id) ?? "",
        })),
    }));
}

export function buildArticle(
  slug: string,
  sections: SectionRow[],
  articles: ArticleRow[],
  questions: QuestionRow[],
): Article | null {
  const article = articles.find((a) => a.slug === slug);
  if (!article || article.body === null) return null;
  const section = sections.find((s) => s.id === article.section_id);
  if (!section) return null;

  const numbers = numbering(sections, articles);
  const sectionOrder = new Map(sections.map((s) => [s.id, s.sort_order]));
  // 前後ナビは公開済み記事のみを全科目通しの順で辿る
  const published = articles
    .filter((a) => a.body !== null)
    .sort(
      (a, b) =>
        (sectionOrder.get(a.section_id) ?? 0) -
          (sectionOrder.get(b.section_id) ?? 0) || a.sort_order - b.sort_order,
    );
  const index = published.findIndex((a) => a.id === article.id);
  const toNav = (a: ArticleRow | undefined): ArticleNav =>
    a
      ? {
          slug: a.slug,
          title: a.title,
          no: numbers.get(a.id) ?? "",
          sectionId: a.section_id,
        }
      : null;

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    body: article.body,
    no: numbers.get(article.id) ?? "",
    sectionId: section.id,
    sectionName: section.name,
    sectionSlug: section.slug,
    questions: questions
      .filter((q) => q.article_id === article.id)
      .map(
        (q): Question => ({
          id: q.id,
          question: q.question,
          choices: JSON.parse(q.choices) as string[],
          answerIndex: q.answer_index,
          explanation: q.explanation,
        }),
      ),
    prev: toNav(published[index - 1]),
    next: toNav(published[index + 1]),
  };
}
