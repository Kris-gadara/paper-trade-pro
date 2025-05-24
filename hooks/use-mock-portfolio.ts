"use client"

import { useState, useEffect } from "react"
import type { PortfolioStock } from "@/types/portfolio"
import { mockPortfolio } from "@/data/mock-portfolio"

export function useMockPortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>(mockPortfolio)
  const [portfolioValue, setPortfolioValue] = useState(0)
  const [todayChange, setTodayChange] = useState(0)
  const [todayChangePercent, setTodayChangePercent] = useState(0)

  // Calculate portfolio value and today's change
  useEffect(() => {
    const value = portfolio.reduce((total, stock) => {
      return total + stock.quantity * stock.currentPrice
    }, 0)

    const change = portfolio.reduce((total, stock) => {
      return total + stock.profitLoss
    }, 0)

    const changePercent = (change / (value - change)) * 100

    setPortfolioValue(value)
    setTodayChange(change)
    setTodayChangePercent(changePercent)
  }, [portfolio])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio((prevPortfolio) =>
        prevPortfolio.map((stock) => {
          // Random price change between -1% and +1%
          const changePercent = (Math.random() * 2 - 1) * 0.01
          const newPrice = stock.currentPrice * (1 + changePercent)
          const newProfitLoss = (newPrice - stock.avgPrice) * stock.quantity
          const newProfitLossPercent = ((newPrice - stock.avgPrice) / stock.avgPrice) * 100

          return {
            ...stock,
            currentPrice: newPrice,
            profitLoss: newProfitLoss,
            profitLossPercent: newProfitLossPercent,
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return { portfolio, portfolioValue, todayChange, todayChangePercent }
}
