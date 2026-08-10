import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 需要: Q = 80 - 0.6P + ds / 供給: Q = 20 + 0.6P + ss（P, Q は 0..100 の抽象単位）
const B = 0.6;

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

// P=0..100 の直線を SVG 座標に変換して描く
const W = 320;
const H = 240;
const M = { top: 16, right: 16, bottom: 28, left: 36 };
const px = (q: number) => M.left + (q / 100) * (W - M.left - M.right);
const py = (p: number) => M.top + (1 - p / 100) * (H - M.top - M.bottom);

function linePoints(qAt: (p: number) => number): string {
  return [0, 100].map((p) => `${px(clamp(qAt(p), 0, 100))},${py(p)}`).join(" ");
}

export function SupplyDemandWidget() {
  const [ds, setDs] = useState(0);
  const [ss, setSs] = useState(0);

  const demand = (p: number) => 80 - B * p + ds;
  const supply = (p: number) => 20 + B * p + ss;
  const demandBase = (p: number) => 80 - B * p;
  const supplyBase = (p: number) => 20 + B * p;

  const pEq = clamp((60 + ds - ss) / (2 * B), 0, 100);
  const qEq = clamp(supply(pEq), 0, 100);
  const pBase = 50;
  const qBase = 50;

  const dp = pEq - pBase;
  const dq = qEq - qBase;
  const arrow = (d: number) =>
    d > 0.5 ? "上昇 ↑" : d < -0.5 ? "下落 ↓" : "変化なし →";
  const arrowQ = (d: number) =>
    d > 0.5 ? "増加 ↑" : d < -0.5 ? "減少 ↓" : "変化なし →";

  return (
    <WidgetBox
      title="需要・供給シフト シミュレータ"
      description="スライダーを動かして曲線をシフトさせ、均衡価格と取引量がどう変わるか確かめてみましょう。薄い線がシフト前の位置です。"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="需要曲線と供給曲線のグラフ"
          className="w-full max-w-[360px] shrink-0 self-center sm:self-auto"
        >
          {/* 軸 */}
          <line
            x1={M.left}
            y1={py(0)}
            x2={W - M.right}
            y2={py(0)}
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1={M.left}
            y1={py(0)}
            x2={M.left}
            y2={M.top}
            stroke="currentColor"
            strokeWidth="1"
          />
          <text
            x={W - M.right}
            y={py(0) + 16}
            textAnchor="end"
            fontSize="10"
            fill="currentColor"
            opacity="0.6"
          >
            数量 Q
          </text>
          <text
            x={M.left - 8}
            y={M.top + 4}
            textAnchor="end"
            fontSize="10"
            fill="currentColor"
            opacity="0.6"
          >
            価格 P
          </text>

          {/* シフト前（薄い線） */}
          <polyline
            points={linePoints(demandBase)}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.15"
            strokeDasharray="4 3"
          />
          <polyline
            points={linePoints(supplyBase)}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.15"
            strokeDasharray="4 3"
          />

          {/* 現在の曲線 */}
          <polyline
            points={linePoints(demand)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points={linePoints(supply)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.45"
          />
          <text
            x={px(clamp(demand(92), 0, 100)) - 2}
            y={py(92) + 12}
            fontSize="11"
            fontWeight="bold"
            fill="currentColor"
          >
            D
          </text>
          <text
            x={px(clamp(supply(92), 0, 100)) + 4}
            y={py(92) + 12}
            fontSize="11"
            fontWeight="bold"
            fill="currentColor"
            opacity="0.5"
          >
            S
          </text>

          {/* 均衡点と点線 */}
          <line
            x1={M.left}
            y1={py(pEq)}
            x2={px(qEq)}
            y2={py(pEq)}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <line
            x1={px(qEq)}
            y1={py(0)}
            x2={px(qEq)}
            y2={py(pEq)}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <circle cx={px(qEq)} cy={py(pEq)} r="5" fill="currentColor" />
          <text
            x={M.left - 6}
            y={py(pEq) + 3}
            textAnchor="end"
            fontSize="10"
            fill="currentColor"
          >
            P*
          </text>
          <text
            x={px(qEq)}
            y={py(0) + 14}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
          >
            Q*
          </text>
        </svg>

        <div className="flex w-full flex-col gap-4">
          <SliderRow
            label="需要のシフト（所得・流行など）"
            value={ds}
            min={-25}
            max={25}
            onChange={setDs}
            minLabel="減る ←"
            maxLabel="→ 増える"
          />
          <SliderRow
            label="供給のシフト（原材料費・技術など）"
            value={ss}
            min={-25}
            max={25}
            onChange={setSs}
            minLabel="減る ←"
            maxLabel="→ 増える"
          />
          <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">均衡価格 P*</dt>
              <dd className="font-bold">{arrow(dp)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">均衡取引量 Q*</dt>
              <dd className="font-bold">{arrowQ(dq)}</dd>
            </div>
          </dl>
          <p className="text-xs text-muted-foreground">
            例: 需要だけ増やすと P*・Q* とも上昇。供給だけ増やすと P* は下落し
            Q* は増加します。
          </p>
        </div>
      </div>
    </WidgetBox>
  );
}
