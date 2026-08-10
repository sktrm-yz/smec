import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import type { InitialData } from "@/data";
import "./index.css";

declare global {
  interface Window {
    __DATA__?: InitialData;
  }
}

const root = document.getElementById("root");
if (root) {
  const app = (
    <StrictMode>
      <BrowserRouter>
        <App initialData={window.__DATA__ ?? {}} />
      </BrowserRouter>
    </StrictMode>
  );
  // プリレンダリング済みページはハイドレーション、それ以外は通常マウント
  if (root.hasChildNodes()) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}
