"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { mockStocks } from "@/data/mock-stocks"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  sector: string
  marketCap: number
  volume: number
  high52w: number
  low52w: number
  chartData: { time: string; price: number }[]
}

interface Holding {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  totalValue: number
  pnl: number
  pnlPercent: number
  sector: string
}

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

interface TradingContextType {
  stocks: Stock[]
  holdings: Holding[]
  watchlist: Stock[]
  orders: Order[]
  balance: number
  totalInvested: number
  totalValue: number
  totalPnl: number
  totalPnlPercent: number
  buyStock: (symbol: string, quantity: number, orderType: "MARKET" | "LIMIT", limitPrice?: number) => void
  sellStock: (symbol: string, quantity: number, orderType: "MARKET" | "LIMIT", limitPrice?: number) => void
  addToWatchlist: (symbol: string) => void
  removeFromWatchlist: (symbol: string) => void
  resetPortfolio: () => void
  resetBalance: () => void
}

const TradingContext = createContext<TradingContextType | undefined>(undefined)

const INITIAL_BALANCE = 1000000 // ₹10,00,000

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks)
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [watchlist, setWatchlist] = useState<Stock[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const { toast } = useToast()

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHoldings = localStorage.getItem("holdings")
    const savedWatchlist = localStorage.getItem("watchlist")
    const savedOrders = localStorage.getItem("orders")
    const savedBalance = localStorage.getItem("balance")

    if (savedHoldings) {
      setHoldings(JSON.parse(savedHoldings))
    }
    if (savedWatchlist) {
      const watchlistSymbols = JSON.parse(savedWatchlist)
      setWatchlist(stocks.filter((stock) => watchlistSymbols.includes(stock.symbol)))
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    if (savedBalance) {
      setBalance(Number(savedBalance))
    }
  }, [])

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("holdings", JSON.stringify(holdings))
  }, [holdings])

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist.map((stock) => stock.symbol)))
  }, [watchlist])

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem("balance", balance.toString())
  }, [balance])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const changePercent = (Math.random() - 0.5) * 0.04 // -2% to +2%
          const newPrice = Math.max(stock.price * (1 + changePercent), 1)
          const newChange = newPrice - stock.price
          const newChangePercent = (newChange / stock.price) * 100

          // Add new data point to chart
          const newChartData = [
            ...stock.chartData.slice(-29), // Keep last 29 points
            {
              time: new Date().toISOString(),
              price: newPrice,
            },
          ]

          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            chartData: newChartData,
          }
        }),
      )
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Update holdings when stock prices change
  useEffect(() => {
    setHoldings((prevHoldings) =>
      prevHoldings.map((holding) => {
        const stock = stocks.find((s) => s.symbol === holding.symbol)
        if (!stock) return holding

        const totalValue = holding.quantity * stock.price
        const pnl = totalValue - holding.quantity * holding.avgPrice
        const pnlPercent = (pnl / (holding.quantity * holding.avgPrice)) * 100

        return {
          ...holding,
          currentPrice: stock.price,
          totalValue,
          pnl,
          pnlPercent,
        }
      }),
    )
  }, [stocks])

  // Update watchlist when stock prices change
  useEffect(() => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.map((watchlistStock) => {
        const updatedStock = stocks.find((s) => s.symbol === watchlistStock.symbol)
        return updatedStock || watchlistStock
      }),
    )
  }, [stocks])

  const buyStock = (symbol: string, quantity: number, orderType: "MARKET" | "LIMIT", limitPrice?: number) => {
    const stock = stocks.find((s) => s.symbol === symbol)
    if (!stock) return

    const price = orderType === "MARKET" ? stock.price : limitPrice || stock.price
    const totalCost = quantity * price

    if (totalCost > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this trade",
        variant: "destructive",
      })
      return
    }

    // Create order
    const order: Order = {
      id: `order_${Date.now()}`,
      symbol,
      type: "BUY",
      orderType,
      quantity,
      price,
      status: "COMPLETED",
      timestamp: new Date().toISOString(),
    }

    setOrders((prev) => [order, ...prev])
    setBalance((prev) => prev - totalCost)

    // Update holdings
    setHoldings((prev) => {
      const existingHolding = prev.find((h) => h.symbol === symbol)

      if (existingHolding) {
        const newQuantity = existingHolding.quantity + quantity
        const newAvgPrice = (existingHolding.quantity * existingHolding.avgPrice + totalCost) / newQuantity
        const newTotalValue = newQuantity * stock.price
        const newPnl = newTotalValue - newQuantity * newAvgPrice
        const newPnlPercent = (newPnl / (newQuantity * newAvgPrice)) * 100

        return prev.map((h) =>
          h.symbol === symbol
            ? {
                ...h,
                quantity: newQuantity,
                avgPrice: newAvgPrice,
                currentPrice: stock.price,
                totalValue: newTotalValue,
                pnl: newPnl,
                pnlPercent: newPnlPercent,
              }
            : h,
        )
      } else {
        const newHolding: Holding = {
          symbol,
          name: stock.name,
          quantity,
          avgPrice: price,
          currentPrice: stock.price,
          totalValue: quantity * stock.price,
          pnl: quantity * (stock.price - price),
          pnlPercent: ((stock.price - price) / price) * 100,
          sector: stock.sector,
        }
        return [...prev, newHolding]
      }
    })

    toast({
      title: "Order Executed",
      description: `Bought ${quantity} shares of ${symbol} at ₹${price.toFixed(2)}`,
    })
  }

  const sellStock = (symbol: string, quantity: number, orderType: "MARKET" | "LIMIT", limitPrice?: number) => {
    const stock = stocks.find((s) => s.symbol === symbol)
    const holding = holdings.find((h) => h.symbol === symbol)

    if (!stock || !holding) return

    if (quantity > holding.quantity) {
      toast({
        title: "Insufficient Shares",
        description: "You don't have enough shares to sell",
        variant: "destructive",
      })
      return
    }

    const price = orderType === "MARKET" ? stock.price : limitPrice || stock.price
    const totalValue = quantity * price

    // Create order
    const order: Order = {
      id: `order_${Date.now()}`,
      symbol,
      type: "SELL",
      orderType,
      quantity,
      price,
      status: "COMPLETED",
      timestamp: new Date().toISOString(),
    }

    setOrders((prev) => [order, ...prev])
    setBalance((prev) => prev + totalValue)

    // Update holdings
    setHoldings((prev) => {
      return prev
        .map((h) => {
          if (h.symbol === symbol) {
            const newQuantity = h.quantity - quantity

            if (newQuantity === 0) {
              return null // Will be filtered out
            }

            const newTotalValue = newQuantity * stock.price
            const newPnl = newTotalValue - newQuantity * h.avgPrice
            const newPnlPercent = (newPnl / (newQuantity * h.avgPrice)) * 100

            return {
              ...h,
              quantity: newQuantity,
              currentPrice: stock.price,
              totalValue: newTotalValue,
              pnl: newPnl,
              pnlPercent: newPnlPercent,
            }
          }
          return h
        })
        .filter(Boolean) as Holding[]
    })

    toast({
      title: "Order Executed",
      description: `Sold ${quantity} shares of ${symbol} at ₹${price.toFixed(2)}`,
    })
  }

  const addToWatchlist = (symbol: string) => {
    const stock = stocks.find((s) => s.symbol === symbol)
    if (!stock) return

    if (watchlist.some((w) => w.symbol === symbol)) {
      toast({
        title: "Already in Watchlist",
        description: `${symbol} is already in your watchlist`,
        variant: "destructive",
      })
      return
    }

    setWatchlist((prev) => [...prev, stock])
    toast({
      title: "Added to Watchlist",
      description: `${symbol} has been added to your watchlist`,
    })
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((w) => w.symbol !== symbol))
    toast({
      title: "Removed from Watchlist",
      description: `${symbol} has been removed from your watchlist`,
    })
  }

  const resetPortfolio = () => {
    setHoldings([])
    setOrders([])
  }

  const resetBalance = () => {
    setBalance(INITIAL_BALANCE)
  }

  // Calculate portfolio metrics
  const totalInvested = holdings.reduce((sum, holding) => sum + holding.quantity * holding.avgPrice, 0)
  const totalValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0)
  const totalPnl = totalValue - totalInvested
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0

  return (
    <TradingContext.Provider
      value={{
        stocks,
        holdings,
        watchlist,
        orders,
        balance,
        totalInvested,
        totalValue,
        totalPnl,
        totalPnlPercent,
        buyStock,
        sellStock,
        addToWatchlist,
        removeFromWatchlist,
        resetPortfolio,
        resetBalance,
      }}
    >
      {children}
    </TradingContext.Provider>
  )
}

export function useTrading() {
  const context = useContext(TradingContext)
  if (context === undefined) {
    throw new Error("useTrading must be used within a TradingProvider")
  }
  return context
}
