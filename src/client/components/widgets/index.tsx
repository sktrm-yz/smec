import type { ComponentType } from "react";
import { AdasWidget } from "./Adas";
import { CostProfitWidget } from "./CostProfit";
import { ExternalitySortWidget } from "./ExternalitySort";
import { GdpComponentsWidget } from "./GdpComponents";
import { IslmWidget } from "./Islm";
import { MarginalUtilityWidget } from "./MarginalUtility";
import { MicroMacroSortWidget } from "./MicroMacroSort";
import { MonopolyWidget } from "./Monopoly";
import { MultiplierWidget } from "./Multiplier";
import { SupplyDemandWidget } from "./SupplyDemand";
import { SurplusWidget } from "./Surplus";

/** 本文マーカー {{widget:name}} の name とコンポーネントの対応表 */
export const WIDGETS: Record<string, ComponentType> = {
  "supply-demand": SupplyDemandWidget,
  "marginal-utility": MarginalUtilityWidget,
  "micro-macro-sort": MicroMacroSortWidget,
  "cost-profit": CostProfitWidget,
  surplus: SurplusWidget,
  monopoly: MonopolyWidget,
  "externality-sort": ExternalitySortWidget,
  "gdp-components": GdpComponentsWidget,
  multiplier: MultiplierWidget,
  islm: IslmWidget,
  adas: AdasWidget,
};
