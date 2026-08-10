import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WidgetBox } from "./WidgetBox";

export type SortItem = { text: string; answer: string; note: string };

/** 項目をカテゴリに分類するチャレンジの汎用実装 */
export function SortQuiz({
  title,
  description,
  categories,
  items,
}: {
  title: string;
  description: string;
  categories: { key: string; label: string }[];
  items: SortItem[];
}) {
  const [picks, setPicks] = useState<Record<number, string>>({});
  const answered = Object.keys(picks).length;
  const correct = items.filter((item, i) => picks[i] === item.answer).length;

  return (
    <WidgetBox title={title} description={description}>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => {
          const pick = picks[i];
          const isCorrect = pick === item.answer;
          return (
            <li
              key={item.text}
              className="flex flex-col gap-1.5 rounded-lg border border-border bg-background p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex-1 text-sm">{item.text}</span>
                {categories.map((cat) => (
                  <Button
                    key={cat.key}
                    type="button"
                    size="sm"
                    variant={pick === cat.key ? "default" : "outline"}
                    className={
                      pick === cat.key ? "disabled:opacity-100" : undefined
                    }
                    disabled={pick !== undefined}
                    onClick={() => setPicks((p) => ({ ...p, [i]: cat.key }))}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
              {pick !== undefined && (
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  {isCorrect ? (
                    <CheckIcon className="size-3.5 shrink-0" />
                  ) : (
                    <XIcon className="size-3.5 shrink-0" />
                  )}
                  {isCorrect ? "正解！" : "残念。"}
                  {item.note}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      {answered === items.length && (
        <p className="mt-3 text-sm font-bold">
          結果: {items.length} 問中 {correct} 問正解
          {correct === items.length
            ? " — 完璧です！"
            : " — 間違えた項目の解説を見直してみましょう。"}
        </p>
      )}
    </WidgetBox>
  );
}
