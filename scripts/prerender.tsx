// ビルド時プリレンダリング（SEO 対応）
// ローカル D1 からデータを取得し、全ルートを静的 HTML として dist/client に出力する。
// クライアント側は window.__DATA__ を初期データとしてハイドレーションする。
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../src/client/App";
import type { InitialData } from "../src/client/data";
import { buildArticle, buildSections } from "../src/shared/shape";
import type {
  ArticleRow,
  QuestionRow,
  SectionRow,
} from "../src/shared/types";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = resolve(ROOT, "dist/client");
const SITE_NAME = "中小企業診断士 学習ノート";

function d1Query<T>(sql: string): T[] {
  const out = execSync(
    `bunx wrangler d1 execute common-db --local --json --command "${sql}"`,
    { cwd: ROOT, encoding: "utf8", env: { ...process.env, CI: "1" } },
  );
  const parsed = JSON.parse(out) as { results: T[] }[];
  return parsed[0]?.results ?? [];
}

function escapeHtml(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}

function renderPage(
  template: string,
  path: string,
  data: InitialData,
  meta: { title: string; description: string },
): string {
  const html = renderToString(
    <StaticRouter location={path}>
      <App initialData={data} />
    </StaticRouter>,
  );
  const payload = JSON.stringify(data).replaceAll("</", "<\\/");
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>\n    <script>window.__DATA__=${payload}</script>`,
    );
}

const sections = d1Query<SectionRow>(
  "SELECT id, slug, name, description, sort_order FROM smec_sections",
);
const articles = d1Query<ArticleRow>(
  "SELECT id, section_id, slug, title, summary, body, sort_order FROM smec_articles",
);
const questions = d1Query<QuestionRow>(
  "SELECT id, article_id, question, choices, answer_index, explanation FROM smec_questions ORDER BY sort_order",
);

if (sections.length === 0) {
  throw new Error(
    "ローカル D1 が空です。bun run db:migrate:local && bun run db:seed:local を実行してください。",
  );
}

const template = readFileSync(resolve(DIST, "index.html"), "utf8");
const sectionData = buildSections(sections, articles);

// ホーム
writeFileSync(
  resolve(DIST, "index.html"),
  renderPage(
    template,
    "/",
    { sections: sectionData },
    {
      title: SITE_NAME,
      description:
        "中小企業診断士 1次試験の7科目をシラバス順に、わかりやすい記事と3択練習問題で学べる学習サイト。",
    },
  ),
);

// 公開済み記事
const published = articles.filter((a) => a.body !== null);
for (const row of published) {
  const article = buildArticle(row.slug, sections, articles, questions);
  if (!article) continue;
  const out = resolve(DIST, `articles/${row.slug}.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    renderPage(
      template,
      `/articles/${row.slug}`,
      { article },
      {
        title: `${article.title} | ${SITE_NAME}`,
        description: article.summary,
      },
    ),
  );
}

console.log(`prerendered: home + ${published.length} articles`);
