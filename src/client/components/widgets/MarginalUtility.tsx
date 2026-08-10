import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// ケーキ n 個目の限界効用（逓減していく例）
const MU = [30, 22, 15, 10, 6, 3, 1, 0];

export function MarginalUtilityWidget() {
  const [n, setN] = useState(1);
  const total = MU.slice(0, n).reduce((a, b) => a + b, 0);
  const current = MU[n - 1] ?? 0;
  const max = MU[0] ?? 1;

  return (
    <WidgetBox
      title="限界効用逓減 シミュレータ"
      description="ケーキを食べる個数を増やして、1個ごとの満足（限界効用）がどう減っていくか見てみましょう。棒は各1個から得られる追加の満足です。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`ケーキの個数: ${n} 個`}
          value={n}
          min={1}
          max={8}
          onChange={setN}
          minLabel="1個"
          maxLabel="8個"
        />
        <div className="flex h-28 items-end gap-1.5 rounded-lg border border-border bg-background p-3">
          {MU.map((mu, i) => (
            <div
              key={`cake-${i + 1}`}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className={
                  i < n
                    ? i === n - 1
                      ? "w-full rounded-sm bg-foreground"
                      : "w-full rounded-sm bg-foreground/40"
                    : "w-full rounded-sm bg-border/60"
                }
                style={{ height: `${Math.max((mu / max) * 72, 3)}px` }}
              />
              <span className="text-[10px] text-muted-foreground">{i + 1}</span>
            </div>
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">{n}個目の限界効用</dt>
            <dd className="font-bold">{current}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">総効用（合計）</dt>
            <dd className="font-bold">{total}</dd>
          </div>
        </dl>
        <p className="text-xs text-muted-foreground">
          {n <= 2
            ? "最初の1〜2個は満足が大きく増えます。"
            : n <= 5
              ? "追加の満足がだんだん小さくなってきました。これが限界効用逓減です。"
              : "総効用はほぼ頭打ち。追加の1個から得られる満足はごくわずかです。"}
        </p>
      </div>
    </WidgetBox>
  );
}
