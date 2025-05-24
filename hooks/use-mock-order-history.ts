"use client"

import { useState } from "react"
import type { Order } from "@/types/order"
import { mockOrders } from "@/data/mock-orders"

export function useMockOrderHistory() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  return { orders }
}
