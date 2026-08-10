import { SortQuiz } from "./SortQuiz";

/** 簿記: 借方・貸方の分類チャレンジ */
export function DebitCreditSortWidget() {
  return (
    <SortQuiz
      title="借方？ 貸方？ 分類チャレンジ"
      description="それぞれの出来事が、仕訳で借方（左）と貸方（右）のどちらに記録されるか分類してみましょう。「資産の増加は借方、負債・純資産・収益の増加は貸方」がルールです。"
      categories={[
        { key: "debit", label: "借方（左）" },
        { key: "credit", label: "貸方（右）" },
      ]}
      items={[
        {
          text: "現金が増えた（資産の増加）",
          answer: "debit",
          note: "資産の増加は借方に記録します。",
        },
        {
          text: "銀行から借入をした（負債の増加）",
          answer: "credit",
          note: "負債の増加は貸方に記録します。",
        },
        {
          text: "商品を売って売上が発生した（収益の発生）",
          answer: "credit",
          note: "収益の発生は貸方に記録します。",
        },
        {
          text: "給料を支払った（費用の発生）",
          answer: "debit",
          note: "費用の発生は借方に記録します。",
        },
        {
          text: "機械を購入した（資産の増加）",
          answer: "debit",
          note: "機械という資産が増えたので借方です。",
        },
        {
          text: "借入金を返済して負債が減った（負債の減少）",
          answer: "debit",
          note: "負債の減少は増加の逆なので借方に記録します。",
        },
      ]}
    />
  );
}

/** 原価計算: 直接費・間接費の分類チャレンジ */
export function CostSortWidget() {
  return (
    <SortQuiz
      title="直接費？ 間接費？ 分類チャレンジ"
      description="家具工場を例に、それぞれの費用が「どの製品にいくらかかったか特定できる直接費」か「特定できない間接費」かを分類しましょう。"
      categories={[
        { key: "direct", label: "直接費" },
        { key: "indirect", label: "間接費" },
      ]}
      items={[
        {
          text: "テーブルAに使った木材の代金",
          answer: "direct",
          note: "どの製品に使ったか明確なので直接材料費です。",
        },
        {
          text: "工場全体の電気代",
          answer: "indirect",
          note: "製品ごとに分けられないので間接経費です。",
        },
        {
          text: "テーブルAの組立を担当した工員の賃金",
          answer: "direct",
          note: "特定の製品の作業なので直接労務費です。",
        },
        {
          text: "工場長の給料",
          answer: "indirect",
          note: "工場全体の管理業務なので間接労務費です。",
        },
        {
          text: "複数製品で共用する機械の減価償却費",
          answer: "indirect",
          note: "特定の製品に紐づかないので間接経費。配賦基準で各製品に割り振ります。",
        },
      ]}
    />
  );
}

/** 意思決定会計: 関連原価・埋没原価の分類チャレンジ */
export function SunkCostSortWidget() {
  return (
    <SortQuiz
      title="関連原価？ 埋没原価？ 分類チャレンジ"
      description="新製品を発売するか検討中です。それぞれの費用が、意思決定に関係する「関連原価」か、どちらを選んでも変わらない「埋没原価」かを分類しましょう。"
      categories={[
        { key: "relevant", label: "関連原価" },
        { key: "sunk", label: "埋没原価" },
      ]}
      items={[
        {
          text: "すでに支払った試作品の開発費 500万円",
          answer: "sunk",
          note: "過去に支出済みで、今からどう決めても戻りません。典型的な埋没原価です。",
        },
        {
          text: "発売する場合に追加でかかる材料費",
          answer: "relevant",
          note: "発売するかどうかで金額が変わるので関連原価です。",
        },
        {
          text: "昨年購入した専用機械の購入代金",
          answer: "sunk",
          note: "すでに支払済みの過去原価。意思決定では無視します。",
        },
        {
          text: "発売をやめれば他製品に回せる工場スペースの利益（機会原価）",
          answer: "relevant",
          note: "選択によって失われる利益（機会原価）は意思決定に含めるべき関連原価です。",
        },
      ]}
    />
  );
}
