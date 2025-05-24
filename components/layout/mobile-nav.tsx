"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, TrendingUp, Briefcase, Star, Clock, Settings } from "lucide-react"
import { motion } from "framer-motion"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Stocks", href: "/dashboard/stocks", icon: TrendingUp },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
  { name: "Watchlist", href: "/dashboard/watchlist", icon: Star },
  { name: "Orders", href: "/dashboard/orders", icon: Clock },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t md:hidden">
      <nav className="flex">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 px-1 text-xs relative",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="truncate">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute top-0 left-1/2 w-8 h-1 bg-primary rounded-b-full -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
