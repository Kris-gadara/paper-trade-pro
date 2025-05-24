"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import type { MarketIndex } from "@/types/market"
import { IndexChart } from "./index-chart"

interface MarketIndexCardProps {
  index: MarketIndex
}

export function MarketIndexCard({ index }: MarketIndexCardProps) {
  const isPositive = index.change >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{index.name}</CardTitle>
        {isPositive ? <ArrowUp className="h-4 w-4 text-green-500" /> : <ArrowDown className="h-4 w-4 text-red-500" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
          <div className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : ""}
            {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
          </div>
        </div>
        <div className="mt-4 h-[60px]">
          <IndexChart data={index.chartData} isPositive={isPositive} />
        </div>
      </CardContent>
    </Card>
  )
}
