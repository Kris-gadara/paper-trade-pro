"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import { useTrading } from "../trading-provider"
import Link from "next/link"
import { motion } from "framer-motion"

export function RecentTrades() {
  const { orders } = useTrading()

  const recentOrders = orders.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Recent Trades
        </CardTitle>
        <Link href="/dashboard/orders">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No trades yet</p>
            <p className="text-sm text-muted-foreground">Start trading to see your history here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Badge variant={order.type === "BUY" ? "default" : "secondary"}>{order.type}</Badge>
                  <div>
                    <p className="font-medium">{order.symbol}</p>
                    <p className="text-sm text-muted-foreground">{order.quantity} shares</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{order.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.timestamp).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
