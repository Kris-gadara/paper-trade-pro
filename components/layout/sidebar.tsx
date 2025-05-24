"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboard, TrendingUp, Briefcase, Star, Clock, Trophy, Settings, LogOut } from "lucide-react"
import { useAuth } from "../auth-provider"
import { useTrading } from "../trading-provider"
import { motion } from "framer-motion"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Stocks", href: "/dashboard/stocks", icon: TrendingUp },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
  { name: "Watchlist", href: "/dashboard/watchlist", icon: Star },
  { name: "Orders", href: "/dashboard/orders", icon: Clock },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { balance, totalPnl } = useTrading()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
      <div className="flex flex-col flex-grow pt-5 bg-card border-r overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">PaperTrade</h1>
              <p className="text-xs text-muted-foreground">Pro</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute left-0 w-1 h-8 bg-primary-foreground rounded-r-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          <div className="flex-shrink-0 p-4 space-y-4">
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Portfolio Value</div>
              <div className="text-lg font-bold">₹{balance.toLocaleString()}</div>
              <div className={cn("text-xs font-medium", totalPnl >= 0 ? "text-green-600" : "text-red-600")}>
                {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.username}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="h-8 w-8 p-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
