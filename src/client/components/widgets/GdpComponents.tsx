import { useState } from "react";
import { SliderRow, WidgetBox } from "./WidgetBox";

// 支出面から見た GDP = C + I + G + NX（単位: 兆円のイメージ）
export function GdpComponentsWidget() {
  const [c, setC] = useState(300);
  const [inv, setInv] = useState(120);
  const [g, setG] = useState(120);
  const [nx, setNx] = useState(10);
  const gdp = c + inv + g + nx;

  const parts = [
    { label: "消費 C", value: c },
    { label: "投資 I", value: inv },
    { label: "政府支出 G", value: g },
    { label: "純輸出 NX", value: nx },
  ];
  const scale = 700;

  return (
    <WidgetBox
      title="GDP の構成 シミュレータ"
      description="支出面から見た GDP は「C + I + G + NX」の合計です。各項目を動かして GDP がどう変わるか確かめましょう。どれか1つが落ち込んでも、他の項目（例: 政府支出）で下支えできる、というのが景気対策の発想です。"
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <SliderRow
            label={`消費 C: ${c}`}
            value={c}
            min={200}
            max={400}
            step={10}
            onChange={setC}
          />
          <SliderRow
            label={`投資 I: ${inv}`}
            value={inv}
            min={50}
            max={200}
            step={10}
            onChange={setInv}
          />
          <SliderRow
            label={`政府支出 G: ${g}`}
            value={g}
            min={50}
            max={200}
            step={10}
            onChange={setG}
          />
          <SliderRow
            label={`純輸出 NX: ${nx}`}
            value={nx}
            min={-50}
            max={50}
            step={10}
            onChange={setNx}
          />
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex h-6 w-full overflow-hidden rounded-sm bg-border/30">
            {parts.map(
              (part, i) =>
                part.value > 0 && (
                  <div
                    key={part.label}
                    className="flex items-center justify-center overflow-hidden bg-foreground text-[9px] text-background"
                    style={{
                      width: `${(part.value / scale) * 100}%`,
                      opacity: 0.85 - i * 0.18,
                    }}
                    title={part.label}
                  >
                    {part.label.split(" ")[1]}
                  </div>
                ),
            )}
          </div>
          <p className="mt-2 text-sm">
            GDP = {c} + {inv} + {g} + ({nx}) ={" "}
            <span className="font-bold">{gdp} 兆円</span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {nx < 0
            ? "純輸出がマイナス（輸入超過）だと、その分 GDP を押し下げます。"
            : "最大の構成要素は消費 C。日本の実際の GDP でも民間消費が5割強を占めます。"}
        </p>
      </div>
    </WidgetBox>
  );
}
