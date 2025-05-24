"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, TrendingUp, Award } from "lucide-react"

export function LeaderboardStats() {
  const stats = [
    {
      title: "Your Rank",
      value: "#42",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Total Traders",
      value: "1,247",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Top Performer",
      value: "+45.2%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Your Score",
      value: "8,450",
      icon: Award,
      color: "text-purple-600",
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
