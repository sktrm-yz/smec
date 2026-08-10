import { useState } from "react";
import { LineChart, trend } from "./chart";
import { SliderRow, WidgetBox } from "./WidgetBox";

// IS: r = 80 - 0.6Y + g / LM: r = 20 + 0.6Y - m（Y, r は 0..100 の抽象単位）
// 基準の均衡は Y*=50, r*=50
export function IslmWidget() {
  const [g, setG] = useState(0); // 財政政策（IS シフト）
  const [m, setM] = useState(0); // 金融政策（LM シフト）

  const yEq = (60 + g + m) / 1.2;
  const rEq = 20 + 0.6 * yEq - m;

  return (
    <WidgetBox
      title="IS-LM 分析 シミュレータ"
      description="財政政策は IS 曲線を、金融政策は LM 曲線をシフトさせます。スライダーで政策を発動して、国民所得 Y と利子率 r がどう動くか確かめましょう。薄い線が政策前です。"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <LineChart
          ariaLabel="IS曲線とLM曲線のグラフ"
          xLabel="国民所得 Y"
          yLabel="利子率 r"
          eqXLabel="Y*"
          eqYLabel="r*"
          eq={{ x: yEq, y: rEq }}
          lines={[
            {
              label: "IS",
              yAt: (y) => 80 - 0.6 * y + g,
              baseYAt: (y) => 80 - 0.6 * y,
            },
            {
              label: "LM",
              yAt: (y) => 20 + 0.6 * y - m,
              baseYAt: (y) => 20 + 0.6 * y,
              muted: true,
            },
          ]}
        />
        <div className="flex w-full flex-col gap-4">
          <SliderRow
            label="財政政策（政府支出）"
            value={g}
            min={-25}
            max={25}
            onChange={setG}
            minLabel="緊縮 ←"
            maxLabel="→ 拡大"
          />
          <SliderRow
            label="金融政策（貨幣供給）"
            value={m}
            min={-25}
            max={25}
            onChange={setM}
            minLabel="引締め ←"
            maxLabel="→ 緩和"
          />
          <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">国民所得 Y*</dt>
              <dd className="font-bold">
                {trend(yEq - 50, "増加 ↑", "減少 ↓")}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">利子率 r*</dt>
              <dd className="font-bold">{trend(rEq - 50)}</dd>
            </div>
          </dl>
          <p className="text-xs text-muted-foreground">
            例: 財政拡大は Y↑・r↑（金利上昇が投資を抑える＝クラウディング
            アウト）。金融緩和は Y↑・r↓。両方使うと金利を抑えつつ Y
            を増やせます。
          </p>
        </div>
      </div>
    </WidgetBox>
  );
}
