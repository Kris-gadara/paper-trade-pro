"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"

interface IndexChartProps {
  data: { value: number }[]
  isPositive: boolean
}

export function IndexChart({ data, isPositive }: IndexChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={isPositive ? "#22c55e" : "#ef4444"} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
