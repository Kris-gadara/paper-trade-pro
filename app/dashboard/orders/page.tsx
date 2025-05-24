"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"
import { OrderHistoryTable } from "@/components/orders/order-history-table"
import { useTrading } from "@/components/trading-provider"

const orderTypes = ["All", "BUY", "SELL"]
const orderStatuses = ["All", "COMPLETED", "PENDING", "CANCELLED"]

export default function OrdersPage() {
  const { orders } = useTrading()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All" || order.type === selectedType
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      ["Date", "Symbol", "Type", "Quantity", "Price", "Total", "Status"],
      ...filteredOrders.map((order) => [
        new Date(order.timestamp).toLocaleDateString(),
        order.symbol,
        order.type,
        order.quantity.toString(),
        order.price.toFixed(2),
        (order.quantity * order.price).toFixed(2),
        order.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "order-history.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20 md:pb-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Order History</h1>
            <p className="text-muted-foreground">View your trading history</p>
          </div>
          <Button variant="outline" onClick={handleExport} className="shrink-0">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </motion.div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {orderTypes.map((type) => (
              <Badge
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Badge>
            ))}
            {orderStatuses.map((status) => (
              <Badge
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <OrderHistoryTable orders={filteredOrders} />
        </motion.div>
      </div>
    </div>
  )
}
