export interface MarketIndex {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
  chartData: { value: number }[]
}
