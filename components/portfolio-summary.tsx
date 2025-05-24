"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Percent } from "lucide-react"
import { useMockPortfolio } from "@/hooks/use-mock-portfolio"

export function PortfolioSummary() {
  const { portfolioValue, todayChange, todayChangePercent } = useMockPortfolio()

  const isPositive = todayChange >= 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paper Wallet</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{portfolioValue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total portfolio value</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
          {isPositive ? <ArrowUp className="h-4 w-4 text-green-500" /> : <ArrowDown className="h-4 w-4 text-red-500" />}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            ₹{Math.abs(todayChange).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {isPositive ? "+" : "-"}₹{Math.abs(todayChange).toLocaleString()} from yesterday
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Percent Change</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : ""}
            {todayChangePercent.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">Compared to yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹75,000.00</div>
          <p className="text-xs text-muted-foreground">Available for trading</p>
        </CardContent>
      </Card>
    </div>
  )
}
