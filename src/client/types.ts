export type ArticleSummary = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  published: boolean;
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

export type Article = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: string;
  sectionName: string;
  sectionSlug: string;
  questions: Question[];
};
