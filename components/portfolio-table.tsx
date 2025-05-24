"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"
import type { PortfolioStock } from "@/types/portfolio"
import { TradeDialog } from "./trade-dialog"

interface PortfolioTableProps {
  portfolio: PortfolioStock[]
}

export function PortfolioTable({ portfolio }: PortfolioTableProps) {
  const [selectedStock, setSelectedStock] = useState<PortfolioStock | null>(null)
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("SELL")
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)

  const handleTrade = (stock: PortfolioStock, type: "BUY" | "SELL") => {
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
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Avg. Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">P/L</TableHead>
              <TableHead className="text-right">P/L %</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">{stock.quantity}</TableCell>
                <TableCell className="text-right">₹{stock.avgPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{stock.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {stock.profitLoss >= 0 ? (
                      <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span className={stock.profitLoss >= 0 ? "text-green-500" : "text-red-500"}>
                      ₹{Math.abs(stock.profitLoss).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className={stock.profitLossPercent >= 0 ? "text-green-500" : "text-red-500"}>
                    {stock.profitLossPercent >= 0 ? "+" : ""}
                    {stock.profitLossPercent.toFixed(2)}%
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
