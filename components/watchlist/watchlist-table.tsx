"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon, Trash2 } from "lucide-react"
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

interface WatchlistTableProps {
  stocks: Stock[]
}

export function WatchlistTable({ stocks }: WatchlistTableProps) {
  const { removeFromWatchlist } = useTrading()
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY")

  const handleTrade = (stock: Stock, type: "BUY" | "SELL") => {
    setSelectedStock(stock)
    setTradeType(type)
    setIsTradeDialogOpen(true)
  }

  if (stocks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No stocks in your watchlist yet.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Change %</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">₹{stock.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                        ₹{Math.abs(stock.change).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`flex items-center justify-end ${stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {stock.changePercent >= 0 ? (
                          <ArrowUpIcon className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDownIcon className="mr-1 h-3 w-3" />
                        )}
                        {Math.abs(stock.changePercent).toFixed(2)}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button size="sm" onClick={() => handleTrade(stock, "BUY")}>
                          Buy
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleTrade(stock, "SELL")}>
                          Sell
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => removeFromWatchlist(stock.symbol)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedStock && (
        <TradeDialog
          open={isTradeDialogOpen}
          onOpenChange={setIsTradeDialogOpen}
          stock={selectedStock}
          type={tradeType}
        />
      )}
    </>
  )
}
