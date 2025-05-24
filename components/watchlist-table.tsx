"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Trash } from "lucide-react"
import type { Stock } from "@/types/stock"
import { TradeDialog } from "./trade-dialog"

interface WatchlistTableProps {
  watchlist: Stock[]
  onRemove: (symbol: string) => void
}

export function WatchlistTable({ watchlist, onRemove }: WatchlistTableProps) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("BUY")
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)

  const handleTrade = (stock: Stock, type: "BUY" | "SELL") => {
    setSelectedStock(stock)
    setTradeType(type)
    setIsTradeDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Change %</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlist.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">₹{stock.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {stock.change >= 0 ? (
                      <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                      ₹{Math.abs(stock.change).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className={stock.changePercent >= 0 ? "text-green-500" : "text-red-500"}>
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleTrade(stock, "BUY")}>
                      Buy
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleTrade(stock, "SELL")}>
                      Sell
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onRemove(stock.symbol)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedStock && (
        <TradeDialog
          open={isTradeDialogOpen}
          onOpenChange={setIsTradeDialogOpen}
          stock={selectedStock}
          tradeType={tradeType}
        />
      )}
    </>
  )
}
