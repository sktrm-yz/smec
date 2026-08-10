import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 価格 P=10、固定費 FC=200、変動費 VC=0.1q²（限界費用 MC=0.2q）
// 利潤最大は MC = P、つまり q = 50
const P = 10;
const FC = 200;

export function CostProfitWidget() {
  const [q, setQ] = useState(20);
  const revenue = P * q;
  const cost = FC + 0.1 * q * q;
  const profit = revenue - cost;
  const mc = 0.2 * q;

  const message =
    mc < P - 0.4
      ? "限界費用 < 価格。もう1個作ると利潤が増えます。生産量を増やしましょう。"
      : mc > P + 0.4
        ? "限界費用 > 価格。作りすぎです。最後の1個は赤字を生んでいます。"
        : "限界費用 = 価格。ここが利潤最大の生産量です！";

  const bars = [
    { label: "収入", value: revenue, max: 800 },
    { label: "総費用", value: cost, max: 800 },
  ];

  return (
    <WidgetBox
      title="利潤最大化 シミュレータ"
      description="価格10円のパンを作る工場です。生産量を動かして、利潤が最大になる点（限界費用 = 価格）を探してみましょう。固定費200円、作るほど1個あたりの追加費用（限界費用）は増えていきます。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`生産量: ${q} 個`}
          value={q}
          min={0}
          max={80}
          onChange={setQ}
          minLabel="0個"
          maxLabel="80個"
        />
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-3">
          {bars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-xs text-muted-foreground">
                {bar.label}
              </span>
              <div className="h-4 flex-1 rounded-sm bg-border/40">
                <div
                  className="h-full rounded-sm bg-foreground/60"
                  style={{
                    width: `${Math.min((bar.value / bar.max) * 100, 100)}%`,
                  }}
                />
              </div>
              <span className="w-16 shrink-0 text-right font-mono text-xs">
                {Math.round(bar.value)}円
              </span>
            </div>
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">
              利潤（収入 − 総費用）
            </dt>
            <dd className="font-bold">{Math.round(profit)}円</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">限界費用 MC</dt>
            <dd className="font-bold">
              {mc.toFixed(1)}円（価格は {P}円）
            </dd>
          </div>
        </dl>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </WidgetBox>
  );
}
