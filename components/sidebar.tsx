"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Search, LineChart, Star, Clock, Settings, Menu, X } from "lucide-react"

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
    title: "Order History",
    href: "/dashboard/history",
    icon: Clock,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden absolute left-4 top-4 z-50">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileSidebar pathname={pathname} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>

      <div className="hidden border-r bg-background md:block">
        <DesktopSidebar pathname={pathname} />
      </div>
    </>
  )
}

function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-screen w-64 flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LineChart className="h-6 w-6" />
          <span>Paper Trading</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href && "bg-accent text-accent-foreground",
                "relative",
              )}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User</span>
            <span className="text-xs text-muted-foreground">user@example.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileSidebar({
  pathname,
  setIsOpen,
}: {
  pathname: string
  setIsOpen: (open: boolean) => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LineChart className="h-6 w-6" />
          <span>Paper Trading</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href && "bg-accent text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User</span>
            <span className="text-xs text-muted-foreground">user@example.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
