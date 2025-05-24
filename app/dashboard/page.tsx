"use client"

import { motion } from "framer-motion"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { RecentTrades } from "@/components/dashboard/recent-trades"
import { TopMovers } from "@/components/dashboard/top-movers"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20 md:pb-4 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your trading dashboard</p>
        </motion.div>

        <DashboardStats />

        <div className="grid gap-6 lg:grid-cols-2">
          <PortfolioChart />
          <MarketOverview />
        </div>

        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-2">
          <TopMovers />
          <RecentTrades />
        </div>
      </div>
    </div>
  )
}
