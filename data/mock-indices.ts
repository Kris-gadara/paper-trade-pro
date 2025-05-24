import type { MarketIndex } from "@/types/market"

// Generate random chart data
const generateChartData = (baseValue: number, points = 20) => {
  const data = []
  let value = baseValue

  for (let i = 0; i < points; i++) {
    // Random value change between -1% and +1%
    const change = (Math.random() * 2 - 1) * 0.01
    value = value * (1 + change)
    data.push({ value })
  }

  return data
}

export const mockIndices: MarketIndex[] = [
  {
    symbol: "NIFTY",
    name: "NIFTY 50",
    value: 22345.2,
    change: 156.8,
    changePercent: 0.71,
    chartData: generateChartData(22345.2),
  },
  {
    symbol: "SENSEX",
    name: "BSE SENSEX",
    value: 73456.75,
    change: 512.35,
    changePercent: 0.7,
    chartData: generateChartData(73456.75),
  },
  {
    symbol: "BANKNIFTY",
    name: "NIFTY BANK",
    value: 48765.3,
    change: -125.45,
    changePercent: -0.26,
    chartData: generateChartData(48765.3),
  },
]
