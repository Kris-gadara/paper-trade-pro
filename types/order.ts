export interface Order {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  quantity: number
  price: number
  timestamp: string
}
