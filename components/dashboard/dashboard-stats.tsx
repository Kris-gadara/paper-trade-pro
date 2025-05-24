"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, Wallet, TrendingUp, Briefcase, DollarSign } from "lucide-react"
import { useTrading } from "../trading-provider"

export function DashboardStats() {
  const { balance, totalInvested, totalValue, totalPnl, totalPnlPercent } = useTrading()

  const stats = [
    {
      title: "Available Balance",
      value: `₹${balance.toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      title: "Total Invested",
      value: `₹${totalInvested.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Portfolio Value",
      value: `₹${totalValue.toLocaleString()}`,
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      title: "Total P&L",
      value: `₹${totalPnl.toLocaleString()}`,
      change: `${totalPnlPercent.toFixed(2)}%`,
      icon: TrendingUp,
      color: totalPnl >= 0 ? "text-green-600" : "text-red-600",
      isProfit: totalPnl >= 0,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className={`flex items-center text-xs ${stat.color}`}>
                  {stat.isProfit ? (
                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
