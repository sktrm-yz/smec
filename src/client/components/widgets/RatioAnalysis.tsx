import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// ROA = 売上高利益率 × 総資産回転率 の分解（デュポン分析）を体感する
export function RatioAnalysisWidget() {
  const [profit, setProfit] = useState(50); // 当期純利益（億円）
  const [sales, setSales] = useState(1000); // 売上高（億円）
  const [assets, setAssets] = useState(1000); // 総資産（億円）

  const margin = (profit / sales) * 100;
  const turnover = sales / assets;
  const roa = (profit / assets) * 100;

  const message =
    roa >= 8
      ? "ROA 8%以上は優良水準。利益率と回転率のバランスが取れています。"
      : margin < 3
        ? "利益率が低めです。薄利多売型なら回転率で稼ぐ戦略（スーパーなど）もあります。"
        : turnover < 0.7
          ? "回転率が低めです。資産をたくさん使う装置産業型。利益率で稼ぐ必要があります。"
          : "利益率×回転率のかけ算で ROA が決まります。どちらを伸ばすかが経営の腕の見せどころです。";

  return (
    <WidgetBox
      title="収益性分析（デュポン分解）シミュレータ"
      description="利益・売上高・総資産を動かして、ROA が「売上高利益率 × 総資産回転率」に分解できることを確かめましょう。同じ ROA でも、稼ぎ方のタイプが見えてきます。"
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <SliderRow
            label={`当期純利益: ${profit}億円`}
            value={profit}
            min={10}
            max={150}
            step={10}
            onChange={setProfit}
          />
          <SliderRow
            label={`売上高: ${sales}億円`}
            value={sales}
            min={500}
            max={3000}
            step={100}
            onChange={setSales}
          />
          <SliderRow
            label={`総資産: ${assets}億円`}
            value={assets}
            min={500}
            max={3000}
            step={100}
            onChange={setAssets}
          />
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="text-center text-sm">
            <span className="font-bold">ROA {roa.toFixed(1)}%</span>
            <span className="text-muted-foreground"> ＝ </span>
            売上高利益率 <span className="font-bold">{margin.toFixed(1)}%</span>
            <span className="text-muted-foreground"> × </span>
            総資産回転率{" "}
            <span className="font-bold">{turnover.toFixed(2)}回</span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </WidgetBox>
  );
}
