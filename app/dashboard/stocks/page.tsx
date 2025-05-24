"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { StockCard } from "@/components/stocks/stock-card"
import { StockTable } from "@/components/stocks/stock-table"
import { useTrading } from "@/components/trading-provider"

const sectors = ["All", "Technology", "Banking", "Healthcare", "Energy", "Consumer", "Industrial", "Finance"]

export default function StocksPage() {
  const { stocks } = useTrading()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSector = selectedSector === "All" || stock.sector === selectedSector

    return matchesSearch && matchesSector
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20 md:pb-4 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stocks</h1>
          <p className="text-muted-foreground">Discover and trade stocks</p>
        </motion.div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              Grid
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              Table
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <Badge
              key={sector}
              variant={selectedSector === sector ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => setSelectedSector(sector)}
            >
              {sector}
            </Badge>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          ) : (
            <StockTable stocks={filteredStocks} />
          )}
        </motion.div>

        {filteredStocks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No stocks found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
