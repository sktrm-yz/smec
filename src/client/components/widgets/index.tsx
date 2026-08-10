import type { ComponentType } from "react";
import { MarginalUtilityWidget } from "./MarginalUtility";
import { MicroMacroSortWidget } from "./MicroMacroSort";
import { SupplyDemandWidget } from "./SupplyDemand";

/** 本文マーカー {{widget:name}} の name とコンポーネントの対応表 */
export const WIDGETS: Record<string, ComponentType> = {
  "supply-demand": SupplyDemandWidget,
  "marginal-utility": MarginalUtilityWidget,
  "micro-macro-sort": MicroMacroSortWidget,
};
