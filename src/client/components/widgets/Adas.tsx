import { useState } from "react";
import { LineChart, trend } from "./chart";
import { SliderRow, WidgetBox } from "./WidgetBox";

// AD: P = 80 - 0.6Y + a / AS: P = 20 + 0.6Y - s（Y, P は 0..100 の抽象単位）
// 基準の均衡は Y*=50, P*=50
export function AdasWidget() {
  const [a, setA] = useState(0); // 総需要ショック
  const [s, setS] = useState(0); // 総供給ショック

  const yEq = (60 + a + s) / 1.2;
  const pEq = 20 + 0.6 * yEq - s;

  const isStagflation = s < -5;

  return (
    <WidgetBox
      title="AD-AS 分析 シミュレータ"
      description="総需要（AD）と総供給（AS）のシフトで、物価と GDP が同時にどう動くかを見るのがこの分析です。原油高などの供給ショック（ASを左シフト）で何が起きるかも試してみましょう。"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <LineChart
          ariaLabel="AD曲線とAS曲線のグラフ"
          xLabel="GDP Y"
          yLabel="物価 P"
          eqXLabel="Y*"
          eqYLabel="P*"
          eq={{ x: yEq, y: pEq }}
          lines={[
            {
              label: "AD",
              yAt: (y) => 80 - 0.6 * y + a,
              baseYAt: (y) => 80 - 0.6 * y,
            },
            {
              label: "AS",
              yAt: (y) => 20 + 0.6 * y - s,
              baseYAt: (y) => 20 + 0.6 * y,
              muted: true,
            },
          ]}
        />
        <div className="flex w-full flex-col gap-4">
          <SliderRow
            label="総需要 AD のシフト（政策・消費マインドなど）"
            value={a}
            min={-25}
            max={25}
            onChange={setA}
            minLabel="縮小 ←"
            maxLabel="→ 拡大"
          />
          <SliderRow
            label="総供給 AS のシフト（原油価格・生産性など）"
            value={s}
            min={-25}
            max={25}
            onChange={setS}
            minLabel="悪化 ←"
            maxLabel="→ 改善"
          />
          <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">GDP Y*</dt>
              <dd className="font-bold">
                {trend(yEq - 50, "増加 ↑", "減少 ↓")}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">物価 P*</dt>
              <dd className="font-bold">{trend(pEq - 50)}</dd>
            </div>
          </dl>
          <p className="text-xs text-muted-foreground">
            {isStagflation
              ? "供給ショックの悪化で「物価上昇 + GDP減少」が同時に起きています。これがスタグフレーションです。"
              : "需要の拡大は物価も GDP も押し上げます（ディマンドプル・インフレ）。"}
          </p>
        </div>
      </div>
    </WidgetBox>
  );
}
