"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star, Clock, Settings } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function QuickActions() {
  const actions = [
    {
      title: "Browse Stocks",
      description: "Discover and trade stocks",
      icon: TrendingUp,
      href: "/dashboard/stocks",
      color: "bg-blue-500",
    },
    {
      title: "View Watchlist",
      description: "Check your favorite stocks",
      icon: Star,
      href: "/dashboard/watchlist",
      color: "bg-yellow-500",
    },
    {
      title: "Order History",
      description: "Review your trades",
      icon: Clock,
      href: "/dashboard/orders",
      color: "bg-green-500",
    },
    {
      title: "Settings",
      description: "Manage your account",
      icon: Settings,
      href: "/dashboard/settings",
      color: "bg-purple-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all"
                >
                  <div className={`p-2 rounded-full ${action.color} text-white`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
