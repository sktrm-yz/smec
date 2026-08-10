import type { ComponentType } from "react";
import { AdasWidget } from "./Adas";
import { BalanceSheetWidget } from "./BalanceSheet";
import { CfPatternWidget } from "./CfPattern";
import { CostProfitWidget } from "./CostProfit";
import { CvpWidget } from "./Cvp";
import { DcfWidget } from "./Dcf";
import { ExternalitySortWidget } from "./ExternalitySort";
import {
  CostSortWidget,
  DebitCreditSortWidget,
  SunkCostSortWidget,
} from "./FinanceSorts";
import { GdpComponentsWidget } from "./GdpComponents";
import { IslmWidget } from "./Islm";
import { MarginalUtilityWidget } from "./MarginalUtility";
import { MicroMacroSortWidget } from "./MicroMacroSort";
import { MonopolyWidget } from "./Monopoly";
import { MultiplierWidget } from "./Multiplier";
import { NpvWidget } from "./Npv";
import { OptionPayoffWidget } from "./OptionPayoff";
import { RatioAnalysisWidget } from "./RatioAnalysis";
import { SupplyDemandWidget } from "./SupplyDemand";
import { SurplusWidget } from "./Surplus";
import { WaccWidget } from "./Wacc";

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
  "debit-credit-sort": DebitCreditSortWidget,
  "balance-sheet": BalanceSheetWidget,
  "cf-pattern": CfPatternWidget,
  "cost-sort": CostSortWidget,
  "ratio-analysis": RatioAnalysisWidget,
  cvp: CvpWidget,
  "sunk-cost-sort": SunkCostSortWidget,
  npv: NpvWidget,
  wacc: WaccWidget,
  dcf: DcfWidget,
  "option-payoff": OptionPayoffWidget,
};
