"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTrading } from "../trading-provider"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  sector: string
  marketCap: number
  volume: number
}

interface TradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stock: Stock
  type: "BUY" | "SELL"
}

export function TradeDialog({ open, onOpenChange, stock, type: initialType }: TradeDialogProps) {
  const { buyStock, sellStock, balance, holdings } = useTrading()
  const [type, setType] = useState<"BUY" | "SELL">(initialType)
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET")
  const [quantity, setQuantity] = useState("1")
  const [limitPrice, setLimitPrice] = useState(stock.price.toString())

  const holding = holdings.find((h) => h.symbol === stock.symbol)
  const maxQuantity = type === "SELL" ? holding?.quantity || 0 : Math.floor(balance / stock.price)
  const totalValue = Number(quantity) * (orderType === "MARKET" ? stock.price : Number(limitPrice))

  const handleSubmit = () => {
    const qty = Number(quantity)
    const price = orderType === "LIMIT" ? Number(limitPrice) : undefined

    if (type === "BUY") {
      buyStock(stock.symbol, qty, orderType, price)
    } else {
      sellStock(stock.symbol, qty, orderType, price)
    }

    onOpenChange(false)
    setQuantity("1")
    setLimitPrice(stock.price.toString())
  }

  const isValid = () => {
    const qty = Number(quantity)
    if (!qty || qty <= 0) return false
    if (type === "SELL" && qty > maxQuantity) return false
    if (type === "BUY" && totalValue > balance) return false
    if (orderType === "LIMIT" && (!Number(limitPrice) || Number(limitPrice) <= 0)) return false
    return true
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "BUY" ? "Buy" : "Sell"} {stock.symbol}
          </DialogTitle>
          <DialogDescription>
            {stock.name} - Current Price: ₹{stock.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Tabs value={type} onValueChange={(value) => setType(value as "BUY" | "SELL")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="BUY">Buy</TabsTrigger>
              <TabsTrigger value="SELL">Sell</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <Label>Order Type</Label>
            <RadioGroup
              value={orderType}
              onValueChange={(value) => setOrderType(value as "MARKET" | "LIMIT")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MARKET" id="market" />
                <Label htmlFor="market">Market</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="LIMIT" id="limit" />
                <Label htmlFor="limit">Limit</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Max: {maxQuantity} shares</p>
          </div>

          {orderType === "LIMIT" && (
            <div className="space-y-2">
              <Label htmlFor="limit-price">Limit Price</Label>
              <Input
                id="limit-price"
                type="number"
                step="0.01"
                min="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
              />
            </div>
          )}

          <div className="rounded-lg bg-muted p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span>{quantity} shares</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price:</span>
              <span>₹{(orderType === "MARKET" ? stock.price : Number(limitPrice)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>₹{totalValue.toFixed(2)}</span>
            </div>
            {type === "BUY" && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Available Balance:</span>
                <span>₹{balance.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid()}>
            {type === "BUY" ? "Buy" : "Sell"} Shares
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
