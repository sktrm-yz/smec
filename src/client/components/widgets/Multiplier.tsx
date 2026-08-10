import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 乗数効果: ΔY = ΔG × 1/(1-c)
export function MultiplierWidget() {
  const [c10, setC10] = useState(6); // 限界消費性向 ×10
  const [dg, setDg] = useState(10);
  const c = c10 / 10;
  const multiplier = 1 / (1 - c);
  const dy = dg * multiplier;

  // 波及の最初の5ラウンド
  const rounds = [1, 2, 3, 4, 5].map((n) => ({ n, value: dg * c ** (n - 1) }));
  const maxRound = rounds[0]?.value ?? 1;

  return (
    <WidgetBox
      title="乗数効果 シミュレータ"
      description="政府支出を増やすと、それが誰かの所得になり、その一部がまた消費される……という連鎖で GDP は最初の支出以上に増えます。限界消費性向（所得のうち消費に回す割合）を変えて、乗数の威力を確かめましょう。"
    >
      <div className="flex flex-col gap-4">
        <SliderRow
          label={`限界消費性向 c: ${c.toFixed(1)}`}
          value={c10}
          min={3}
          max={9}
          onChange={setC10}
          minLabel="0.3"
          maxLabel="0.9"
        />
        <SliderRow
          label={`政府支出の増加 ΔG: ${dg} 兆円`}
          value={dg}
          min={5}
          max={20}
          onChange={setDg}
          minLabel="5"
          maxLabel="20"
        />
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="mb-2 text-xs text-muted-foreground">
            波及の連鎖（最初の5巡目まで）
          </p>
          <div className="flex items-end gap-1.5">
            {rounds.map((r) => (
              <div
                key={`round-${r.n}`}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-sm bg-foreground/70"
                  style={{
                    height: `${Math.max((r.value / maxRound) * 56, 2)}px`,
                  }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {r.n}巡
                </span>
              </div>
            ))}
            <div className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">…</span>
              <span className="text-[10px] text-muted-foreground">続く</span>
            </div>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">乗数 1/(1−c)</dt>
            <dd className="font-bold">{multiplier.toFixed(1)} 倍</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">GDP の増加 ΔY</dt>
            <dd className="font-bold">{dy.toFixed(0)} 兆円</dd>
          </div>
        </dl>
        <p className="text-xs text-muted-foreground">
          c
          が大きい（みんながよく消費する）ほど連鎖が長く続き、乗数は大きくなります。
        </p>
      </div>
    </WidgetBox>
  );
}
