import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24">
      <header className="border-b border-border py-6">
        <Link to="/" className="block">
          <h1 className="text-lg font-bold tracking-tight">
            中小企業診断士 学習ノート
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            1次試験7科目をシラバス順に、記事と練習問題で学ぶ
          </p>
        </Link>
      </header>
      <main className="pt-8">
        <Outlet />
      </main>
    </div>
  );
}
