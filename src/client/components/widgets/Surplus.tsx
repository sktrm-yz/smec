import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 需要 P = 100 - Q / 供給 P = Q。均衡は P*=50, Q*=50
const W = 320;
const H = 240;
const M = { top: 16, right: 16, bottom: 28, left: 36 };
const sx = (q: number) => M.left + (q / 100) * (W - M.left - M.right);
const sy = (p: number) => M.top + (1 - p / 100) * (H - M.top - M.bottom);

export function SurplusWidget() {
  const [price, setPrice] = useState(50);

  // 価格規制下では「需要量と供給量の少ない方」しか取引されない
  const qd = 100 - price;
  const qs = price;
  const q = Math.min(qd, qs);

  // 余剰の面積（三角形・台形を分割して計算）
  const cs = q * (100 - price) - (q * q) / 2; // 需要曲線と価格の間
  const ps = q * price - (q * q) / 2; // 価格と供給曲線の間
  const totalMax = 2500; // 均衡時の総余剰
  const dwl = totalMax - cs - ps;

  const csPoly = `${sx(0)},${sy(100)} ${sx(q)},${sy(100 - q)} ${sx(0)},${sy(price)}`;
  const psPoly = `${sx(0)},${sy(0)} ${sx(q)},${sy(q)} ${sx(0)},${sy(price)}`;

  return (
    <WidgetBox
      title="余剰分析 シミュレータ"
      description="政府が価格を統制したらどうなるでしょう。価格を均衡（50）からずらすと、消費者余剰（濃い網掛け）と生産者余剰（薄い網掛け）が変わり、死荷重が生まれます。"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="余剰分析のグラフ"
          className="w-full max-w-[360px] shrink-0 self-center sm:self-auto"
        >
          <polygon points={csPoly} fill="currentColor" opacity="0.25" />
          <polygon points={psPoly} fill="currentColor" opacity="0.12" />

          <line
            x1={M.left}
            y1={sy(0)}
            x2={W - M.right}
            y2={sy(0)}
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1={M.left}
            y1={sy(0)}
            x2={M.left}
            y2={M.top}
            stroke="currentColor"
            strokeWidth="1"
          />
          <text
            x={W - M.right}
            y={sy(0) + 16}
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

          <polyline
            points={`${sx(0)},${sy(100)} ${sx(100)},${sy(0)}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points={`${sx(0)},${sy(0)} ${sx(100)},${sy(100)}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.45"
          />
          <text
            x={sx(96)}
            y={sy(6)}
            textAnchor="end"
            fontSize="11"
            fontWeight="bold"
            fill="currentColor"
          >
            D
          </text>
          <text
            x={sx(96)}
            y={sy(94)}
            textAnchor="end"
            fontSize="11"
            fontWeight="bold"
            fill="currentColor"
            opacity="0.5"
          >
            S
          </text>

          <line
            x1={M.left}
            y1={sy(price)}
            x2={W - M.right}
            y2={sy(price)}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            opacity="0.7"
          />
          <text
            x={W - M.right - 2}
            y={sy(price) - 5}
            textAnchor="end"
            fontSize="10"
            fill="currentColor"
          >
            統制価格 {price}
          </text>
          <line
            x1={sx(q)}
            y1={sy(0)}
            x2={sx(q)}
            y2={sy(Math.max(price, 100 - q))}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <text
            x={sx(q)}
            y={sy(0) + 14}
            textAnchor="middle"
            fontSize="10"
            fill="currentColor"
          >
            取引量 {q}
          </text>
        </svg>

        <div className="flex w-full flex-col gap-4">
          <SliderRow
            label={`価格: ${price}`}
            value={price}
            min={10}
            max={90}
            onChange={setPrice}
            minLabel="安い ←"
            maxLabel="→ 高い"
          />
          <dl className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-background p-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">消費者余剰</dt>
              <dd className="font-bold">{Math.round(cs)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">生産者余剰</dt>
              <dd className="font-bold">{Math.round(ps)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">総余剰</dt>
              <dd className="font-bold">{Math.round(cs + ps)} / 2500</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">死荷重</dt>
              <dd className="font-bold">{Math.round(dwl)}</dd>
            </div>
          </dl>
          <p className="text-xs text-muted-foreground">
            {dwl < 1
              ? "均衡価格では総余剰が最大。市場に任せると社会全体の利益が一番大きくなります。"
              : "価格を均衡からずらすと取引量が減り、誰のものにもならない損失（死荷重）が発生します。"}
          </p>
        </div>
      </div>
    </WidgetBox>
  );
}
