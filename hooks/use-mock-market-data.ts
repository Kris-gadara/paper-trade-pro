"use client"

import { useState, useEffect } from "react"
import type { MarketIndex } from "@/types/market"
import { mockIndices } from "@/data/mock-indices"

export function useMockMarketData() {
  const [indices, setIndices] = useState<MarketIndex[]>(mockIndices)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prevIndices) =>
        prevIndices.map((index) => {
          // Random price change between -0.5% and +0.5%
          const changePercent = (Math.random() * 1 - 0.5) * 0.01
          const newValue = index.value * (1 + changePercent)
          const newChange = index.change + (newValue - index.value)
          const newChangePercent = index.changePercent + changePercent * 100

          // Add new value point to chart data
          const newChartData = [...index.chartData.slice(-19), { value: newValue }]

          return {
            ...index,
            value: newValue,
            change: newChange,
            changePercent: newChangePercent,
            chartData: newChartData,
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return { indices }
}
