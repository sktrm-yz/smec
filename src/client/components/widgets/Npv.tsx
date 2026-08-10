import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 初期投資300、毎年のCFを5年間受け取る投資の NPV を計算する
const INVESTMENT = 300;
const YEARS = [1, 2, 3, 4, 5];

export function NpvWidget() {
  const [cf, setCf] = useState(80); // 毎年のキャッシュフロー
  const [r, setR] = useState(5); // 割引率（%）

  const rate = r / 100;
  const discounted = YEARS.map((y) => cf / (1 + rate) ** y);
  const pvTotal = discounted.reduce((a, b) => a + b, 0);
  const npv = pvTotal - INVESTMENT;

  return (
    <WidgetBox
      title="NPV（正味現在価値）シミュレータ"
      description="初期投資300万円で、5年間毎年キャッシュフローを生む設備を検討中です。将来のお金を割引率で現在価値に直すと、遠い年のお金ほど目減りします。NPV がプラスなら投資すべき、が判断ルールです。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`毎年のキャッシュフロー: ${cf}万円`}
          value={cf}
          min={50}
          max={120}
          step={5}
          onChange={setCf}
        />
        <SliderRow
          label={`割引率: ${r}%`}
          value={r}
          min={1}
          max={20}
          onChange={setR}
          minLabel="1%"
          maxLabel="20%"
        />
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="mb-2 text-xs text-muted-foreground">
            各年のCF {cf}万円の現在価値（割引後）
          </p>
          <div className="flex items-end gap-1.5">
            {discounted.map((pv, i) => (
              <div
                key={`year-${YEARS[i]}`}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-sm bg-foreground/70"
                  style={{ height: `${(pv / 120) * 56}px` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {YEARS[i]}年後
                </span>
                <span className="font-mono text-[10px]">{pv.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">現在価値の合計</dt>
            <dd className="font-bold">{pvTotal.toFixed(0)}万円</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">
              NPV（− 初期投資300）
            </dt>
            <dd className="font-bold">
              {npv >= 0 ? "+" : ""}
              {npv.toFixed(0)}万円
            </dd>
          </div>
        </dl>
        <p className="text-xs text-muted-foreground">
          {npv >= 0
            ? "NPV がプラス: この投資は企業価値を増やします。実行すべきです。"
            : "NPV がマイナス: 割引率（要求リターン）を満たせません。見送るべきです。割引率を下げるか、CF が増えれば逆転します。"}
        </p>
      </div>
    </WidgetBox>
  );
}
