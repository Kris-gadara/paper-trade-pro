"use client"

interface PortfolioHistoryPoint {
  date: string
  value: number
}

export function useMockPortfolioHistory() {
  // Generate mock portfolio history data
  const generateHistoryData = (timeRange: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"): PortfolioHistoryPoint[] => {
    const data: PortfolioHistoryPoint[] = []
    const now = new Date()
    let startValue = 100000
    let points = 0
    let interval = 0

    switch (timeRange) {
      case "1D":
        points = 24
        interval = 60 * 60 * 1000 // 1 hour
        startValue = 102000
        break
      case "1W":
        points = 7
        interval = 24 * 60 * 60 * 1000 // 1 day
        startValue = 101000
        break
      case "1M":
        points = 30
        interval = 24 * 60 * 60 * 1000 // 1 day
        startValue = 98000
        break
      case "3M":
        points = 12
        interval = 7 * 24 * 60 * 60 * 1000 // 1 week
        startValue = 95000
        break
      case "1Y":
        points = 12
        interval = 30 * 24 * 60 * 60 * 1000 // 1 month
        startValue = 90000
        break
      case "ALL":
        points = 24
        interval = 30 * 24 * 60 * 60 * 1000 // 1 month
        startValue = 80000
        break
    }

    for (let i = points - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * interval)

      // Add some randomness to the value
      const randomFactor = 1 + (Math.random() * 0.1 - 0.05) // -5% to +5%
      const value = startValue * randomFactor

      // Gradually increase the value over time (on average)
      startValue = startValue * 1.01

      data.push({
        date: date.toISOString(),
        value,
      })
    }

    return data
  }

  const getPortfolioHistory = (timeRange: "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL") => {
    return generateHistoryData(timeRange)
  }

  return { getPortfolioHistory }
}
