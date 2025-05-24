import type { Order } from "@/types/order"

export const mockOrders: Order[] = [
  {
    id: "order-1",
    symbol: "RELIANCE",
    type: "BUY",
    quantity: 10,
    price: 2700.5,
    timestamp: "2023-05-15T10:30:00Z",
  },
  {
    id: "order-2",
    symbol: "TCS",
    type: "BUY",
    quantity: 5,
    price: 3500.25,
    timestamp: "2023-05-10T11:45:00Z",
  },
  {
    id: "order-3",
    symbol: "HDFCBANK",
    type: "BUY",
    quantity: 15,
    price: 1650.75,
    timestamp: "2023-05-05T09:15:00Z",
  },
  {
    id: "order-4",
    symbol: "INFY",
    type: "BUY",
    quantity: 8,
    price: 1480.3,
    timestamp: "2023-04-28T14:20:00Z",
  },
  {
    id: "order-5",
    symbol: "WIPRO",
    type: "BUY",
    quantity: 20,
    price: 420.75,
    timestamp: "2023-04-20T10:10:00Z",
  },
  {
    id: "order-6",
    symbol: "WIPRO",
    type: "SELL",
    quantity: 20,
    price: 435.5,
    timestamp: "2023-05-18T11:30:00Z",
  },
]
