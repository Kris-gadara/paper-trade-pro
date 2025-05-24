"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTrading } from "../trading-provider"
import { TrendingUp } from "lucide-react"

export function PortfolioChart() {
  const { totalValue, totalInvested } = useTrading()

  // Generate mock portfolio performance data
  const generatePortfolioData = () => {
    const data = []
    const now = new Date()
    const baseValue = totalInvested || 1000000

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      let value = baseValue

      // Add some realistic variation
      const variation = Math.sin(i * 0.1) * 50000 + Math.random() * 30000 - 15000
      value += variation

      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: Math.max(value, 0),
      })
    }

    // Set the last value to current portfolio value
    if (data.length > 0) {
      data[data.length - 1].value = totalValue || baseValue
    }

    return data
  }

  const portfolioData = generatePortfolioData()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Portfolio Performance (30 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
