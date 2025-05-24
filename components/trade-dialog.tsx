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
import { useToast } from "@/hooks/use-toast"
import type { Stock } from "@/types/stock"

interface TradeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stock: Stock
  tradeType: "BUY" | "SELL"
}

export function TradeDialog({ open, onOpenChange, stock, tradeType: initialTradeType }: TradeDialogProps) {
  const { toast } = useToast()
  const [tradeType, setTradeType] = useState<"BUY" | "SELL">(initialTradeType)
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET")
  const [quantity, setQuantity] = useState("1")
  const [price, setPrice] = useState(stock.price.toString())

  const total = Number(quantity) * Number(price)

  const handleQuantityChange = (value: string) => {
    // Only allow positive integers
    if (/^\d*$/.test(value)) {
      setQuantity(value)
    }
  }

  const handlePriceChange = (value: string) => {
    // Only allow positive numbers with up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value)
    }
  }

  const handleSubmit = () => {
    // Validate inputs
    if (!quantity || Number(quantity) <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    if (orderType === "LIMIT" && (!price || Number(price) <= 0)) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price",
        variant: "destructive",
      })
      return
    }

    // Simulate trade execution
    toast({
      title: "Order Placed",
      description: `${tradeType} ${quantity} shares of ${stock.symbol} at ₹${Number(price).toFixed(2)}`,
    })

    onOpenChange(false)

    // Reset form
    setQuantity("1")
    setPrice(stock.price.toString())
    setOrderType("MARKET")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {tradeType === "BUY" ? "Buy" : "Sell"} {stock.symbol}
          </DialogTitle>
          <DialogDescription>
            {stock.name} - ₹{stock.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={tradeType} onValueChange={(value) => setTradeType(value as "BUY" | "SELL")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="BUY">Buy</TabsTrigger>
            <TabsTrigger value="SELL">Sell</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="order-type">Order Type</Label>
            <RadioGroup
              id="order-type"
              defaultValue="MARKET"
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
            <Input id="quantity" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={orderType === "MARKET" ? stock.price.toFixed(2) : price}
              onChange={(e) => handlePriceChange(e.target.value)}
              disabled={orderType === "MARKET"}
            />
          </div>

          <div className="rounded-md bg-muted p-4">
            <div className="flex items-center justify-between">
              <span>Estimated Total:</span>
              <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Confirm {tradeType === "BUY" ? "Purchase" : "Sale"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
