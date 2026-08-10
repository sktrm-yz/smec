import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { ArticleThumb } from "@/components/ArticleThumb";
import Quiz from "@/components/Quiz";
import { Card, CardTitle } from "@/components/ui/card";
import { useInitialData } from "@/data";
import type { Article, ArticleNav } from "@/types";

export default function ArticlePage() {
  const { slug } = useParams();
  const initial = useInitialData();
  const [article, setArticle] = useState<Article | null>(
    initial.article?.slug === slug ? (initial.article ?? null) : null,
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug || article?.slug === slug) return;
    setArticle(null);
    setError(false);
    fetch(`/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ article: Article }>;
      })
      .then((data) => setArticle(data.article))
      .catch(() => setError(true));
  }, [slug, article?.slug]);

  // 記事間の遷移でスクロール位置を先頭へ戻す
  useEffect(() => {
    if (slug) window.scrollTo(0, 0);
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
      <p className="text-sm text-muted-foreground">
        {article.no}　{article.sectionName}
      </p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight">
        {article.title}
      </h2>
      <div className="prose-article mt-6">
        <Markdown remarkPlugins={[remarkGfm]}>{article.body}</Markdown>
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

      <nav className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
        {article.prev ? (
          <NavCard nav={article.prev} direction="prev" />
        ) : (
          <span />
        )}
        {article.next ? (
          <NavCard nav={article.next} direction="next" />
        ) : (
          <span />
        )}
      </nav>

      <div className="mt-8">
        <Link to="/" className="text-sm underline">
          一覧へ戻る
        </Link>
      </div>
    </article>
  );
}

function NavCard({
  nav,
  direction,
}: {
  nav: NonNullable<ArticleNav>;
  direction: "prev" | "next";
}) {
  return (
    <Card className="relative flex h-28 flex-row overflow-hidden transition-colors hover:bg-muted/50">
      <Link
        to={`/articles/${nav.slug}`}
        aria-label={nav.title}
        className="absolute inset-0"
      />
      <ArticleThumb
        slug={nav.slug}
        no={nav.no}
        sectionId={nav.sectionId}
        title={nav.title}
        className="w-2/5"
      />
      <div className="flex min-w-0 flex-col justify-center gap-1.5 p-3">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          {direction === "prev" ? (
            <>
              <ChevronLeftIcon className="size-3.5" />
              前の記事
            </>
          ) : (
            <>
              次の記事
              <ChevronRightIcon className="size-3.5" />
            </>
          )}
        </span>
        <CardTitle className="line-clamp-2 text-sm leading-snug">
          {nav.title}
        </CardTitle>
      </div>
    </Card>
  );
}
