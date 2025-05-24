import type { PortfolioStock } from "@/types/portfolio"

export const mockPortfolio: PortfolioStock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    quantity: 10,
    avgPrice: 2700.5,
    currentPrice: 2750.45,
    profitLoss: 499.5,
    profitLossPercent: 1.85,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd",
    quantity: 5,
    avgPrice: 3500.25,
    currentPrice: 3456.8,
    profitLoss: -217.25,
    profitLossPercent: -1.24,
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    quantity: 15,
    avgPrice: 1650.75,
    currentPrice: 1678.25,
    profitLoss: 412.5,
    profitLossPercent: 1.67,
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    quantity: 8,
    avgPrice: 1480.3,
    currentPrice: 1456.7,
    profitLoss: -188.8,
    profitLossPercent: -1.59,
  },
]
