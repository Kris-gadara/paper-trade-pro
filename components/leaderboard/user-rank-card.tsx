"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, TrendingUp, TrendingDown, Target } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useTrading } from "@/components/trading-provider"

export function UserRankCard() {
  const { user } = useAuth()
  const { holdings, orders, totalInvested, totalValue, totalPnl, totalPnlPercent } = useTrading()

  if (!user) return null

  // Safe access to arrays with fallbacks
  const totalTrades = orders?.length || 0
  const safeHoldings = holdings || []
  const safeTotalInvested = totalInvested || 0
  const safeTotalValue = totalValue || 0
  const safeTotalPnl = totalPnl || 0
  const safePnlPercentage = totalPnlPercent || 0

  // Mock user rank (in a real app, this would come from backend)
  const userRank = Math.floor(Math.random() * 50) + 1
  const totalUsers = 1247

  const getRankIcon = () => {
    if (userRank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (userRank <= 10) return <Trophy className="h-5 w-5 text-orange-500" />
    return <Target className="h-5 w-5 text-blue-500" />
  }

  const getRankBadgeVariant = () => {
    if (userRank === 1) return "default"
    if (userRank <= 10) return "secondary"
    return "outline"
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            {getRankIcon()}
            Your Ranking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{user.username}</p>
                <p className="text-sm text-muted-foreground">
                  Rank #{userRank} of {totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
            <Badge variant={getRankBadgeVariant()} className="text-sm px-3 py-1">
              Top {Math.round((userRank / totalUsers) * 100)}%
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-background/50">
              <div className="flex items-center justify-center mb-1">
                {safePnlPercentage >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">P&L</p>
              <p className={`font-semibold ${safePnlPercentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                {safePnlPercentage >= 0 ? "+" : ""}
                {safePnlPercentage.toFixed(2)}%
              </p>
            </div>

            <div className="text-center p-3 rounded-lg bg-background/50">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground">Trades</p>
              <p className="font-semibold">{totalTrades}</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-background/50">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground">Invested</p>
              <p className="font-semibold">₹{(safeTotalInvested / 1000).toFixed(0)}K</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-background/50">
              <div className="flex items-center justify-center mb-1">
                <Trophy className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground">Score</p>
              <p className="font-semibold">
                {Math.max(1000, Math.floor(safePnlPercentage * 100 + totalTrades * 10)).toLocaleString()}
              </p>
            </div>
          </div>

          {userRank <= 10 && (
            <div className="text-center p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                🎉 Congratulations! You're in the top 10!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
