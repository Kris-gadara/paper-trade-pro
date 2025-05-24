"use client"

import { motion } from "framer-motion"
import { PortfolioStats } from "@/components/portfolio/portfolio-stats"
import { PortfolioChart } from "@/components/portfolio/portfolio-chart"
import { SectorAllocation } from "@/components/portfolio/sector-allocation"
import { HoldingsTable } from "@/components/portfolio/holdings-table"
import { PortfolioSummary } from "@/components/portfolio/portfolio-summary"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20 md:pb-4 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </motion.div>

        <PortfolioStats />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PortfolioChart />
          </div>
          <div>
            <SectorAllocation />
          </div>
        </div>

        <PortfolioSummary />

        <HoldingsTable />
      </div>
    </div>
  )
}
