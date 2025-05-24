"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, TrendingDown } from "lucide-react"
import { useTrading } from "../trading-provider"
import { motion } from "framer-motion"

export function TopMovers() {
  const { stocks } = useTrading()

  const topGainers = stocks
    .filter((stock) => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  const topLosers = stocks
    .filter((stock) => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Top Movers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gainers" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="flex items-center">
              <TrendingDown className="mr-2 h-4 w-4" />
              Losers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gainers" className="mt-4">
            <div className="space-y-3">
              {topGainers.map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[120px]">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{stock.price.toFixed(2)}</p>
                    <div className="flex items-center text-green-600">
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                      <span className="text-sm">+{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="losers" className="mt-4">
            <div className="space-y-3">
              {topLosers.map((stock, index) => (
                <motion.div
                  key={stock.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[120px]">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{stock.price.toFixed(2)}</p>
                    <div className="flex items-center text-red-600">
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                      <span className="text-sm">{stock.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
