"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"
import { OrderHistoryTable } from "@/components/order-history-table"
import { useMockOrderHistory } from "@/hooks/use-mock-order-history"

export default function OrderHistoryPage() {
  const { orders } = useMockOrderHistory()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDownload = () => {
    // Mock download functionality
    alert("Download functionality would be implemented here")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6 p-6 pb-16"
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
        <p className="text-muted-foreground">View your paper trading transaction history</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by symbol or order type..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      {orders.length > 0 ? (
        <OrderHistoryTable orders={filteredOrders} />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">You haven't made any trades yet</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
