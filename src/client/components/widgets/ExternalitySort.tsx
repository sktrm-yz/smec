import { SortQuiz } from "./SortQuiz";

export function ExternalitySortWidget() {
  return (
    <SortQuiz
      title="市場の失敗 分類チャレンジ"
      description="それぞれの例が「負の外部性」「正の外部性」「公共財」のどれにあたるか、ボタンで分類してみましょう。"
      categories={[
        { key: "neg", label: "負の外部性" },
        { key: "pos", label: "正の外部性" },
        { key: "public", label: "公共財" },
      ]}
      items={[
        {
          text: "工場の煙が周辺住民の健康を害する",
          answer: "neg",
          note: "市場を通さず他者に悪影響を与えるので負の外部性です。",
        },
        {
          text: "予防接種を受けると周りの人も感染しにくくなる",
          answer: "pos",
          note: "本人以外にも良い効果が及ぶので正の外部性です。",
        },
        {
          text: "灯台の光は誰でも同時に利用できる",
          answer: "public",
          note: "非競合性・非排除性を持つので公共財です。",
        },
        {
          text: "深夜の隣人の騒音",
          answer: "neg",
          note: "対価のやり取りなしに迷惑が及ぶので負の外部性です。",
        },
        {
          text: "国防や警察のサービス",
          answer: "public",
          note: "誰かの利用が他の人の利用を妨げず、対価を払わない人も排除できないので公共財です。",
        },
        {
          text: "養蜂家のミツバチが近くの果樹園の受粉を助ける",
          answer: "pos",
          note: "市場を通さず果樹園に利益が及ぶ、正の外部性の有名な例です。",
        },
      ]}
    />
  );
}
