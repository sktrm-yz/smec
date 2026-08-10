import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArticleThumb } from "@/components/ArticleThumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { useInitialData } from "@/data";
import type { ArticleSummary, Section } from "@/types";

export default function HomePage() {
  const initial = useInitialData();
  const [sections, setSections] = useState<Section[] | null>(
    initial.sections ?? null,
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initial.sections) return;
    fetch("/api/sections")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ sections: Section[] }>;
      })
      .then((data) => setSections(data.sections))
      .catch(() => setError(true));
  }, [initial.sections]);

  if (error) {
    return (
      <p className="text-sm text-muted-foreground">
        データの取得に失敗しました。時間をおいて再読み込みしてください。
      </p>
    );
  }
  if (!sections) {
    return <p className="text-sm text-muted-foreground">読み込み中…</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, i) => (
        <section key={section.id} className="flex flex-col gap-3">
          <div className="border-b border-border pb-2">
            <h2 className="flex items-baseline gap-2 font-bold">
              <span className="text-sm text-muted-foreground">科目{i + 1}</span>
              {section.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {section.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {section.articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                sectionId={section.id}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ArticleCard({
  article,
  sectionId,
}: {
  article: ArticleSummary;
  sectionId: number;
}) {
  return (
    <Card className="relative flex h-28 flex-row overflow-hidden transition-colors hover:bg-muted/50">
      {article.published && (
        <Link
          to={`/articles/${article.slug}`}
          aria-label={article.title}
          className="absolute inset-0"
        />
      )}
      <ArticleThumb
        slug={article.slug}
        no={article.no}
        sectionId={sectionId}
        title={article.title}
        className="w-2/5"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3">
        <CardTitle
          className={
            article.published
              ? "line-clamp-2 text-sm leading-snug"
              : "line-clamp-2 text-sm leading-snug text-muted-foreground"
          }
        >
          {article.title}
        </CardTitle>
        {article.published ? (
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {article.summary}
          </p>
        ) : (
          <Badge variant="outline" className="w-fit">
            準備中
          </Badge>
        )}
      </div>
    </Card>
  );
}
