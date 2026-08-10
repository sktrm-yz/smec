import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 継続価値（成長永久年金）: 企業価値 = FCF ÷ (r - g)
export function DcfWidget() {
  const [fcf, setFcf] = useState(10); // 毎年のフリーキャッシュフロー（億円）
  const [r, setR] = useState(8); // 割引率 WACC（%）
  const [g, setG] = useState(2); // 成長率（%）

  const valid = r > g;
  const value = valid ? (fcf / (r - g)) * 100 : null;

  return (
    <WidgetBox
      title="DCF法 企業価値シミュレータ"
      description="毎年 FCF を生み続け、一定率で成長する会社の価値は「FCF ÷ (割引率 − 成長率)」で計算できます（成長永久年金）。分母のわずかな差が価値を大きく動かすことを体感しましょう。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`毎年のFCF: ${fcf}億円`}
          value={fcf}
          min={5}
          max={30}
          onChange={setFcf}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <SliderRow
            label={`割引率 r: ${r}%`}
            value={r}
            min={4}
            max={15}
            onChange={setR}
          />
          <SliderRow
            label={`成長率 g: ${g}%`}
            value={g}
            min={0}
            max={6}
            onChange={setG}
          />
        </div>
        <div className="rounded-lg border border-border bg-background p-3 text-center text-sm">
          {valid ? (
            <>
              企業価値 ＝ {fcf}億円 ÷ ({r}% − {g}%) ＝{" "}
              <span className="text-lg font-bold">{value?.toFixed(0)}億円</span>
            </>
          ) : (
            <span className="font-bold">
              r ≦ g
              では計算できません（価値が無限大に発散）。成長率は割引率より低い前提が必要です。
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          割引率を1%下げる、成長率を1%上げるだけで価値は大きく変わります。DCF
          の結果が前提に敏感なのはこのためで、実務では複数シナリオで幅を持って評価します。
        </p>
      </div>
    </WidgetBox>
  );
}
