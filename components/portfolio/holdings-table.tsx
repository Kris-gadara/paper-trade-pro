"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { TradeDialog } from "../trading/trade-dialog"
import { useTrading } from "../trading-provider"

export function HoldingsTable() {
  const { holdings, stocks } = useTrading()
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">("SELL")

  const handleTrade = (holding: any, type: "BUY" | "SELL") => {
    const stock = stocks.find((s) => s.symbol === holding.symbol)
    if (stock) {
      setSelectedStock(stock)
      setTradeType(type)
      setIsTradeDialogOpen(true)
    }
  }

  if (holdings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No holdings yet. Start trading to see your portfolio here.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Avg Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding) => (
                  <TableRow key={holding.symbol}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{holding.symbol}</div>
                        <div className="text-sm text-muted-foreground">{holding.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{holding.quantity}</TableCell>
                    <TableCell className="text-right">₹{holding.avgPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">₹{holding.currentPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">₹{holding.totalValue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div
                        className={`flex items-center justify-end ${holding.pnl >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {holding.pnl >= 0 ? (
                          <ArrowUpIcon className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDownIcon className="mr-1 h-3 w-3" />
                        )}
                        <div>
                          <div>₹{Math.abs(holding.pnl).toFixed(2)}</div>
                          <div className="text-xs">({holding.pnlPercent.toFixed(2)}%)</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleTrade(holding, "BUY")}>
                          Buy
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleTrade(holding, "SELL")}>
                          Sell
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
