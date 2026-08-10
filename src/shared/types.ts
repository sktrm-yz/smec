export type ArticleSummary = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  published: boolean;
  no: string;
};

export type Section = {
  id: number;
  slug: string;
  name: string;
  description: string;
  articles: ArticleSummary[];
};

export type Question = {
  id: number;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type ArticleNav = {
  slug: string;
  title: string;
  no: string;
  sectionId: number;
} | null;

export type Article = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: string;
  no: string;
  sectionId: number;
  sectionName: string;
  sectionSlug: string;
  questions: Question[];
  prev: ArticleNav;
  next: ArticleNav;
};

export type SectionRow = {
  id: number;
  slug: string;
  name: string;
  description: string;
  sort_order: number;
};

export type ArticleRow = {
  id: number;
  section_id: number;
  slug: string;
  title: string;
  summary: string;
  body: string | null;
  sort_order: number;
};

export type QuestionRow = {
  id: number;
  article_id: number;
  question: string;
  choices: string;
  answer_index: number;
  explanation: string;
};
