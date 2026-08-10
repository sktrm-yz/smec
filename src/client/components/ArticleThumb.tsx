import { humation1 } from "@humation/assets-humation-1";
import { createAvatar } from "@humation/core";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

// 科目ごとのサムネ背景色（おとなしめのパステル）
const SECTION_BG: Record<number, string> = {
  1: "#edf2f7", // 経済学・経済政策
  2: "#f7eeee", // 財務・会計
  3: "#eef4ee", // 企業経営理論
  4: "#f7f3e8", // 運営管理
  5: "#f1eef6", // 経営法務
  6: "#e9f1f4", // 経営情報システム
  7: "#f4eef0", // 中小企業経営・政策
};

export function sectionBg(sectionId: number): string {
  return SECTION_BG[sectionId] ?? "#f4f4f5";
}

// インラインSVGを並べると defs の ID が衝突して色が化けるため、
// data URI の img として描画し SVG 文書を分離する
function AvatarImage({
  seed,
  alt,
  size,
}: {
  seed: string;
  alt: string;
  size: number;
}) {
  const src = useMemo(() => {
    const svg = createAvatar(humation1, {
      seed,
      background: "transparent",
    }).toString();
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [seed]);
  return <img src={src} alt={alt} width={size} height={size} />;
}

/** 記事カード・前後ナビ共通のサムネ領域（配置は className で調整可能） */
export function ArticleThumb({
  slug,
  no,
  sectionId,
  title,
  className = "w-2/5",
}: {
  slug: string;
  no: string;
  sectionId: number;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center justify-center gap-1",
        className,
      )}
      style={{ backgroundColor: sectionBg(sectionId) }}
    >
      <AvatarImage seed={slug} alt={title} size={64} />
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
        {no}・診断士
      </span>
    </div>
  );
}
