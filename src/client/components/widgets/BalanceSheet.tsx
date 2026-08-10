import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 総資産100の会社で負債の割合を動かし、B/S の構造と自己資本比率を体感する
export function BalanceSheetWidget() {
  const [debt, setDebt] = useState(40);
  const equity = 100 - debt;

  const message =
    equity >= 50
      ? "自己資本比率50%以上。財務の安全性はかなり高い状態です。"
      : equity >= 30
        ? "自己資本比率30〜50%。一般に健全といわれる水準です。"
        : equity >= 10
          ? "自己資本比率が低め。借入依存度が高く、金利上昇や不況に弱くなります。"
          : "自己資本がほとんどありません。債務超過寸前の危険な状態です。";

  return (
    <WidgetBox
      title="貸借対照表バランス シミュレータ"
      description="総資産100の会社です。負債（借入など）の割合を動かして、貸借対照表の右側の構成と自己資本比率がどう変わるか見てみましょう。左右の合計は必ず一致します。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`負債: ${debt}`}
          value={debt}
          min={0}
          max={95}
          step={5}
          onChange={setDebt}
          minLabel="無借金"
          maxLabel="借金漬け"
        />
        <div className="flex gap-2 rounded-lg border border-border bg-background p-3">
          <div className="flex h-40 flex-1 flex-col overflow-hidden rounded-sm border border-border">
            <div className="flex flex-1 items-center justify-center bg-foreground/10 text-xs font-bold">
              資産 100
            </div>
          </div>
          <div className="flex h-40 flex-1 flex-col overflow-hidden rounded-sm border border-border">
            {debt > 0 && (
              <div
                className="flex items-center justify-center overflow-hidden bg-foreground/35 text-xs font-bold"
                style={{ height: `${debt}%` }}
              >
                負債 {debt}
              </div>
            )}
            {equity > 0 && (
              <div
                className="flex items-center justify-center overflow-hidden bg-foreground/70 text-xs font-bold text-background"
                style={{ height: `${equity}%` }}
              >
                純資産 {equity}
              </div>
            )}
          </div>
        </div>
        <dl className="rounded-lg border border-border bg-background p-3 text-sm">
          <dt className="text-xs text-muted-foreground">
            自己資本比率（純資産 ÷ 総資産）
          </dt>
          <dd className="font-bold">{equity}%</dd>
        </dl>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </WidgetBox>
  );
}
