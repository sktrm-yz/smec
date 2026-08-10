import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 需要 P = 100 - Q、限界費用 MC = 20（一定）
// 独占の利潤最大: MR = 100 - 2Q = 20 → Q=40, P=60, 利潤1600
// 完全競争なら P = MC = 20 → Q=80, 利潤0
export function MonopolyWidget() {
  const [q, setQ] = useState(20);
  const price = 100 - q;
  const profit = (price - 20) * q;
  const mr = 100 - 2 * q;

  const message =
    mr > 20.9
      ? "限界収入 > 限界費用。まだ増産したほうが儲かります。"
      : mr < 19.1
        ? "限界収入 < 限界費用。作りすぎて利潤を減らしています。"
        : "限界収入 = 限界費用。独占企業の利潤最大点です（Q=40, P=60）。完全競争の均衡（Q=80, P=20）より少なく作って高く売っているのがポイント。";

  return (
    <WidgetBox
      title="独占企業の価格決定 シミュレータ"
      description="あなたは市場を独占する企業です。生産量を決めると価格は需要曲線（P = 100 − Q）で決まります。限界費用は20。利潤が最大になる生産量を探しましょう。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`生産量 Q: ${q}`}
          value={q}
          min={10}
          max={80}
          onChange={setQ}
          minLabel="少なく"
          maxLabel="多く"
        />
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-3">
          <span className="w-10 shrink-0 text-xs text-muted-foreground">
            利潤
          </span>
          <div className="h-4 flex-1 rounded-sm bg-border/40">
            <div
              className="h-full rounded-sm bg-foreground/70"
              style={{ width: `${Math.max((profit / 1600) * 100, 0)}%` }}
            />
          </div>
          <span className="w-14 shrink-0 text-right font-mono text-xs">
            {profit}
          </span>
        </div>
        <dl className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">価格 P</dt>
            <dd className="font-bold">{price}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">限界収入 MR</dt>
            <dd className="font-bold">{mr}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">限界費用 MC</dt>
            <dd className="font-bold">20</dd>
          </div>
        </dl>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </WidgetBox>
  );
}
