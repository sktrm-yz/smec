// IS-LM / AD-AS など「y = f(x) の2直線 + 均衡点」を描く共通チャート
// x, y とも 0..100 の抽象単位で扱う

const W = 320;
const H = 240;
const M = { top: 16, right: 16, bottom: 28, left: 36 };

const sx = (x: number) => M.left + (x / 100) * (W - M.left - M.right);
const sy = (y: number) => M.top + (1 - y / 100) * (H - M.top - M.bottom);

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function pointsOf(yAt: (x: number) => number): string {
  const pts: string[] = [];
  for (let x = 0; x <= 100; x += 5) {
    pts.push(`${sx(x)},${sy(clamp(yAt(x), 0, 100))}`);
  }
  return pts.join(" ");
}

export type ChartLine = {
  yAt: (x: number) => number;
  baseYAt?: (x: number) => number;
  label: string;
  muted?: boolean;
};

export function LineChart({
  lines,
  eq,
  xLabel,
  yLabel,
  eqXLabel,
  eqYLabel,
  ariaLabel,
}: {
  lines: ChartLine[];
  eq: { x: number; y: number };
  xLabel: string;
  yLabel: string;
  eqXLabel: string;
  eqYLabel: string;
  ariaLabel: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={ariaLabel}
      className="w-full max-w-[360px] shrink-0 self-center sm:self-auto"
    >
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
        {xLabel}
      </text>
      <text
        x={M.left + 6}
        y={M.top + 4}
        textAnchor="start"
        fontSize="10"
        fill="currentColor"
        opacity="0.6"
      >
        {yLabel}
      </text>

      {lines.map((line) => (
        <g key={line.label}>
          {line.baseYAt && (
            <polyline
              points={pointsOf(line.baseYAt)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.15"
              strokeDasharray="4 3"
            />
          )}
          <polyline
            points={pointsOf(line.yAt)}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity={line.muted ? 0.45 : 1}
          />
          <text
            x={sx(96)}
            y={sy(clamp(line.yAt(96), 0, 100)) - 6}
            textAnchor="end"
            fontSize="11"
            fontWeight="bold"
            fill="currentColor"
            opacity={line.muted ? 0.5 : 1}
          >
            {line.label}
          </text>
        </g>
      ))}

      <line
        x1={M.left}
        y1={sy(eq.y)}
        x2={sx(eq.x)}
        y2={sy(eq.y)}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.4"
      />
      <line
        x1={sx(eq.x)}
        y1={sy(0)}
        x2={sx(eq.x)}
        y2={sy(eq.y)}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.4"
      />
      <circle cx={sx(eq.x)} cy={sy(eq.y)} r="5" fill="currentColor" />
      <text
        x={M.left - 6}
        y={sy(eq.y) + 3}
        textAnchor="end"
        fontSize="10"
        fill="currentColor"
      >
        {eqYLabel}
      </text>
      <text
        x={sx(eq.x)}
        y={sy(0) + 14}
        textAnchor="middle"
        fontSize="10"
        fill="currentColor"
      >
        {eqXLabel}
      </text>
    </svg>
  );
}

/** 変化の向きを矢印つきで表す */
export function trend(
  d: number,
  up = "上昇 ↑",
  down = "下落 ↓",
  flat = "変化なし →",
): string {
  return d > 0.5 ? up : d < -0.5 ? down : flat;
}
