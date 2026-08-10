# smec — 中小企業診断士 学習ノート

中小企業診断士 1次試験をシラバス順に学べる Web アプリ。
7科目の記事と、記事ごとの3択練習問題（回答すると正誤と解説を表示）で構成。

## 技術スタック

- bun / React / Vite / Hono / Tailwind CSS v4 / shadcn 風 UI
- Biome（lint・format）/ Vitest（テスト）
- Cloudflare Workers + D1（記事・問題データを API 配信）

## 開発

```sh
bun install
bun run db:migrate:local   # ローカル D1 にスキーマ適用
bun run db:seed:local      # シードデータ投入
bun run build              # クライアントビルド
bun run preview            # wrangler dev（http://localhost:8787）
```

## デプロイ

```sh
wrangler d1 create smec-db          # 初回のみ。ID を wrangler.jsonc に反映
bun run db:migrate:remote
bun run db:seed:remote
bun run deploy
```

## テスト・Lint

```sh
bun run test
bun run lint
```
