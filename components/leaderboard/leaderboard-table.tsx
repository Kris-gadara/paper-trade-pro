"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal, Award } from "lucide-react"

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, username: "TradingPro", profit: 45.2, trades: 156, score: 12450 },
  { rank: 2, username: "StockMaster", profit: 38.7, trades: 142, score: 11200 },
  { rank: 3, username: "BullRunner", profit: 32.1, trades: 98, score: 10800 },
  { rank: 4, username: "MarketWiz", profit: 28.9, trades: 134, score: 9850 },
  { rank: 5, username: "InvestorX", profit: 25.4, trades: 87, score: 9200 },
  { rank: 6, username: "TradeMaster", profit: 22.8, trades: 76, score: 8900 },
  { rank: 7, username: "ProfitSeeker", profit: 19.5, trades: 65, score: 8600 },
  { rank: 8, username: "StockGuru", profit: 17.2, trades: 89, score: 8450 },
  { rank: 9, username: "BearSlayer", profit: 15.8, trades: 54, score: 8200 },
  { rank: 10, username: "DayTrader", profit: 13.4, trades: 123, score: 7950 },
]

export function LeaderboardTable() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Traders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Trader</TableHead>
                <TableHead className="text-right">Profit %</TableHead>
                <TableHead className="text-right">Trades</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((trader) => (
                <TableRow key={trader.rank} className={trader.rank <= 3 ? "bg-muted/50" : ""}>
                  <TableCell>
                    <div className="flex items-center">{getRankIcon(trader.rank)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{trader.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{trader.username}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={trader.profit > 0 ? "default" : "destructive"}>+{trader.profit}%</Badge>
                  </TableCell>
                  <TableCell className="text-right">{trader.trades}</TableCell>
                  <TableCell className="text-right font-medium">{trader.score.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
