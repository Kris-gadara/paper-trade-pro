"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTrading } from "../trading-provider"

interface AddToWatchlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddToWatchlistDialog({ open, onOpenChange }: AddToWatchlistDialogProps) {
  const { stocks, watchlist, addToWatchlist } = useTrading()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStocks = stocks
    .filter(
      (stock) =>
        !watchlist.some((w) => w.symbol === stock.symbol) &&
        (stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .slice(0, 10)

  const handleAdd = (symbol: string) => {
    addToWatchlist(symbol)
    onOpenChange(false)
    setSearchQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Watchlist</DialogTitle>
          <DialogDescription>Search for stocks to add to your watchlist</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {filteredStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted"
              >
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                  <div className="text-sm">₹{stock.price.toFixed(2)}</div>
                </div>
                <Button size="sm" onClick={() => handleAdd(stock.symbol)}>
                  Add
                </Button>
              </div>
            ))}
            {filteredStocks.length === 0 && searchQuery && (
              <div className="text-center py-4 text-muted-foreground">No stocks found</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
