
export enum UserRole {
  Investor = "Investor",
  FinancialAdvisor = "Financial Advisor",
  DataAnalyst = "Data Analyst",
  Admin = "Admin",
}

export enum RiskLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  VeryHigh = "Very High",
}

export enum FundCategory {
  Equity = "Equity",
  Debt = "Debt",
  Hybrid = "Hybrid",
  Index = "Index Fund",
  Thematic = "Thematic",
}

export interface MutualFund {
  id: number;
  name: string;
  category: FundCategory;
  riskLevel: RiskLevel;
  returns: {
    '1yr': number;
    '3yr': number;
    '5yr': number;
  };
  aum: number; // in crores
  expenseRatio: number; // in percentage
  fundManager: string;
  description: string;
  topHoldings: string[];
  sharpeRatio: number;
}

export interface FundAnalysis {
  pros: string[];
  cons: string[];
}
