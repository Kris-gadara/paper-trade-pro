import type { Stock } from "@/types/stock"
import { mockStocks } from "./mock-stocks"

// Use a subset of mock stocks for the watchlist
export const mockWatchlist: Stock[] = [
  mockStocks[4], // ICICIBANK
  mockStocks[5], // SBIN
  mockStocks[7], // ITC
]
