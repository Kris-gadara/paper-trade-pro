"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Stock } from "@/types/stock"
import { useMockStocks } from "@/hooks/use-mock-stocks"

interface AddToWatchlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (stock: Stock) => void
}

export function AddToWatchlistDialog({ open, onOpenChange, onAdd }: AddToWatchlistDialogProps) {
  const { stocks } = useMockStocks()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStocks = stocks
    .filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 5)

  const handleAdd = (stock: Stock) => {
    onAdd(stock)
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
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by company name or symbol..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredStocks.length > 0 ? (
            <div className="space-y-2">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between rounded-md border p-3 hover:bg-muted"
                >
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <Button size="sm" onClick={() => handleAdd(stock)}>
                    Add
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground">No stocks found matching your search</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
