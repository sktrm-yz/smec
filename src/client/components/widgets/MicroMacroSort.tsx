import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WidgetBox } from "./WidgetBox";

type Item = { text: string; answer: "micro" | "macro"; note: string };

const ITEMS: Item[] = [
  {
    text: "りんごの価格の決まり方",
    answer: "micro",
    note: "個別の市場の話なのでミクロ",
  },
  {
    text: "日本の GDP の動き",
    answer: "macro",
    note: "国全体の経済活動なのでマクロ",
  },
  {
    text: "独占企業の価格戦略",
    answer: "micro",
    note: "個々の企業の行動なのでミクロ",
  },
  {
    text: "日銀の金融政策",
    answer: "macro",
    note: "国全体の物価・金利に関わるのでマクロ",
  },
  {
    text: "消費者のケーキとコーヒーの選び方",
    answer: "micro",
    note: "個々の消費者の行動なのでミクロ",
  },
  {
    text: "円安とインフレ",
    answer: "macro",
    note: "経済全体の物価・為替の話なのでマクロ",
  },
];

export function MicroMacroSortWidget() {
  const [picks, setPicks] = useState<Record<number, "micro" | "macro">>({});
  const answered = Object.keys(picks).length;
  const correct = ITEMS.filter((item, i) => picks[i] === item.answer).length;

  return (
    <WidgetBox
      title="ミクロ？ マクロ？ 分類チャレンジ"
      description="それぞれのテーマがミクロ経済学とマクロ経済学のどちらの話か、ボタンを押して分類してみましょう。"
    >
      <ul className="flex flex-col gap-2">
        {ITEMS.map((item, i) => {
          const pick = picks[i];
          const isCorrect = pick === item.answer;
          return (
            <li
              key={item.text}
              className="flex flex-col gap-1.5 rounded-lg border border-border bg-background p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex-1 text-sm">{item.text}</span>
                {(["micro", "macro"] as const).map((side) => (
                  <Button
                    key={side}
                    type="button"
                    size="sm"
                    variant={pick === side ? "default" : "outline"}
                    className={
                      pick === side ? "disabled:opacity-100" : undefined
                    }
                    disabled={pick !== undefined}
                    onClick={() => setPicks((p) => ({ ...p, [i]: side }))}
                  >
                    {side === "micro" ? "ミクロ" : "マクロ"}
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
                  {item.note}です。
                </p>
              )}
            </li>
          );
        })}
      </ul>
      {answered === ITEMS.length && (
        <p className="mt-3 text-sm font-bold">
          結果: {ITEMS.length} 問中 {correct} 問正解
          {correct === ITEMS.length
            ? " — 完璧です！"
            : " — 間違えた項目の解説を見直してみましょう。"}
        </p>
      )}
    </WidgetBox>
  );
}
