"use client"

import { useState, useEffect } from "react"
import type { Stock } from "@/types/stock"
import { mockWatchlist } from "@/data/mock-watchlist"

export function useMockWatchlist() {
  const [watchlist, setWatchlist] = useState<Stock[]>(mockWatchlist)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.map((stock) => {
          // Random price change between -1% and +1%
          const changePercent = (Math.random() * 2 - 1) * 0.01
          const newPrice = stock.price * (1 + changePercent)
          const newChange = stock.change + (newPrice - stock.price)
          const newChangePercent = stock.changePercent + changePercent * 100

          // Add new price point to chart data
          const newChartData = [...stock.chartData.slice(-19), { price: newPrice }]

          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            chartData: newChartData,
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const addToWatchlist = (stock: Stock) => {
    setWatchlist((prevWatchlist) => {
      // Check if stock is already in watchlist
      if (prevWatchlist.some((item) => item.symbol === stock.symbol)) {
        return prevWatchlist
      }
      return [...prevWatchlist, stock]
    })
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((stock) => stock.symbol !== symbol))
  }

  return { watchlist, addToWatchlist, removeFromWatchlist }
}
