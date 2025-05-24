"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Plus, Eye } from "lucide-react"
import { TradeDialog } from "@/components/trading/trade-dialog"
import { useTrading } from "@/components/trading-provider"
import type { Stock } from "@/types/stock"
import { cn } from "@/lib/utils"

interface StockTableProps {
  stocks: Stock[]
}

export function StockTable({ stocks }: StockTableProps) {
  const { addToWatchlist, removeFromWatchlist, watchlist } = useTrading()
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false)

  const handleTrade = (stock: Stock) => {
    setSelectedStock(stock)
    setTradeDialogOpen(true)
  }

  const handleWatchlistToggle = (stock: Stock) => {
    const isInWatchlist = watchlist.some((w) => w.symbol === stock.symbol)
    if (isInWatchlist) {
      removeFromWatchlist(stock.symbol)
    } else {
      addToWatchlist(stock)
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Symbol</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Company</TableHead>
                <TableHead className="font-semibold text-right">Price</TableHead>
                <TableHead className="font-semibold text-right">Change</TableHead>
                <TableHead className="font-semibold text-center hidden md:table-cell">Sector</TableHead>
                <TableHead className="font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock, index) => {
                const isInWatchlist = watchlist.some((w) => w.symbol === stock.symbol)
                const changePercent = ((stock.price - stock.previousClose) / stock.previousClose) * 100
                const isPositive = changePercent >= 0

                return (
                  <motion.tr
                    key={stock.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{stock.symbol}</span>
                          <span className="text-xs text-muted-foreground sm:hidden">
                            {stock.name.length > 15 ? `${stock.name.substring(0, 15)}...` : stock.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <div className="max-w-[200px]">
                        <span className="text-sm font-medium">{stock.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-semibold">₹{stock.price.toFixed(2)}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-1">
                        <div
                          className={cn(
                            "flex items-center gap-1 text-sm font-medium",
                            isPositive ? "text-green-600" : "text-red-600",
                          )}
                        >
                          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {isPositive ? "+" : ""}
                          {changePercent.toFixed(2)}%
                        </div>
                        <div className={cn("text-xs", isPositive ? "text-green-600" : "text-red-600")}>
                          {isPositive ? "+" : ""}₹{(stock.price - stock.previousClose).toFixed(2)}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-center hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {stock.sector}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWatchlistToggle(stock)}
                          className="h-8 w-8 p-0"
                        >
                          {isInWatchlist ? <Eye className="h-3 w-3 text-blue-600" /> : <Plus className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" onClick={() => handleTrade(stock)} className="h-8 px-3 text-xs">
                          Trade
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {selectedStock && <TradeDialog stock={selectedStock} open={tradeDialogOpen} onOpenChange={setTradeDialogOpen} />}
    </>
  )
}
