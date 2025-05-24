"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { StockCard } from "@/components/stock-card"
import { useMockStocks } from "@/hooks/use-mock-stocks"

export default function SearchPage() {
  const { stocks } = useMockStocks()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6 p-6 pb-16"
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Search Stocks</h2>
        <p className="text-muted-foreground">Find and trade stocks with paper money</p>
      </div>

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>

      {filteredStocks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No stocks found matching your search</p>
        </div>
      )}
    </motion.div>
  )
}
