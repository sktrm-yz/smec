import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { DataProvider, type InitialData } from "@/data";
import ArticlePage from "@/pages/ArticlePage";
import HomePage from "@/pages/HomePage";

export default function App({
  initialData = {},
}: {
  initialData?: InitialData;
}) {
  return (
    <DataProvider value={initialData}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}
