import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Quiz from "@/components/Quiz";
import type { Article } from "@/types";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setArticle(null);
    setError(false);
    fetch(`/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ article: Article }>;
      })
      .then((data: { article: Article }) => setArticle(data.article))
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="text-sm text-muted-foreground">
        <p>記事が見つかりませんでした。</p>
        <Link to="/" className="mt-2 inline-block underline">
          一覧へ戻る
        </Link>
      </div>
    );
  }
  if (!article) {
    return <p className="text-sm text-muted-foreground">読み込み中…</p>;
  }

  return (
    <article>
      <p className="text-sm text-muted-foreground">{article.sectionName}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight">
        {article.title}
      </h2>
      <div className="prose-article mt-6">
        <Markdown>{article.body}</Markdown>
      </div>

      {article.questions.length > 0 && (
        <section className="mt-12">
          <h3 className="text-lg font-bold">練習問題</h3>
          <div className="mt-4 flex flex-col gap-6">
            {article.questions.map((q, i) => (
              <Quiz key={q.id} index={i + 1} question={q} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 border-t border-border pt-6">
        <Link to="/" className="text-sm underline">
          一覧へ戻る
        </Link>
      </div>
    </article>
  );
}
