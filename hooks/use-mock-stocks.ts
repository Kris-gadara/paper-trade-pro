"use client"

import { useState, useEffect } from "react"
import type { Stock } from "@/types/stock"
import { mockStocks } from "@/data/mock-stocks"

export function useMockStocks() {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
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

  return { stocks }
}
