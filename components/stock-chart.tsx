"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"

interface StockChartProps {
  data: { price: number }[]
  isPositive: boolean
}

export function StockChart({ data, isPositive }: StockChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="price" stroke={isPositive ? "#22c55e" : "#ef4444"} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
