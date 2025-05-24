"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { WatchlistTable } from "@/components/watchlist/watchlist-table"
import { AddToWatchlistDialog } from "@/components/watchlist/add-to-watchlist-dialog"
import { useTrading } from "@/components/trading-provider"

export default function WatchlistPage() {
  const { watchlist } = useTrading()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredWatchlist = watchlist.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20 md:pb-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Watchlist</h1>
            <p className="text-muted-foreground">Keep track of your favorite stocks</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </motion.div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <WatchlistTable stocks={filteredWatchlist} />
        </motion.div>

        <AddToWatchlistDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      </div>
    </div>
  )
}
