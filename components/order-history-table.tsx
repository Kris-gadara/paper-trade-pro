"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order } from "@/types/order"

interface OrderHistoryTableProps {
  orders: Order[]
}

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{new Date(order.timestamp).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{order.symbol}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    order.type === "BUY" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.type}
                </span>
              </TableCell>
              <TableCell className="text-right">{order.quantity}</TableCell>
              <TableCell className="text-right">₹{order.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">₹{(order.quantity * order.price).toFixed(2)}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Completed
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
