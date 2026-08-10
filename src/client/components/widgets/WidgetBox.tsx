import { SlidersHorizontalIcon } from "lucide-react";
import type { ReactNode } from "react";

/** 記事内ウィジェットの共通枠。操作できるゾーンだとひと目でわかるようにする */
export function WidgetBox({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border-2 border-foreground/15 bg-muted/30">
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <SlidersHorizontalIcon className="size-4 shrink-0" />
        <span className="text-sm font-bold">{title}</span>
        <span className="ml-auto rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground">
          さわって理解
        </span>
      </div>
      <div className="px-4 py-4 sm:px-5">
        <p className="mb-4 text-xs text-muted-foreground">{description}</p>
        {children}
      </div>
    </div>
  );
}

/** モノクロで統一したスライダー行 */
export function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  minLabel,
  maxLabel,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  minLabel?: string;
  maxLabel?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium">{label}</span>
      <span className="flex items-center gap-2">
        {minLabel && (
          <span className="w-14 shrink-0 text-right text-[10px] text-muted-foreground">
            {minLabel}
          </span>
        )}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-foreground"
        />
        {maxLabel && (
          <span className="w-14 shrink-0 text-[10px] text-muted-foreground">
            {maxLabel}
          </span>
        )}
      </span>
    </label>
  );
}
