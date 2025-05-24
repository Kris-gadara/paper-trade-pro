"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMockPortfolioHistory } from "@/hooks/use-mock-portfolio-history"

export function PortfolioChart() {
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M" | "1Y" | "ALL">("1M")
  const { getPortfolioHistory } = useMockPortfolioHistory()

  const data = getPortfolioHistory(timeRange)

  return (
    <Card className="col-span-4">
      <CardContent className="pt-6">
        <Tabs defaultValue="1M" value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="1D">1D</TabsTrigger>
              <TabsTrigger value="1W">1W</TabsTrigger>
              <TabsTrigger value="1M">1M</TabsTrigger>
              <TabsTrigger value="3M">3M</TabsTrigger>
              <TabsTrigger value="1Y">1Y</TabsTrigger>
              <TabsTrigger value="ALL">ALL</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={timeRange} className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    if (timeRange === "1D") return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    return date.toLocaleDateString([], { month: "short", day: "numeric" })
                  }}
                />
                <YAxis
                  domain={["dataMin - 1000", "dataMax + 1000"]}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    if (timeRange === "1D") return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    return date.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" })
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
