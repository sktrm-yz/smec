import { useState } from "react";
import { LineChart } from "./chart";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 売上高線 y = x（販売単価1）と総費用線 y = FC + v・x の交点が損益分岐点
export function CvpWidget() {
  const [fc, setFc] = useState(30); // 固定費
  const [v10, setV10] = useState(5); // 変動費率 ×10
  const v = v10 / 10;

  const bepX = Math.min(fc / (1 - v), 100);
  const bepY = Math.min(bepX, 100);
  const currentSales = 100;
  const profit = currentSales - (fc + v * currentSales);
  const mRatio = 1 - v; // 限界利益率

  return (
    <WidgetBox
      title="損益分岐点 シミュレータ"
      description="固定費と変動費率を動かして、売上高線と総費用線の交点（損益分岐点）がどう動くか見てみましょう。交点より右なら黒字、左なら赤字です。"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <LineChart
          ariaLabel="損益分岐点のグラフ"
          xLabel="売上高"
          yLabel="金額"
          eqXLabel="BEP"
          eqYLabel=""
          eq={{ x: bepX, y: bepY }}
          lines={[
            { label: "売上高", yAt: (x) => x },
            {
              label: "総費用",
              yAt: (x) => fc + v * x,
              baseYAt: (x) => 30 + 0.5 * x,
              muted: true,
            },
          ]}
        />
        <div className="flex w-full flex-col gap-4">
          <SliderRow
            label={`固定費: ${fc}`}
            value={fc}
            min={10}
            max={60}
            step={5}
            onChange={setFc}
            minLabel="小さい"
            maxLabel="大きい"
          />
          <SliderRow
            label={`変動費率: ${v.toFixed(1)}（限界利益率 ${mRatio.toFixed(1)}）`}
            value={v10}
            min={2}
            max={8}
            onChange={setV10}
            minLabel="0.2"
            maxLabel="0.8"
          />
          <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">
                損益分岐点売上高
              </dt>
              <dd className="font-bold">
                {bepX >= 100 ? "100超（赤字圏）" : bepX.toFixed(0)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                売上100のときの利益
              </dt>
              <dd className="font-bold">{profit.toFixed(0)}</dd>
            </div>
          </dl>
          <p className="text-xs text-muted-foreground">
            損益分岐点売上高 = 固定費 ÷
            限界利益率。固定費が大きいほど、変動費率が高いほど、分岐点は右へ動きます。
          </p>
        </div>
      </div>
    </WidgetBox>
  );
}
