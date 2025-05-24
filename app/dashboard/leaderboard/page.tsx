"use client"

import { motion } from "framer-motion"
import { LeaderboardStats } from "@/components/leaderboard/leaderboard-stats"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { UserRankCard } from "@/components/leaderboard/user-rank-card"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20 md:pb-4 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other traders</p>
        </motion.div>

        <LeaderboardStats />

        <UserRankCard />

        <LeaderboardTable />
      </div>
    </div>
  )
}
