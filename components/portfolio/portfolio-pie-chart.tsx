"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useTrading } from "../trading-provider"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function PortfolioPieChart() {
  const { holdings, stocks } = useTrading()

  // Group holdings by sector
  const sectorData = holdings.reduce(
    (acc, holding) => {
      const stock = stocks.find((s) => s.symbol === holding.symbol)
      const sector = stock?.sector || "Unknown"

      if (!acc[sector]) {
        acc[sector] = 0
      }
      acc[sector] += holding.totalValue

      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(sectorData).map(([sector, value]) => ({
    name: sector,
    value,
    percentage: ((value / Object.values(sectorData).reduce((a, b) => a + b, 0)) * 100).toFixed(1),
  }))

  if (pieData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sector Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">No holdings to display</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Value"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
