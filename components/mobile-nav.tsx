"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Search, LineChart, Star, Clock, Settings } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Search",
    href: "/dashboard/search",
    icon: Search,
  },
  {
    title: "Portfolio",
    href: "/dashboard/portfolio",
    icon: LineChart,
  },
  {
    title: "Watchlist",
    href: "/dashboard/watchlist",
    icon: Star,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: Clock,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <nav className="grid grid-cols-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 text-xs",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 mx-auto h-1 w-1 rounded-full bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
              <span className="mt-1">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
