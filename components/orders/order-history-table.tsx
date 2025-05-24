"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Order {
  id: string
  symbol: string
  type: "BUY" | "SELL"
  orderType: "MARKET" | "LIMIT"
  quantity: number
  price: number
  status: "COMPLETED" | "PENDING" | "CANCELLED"
  timestamp: string
}

interface OrderHistoryTableProps {
  orders: Order[]
}

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No orders yet. Start trading to see your order history here.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(order.timestamp).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">{new Date(order.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{order.symbol}</TableCell>
                  <TableCell>
                    <Badge variant={order.type === "BUY" ? "default" : "secondary"}>{order.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.orderType}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.quantity}</TableCell>
                  <TableCell className="text-right">₹{order.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{(order.quantity * order.price).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "COMPLETED"
                          ? "default"
                          : order.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
