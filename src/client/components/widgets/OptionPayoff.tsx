import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// コールオプション: 権利行使価格100、プレミアム10
const STRIKE = 100;
const PREMIUM = 10;

export function OptionPayoffWidget() {
  const [price, setPrice] = useState(100); // 満期時の株価

  const exercise = price > STRIKE;
  const payoff = Math.max(price - STRIKE, 0) - PREMIUM;

  const message = !exercise
    ? "株価が行使価格以下なので権利を放棄。損失はプレミアムの10に限定されます。ここがオプションの最大の特徴です。"
    : payoff < 0
      ? "権利行使はしますが（行使すればプレミアムの一部を回収できる）、まだプレミアム分を取り返せず損失です。"
      : payoff === 0
        ? "損益ゼロの分岐点。株価 = 行使価格 + プレミアム（110）です。"
        : "利益が出ています。株価が上がるほど利益は青天井で増えていきます。";

  return (
    <WidgetBox
      title="コールオプション損益 シミュレータ"
      description="「株を100で買う権利」をプレミアム10で購入しました。満期時の株価を動かして、損益がどう変わるか見てみましょう。損失は限定、利益は無限大という非対称な形が特徴です。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`満期時の株価: ${price}`}
          value={price}
          min={60}
          max={160}
          step={5}
          onChange={setPrice}
          minLabel="下落"
          maxLabel="上昇"
        />
        <dl className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">権利行使</dt>
            <dd className="font-bold">{exercise ? "する" : "しない"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">行使価値</dt>
            <dd className="font-bold">{Math.max(price - STRIKE, 0)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">
              損益（− プレミアム10）
            </dt>
            <dd className="font-bold">
              {payoff >= 0 ? "+" : ""}
              {payoff}
            </dd>
          </div>
        </dl>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </WidgetBox>
  );
}
