"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTrading } from "../trading-provider"

export function PortfolioChart() {
  const { totalValue, totalInvested } = useTrading()

  // Generate mock portfolio performance data
  const generatePortfolioData = () => {
    const data = []
    const now = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      let value = totalInvested || 1000000

      // Add some realistic variation
      const variation = Math.sin(i * 0.1) * 50000 + Math.random() * 20000 - 10000
      value += variation

      data.push({
        date: date.toLocaleDateString(),
        value: Math.max(value, 0),
      })
    }

    // Set the last value to current portfolio value
    if (data.length > 0) {
      data[data.length - 1].value = totalValue
    }

    return data
  }

  const portfolioData = generatePortfolioData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance (30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
              />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
