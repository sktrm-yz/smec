# smec

中小企業診断士の学習 Web アプリ。シラバス順の記事 + 3択練習問題。

## 技術

- bun / React / Vite / Hono / Tailwind v4 / shadcn 風 UI / Biome / Vitest
- Cloudflare Workers（静的アセット + `/api/*` を Hono が処理）
- データは D1（`smec-db`）に格納し API で配信

## 構成

- `src/worker/` — Hono API（GET /api/sections, GET /api/articles/:slug）
- `src/client/` — React SPA（ホーム = 科目/記事カード一覧、記事ページ = 本文 + 問題 + 前後ナビ）
- `src/shared/` — Worker/プリレンダリング共通のデータ整形（shape.ts）と型
- `scripts/prerender.tsx` — ビルド時 SSG。ローカル D1 から全ルートを静的 HTML 化（SEO 対応）
- `migrations/` — D1 マイグレーション
- `seed/seed.sql` — 記事・問題のシードデータ

公開 URL: https://smec.mori22.com（wrangler.jsonc の custom_domain ルート）

## コマンド

```sh
bun run dev              # Vite 開発サーバ（API は wrangler dev と併用）
bun run build            # クライアントビルド + プリレンダリング（要: ローカル D1 シード済み）
bun run deploy           # ビルド + wrangler deploy
bun run test             # vitest
bun run lint             # biome check
bun run db:migrate:local # D1 マイグレーション（local / remote あり）
bun run db:seed:local    # シード投入（local / remote あり）
```

## 開発ルール（Issue 駆動）

1. 着手前にタスクを分割し GitHub Issue に起票する
2. 1 Issue = 1 まとまりの変更。コミットメッセージに `(#N)` を付ける
3. テスト・Lint を通してからコミット・プッシュし、`gh issue close <N>` でクローズ

## コンテンツ方針

- 正規のシラバス（1次試験7科目）の順番・構成に従う
- 初心者にもわかりやすい表現。全記事を順に読めば合格レベルに達する内容を目指す
- 各記事に3択の練習問題を3問付与（回答すると正誤と解説を表示）
- 記事追加はシードデータ（seed/seed.sql）に追記し、remote へ再投入する

## スタイル

- シンプル・ミニマム・モノクロ。無駄な装飾はしない
- shadcn/ui 系コンポーネント（src/client/components/ui/）を基本に使う

## CLAUDE.md の保守

- 構成やルールが変わったら適宜この CLAUDE.md を修正すること
- 簡潔さを保つ: 必要な内容のみ、100行以下、1行100文字以内。追記不要なら修正しない
