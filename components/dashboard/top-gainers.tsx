"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon } from "lucide-react"
import { useTrading } from "../trading-provider"

export function TopGainers() {
  const { stocks } = useTrading()

  const topGainers = stocks
    .filter((stock) => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Gainers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topGainers.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{stock.price.toFixed(2)}</p>
                <div className="flex items-center text-green-600">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  <span className="text-sm">+{stock.changePercent.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
