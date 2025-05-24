"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useTrading } from "../trading-provider"
import { motion } from "framer-motion"

const COLORS = [
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#10b981", // Green
  "#f59e0b", // Yellow
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#84cc16", // Lime
]

export function SectorAllocation() {
  const { holdings } = useTrading()

  // Calculate sector allocation
  const sectorData = holdings.reduce(
    (acc, holding) => {
      const sector = holding.sector || "Other"
      if (!acc[sector]) {
        acc[sector] = 0
      }
      acc[sector] += holding.totalValue
      return acc
    },
    {} as Record<string, number>,
  )

  const totalValue = Object.values(sectorData).reduce((sum, value) => sum + value, 0)

  const chartData = Object.entries(sectorData)
    .map(([sector, value]) => ({
      sector,
      value,
      percentage: ((value / totalValue) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)

  if (holdings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sector Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-muted-foreground">No holdings to display</p>
            <p className="text-sm text-muted-foreground">Start trading to see your sector allocation</p>
          </div>
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
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Value"]}
                  labelFormatter={(label) => `Sector: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Breakdown</h4>
            <div className="space-y-3">
              {chartData.map((item, index) => (
                <motion.div
                  key={item.sector}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <div>
                      <p className="font-medium text-sm">{item.sector}</p>
                      <p className="text-xs text-muted-foreground">₹{item.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{item.percentage}%</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
