import { createContext, useContext } from "react";
import type { Article, Section } from "@/types";

// プリレンダリング時に埋め込まれる初期データ。
// ハイドレーション後のクライアント遷移では API から取得する
export type InitialData = {
  sections?: Section[];
  article?: Article;
};

const DataContext = createContext<InitialData>({});

export const DataProvider = DataContext.Provider;

export function useInitialData(): InitialData {
  return useContext(DataContext);
}
