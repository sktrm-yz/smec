-- sections: 1次試験の科目
CREATE TABLE smec_sections (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

-- articles: 記事。body が NULL のものは「準備中」
CREATE TABLE smec_articles (
  id INTEGER PRIMARY KEY,
  section_id INTEGER NOT NULL REFERENCES smec_sections(id),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT,
  sort_order INTEGER NOT NULL
);

-- questions: 記事ごとの3択練習問題。choices は JSON 配列
CREATE TABLE smec_questions (
  id INTEGER PRIMARY KEY,
  article_id INTEGER NOT NULL REFERENCES smec_articles(id),
  question TEXT NOT NULL,
  choices TEXT NOT NULL,
  answer_index INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE INDEX idx_smec_articles_section ON smec_articles(section_id, sort_order);
CREATE INDEX idx_smec_questions_article ON smec_questions(article_id, sort_order);
