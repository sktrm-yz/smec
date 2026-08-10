import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WidgetBox } from "./WidgetBox";

type Sign = "plus" | "minus";

const CF_TYPES = [
  { key: "operating", label: "営業CF" },
  { key: "investing", label: "投資CF" },
  { key: "financing", label: "財務CF" },
] as const;

function diagnose(op: Sign, inv: Sign, fin: Sign): string {
  if (op === "plus" && inv === "minus" && fin === "minus")
    return "優良企業型: 本業で稼ぎ、将来へ投資し、借入も返済。最も健全なパターンです。";
  if (op === "plus" && inv === "minus" && fin === "plus")
    return "成長企業型: 本業で稼ぎつつ、さらに資金を調達して積極投資しています。";
  if (op === "plus" && inv === "plus" && fin === "minus")
    return "リストラ型: 本業は黒字ですが、資産を売却しながら借入を返しています。事業の縮小局面かもしれません。";
  if (op === "minus" && inv === "plus" && fin === "plus")
    return "危険信号: 本業で稼げず、資産売却と借入でしのいでいます。資金繰りが厳しい状態です。";
  if (op === "minus" && inv === "minus" && fin === "plus")
    return "スタートアップ型: 本業はまだ赤字ですが、調達した資金で投資を続けています。将来性次第です。";
  if (op === "minus" && inv === "plus" && fin === "minus")
    return "衰退型: 本業が赤字で、資産を売って借金を返している状態。かなり厳しい局面です。";
  if (op === "plus" && inv === "plus" && fin === "plus")
    return "現金積み上げ型: すべてプラスは珍しいパターン。大型投資や還元の前に現金を貯めている可能性があります。";
  return "要注意: 本業が赤字のまま投資を続け、返済も進めるのは長くは続きません。";
}

export function CfPatternWidget() {
  const [signs, setSigns] = useState<Record<string, Sign>>({
    operating: "plus",
    investing: "minus",
    financing: "minus",
  });

  return (
    <WidgetBox
      title="キャッシュフロー・パターン診断"
      description="3つのキャッシュフローのプラス・マイナスの組み合わせから、会社の状態を診断してみましょう。同じ「現金が増えた」でも、どこで増えたかで意味がまったく違います。"
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {CF_TYPES.map((cf) => (
            <div
              key={cf.key}
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background p-3"
            >
              <span className="text-sm font-medium">{cf.label}</span>
              <div className="flex gap-1">
                {(["plus", "minus"] as const).map((sign) => (
                  <Button
                    key={sign}
                    type="button"
                    size="sm"
                    variant={signs[cf.key] === sign ? "default" : "outline"}
                    onClick={() => setSigns((s) => ({ ...s, [cf.key]: sign }))}
                  >
                    {sign === "plus" ? "＋" : "−"}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="rounded-lg border border-border bg-background p-3 text-sm">
          {diagnose(
            signs.operating ?? "plus",
            signs.investing ?? "minus",
            signs.financing ?? "minus",
          )}
        </p>
      </div>
    </WidgetBox>
  );
}
