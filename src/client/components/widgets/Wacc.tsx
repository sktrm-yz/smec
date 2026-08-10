import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// WACC = 負債比率 × 負債コスト × (1-税率) + 自己資本比率 × 株主資本コスト
const TAX = 0.3;

export function WaccWidget() {
  const [debtRatio, setDebtRatio] = useState(40); // 負債の割合（%）
  const [rd, setRd] = useState(2); // 負債コスト（%）
  const [re, setRe] = useState(8); // 株主資本コスト（%）

  const d = debtRatio / 100;
  const wacc = d * rd * (1 - TAX) + (1 - d) * re;

  return (
    <WidgetBox
      title="WACC（加重平均資本コスト）シミュレータ"
      description="会社の資金は負債（借入・社債）と自己資本（株式）で調達します。それぞれのコストを構成比で加重平均したものが WACC。負債の利息は節税効果があるため (1−税率) を掛けます（税率30%）。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`負債の割合: ${debtRatio}%（自己資本 ${100 - debtRatio}%）`}
          value={debtRatio}
          min={0}
          max={90}
          step={5}
          onChange={setDebtRatio}
          minLabel="無借金"
          maxLabel="借入依存"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <SliderRow
            label={`負債コスト（金利）: ${rd}%`}
            value={rd}
            min={1}
            max={10}
            onChange={setRd}
          />
          <SliderRow
            label={`株主資本コスト: ${re}%`}
            value={re}
            min={4}
            max={15}
            onChange={setRe}
          />
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="text-center text-sm">
            WACC ＝ {d.toFixed(1)} × {rd}% × (1−0.3) ＋ {(1 - d).toFixed(1)} ×{" "}
            {re}% ＝ <span className="font-bold">{wacc.toFixed(2)}%</span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {rd < re
            ? "負債コストは株主資本コストより低いのが普通（株主はリスクを取る分、高いリターンを要求）。負債を増やすと WACC は下がりますが、借りすぎると倒産リスクで両方のコストが上がり始めます。"
            : "負債コストが株主資本コスト以上になるのは異常事態。信用不安で金利が急騰した状態です。"}
        </p>
      </div>
    </WidgetBox>
  );
}
