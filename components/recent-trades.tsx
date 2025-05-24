"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useMockOrderHistory } from "@/hooks/use-mock-order-history"

export function RecentTrades() {
  const { orders } = useMockOrderHistory()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>Recent Trades</CardTitle>
          <CardDescription>Your latest paper trading activity</CardDescription>
        </div>
        <div className="ml-auto">
          <Link href="/dashboard/history">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${order.type === "BUY" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {order.type === "BUY" ? "B" : "S"}
                  </div>
                  <div>
                    <p className="font-medium">{order.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.quantity} shares @ ₹{order.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{(order.quantity * order.price).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{new Date(order.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">You haven't made any trades yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
