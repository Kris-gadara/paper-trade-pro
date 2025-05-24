"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wallet, Target, DollarSign, PiggyBank } from "lucide-react"
import { useTrading } from "../trading-provider"
import { motion } from "framer-motion"

export function PortfolioSummary() {
  const { balance, totalValue, totalInvested, totalPnl, totalPnlPercent } = useTrading()

  const totalPortfolioValue = balance + totalValue
  const isPositive = totalPnl >= 0

  const stats = [
    {
      title: "Total Portfolio Value",
      value: totalPortfolioValue,
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Available Balance",
      value: balance,
      icon: PiggyBank,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Invested Amount",
      value: totalInvested,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Current Value",
      value: totalValue,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Portfolio Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">₹{stat.value.toLocaleString()}</p>
                  </div>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* P&L Summary */}
      {totalInvested > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isPositive ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
                Portfolio Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total P&L</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                      {isPositive ? "+" : ""}₹{Math.abs(totalPnl).toLocaleString()}
                    </p>
                    <Badge variant={isPositive ? "default" : "destructive"}>
                      {isPositive ? "+" : ""}
                      {totalPnlPercent.toFixed(2)}%
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Performance Summary</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Invested:</span>
                      <span>₹{totalInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current Value:</span>
                      <span>₹{totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Net P&L:</span>
                      <span className={isPositive ? "text-green-600" : "text-red-600"}>
                        {isPositive ? "+" : ""}₹{Math.abs(totalPnl).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
