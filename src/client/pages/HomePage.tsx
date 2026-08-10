import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Section } from "@/types";

export default function HomePage() {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/sections")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ sections: Section[] }>;
      })
      .then((data: { sections: Section[] }) => setSections(data.sections))
      .catch(() => setError(true));
  }, []);

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
    <div className="flex flex-col gap-6">
      {sections.map((section, i) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">科目{i + 1}</span>
              {section.name}
            </CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col">
              {section.articles.map((article, j) => (
                <li
                  key={article.id}
                  className="border-t border-border first:border-t-0"
                >
                  {article.published ? (
                    <Link
                      to={`/articles/${article.slug}`}
                      className="flex items-center gap-3 py-2.5 text-sm hover:underline"
                    >
                      <span className="w-6 shrink-0 text-right text-xs text-muted-foreground">
                        {j + 1}
                      </span>
                      {article.title}
                    </Link>
                  ) : (
                    <span className="flex items-center gap-3 py-2.5 text-sm text-muted-foreground">
                      <span className="w-6 shrink-0 text-right text-xs">
                        {j + 1}
                      </span>
                      {article.title}
                      <Badge variant="outline">準備中</Badge>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
