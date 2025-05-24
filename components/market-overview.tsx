"use client"
import { useMockMarketData } from "@/hooks/use-mock-market-data"
import { MarketIndexCard } from "./market-index-card"

export function MarketOverview() {
  const { indices } = useMockMarketData()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {indices.map((index) => (
        <MarketIndexCard key={index.symbol} index={index} />
      ))}
    </div>
  )
}
