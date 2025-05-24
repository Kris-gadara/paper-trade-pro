"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp } from "lucide-react"
import { useTrading } from "../trading-provider"
import { motion } from "framer-motion"

export function MarketOverview() {
  const { stocks } = useTrading()

  // Get top 6 stocks by market cap
  const topStocks = stocks.sort((a, b) => b.marketCap - a.marketCap).slice(0, 6)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{stock.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[150px]">{stock.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{stock.price.toFixed(2)}</p>
                <div className="flex items-center">
                  {stock.change >= 0 ? (
                    <ArrowUpIcon className="mr-1 h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
