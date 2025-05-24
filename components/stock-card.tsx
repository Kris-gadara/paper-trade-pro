"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Star } from "lucide-react"
import type { Stock } from "@/types/stock"
import { StockChart } from "./stock-chart"
import { TradeDialog } from "./trade-dialog"
import { useMockWatchlist } from "@/hooks/use-mock-watchlist"

interface StockCardProps {
  stock: Stock
}

export function StockCard({ stock }: StockCardProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useMockWatchlist()
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY")

  const isInWatchlist = watchlist.some((item) => item.symbol === stock.symbol)

  const handleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(stock.symbol)
    } else {
      addToWatchlist(stock)
    }
  }

  const handleTrade = (type: "BUY" | "SELL") => {
    setTradeType(type)
    setIsTradeDialogOpen(true)
  }

  return (
    <>
      <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{stock.symbol}</h3>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWatchlist}
                className={isInWatchlist ? "text-yellow-500" : "text-muted-foreground"}
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-2xl font-bold">₹{stock.price.toFixed(2)}</div>
              <div className={`flex items-center ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stock.change >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                <span>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div className="mt-4 h-[60px]">
              <StockChart data={stock.chartData} isPositive={stock.change >= 0} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Button variant="outline" className="w-[48%]" onClick={() => handleTrade("BUY")}>
              Buy
            </Button>
            <Button variant="outline" className="w-[48%]" onClick={() => handleTrade("SELL")}>
              Sell
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <TradeDialog open={isTradeDialogOpen} onOpenChange={setIsTradeDialogOpen} stock={stock} tradeType={tradeType} />
    </>
  )
}
