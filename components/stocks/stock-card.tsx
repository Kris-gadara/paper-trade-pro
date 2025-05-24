"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, Star, StarOff } from "lucide-react"
import { TradeDialog } from "../trading/trade-dialog"
import { useTrading } from "../trading-provider"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  sector: string
  marketCap: number
  volume: number
}

interface StockCardProps {
  stock: Stock
}

export function StockCard({ stock }: StockCardProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useTrading()
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY")

  const isInWatchlist = watchlist.some((w) => w.symbol === stock.symbol)

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(stock.symbol)
    } else {
      addToWatchlist(stock.symbol)
    }
  }

  const handleTrade = (type: "BUY" | "SELL") => {
    setTradeType(type)
    setIsTradeDialogOpen(true)
  }

  return (
    <>
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{stock.symbol}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{stock.name}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {stock.sector}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleWatchlistToggle} className="ml-2">
                {isInWatchlist ? (
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                ) : (
                  <StarOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">₹{stock.price.toFixed(2)}</span>
                <div className={`flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {stock.change >= 0 ? (
                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                  )}
                  <span className="text-sm font-medium">{stock.changePercent.toFixed(2)}%</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Market Cap:</span>
                  <span>₹{(stock.marketCap / 10000000).toFixed(1)}Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>Volume:</span>
                  <span>{(stock.volume / 1000).toFixed(0)}K</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1" onClick={() => handleTrade("BUY")}>
                  Buy
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleTrade("SELL")}>
                  Sell
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <TradeDialog open={isTradeDialogOpen} onOpenChange={setIsTradeDialogOpen} stock={stock} type={tradeType} />
    </>
  )
}
