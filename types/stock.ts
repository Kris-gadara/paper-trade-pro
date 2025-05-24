export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  chartData: { price: number }[]
}
